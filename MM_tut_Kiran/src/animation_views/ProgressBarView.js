/*** StripView.js ***/

define(function(require, exports, module) {
    var View          = require('famous/core/View');
    var Surface       = require('famous/core/Surface');
    var Transform     = require('famous/core/Transform');
    var StateModifier = require('famous/modifiers/StateModifier');

    function StripView() {
        View.apply(this, arguments);

        _createBackground.call(this);
    }

    StripView.prototype = Object.create(View.prototype);
    StripView.prototype.constructor = StripView;

    StripView.DEFAULT_OPTIONS = {
        width: 280, 
        height: 20,
        fontSize: 20,
        padding: 13,
        paddingLeft: 30,
        fontFamily: 'FuturaPTWebLight',
        textColor: 'white', //'#E1E6E9',
        backgroundOpacity: 0.8
    };


    function _createBackground() {
        var backgroundSurface = new Surface({
            size: [(screen.width - 280)/this.options.length, this.options.height],
            properties: {
                backgroundColor: this.options.backgroundColor,
                textAlign: 'center',
                borderRightStyle: 'solid',
                borderRightColor: '#93989B',
                borderRightWidth: '1px'
            }
        });

        var backgroundModifier = new StateModifier ({
            opacity : this.options.backgroundOpacity
        });

        this.add(backgroundModifier).add(backgroundSurface);
    }

    module.exports = StripView;
});