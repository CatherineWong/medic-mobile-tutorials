/** 
* AnimationController: controls the incrementation and decrementation to determine which tutorial to load at which point;
* also handles current captions
*/
define(function(require, exports, module) {
    var tutorialLengths = [4, 4, 4, 4]; //Holds the lengths of each tutorial
    var currTutorial = 0;
    var currTutorialSlide = 0;
    function AnimationController() {}

    AnimationController.prototype = Object.create(null);
    AnimationController.prototype.constructor = AnimationController;

    /** 
     * Getter for the current tutorial number
     */
    AnimationController.prototype.getCurrTutorial = function() {
        return currTutorial;
    }

    /**
     * Getter for the current tutorial slide index within the given tutorial
     */
    AnimationController.prototype.getCurrTutorialSlide = function() {
        return currTutorialSlide;
    }

    /**
     * Gets the length of a specified tutorial; can be used to determine progress bar size
     */
    AnimationController.prototype.getTutorialLength = function(tutorialNum) {
        return tutorialLengths[tutorialNum];
    }


    /**
     * Called when the next button is clicked to increment the index counters accordingly
     */
    AnimationController.prototype.incrementTutorialCounts = function() {
        if(currTutorialSlide < (tutorialLengths[currTutorial]  - 1)) {
            currTutorialSlide++;
        } else {
            currTutorial = (currTutorial+1) % tutorialLengths.length; //Wrap back to beginning
            currTutorialSlide = 0;
        }
    }

    module.exports = AnimationController;

});