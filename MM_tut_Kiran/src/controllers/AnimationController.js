/** 
* AnimationController: controls the incrementation and decrementation to determine which tutorial to load at which point;
* also handles current captions
*/
define(function(require, exports, module) {
    var StateModifier = require('famous/modifiers/StateModifier');
    var HariIntroView = require('animation_views/animation_slides/HariIntroView');
    var MayaIntroView = require('animation_views/animation_slides/MayaIntroView');
    var LalitaIntroView = require('animation_views/animation_slides/LalitaIntroView');

    var Transform       = require('famous/core/Transform');
    var Easing = require('famous/transitions/Easing');
    var RenderController = require("famous/views/RenderController");

    var tutorialLengths = [4, 4, 4, 4]; //Holds the lengths of each tutorial
    var currTutorial = 0;
    var currTutorialSlide = 0;
    var renderController;

    /** Global views */
    

    function AnimationController() {


    }

    AnimationController.prototype = Object.create(null);
    AnimationController.prototype.constructor = AnimationController;

    AnimationController.prototype.initialize = function(pageView) {
        var fadeOutModifier = new StateModifier();
        fadeOutModifier.setOpacity(0, {
            duration: 1000, curve: Easing.outBack
        });

        var fadeInModifier = new StateModifier();
        fadeOutModifier.setOpacity(1, {
            duration: 1000, curve: Easing.outBack
        });

        renderController = new RenderController(null, fadeInModifier, fadeOutModifier, false);
        pageView.layout.content.add(renderController);
    }

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

    /**
     * Called when the back button is clicked to decrement the index counters accordingly
     */
    AnimationController.prototype.decrementTutorialCounts = function() {
        if (currTutorialSlide > 0) {
            currTutorialSlide--;
        } else {
            if (currTutorial == 0) {
                return; // Don't back up if you're at the beginning
            } else {
                currTutorial--;
            }
            currTutorialSlide = 0; //Start at the beginning of the previous tutorial
        }
    }

    /**
     * Used for debugging purposes only: prints out the tutorial and the current tutorial slide
     */
    AnimationController.prototype.printDebugOutput = function() {
        console.log("[AnimationController]: Current tutorial: ", currTutorial, " Current tutorial slide: ", currTutorialSlide);
    }

    /**
     * Used to load the next animation view
     */
    AnimationController.prototype.loadAnimationView = function(pageView) {
        renderController.hide(); // TODO: use a rendercontroller callback to avoid rendering issues
        var currView = _getNextAnimationView();
        renderController.show(currView);
    }

    /** Controls the logic to determine which animation to load */
    function _getNextAnimationView() {
        var currView;
        if (currTutorial == 0) {
            switch (currTutorialSlide) {
                case 0: 
                    currView = new HariIntroView();
                    break;
                case 1:
                    currView = new MayaIntroView();
                    break;
                case 2: 
                    currView = new LalitaIntroView();
                    break;
                default:
                     //Temporary place holder to fade out to nothingness
                    break; 
            }
            
        } else {
            currView;
        }   

        return currView;
    }



    module.exports = AnimationController;

});