/*** MenuView.js ***/

define(function(require, exports, module) {
    var View          = require('famous/core/View');
    var Surface       = require('famous/core/Surface');
    var Transform     = require('famous/core/Transform');
    var StateModifier = require('famous/modifiers/StateModifier');

    var StripView = require('animation_views/StripView');
    var StripTitleView = require('animation_views/StripTitleView');

    var stripViews = [];

    function MenuView() {
        View.apply(this, arguments);

        _createStripViews.call(this);
        _setListeners.call(this);
    }

    MenuView.prototype = Object.create(View.prototype);
    MenuView.prototype.constructor = MenuView;

    MenuView.DEFAULT_OPTIONS = {
        stripData: {},
        topOffset: 70, //(100 * 0.7)
        stripOffset: 42 //(60 * 0.7)
    };

    function _createStripViews() {
        this.stripModifiers = [];

        var colors = ['#B5BD21','#F47963','#79B1B1','#E9A722'];

        var yOffset = this.options.topOffset;

            var stripView = new StripTitleView({
                //iconUrl: this.options.stripData[i].iconUrl,
                title: "Tutorials"
            });

            var stripModifier = new StateModifier({
                transform: Transform.translate(0, yOffset, 0)
            });

            this.stripModifiers.push(stripModifier);
            this.add(stripModifier).add(stripView);

            yOffset += this.options.stripOffset;

        for (var i = 0; i < this.options.stripData.length; i++) {

            var stripView = new StripView({
                //iconUrl: this.options.stripData[i].iconUrl,
                title: this.options.stripData[i].title,
                selectColor: colors[i]
            });

            stripViews.push(stripView);

            var stripModifier = new StateModifier({
                transform: Transform.translate(0, yOffset, 0)
            });

            this.stripModifiers.push(stripModifier);
            this.add(stripModifier).add(stripView);

            yOffset += this.options.stripOffset;
        }
    }

    /** Set listeners on all of the strips for click and hover*/
    function _setListeners() {
        /* The fact that we need to do this is actually ridiculous...not sure why normal for loops don't work */
        var i = 0;
        stripViews[i].on('stripViewClick', function() {
                this._eventOutput.emit('menuViewClick' + i);
                console.log('clicked' + i);
            }.bind(this));

            stripViews[i].on('stripViewMouseOver', function() {
                this._eventOutput.emit('menuViewMouseOver' + i);
                console.log('moused over: ' + i);
            }.bind(this));

        var j = 1;
        stripViews[j].on('stripViewClick', function() {
                this._eventOutput.emit('menuViewClick' + j);
                console.log('clicked' + j);
            }.bind(this));

        stripViews[j].on('stripViewMouseOver', function() {
            this._eventOutput.emit('menuViewMouseOver' + j);
            console.log('moused over: ' + j);
        }.bind(this));

        var k = 2;
        stripViews[k].on('stripViewClick', function() {
                this._eventOutput.emit('menuViewClick' + k);
                console.log('clicked' + k);
            }.bind(this));

        stripViews[k].on('stripViewMouseOver', function() {
            this._eventOutput.emit('menuViewMouseOver' + k);
            console.log('moused over: ' + k);
        }.bind(this));
  
    } 



    module.exports = MenuView;
});
