define(function(require, exports, module) {
    var View          = require('famous/core/View');
    var Surface       = require('famous/core/Surface');
    var Transform     = require('famous/core/Transform');
    var StateModifier = require('famous/modifiers/StateModifier');
    var EventHandler  = require('famous/core/EventHandler');

    var PageView = require('animation_views/PageView');
    var MenuView = require('animation_views/MenuView');
    var StripData = require('Data/StripData');

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
        this.pageView = new PageView();
        this.pageModifier = new StateModifier();

        this.add(this.pageModifier).add(this.pageView);
    }

    function _createMenuView() {
        this.menuView = new MenuView({ stripData: StripData });

        var anotherModifier = new StateModifier ({
            transform: Transform.front
        });

        this.menuModifier = new StateModifier();

        this.add(this.menuModifier).add(anotherModifier).add(this.menuView);
    }

    function _setListeners() {
        this.pageView.on('menuToggle', function(){
            console.log('menu toggle!');
        }.bind(this));
    }

    function _setListeners() {
        this.pageView.on('menuToggle', this.toggleMenu.bind(this));
    }

    AppView.prototype.toggleMenu = function() {
        if(this.menuToggle) {
            this.slideLeft();
        } else {
            this.slideRight();
        }
        this.menuToggle = !this.menuToggle;
    };

    

    AppView.prototype.slideRight = function() {
        this.menuModifier.setTransform(Transform.translate(0, -200, 0), {
            duration: 300,
            curve: 'easeOut'
        });
    };

    AppView.prototype.slideLeft = function() {
        this.menuModifier.setTransform(Transform.translate(0, 0, 0), {
            duration: 300,
            curve: 'easeOut'
        });
    };

    module.exports = AppView;
});