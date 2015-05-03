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
        width: 180,
        height: 30,
        //title: 'Famo.us',
        fontSize: 12,
    };


    function _createBackground() {
        var backgroundSurface = new Surface({
            size: [this.options.width, this.options.height],
            properties: {
                backgroundColor: 'black',
                boxShadow: '0 0 1px rgba(0,0,0,1)',
                textAlign: "center"
            }
        });

        var backgroundModifier = new StateModifier ({
            opacity : 0.5
        });

        this.add(backgroundModifier).add(backgroundSurface);
    }

     function _createTitle() {
        var titleSurface = new Surface({
            size: [true, true],
            content: this.options.title,
            properties: {
                color: 'white',
                fontSize: this.options.fontSize + 'px',
                textAlign : 'center',
                textTransform: 'uppercase',
                pointerEvents : 'none'
            }
        });

        this.add(titleSurface);
    }

    module.exports = StripView;
});