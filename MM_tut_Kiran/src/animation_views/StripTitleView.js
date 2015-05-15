/*** StripTitleView.js ***/

define(function(require, exports, module) {
    var View          = require('famous/core/View');
    var Surface       = require('famous/core/Surface');
    var Transform     = require('famous/core/Transform');
    var StateModifier = require('famous/modifiers/StateModifier');

    function StripTitleView() {
        View.apply(this, arguments);

        _createBackground.call(this);
        _createTitle.call(this);
    }

    StripTitleView.prototype = Object.create(View.prototype);
    StripTitleView.prototype.constructor = StripTitleView;

    StripTitleView.DEFAULT_OPTIONS = {
        width: 280,
        height: 60,
        fontSize: 30,
        padding: 13,
        paddingLeft: 65,
        fontFamily: 'FuturaPTWebMedium',
        backgroundColor: 'rgb(50,50,50)',
        textColor: '#E1E6E9',
        backgroundOpacity: 0.8
    };


    function _createBackground() {
        var backgroundSurface = new Surface({
            size: [this.options.width, this.options.height],
            properties: {
                backgroundColor: this.options.backgroundColor,
                textAlign: 'center'
            }
        });

        var backgroundModifier = new StateModifier ({
            opacity : this.options.backgroundOpacity
        });

        this.add(backgroundModifier).add(backgroundSurface);
    }

     function _createTitle() {
        var titleSurface = new Surface({
            size: [true, true],
            content: 'Tutorials',
            properties: {
                color: this.options.textColor,
                fontSize: this.options.fontSize + 'px',
                textAlign : 'center',
                pointerEvents : 'none',
                fontFamily: this.options.fontFamily,
                padding: this.options.padding + 'px',
                paddingLeft: this.options.paddingLeft +'px'
            }
        });

        this.add(titleSurface);
    }

    module.exports = StripTitleView;
});