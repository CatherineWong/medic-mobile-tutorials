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

    function PageView() {
        thisPageView = this;
        View.apply(this, arguments);

        _createLayout.call(this);
        _createHeader.call(this);
        _createBody.call(this);
	_createNavigationView.call(this);
        _loadStartingAnimation.call(this); //Uncomment to add sample animation to body
        _setListeners.call(this);

    }

    PageView.prototype = Object.create(View.prototype);
    PageView.prototype.constructor = PageView;

    PageView.DEFAULT_OPTIONS = {
        headerSize: 44
    };

    var tutorialNames = [
        "1) Overview", 
        "2) Training your Clinic",
        "3) Getting Going",
        "4) Learn More"];

    function _createLayout() {
        this.layout = new HeaderFooter({
            headerSize: this.options.headerSize
        });

        var layoutModifier = new StateModifier({
            transform: Transform.translate(0, 0, 0.2)
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

        this.hamburgerSurface = new ImageSurface({
            size: [44, 44],
            content: 'mm-assets/hamburger.png'
        });

        var iconSurface = new ImageSurface({
            size: [120, 40],
            content: 'Medic-Mobile-logo+name_white150.png'
        });

        thisPageView.hamburgerModifier = new StateModifier({
            origin: [0, 0.5],
            align : [0, 0.5]
        });

        thisPageView.iconModifier = new StateModifier({
            origin: [0, 0.5],
            align : [0.05, 0.5]
        });


        
        this.layout.header.add(thisPageView.hamburgerModifier).add(this.hamburgerSurface);
        this.layout.header.add(thisPageView.iconModifier).add(iconSurface);
        this.layout.header.add(thisPageView.backgroundModifier).add(backgroundSurface);
        
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

    function _createBody() {
        var baseView = new BaseView();

        var baseModifier = new StateModifier ({
            transform: Transform.behind
        });
        this.layout.content.add(baseModifier).add(baseView);
    }

    function _loadStartingAnimation() {
        var animationModifier = new StateModifier ({
            transform: Transform.behind
        });

        // var hariIntroView = new HariIntroView();
        // this.layout.content.add(animationModifier).add(hariIntroView);

        var zoomOutIntroView = new ZoomOutIntroView();
        this.layout.content.add(animationModifier).add(zoomOutIntroView);
    }

    function _createNavigationView() {
        this.navigationView = new NavigationView();
        var navigationModifier = new StateModifier({
            Transform: Transform.translate(0, 0, 0.3),
            opacity: 0.7
        });

        this.layout.content.add(navigationModifier).add(this.navigationView);
    }

    function _setListeners() {
        this.hamburgerSurface.on('click', function() {
            this._eventOutput.emit('menuToggle');
        }.bind(this));
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
