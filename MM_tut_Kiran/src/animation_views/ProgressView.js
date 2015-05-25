/*** ProgressView.js ***/

define(function(require, exports, module) {
    var View          = require('famous/core/View');
    var Surface       = require('famous/core/Surface');
    var Transform     = require('famous/core/Transform');
    var StateModifier = require('famous/modifiers/StateModifier');

    var ProgressBarView = require('animation_views/ProgressBarView');

    var AnimationController = require('controllers/AnimationController');
    var tutNum = 3;//AnimationController.getCurrTutorial();
    var tutColor = '';
    var tutLength = 5; //AnimationController.getTutorialLength

    var bars = [];


    switch(tutNum) {
        case 1:
            tutColor = '#656912';
            break;
        case 2:
            tutColor = '#984A3C';
            break;
        case 3:
            tutColor = '#3F6464';
            break;
        case 4:
            tutColor = '#A27513';
            break;
        default:
            tutColor = '#000';
    }
    var filledColor = "red";
    var numFilled = 3;
    function ProgressView() {
        View.apply(this, arguments);
        _createProgressBars.call(this);
    }

    ProgressView.prototype = Object.create(View.prototype);
    ProgressView.prototype.constructor = ProgressView;

    ProgressView.DEFAULT_OPTIONS = {
        length: tutLength,
        backgroundFilledColor: filledColor,
        backgroundUnfilledColor: tutColor,
        stripData: {},
        topOffset: 56, //(80 * 0.7)
        leftOffset: 196, //(280 * 0.7)
        stripLeftOffset: (screen.width - 196)/tutLength,
        
    };

    

    function _createProgressBars() {
        this.stripModifiers = [];
        var yOffset = this.options.topOffset;
        var xOffset = this.options.leftOffset;
        for (var i = 0; i < this.options.length; i++) {
            var progressBarView = new ProgressBarView({
                length: this.options.length,
                backgroundFilledColor: this.options.backgroundFilledColor,
                backgroundUnfilledColor: this.options.backgroundUnfilledColor
            });

            bars.push(progressBarView);

            var stripModifier = new StateModifier({
                transform: Transform.translate(xOffset, yOffset, 0)
            });

            this.stripModifiers.push(stripModifier);
            this.add(stripModifier).add(progressBarView);

            xOffset += this.options.stripLeftOffset;
        }
        for (var i = 0; i < bars.length; i++) {
            console.log(bars[i].getBackgroundColor());
        }
    }

    ProgressView.prototype.updateProgressBar = function(slideNumber) {
        console.log(bars[slideNumber]);
        console.log("ProgressView:" + bars[slideNumber].getBackgroundColor());
        bars[slideNumber].setBackgroundColor();
        console.log("ProgressView:" + bars[slideNumber].getBackgroundColor());
    }

    module.exports = ProgressView;
});
