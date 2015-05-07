define(function(require, exports, module) {
    var View            = require('famous/core/View');
    var Surface         = require('famous/core/Surface');
    var Transform       = require('famous/core/Transform');
    var StateModifier   = require('famous/modifiers/StateModifier');
    var HeaderFooter    = require('famous/views/HeaderFooterLayout');
    var Engine = require('famous/core/Engine');

    var ImageSurface    = require('famous/surfaces/ImageSurface');
    var FastClick       = require('famous/inputs/FastClick');
    var BaseView = require('animation_views/BaseView');
<<<<<<< HEAD
    var NavigationView = require('animation_views/NavigationView');
    var ContentView = require('animation_views/ContentView');

    var EventHandler = require('famous/core/EventHandler');

    var eventHandlerA = new EventHandler();
    var eventHandlerB = new EventHandler();
=======
    var HariIntroView = require('animation_views/animation_slides/HariIntroView');
    var AnimationController = require('controllers/AnimationController'); // Controller for the tutorial loading logic
    var animationController = new AnimationController(); //Global animation controller
    var thisPageView; //Give global access to the page view to load animations
>>>>>>> 38baec6a48b2a4038c51a071dcb7097a8a0f9314

    function PageView() {
        thisPageView = this;
        View.apply(this, arguments);
         _debugAnimationController.call(this); //Strictly a debugging method

        _createLayout.call(this);
        _createBody.call(this);
<<<<<<< HEAD
        _createNavigationView.call(this);

=======
        _loadStartingAnimation.call(this); //Uncomment to add sample animation to body
        _createHeader.call(this);
>>>>>>> 38baec6a48b2a4038c51a071dcb7097a8a0f9314
        _setListeners.call(this);
    }

    PageView.prototype = Object.create(View.prototype);
    PageView.prototype.constructor = PageView;

    PageView.DEFAULT_OPTIONS = {
        headerSize: 44,
        captionData: {}
    };

<<<<<<< HEAD
=======
    var tutorialNames = [
        "1) Overview", 
        "2) Training your Clinic",
        "3) Getting Going",
        "4) Learn More"];
    
    function _debugAnimationController() {
        console.log("Demonstrating Animation Controller with Debugger: PageView");
        animationController.printDebugOutput(); //Prints current tutorial and slide number
        // Demonstration: get the length of a given tutorial for progress bar
        console.log("Current tutorial length: ", animationController.getTutorialLength(0));
        // Demo: call on next button push to adjust counters appropriately
        animationController.incrementTutorialCounts();
        animationController.printDebugOutput();
    }
>>>>>>> 38baec6a48b2a4038c51a071dcb7097a8a0f9314

    function _createLayout() {
        this.layout = new HeaderFooter({
            headerSize: this.options.headerSize
        });

        var layoutModifier = new StateModifier({
            transform: Transform.translate(0, 0, 0.01)//0.1)
        });

        this.add(layoutModifier).add(this.layout);
    }

    function _createHeader() {
        var backgroundSurface = new Surface({
            content : "MEDIC MOBILE FOR ANTENATAL CARE",
            properties: {
                backgroundColor: 'black',
                fontSize: "30px",
                textAlign: "center",
                color: 'white'
            }
        });

        thisPageView.backgroundModifier = new StateModifier({
            transform: Transform.behind
        });

        thisPageView.hamburgerSurface = new ImageSurface({
            size: [44, 44],
            content: 'mm-assets/hamburger.png'
        });

        var iconSurface = new ImageSurface({
            size: [120, 40],
            content: 'Medic-Mobile-logo+name_white150.png'
        });

        thisPageView.hamburgerModifier = new StateModifier({
            origin: [0, 0.5],
            align : [0, 0.5],
            transform: Transform.front
        });

        thisPageView.iconModifier = new StateModifier({
            origin: [0, 0.5],
            align : [0.05, 0.5]
        });


        
        thisPageView.layout.header.add(thisPageView.hamburgerModifier).add(thisPageView.hamburgerSurface);
        thisPageView.layout.header.add(thisPageView.iconModifier).add(iconSurface);
        thisPageView.layout.header.add(thisPageView.backgroundModifier).add(backgroundSurface);
        _bringHeaderToFront();
    }

    function _bringHeaderToFront() {
        thisPageView.backgroundModifier.setTransform(Transform.inFront);
        thisPageView.iconModifier.setTransform(Transform.inFront);
        thisPageView.hamburgerModifier.setTransform(Transform.inFront);
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
    var sidebarWidth = 290;
    var i = 0;
    function _createBody() {
<<<<<<< HEAD
        //this.captionModifiers = [];
        
        this.caption = new Surface({
            size: [screen.width - sidebarWidth, 80],
            content: this.options.captionData[i].title,
            properties: {
                lineHeight: '80px',
                textAlign: 'center',
            }
        });

        this.placeCaption = new StateModifier({
            align: [0, 1],
            origin: [0, 1]
        });
        this.layout.content.add(this.placeCaption).add(this.caption);
 
        var contentView = new ContentView();

        var contentModifier = new StateModifier ({
            transform: Transform.behind
        });
        this.layout.content.add(contentModifier).add(contentView);


        /*var baseView = new BaseView();

=======
        var baseView = new BaseView();
        var hariIntroView = new HariIntroView();
>>>>>>> 38baec6a48b2a4038c51a071dcb7097a8a0f9314
        var baseModifier = new StateModifier ({
            transform: Transform.behind
        });
        this.layout.content.add(baseModifier).add(baseView);*/
    }


    function _createNavigationView() {
        this.navigationView = new NavigationView();
        var navigationModifier = new StateModifier({
            Transform: Transform.translate(0, 0, 0.3),
            opacity: 0.7
        });

        this.layout.content.add(navigationModifier).add(this.navigationView);
    }

<<<<<<< HEAD
=======
    function _loadStartingAnimation() {
        var animationModifier = new StateModifier ({
            transform: Transform.behind
        });

        var hariIntroView = new HariIntroView();
        thisPageView.layout.content.add(animationModifier).add(hariIntroView);
    }
>>>>>>> 38baec6a48b2a4038c51a071dcb7097a8a0f9314

    function _setListeners() {
        this.hamburgerSurface.on('click', function() {
            this._eventOutput.emit('menuToggle');

        }.bind(this));

        this.navigationView.on('next', function() {
            i += 1;
            this.caption.setContent(this.options.captionData[i].title);
            //eventHandlerA.emit('hello');
        }.bind(this));

        this.navigationView.on('back', function() {
            i -= 1;
            this.caption.setContent(this.options.captionData[i].title);
        }.bind(this));

    } 



    /**
     * Handle keyboard inputs to advance through tutorials
     */
     Engine.on('keydown', function(e) {
        if(e.which === 39) { //Right arrow key
            animationController.incrementTutorialCounts();
            animationController.printDebugOutput();
            animationController.loadAnimationView(thisPageView); //Demonstration: pass the page view to the controller
            _bringHeaderToFront();

        } else if (e.which === 37) { //Left arrow key
            animationController.decrementTutorialCounts();
            animationController.printDebugOutput();

        }
     }); 

    module.exports = PageView;
});