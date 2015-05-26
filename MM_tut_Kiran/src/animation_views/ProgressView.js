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

    var filledColor = '';
    var unfilledColor = '';
    
    var numFilled = 3;
    function ProgressView() {
        View.apply(this, arguments);
        _createProgressBars.call(this);
    }

    ProgressView.prototype = Object.create(View.prototype);
    ProgressView.prototype.constructor = ProgressView;

    ProgressView.DEFAULT_OPTIONS = {
        length: tutLength,
        stripData: {},
        topOffset: 56, //(80 * 0.7)
        leftOffset: 196, //(280 * 0.7)        
    };

    

    function _createProgressBars() {
        var thisrow = [];
        switch(this.options.currentTutorial) {
            case 0:
                unfilledColor = '#656912';
                filledColor = '#B5BD21';
                break;
            case 1:
                unfilledColor = '#984A3C';
                filledColor = '#F47963';
                break;
            case 2:
                unfilledColor = '#3F6464';
                filledColor = '#79B1B1';
                break;
            case 3:
                unfilledColor = '#A27513';
                filledColor = '#E9A722';
                break;
            default:
                filledColor = '#000';
        }
        /*alert(unfilledColor);
        alert(filledColor);*/
        this.stripModifiers = [];
        var yOffset = this.options.topOffset;
        var xOffset = this.options.leftOffset;
        var leftOffset = (screen.width - 196)/this.options.tutorialLength;
        for (var i = 0; i < this.options.tutorialLength; i++) {
            var progressBarView = new ProgressBarView({
                length: this.options.tutorialLength,
                backgroundFilledColor: filledColor,
                backgroundUnfilledColor: unfilledColor
            });
            

            thisrow.push(progressBarView);

            var stripModifier = new StateModifier({
                transform: Transform.translate(xOffset, yOffset, 0)
            });

            this.stripModifiers.push(stripModifier);
            this.add(stripModifier).add(progressBarView);

            xOffset += leftOffset;
        }
        /*for (var i = 0; i < bars.length; i++) {
            console.log('back'+bars[i].getBackgroundColor());
        }*/
        bars.push(thisrow);
    }

    ProgressView.prototype.incrementProgressBar = function(tutorialNumber, slideNumber) {
        /*alert(tutorialNumber);
        alert(slideNumber);*/
        bars[tutorialNumber][slideNumber].fillBackgroundColor();
        //console.log(filledColor);
    }

    ProgressView.prototype.decrementProgressBar = function(slideNumber) {
        bars[0][slideNumber+1].unfillBackgroundColor();
    }

    module.exports = ProgressView;
});
