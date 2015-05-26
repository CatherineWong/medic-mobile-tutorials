/*** ProgressBarView.js ***/

define(function(require, exports, module) {
    var View          = require('famous/core/View');
    var Surface       = require('famous/core/Surface');
    var Transform     = require('famous/core/Transform');
    var StateModifier = require('famous/modifiers/StateModifier');

    function ProgressBarView() {
        View.apply(this, arguments);

        _createBackground.call(this);
    }

    ProgressBarView.prototype = Object.create(View.prototype);
    ProgressBarView.prototype.constructor = ProgressBarView;

    ProgressBarView.DEFAULT_OPTIONS = {
        width: 196, //(280 * 0.7)
        height: 14, //(20 * 0.7)
        padding: 8, //(13 * 0.7)
        backgroundOpacity: 0.5//
    };


    function _createBackground() {
        this.backgroundSurface = new Surface({
            size: [(screen.width - 196)/this.options.length, this.options.height],
            properties: {
                backgroundColor: this.options.backgroundUnfilledColor,
                borderRightStyle: 'solid',
                borderRightColor: '#757C81',
                borderRightWidth: '3px'
            }
        });

        var backgroundModifier = new StateModifier ({
            opacity : this.options.backgroundOpacity
        });

        this.add(backgroundModifier).add(this.backgroundSurface);
    }

    ProgressBarView.prototype.getBackgroundColor = function() {
        return this.backgroundSurface.properties.backgroundColor;
    }

    ProgressBarView.prototype.fillBackgroundColor = function() {
        this.backgroundSurface.setProperties({
            backgroundColor: this.options.backgroundFilledColor 
        }); 
    }

    ProgressBarView.prototype.unfillBackgroundColor = function() {
        this.backgroundSurface.setProperties({
            backgroundColor: this.options.backgroundUnfilledColor 
        }); 
    }

    module.exports = ProgressBarView;
});