/** 
* AnimationController: controls the incrementation and decrementation to determine which tutorial to load at which point;
* also handles current captions
*/
define(function(require, exports, module) {
    var DEBUG = true; //When true, prints debugging info to the console
    var StateModifier = require('famous/modifiers/StateModifier');
    var HariIntroView = require('animation_views/animation_slides/HariIntroView');
    var MayaIntroView = require('animation_views/animation_slides/MayaIntroView');
    var LalitaIntroView = require('animation_views/animation_slides/LalitaIntroView');
    var ZoomOutIntroView = require('animation_views/animation_slides/ZoomOutIntroView');
    var ZoomOutTransitionView = require('animation_views/animation_slides/ZoomOutTransitionView');
    var HariLaptopView = require('animation_views/animation_slides/HariLaptopView');
    var LalitaCellView = require('animation_views/animation_slides/LalitaCellView');
    var Transform       = require('famous/core/Transform');
    var Easing = require('famous/transitions/Easing');
    var RenderController = require("famous/views/RenderController");

    var tutorialLengths = [10, 4, 4, 4]; //Holds the lengths of each tutorial
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
        fadeOutModifier.setTransform(Transform.behind);
        fadeOutModifier.setOpacity(0, {
            duration: 1000, curve: Easing.outBack
        });

        var sendToBackModifier = new StateModifier();
        sendToBackModifier.setTransform(Transform.behind);
        sendToBackModifier.setOpacity(1, {
            duration: 1000, curve: Easing.outBack
        });

        renderController = new RenderController(null, sendToBackModifier, fadeOutModifier, false);
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
     * Used to load the next animation view; also returns the current caption
     */
    AnimationController.prototype.loadAnimationView = function(pageView) {
        renderController.hide(); // TODO: use a rendercontroller callback to avoid rendering issues
        var currView = _getNextAnimationView();
        renderController.show(currView); // TODO: create a render node to send to back
        var captionArray = null;
        if (currView != null) captionArray = currView.returnCaptionArray();

        if (DEBUG) console.log(captionArray); 
        return captionArray;

        //Redraw all of the other layers on top
    }

    /** Controls the logic to determine which animation to load */
    function _getNextAnimationView() {
        var currView = null;
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
                case 3: 
                    currView = new ZoomOutTransitionView();
                    break;
                case 4:
                    currView = new ZoomOutIntroView();
                    break;
                case 5:
                    currView = new HariLaptopView();
                    break;
                case 6:
                    currView = new LalitaCellView();
                    break;
                default:
                     //Temporary place holder to fade out to nothingness
                    break; 
            }
            
        } 

        return currView;
    }



    module.exports = AnimationController;

});