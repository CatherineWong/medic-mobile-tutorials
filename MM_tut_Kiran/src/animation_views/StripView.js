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
        _setListeners.call(this);
    }

    StripView.prototype = Object.create(View.prototype);
    StripView.prototype.constructor = StripView;

    StripView.DEFAULT_OPTIONS = {
        width: 196, //(280 * .7)
        height: 42, //(60 * .7)
        fontSize: 14, //(20 * .7)
        padding: 11, //(13 * .7) 
        paddingLeft: 21, //(30 * .7)
        fontFamily: 'FuturaPTWebLight',
        fontSelectedFamily: 'FuturaPTWebMedium',
        backgroundColor: 'rgb(50,50,50)',
        textColor: 'white', //'#E1E6E9',
        backgroundOpacity: 0.8
    };


    function _createBackground() {
        this.backgroundSurface = new Surface({
            size: [this.options.width, this.options.height],
            properties: {
                backgroundColor: this.options.backgroundColor,
                textAlign: 'center',
                borderTopStyle: 'solid',
                borderTopColor: '#93989B',
                borderTopWidth: '1px',
                cursor: 'pointer'
            }
        });

        var backgroundModifier = new StateModifier ({
            opacity : this.options.backgroundOpacity
        });

        this.add(backgroundModifier).add(this.backgroundSurface);
    }

     function _createTitle() {
        this.titleSurface = new Surface({
            size: [true, true],
            content: this.options.title,
            properties: {
                color: this.options.textColor,
                fontSize: this.options.fontSize + 'px',
                textAlign : 'center',
                fontFamily: this.options.fontFamily,
                padding: this.options.padding + 'px',
                paddingLeft: this.options.paddingLeft +'px',
                cursor: 'pointer'
            }
        });
        this.add(this.titleSurface);
    }

    StripView.prototype.selectMe = function(color) {
        this.titleSurface.setProperties({
            color: color,
            fontFamily: this.options.fontSelectedFamily
        }); 
    }
    StripView.prototype.unselectMe = function() {
        this.titleSurface.setProperties({
            color: 'white',
            fontFamily: this.options.fontFamily
        }); 
    }


    function _setListeners() {
        this.titleSurface.on('click', function() {
            this._eventOutput.emit('stripViewClick');
        }.bind(this));

        this.titleSurface.on('mouseover', function() {

            this._eventOutput.emit('stripViewMouseOver');
        }.bind(this));
        
        this.backgroundSurface.on('click', function() {
            this._eventOutput.emit('stripViewClick');
        }.bind(this));

        this.backgroundSurface.on('mouseover', function() {
            this._eventOutput.emit('stripViewMouseOver');
        }.bind(this));
    } 

    module.exports = StripView;
});