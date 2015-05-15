/*** MenuView.js ***/

define(function(require, exports, module) {
    var View          = require('famous/core/View');
    var Surface       = require('famous/core/Surface');
    var Transform     = require('famous/core/Transform');
    var StateModifier = require('famous/modifiers/StateModifier');

    var StripView = require('animation_views/ProgressBarView');

    function MenuView() {
        View.apply(this, arguments);

        _createProgressBars.call(this);
    }

    MenuView.prototype = Object.create(View.prototype);
    MenuView.prototype.constructor = MenuView;

    MenuView.DEFAULT_OPTIONS = {
        stripData: {},
        topOffset: 80,
        leftOffset: 280,
        stripLeftOffset: 280
    };

    function _createProgressBars() {
        this.stripModifiers = [];
        var yOffset = this.options.topOffset;
        var xOffset = this.options.leftOffset;

        for (var i = 0; i < this.options.stripData.length; i++) {
            var stripView = new StripView({
                //iconUrl: this.options.stripData[i].iconUrl,
                title: ""
            });

            var stripModifier = new StateModifier({
                transform: Transform.translate(xOffset, yOffset, 0)
            });

            this.stripModifiers.push(stripModifier);
            this.add(stripModifier).add(stripView);

            xOffset += this.options.stripLeftOffset;
        }
    }



    module.exports = MenuView;
});
