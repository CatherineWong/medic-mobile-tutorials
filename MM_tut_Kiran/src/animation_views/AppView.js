define(function(require, exports, module) {
    var View          = require('famous/core/View');
    var Surface       = require('famous/core/Surface');
    var Transform     = require('famous/core/Transform');
    var StateModifier = require('famous/modifiers/StateModifier');
    var EventHandler  = require('famous/core/EventHandler');

    var PageView = require('animation_views/PageView');
    var MenuView = require('animation_views/MenuView');
    var StripData = require('Data/StripData');
    var CaptionData = require('Data/CaptionData');


    function AppView() {
        View.apply(this, arguments);

        this.menuToggle = false;

        _createPageView.call(this);

        _createMenuView.call(this);
        
        _setListeners.call(this);
    }

    AppView.prototype = Object.create(View.prototype);
    AppView.prototype.constructor = AppView;

    AppView.DEFAULT_OPTIONS = {};

    function _createPageView() {
        this.pageView = new PageView({ captionData: CaptionData });
        this.pageModifier = new StateModifier();

        this.add(this.pageModifier).add(this.pageView);
    }

    function _createMenuView() {
        this.menuView = new MenuView({ stripData: StripData });

        this.anotherModifier = new StateModifier ({
            transform: Transform.translate(0, 0, 0.2)   //use this z axis to bring in front of surface
        });

        this.menuModifier = new StateModifier();

        this.add(this.menuModifier).add(this.anotherModifier).add(this.menuView);
    }

    

    function _setListeners() {
        this.pageView.on('menuToggle', function(){
            console.log('menu toggle!');
        }.bind(this));
    }

    function _setListeners() {
        this.pageView.on('menuToggle', this.toggleMenu.bind(this));
        this.pageView.on('next', this.nextSlide.bind(this));
    }

    AppView.prototype.toggleMenu = function() {
        if(this.menuToggle) {
            this.popUp();
        } else {
            this.popDown();
        }
        this.menuToggle = !this.menuToggle;
    };

    AppView.prototype.nextSlide = function() {

    }

    

    AppView.prototype.popUp = function() {
        //this.menuModifier.setTransform(Transform.translate(0,1,0.05));
        this.anotherModifier.setTransform(Transform.translate(0, 0, 0.2), {
            duration: 300,
            //curve: 'easeOut'
        });
        /*this.menuModifier.setTransform(Transform.translate(0, -200, 0), {
            duration: 300,
            curve: 'easeOut'
        });*/
    };

    AppView.prototype.popDown = function() {
        this.anotherModifier.setTransform(Transform.translate(0, 0, 0));
        /*this.menuModifier.setTransform(Transform.translate(0, 0, 0), {
            duration: 300,
            curve: 'easeOut'
        });*/
    };

    module.exports = AppView;
});