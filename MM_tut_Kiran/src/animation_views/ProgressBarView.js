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
        backgroundOpacity: 0.8
    };


    function _createBackground() {
        var backgroundSurface = new Surface({
            size: [(screen.width - 196)/this.options.length, this.options.height],
            properties: {
                backgroundColor: this.options.backgroundColor,
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

    function _getBackgroundColor() {
        
    }

    module.exports = ProgressBarView;
});