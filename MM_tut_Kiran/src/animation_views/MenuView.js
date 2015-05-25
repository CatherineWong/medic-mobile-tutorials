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
                title: this.options.stripData[i].title
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
        for (var i=0; i < this.options.stripData.length; i++) {
            stripViews[i].on('stripViewClick', function() {
                this._eventOutput.emit('menuViewClick');
            }.bind(this));

            stripViews[i].on('stripViewMouseOver', function() {
                this._eventOutput.emit('menuViewMouseOver');
            }.bind(this));
        }
    } 



    module.exports = MenuView;
});
