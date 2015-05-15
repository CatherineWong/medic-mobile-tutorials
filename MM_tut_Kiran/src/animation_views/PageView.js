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
    var HariIntroView = require('animation_views/animation_slides/HariIntroView');
    var ZoomOutIntroView = require('animation_views/animation_slides/ZoomOutIntroView');
    var AnimationController = require('controllers/AnimationController'); // Controller for the tutorial loading logic
    var animationController = new AnimationController(); //Global animation controller
    var thisPageView; //Give global access to the page view to load animations
    var NavigationView = require('animation_views/NavigationView');
    var MenuView = require('animation_views/MenuView');
    var ProgressView = require('animation_views/ProgressView');
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
        _createBody.call(this);
        _initializeAnimationController.call(this);
        _loadStartingAnimation.call(this); //Uncomment to add sample animation to body
        _setListeners.call(this);
        //_createProgress.call(this);

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
            size: [undefined,80],
            content : "Medic Mobile for Antenatal Care",
            properties: {
                backgroundColor: '#000',
                padding: '10px',
                fontSize: '30pt',
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
            size: [44, 44],
            content: 'mm-assets/hamburger.svg',
            properties: {
                 zIndex: '1'
            }
        });

        this.logoSurface = new Surface({
            size: [280,100],
            properties: {
                backgroundColor: 'rgb(50,50,50)'
            }
        });    

        this.iconSurface = new ImageSurface({
            size: [170, 40],
            content: 'Medic-Mobile-logo+name_white150.png'
        });

        thisPageView.hamburgerModifier = new StateModifier({
            origin: [0, 0],
            align : [0.01, 0.6]
        });

        thisPageView.iconModifier = new StateModifier({
            origin: [0, 0],
            align : [0.06, 0.6]
        });

        thisPageView.logoModifier = new StateModifier({
            origin: [0, 0],
            align : [0, 0]
        });
        

        this.layout.header.add(thisPageView.hamburgerModifier).add(this.hamburgerSurface);
        this.layout.header.add(thisPageView.iconModifier).add(this.iconSurface);
        this.layout.header.add(thisPageView.backgroundModifier).add(backgroundSurface);
        this.layout.header.add(thisPageView.logoModifier).add(this.logoSurface);

        _bringHeaderToFront();
        //thisPageView.hamburgerModifier.setTransform(Transform.inFront);
    }

    function _bringHeaderToFront() {
        thisPageView.backgroundModifier.setTransform(Transform.inFront);
        thisPageView.logoModifier.setTransform(Transform.inFront);
        thisPageView.iconModifier.setTransform(Transform.inFront);
        thisPageView.hamburgerModifier.setTransform(Transform.inFront);
        thisPageView.navigationFrontModifier.setTransform(Transform.inFront);
        thisPageView.menuModifier.setTransform(Transform.inFront);
    }


    /*var sidebarWidth = 180;
    var sidebarHeight = 420;
    sidebar_backgroundColor = '#D8D8D8';

    var sideBarContent = '<div class="button incomplete selected" onclick="selectTutorial(this)">' + tutorialNames[0] + '</div>';
    for (var i = 1; i < tutorialNames.length; i++) {
        sideBarContent += '<div class="button incomplete" onclick="selectTutorial(this)">' + tutorialNames[i] + '</div>'
    }

    function _createBody() {
        this.sideSurface = new Surface({
            content: '<div id="tutorials"> Tutorials </div>' + sideBarContent,
            size: [sidebarWidth, sidebarHeight], 
            properties: {
                boxShadow: '1px 0px 2px #888888',
                backgroundColor: sidebar_backgroundColor,
                borderRightStyle: 'solid',
                borderRightWidth: '1px',
                borderRightColor: '#848484',
                fontSize: "100px"
            }
        });

        this.layout.content.add(this.sideSurface);
    }*/

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
        this.ProgressView = new ProgressView({ 
            stripData: StripData,
            currTutorial: animationController.getCurrTutorial() 
        });
        //alert(animationController.getCurrTutorial());
        var anotherModifier = new StateModifier ({
            transform: Transform.translate(0, 0, 0.2)   //use this z axis to bring in front of surface
        });

        this.menuModifier = new StateModifier();

        this.add(this.menuModifier).add(anotherModifier).add(this.ProgressView);
    }

    function _loadStartingAnimation() {
        var animationModifier = new StateModifier ({
            transform: Transform.behind
        });
        animationController.loadAnimationView(thisPageView);
        // var hariIntroView = new HariIntroView();
        // this.layout.content.add(animationModifier).add(hariIntroView);

        // var zoomOutIntroView = new ZoomOutIntroView();
        // this.layout.content.add(animationModifier).add(zoomOutIntroView);
    }


    function _setListeners() {
        this.hamburgerSurface.on('click', function() {
            //_bringHeaderToFront();
            _menuToggle();
        }.bind(this));

        this.navigationView.on('next', function() {
            animationController.incrementTutorialCounts();
            animationController.printDebugOutput();
            animationController.loadAnimationView(thisPageView); 
            _bringHeaderToFront();
        }.bind(this));

        this.navigationView.on('back', function() {
            animationController.decrementTutorialCounts();
            animationController.printDebugOutput();
            animationController.loadAnimationView(thisPageView); 
            _bringHeaderToFront();
        }.bind(this));
    } 

    function _menuToggle() {
        if(this.menuToggle) {
            _topUp();
            console.log("Current tutorial");
        } else {
            console.log("Current tutorial:");
            _topDown();
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
        thisPageView.menuModifier.setTransform(Transform.translate(0, 0, 0), {
            duration: 300,
            curve: 'easeOut'
        });
        //thisPageView.menuModifier.setTransform(Transform.inFront);
    }

    /**
     * Handle keyboard inputs to advance through tutorials
     */
     Engine.on('keydown', function(e) {
        if(e.which === 39) { //Right arrow key
            animationController.incrementTutorialCounts();
            animationController.printDebugOutput();
            animationController.loadAnimationView(thisPageView); 
            _bringHeaderToFront();

        } else if (e.which === 37) { //Left arrow key
            animationController.decrementTutorialCounts();
            animationController.printDebugOutput();
            animationController.loadAnimationView(thisPageView); 
            _bringHeaderToFront();
        }
     }); 

    module.exports = PageView;
});
