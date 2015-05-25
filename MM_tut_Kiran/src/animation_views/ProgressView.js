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

    var filledColor = 'red';
    var unfilledColor = '';
    switch(tutNum) {
        case 1:
            unfilledColor = '#656912';
            filledColor = '#B5BD21';
            break;
        case 2:
            unfilledColor = '#984A3C';
            filledColor = '#F47963';
            break;
        case 3:
            unfilledColor = '#3F6464';
            filledColor = '#79B1B1';
            break;
        case 4:
            unfilledColor = '#A27513';
            filledColor = '#E9A722';
            break;
        default:
            filledColor = '#000';
    }
    
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
        backgroundUnfilledColor: unfilledColor,
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

    ProgressView.prototype.incrementProgressBar = function(slideNumber) {
        bars[slideNumber].fillBackgroundColor();
    }

    ProgressView.prototype.decrementProgressBar = function(slideNumber) {
        bars[slideNumber+1].unfillBackgroundColor();
    }

    module.exports = ProgressView;
});
