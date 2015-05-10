/*** StripView.js ***/

define(function(require, exports, module) {
    var View          = require('famous/core/View');
    var Surface       = require('famous/core/Surface');
    var Transform     = require('famous/core/Transform');
    var StateModifier = require('famous/modifiers/StateModifier');

    function StripView() {
        View.apply(this, arguments);

        _createBackground.call(this);
        _createTitle.call(this);
    }

    StripView.prototype = Object.create(View.prototype);
    StripView.prototype.constructor = StripView;

    StripView.DEFAULT_OPTIONS = {
        width: 225,
        height: 45,
        fontSize: 15,
        padding: 13,
        paddingLeft: 30,
        fontFamily: 'Trebuchet MS',
        backgroundColor: '#5A5B5C',
        textColor: '#E1E6E9',
        backgroundOpacity: 0.85
    };


    function _createBackground() {
        var backgroundSurface = new Surface({
            size: [this.options.width, this.options.height],
            properties: {
                backgroundColor: this.options.backgroundColor,
                textAlign: 'center',
                borderTopStyle: 'solid',
                borderTopColor: '#93989B',
                borderTopWidth: '1px'
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
            content: this.options.title,
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

    module.exports = StripView;
});