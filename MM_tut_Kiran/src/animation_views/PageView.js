define(function(require, exports, module) {
    var View          = require('famous/core/View');
    var Surface       = require('famous/core/Surface');
    var Transform     = require('famous/core/Transform');
    var StateModifier = require('famous/modifiers/StateModifier');
    var HeaderFooter = require('famous/views/HeaderFooterLayout');
    var Engine = require('famous/core/Engine');

    var ImageSurface = require('famous/surfaces/ImageSurface');
    var FastClick       = require('famous/inputs/FastClick');
    var BaseView = require('animation_views/BaseView');
    var ZoomOutIntroView = require('animation_views/animation_slides/ZoomOutIntroView');
    var AnimationController = require('controllers/AnimationController'); // Controller for the tutorial loading logic
    var animationController = new AnimationController(); //Global animation controller
    var thisPageView; //Give global access to the page view to load animations
    var NavigationView = require('animation_views/NavigationView');
    var MenuView = require('animation_views/MenuView');
    var ProgressView = require('animation_views/ProgressView');
    var progressView = [0,0,0];
    var progressViewModifier = [0,0,0];
    var StripData = require('Data/StripData');


    function PageView() {
        thisPageView = this;
        this.menuToggle = true;
        View.apply(this, arguments);

        _createLayout.call(this);
        _createMenuView.call(this);
        _createProgress.call(this);
        _createNavigationView.call(this);
        _createHeader.call(this);
        _createFooter.call(this);
        _bringHeaderToFront.call(this);
        _createBody.call(this);
        _initializeAnimationController.call(this);
        _loadStartingAnimation.call(this); //Uncomment to add sample animation to body
        _setListeners.call(this);

    }

    PageView.prototype = Object.create(View.prototype);
    PageView.prototype.constructor = PageView;

    PageView.DEFAULT_OPTIONS = {
        headerSize: 44
    };


    function _createLayout() {
        this.layout = new HeaderFooter({
            headerSize: this.options.headerSize
        });

        var layoutModifier = new StateModifier({
            transform: Transform.translate(0, 0, 0.2)
        });

        this.add(layoutModifier).add(this.layout);
    }

    function _initializeAnimationController() {
        animationController.initialize(thisPageView);
    }

    function _createNavigationView() {
        this.navigationView = new NavigationView();

        //changed from 0.3
        var navigationModifier = new StateModifier({
            Transform: Transform.translate(0, 0, 0.3),
            opacity: 0.7
        });

        thisPageView.navigationFrontModifier = new StateModifier({
            transform: Transform.inFront
        });

        this.layout.content.add(navigationModifier).add(this.navigationFrontModifier).add(this.navigationView);
    }

    function _createHeader() {
        var backgroundSurface = new Surface({
            size: [undefined,56], //(undefined * 0.7, 80 * 0.7)
            content : "Medic Mobile for Antenatal Care",
            properties: {
                backgroundColor: '#000',
                padding: '10px',
                fontSize: '21pt', //(30 * 0.7)
                textAlign: 'center',
                textTransform: 'uppercase',
                color: 'white',
                fontFamily: 'FuturaPTWebLight'
            }
        });       

        thisPageView.backgroundModifier = new StateModifier({
            transform: Transform.behind
        });


        this.hamburgerSurface = new ImageSurface({
            size: [31, 31], //(44 * 0.7, 44 * 0.7)
            content: 'mm-assets/hamburger.svg',
            properties: {
                 zIndex: '1',
                 cursor: 'pointer'
            }
        });

        this.logoSurface = new Surface({
            size: [196,70], //(280 * 0.7, 100 * 0.7)
            properties: {
                backgroundColor: 'rgb(50,50,50)'
            }
        });    

        this.iconSurface = new ImageSurface({
            size: [119, 28], //(170 * 0.7, 40 * 0.7)
            content: 'Medic-Mobile-logo+name_white150.png'
        });

        thisPageView.hamburgerModifier = new StateModifier({
            origin: [0, 0],
            align : [0.007, 0.42] //(.01 * 0.7, 0.6 * 0.7)
        });

        thisPageView.iconModifier = new StateModifier({
            origin: [0, 0],
            align : [0.042, 0.42] //(.06 * 0.7, 0.6 * 0.7)
        });

        thisPageView.logoModifier = new StateModifier({
            origin: [0, 0],
            align : [0, 0]
        });
        

        this.layout.header.add(thisPageView.hamburgerModifier).add(this.hamburgerSurface);
        this.layout.header.add(thisPageView.iconModifier).add(this.iconSurface);
        this.layout.header.add(thisPageView.backgroundModifier).add(backgroundSurface);
        this.layout.header.add(thisPageView.logoModifier).add(this.logoSurface);

        //thisPageView.hamburgerModifier.setTransform(Transform.inFront);
    }

    function _createFooter() {  
        thisPageView.footerSurface = new Surface({
            size: [undefined,75], //(undefined * 0.7, 80 * 0.7)
            content : "This is a caption",
            properties: {
                backgroundColor: '#323232',
                padding: '10px',
                fontSize: '16pt', //(30 * 0.7)
                textAlign: 'center',
                color: 'white',
                fontFamily: 'FuturaPTWebLight'
            }
        });  

        thisPageView.footerBackgroundModifier = new StateModifier({
            transform: Transform.inFront
        });

        this.layout.footer.add(thisPageView.footerBackgroundModifier).add(thisPageView.footerSurface);
        thisPageView.footerBackgroundModifier.setTransform(Transform.inFront);
    }

    /** Called to redraw the framework - brings header and footer surfaces to the front **/
    function _bringHeaderToFront() {
        thisPageView.backgroundModifier.setTransform(Transform.inFront);
        thisPageView.logoModifier.setTransform(Transform.inFront);
        thisPageView.iconModifier.setTransform(Transform.inFront);
        thisPageView.hamburgerModifier.setTransform(Transform.inFront);
        thisPageView.navigationFrontModifier.setTransform(Transform.inFront);
        if (!this.menuToggle) thisPageView.menuModifier.setTransform(Transform.inFront);
        progressViewModifier[animationController.getCurrTutorial()].setTransform(Transform.inFront);
        thisPageView.footerBackgroundModifier.setTransform(Transform.inFront);
    }

    function _createBody() {
        var baseView = new BaseView();

        var baseModifier = new StateModifier ({
            transform: Transform.behind
        });
        this.layout.content.add(baseModifier).add(baseView);
    }

    function _createMenuView() {
        this.menuView = new MenuView({ stripData: StripData });

        var anotherModifier = new StateModifier ({
            transform: Transform.translate(0, 0, 0.2)   //use this z axis to bring in front of surface
        });

        thisPageView.menuModifier = new StateModifier();

        this.add(this.menuModifier).add(anotherModifier).add(this.menuView);
    }

    function _createProgress() {
       for (var i = 0; i < 1; i++) {
            progressView[i] = new ProgressView({ 
                stripData: StripData,
                currentTutorial: i,//animationController.getCurrTutorial(),
                tutorialLength: animationController.getTutorialLength(i)//,animationController.getCurrTutorial()
            });

            progressViewModifier[i] = new StateModifier ({
                transform: Transform.translate(0, 0, 0.2)   //use this z axis to bring in front of surface
            });


            thisPageView.add(progressViewModifier[i]).add(progressView[i]);
        }

        /*progressView[0] = new ProgressView({ 
                stripData: StripData,
                currentTutorial: 0,//animationController.getCurrTutorial(),
                tutorialLength: animationController.getTutorialLength(0)//,animationController.getCurrTutorial()
            });

            progressViewModifier[0] = new StateModifier ({
                transform: Transform.translate(0, 0, 0.2)   //use this z axis to bring in front of surface
            });


            thisPageView.add(progressViewModifier[0]).add(progressView[animationController.getCurrTutorial()]);

            progressView[1] = new ProgressView({ 
                stripData: StripData,
                currentTutorial: 1,//animationController.getCurrTutorial(),
                tutorialLength: animationController.getTutorialLength(1)//,animationController.getCurrTutorial()
            });

            progressViewModifier[1] = new StateModifier ({
                transform: Transform.translate(0, 0, 0.2)   //use this z axis to bring in front of surface
            });


            thisPageView.add(progressViewModifier[1]).add(progressView[animationController.getCurrTutorial()]);

            /*
            var view1 = new ProgressView({ 
                stripData: StripData,
                currentTutorial: 0,//animationController.getCurrTutorial(),
                tutorialLength: animationController.getTutorialLength(0)//,animationController.getCurrTutorial()
            });

            var mod1 = new StateModifier ({
                transform: Transform.translate(0, 0, 0.2)   //use this z axis to bring in front of surface
            });


            thisPageView.add(mod1).add(view1);

            var view2 = new ProgressView({ 
                stripData: StripData,
                currentTutorial: 1,//animationController.getCurrTutorial(),
                tutorialLength: animationController.getTutorialLength(1)//,animationController.getCurrTutorial()
            });

            var mod2 = new StateModifier ({
                transform: Transform.translate(0, 0, 0.2)   //use this z axis to bring in front of surface
            });


            thisPageView.add(mod2).add(view2);
            */
        
    }

    function _progressToFront() {
        progressViewModifier[animationController.getCurrTutorial()].setTransform(Transform.inFront);
    }

    function _loadStartingAnimation() {
        var animationModifier = new StateModifier ({
            transform: Transform.behind
        });

        animationController.loadAnimationView(thisPageView, thisPageView.footerSurface);
        progressView[animationController.getCurrTutorial()].incrementProgressBar(animationController.getCurrTutorial(),animationController.getCurrTutorialSlide());
    }


    function _setListeners() {
        this.hamburgerSurface.on('click', function() {
            //_bringHeaderToFront();
            _menuToggle();
        }.bind(this));

        this.navigationView.on('next', function() {
            animationController.incrementTutorialCounts();
            animationController.printDebugOutput();
            animationController.loadAnimationView(thisPageView, thisPageView.footerSurface); 
            progressView[animationController.getCurrTutorial()].incrementProgressBar(animationController.getCurrTutorial(), animationController.getCurrTutorialSlide());
            _bringHeaderToFront();
        }.bind(this));

        this.navigationView.on('back', function() {
            animationController.decrementTutorialCounts();
            animationController.printDebugOutput();
            animationController.loadAnimationView(thisPageView, thisPageView.footerSurface); 
            progressView[animationController.getCurrTutorial()].decrementProgressBar(animationController.getCurrTutorial(), animationController.getCurrTutorialSlide());
            _bringHeaderToFront();
        }.bind(this));

        /** Set listeners for the strips - for whatever reason, must be set individually */
        var n = 0;
        var j = 1;
        var k = 2;
        /** On click: menus should update the animation to the start of the tutorial */
        this.menuView.on('menuViewClick' + n, function() {
                console.log("Clicked" + n);
                _loadAnimationAfterMenuClick(n);
            }.bind(this));

        this.menuView.on('menuViewClick' + j, function() {
                console.log("Clicked" + j);
                _loadAnimationAfterMenuClick(j);
            }.bind(this));
        this.menuView.on('menuViewClick' + k, function() {
                console.log("Clicked" + k);
                _loadAnimationAfterMenuClick(k);
            }.bind(this));

        /** On mouse over: the menus should show the coloration */
        this.menuView.on('menuViewMouseOver' + n, function() {
                console.log("Moused" + n);
            }.bind(this));
        this.menuView.on('menuViewMouseOver' + j, function() {
                console.log("Moused" + j);
            }.bind(this));
        this.menuView.on('menuViewMouseOver' + k, function() {
                console.log("Moused" + k);
            }.bind(this));

    } 

    function _loadAnimationAfterMenuClick(tutorialNum) {
        animationController.setStartOfTutorial(tutorialNum);
        animationController.loadAnimationView(thisPageView, thisPageView.footerSurface); 
        _bringHeaderToFront();
    }

    function _menuToggle() {
        if(this.menuToggle) {
            _topUp();
        } else {
            _topDown();
            //_bringHeaderToFront();
        }
        this.menuToggle = !this.menuToggle;
    }

    function _topDown() {
        thisPageView.menuModifier.setTransform(Transform.translate(0, -400, 0), {
            duration: 300,
            curve: 'easeOut'
        });
        //thisPageView.menuModifier.setTransform(Transform.inFront);
    }

    function _topUp() {
        //thisPageView.menuModifier.setTransform(Transform.inFront);
        thisPageView.menuModifier.setTransform(Transform.translate(0, 0, 0.0001), {
            duration: 300,
            curve: 'easeOut'
        });
        //thisPageView.menuModifier.setTransform(Transform.translate(0,0,0.2));
        //thisPageView.menuModifier.setTransform(Transform.inFront);
    }

    /**
     * Handle keyboard inputs to advance through tutorials
     */
     Engine.on('keydown', function(e) {
        if(e.which === 39) { //Right arrow key
            

            animationController.incrementTutorialCounts();
            animationController.printDebugOutput();
            animationController.loadAnimationView(thisPageView, thisPageView.footerSurface); 
            if (animationController.getCurrTutorialSlide() == 0) {
                console.log(progressView);
                _progressToFront();
                //_createProgress.call(this);
                progressView[animationController.getCurrTutorial()].incrementProgressBar(animationController.getCurrTutorial(),animationController.getCurrTutorialSlide());                
            }
            else {
                progressView[animationController.getCurrTutorial()].incrementProgressBar(animationController.getCurrTutorial(), animationController.getCurrTutorialSlide());
            }
            _bringHeaderToFront();

        } else if (e.which === 37) { //Left arrow key
            animationController.decrementTutorialCounts();
            animationController.printDebugOutput();
            animationController.loadAnimationView(thisPageView, thisPageView.footerSurface); 
            progressView[animationController.getCurrTutorial()].decrementProgressBar(animationController.getCurrTutorial(), animationController.getCurrTutorialSlide());
            _bringHeaderToFront();
        }
     }); 

    module.exports = PageView;
});
