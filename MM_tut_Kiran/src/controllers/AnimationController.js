/*
* AnimationController: controls the incrementation and decrementation to determine which tutorial to load at which point;
* also handles current captions
*/
define(function(require, exports, module) {
    var DEBUG = true; //When true, prints debugging info to the console
    var StateModifier = require('famous/modifiers/StateModifier');
    var One_OneHariIntroView = require('animation_views/animation_slides/One_OneHariIntroView');
    var One_TwoMayaIntroView = require('animation_views/animation_slides/One_TwoMayaIntroView');
    var One_ThreeLalitaIntroView = require('animation_views/animation_slides/One_ThreeLalitaIntroView');
    var HariLaptopView_1_4 = require('animation_views/animation_slides/HariLaptopView_1_4');
    var LalitaCellView_1_4 = require('animation_views/animation_slides/LalitaCellView_1_4');
    var Transform       = require('famous/core/Transform');
    var Easing = require('famous/transitions/Easing');
    var RenderController = require("famous/views/RenderController");
    var LongDistanceView = require('animation_views/animation_slides/LongDistanceView');
    var PaperPileupView_1_3 = require('animation_views/animation_slides/PaperPileupView_1_3');
    var LalitaRegisteringMayaView = require('animation_views/animation_slides/LalitaRegisteringMayaView');
    var LalitaToHariZoomView = require('animation_views/animation_slides/LalitaToHariZoomView');
    var LalitaConfirmView_1_8 = require('animation_views/animation_slides/LalitaConfirmView_1_8');
    var SplitScreenView = require('animation_views/animation_slides/SplitScreenView');
    var RegisterView = require('animation_views/animation_slides/RegisterView');
    var RegisteredView = require('animation_views/animation_slides/RegisteredView');
    var One_SixMedicMobileMessagesLalitaView = require('animation_views/animation_slides/One_SixMedicMobileMessagesLalitaView');
    var One_SixLalitaVisitsMayaView = require('animation_views/animation_slides/One_SixLalitaVisitsMayaView');
    var One_SevenNurseCheckupView = require('animation_views/animation_slides/One_SevenNurseCheckupView');
    var Two_OneIntroMayaAndHariView = require('animation_views/animation_slides/Two_OneIntroMayaAndHariView');
    var Two_TwoIntroMayaHariCellView = require('animation_views/animation_slides/Two_TwoIntroMayaHariCellView');
    var Two_ThreeZoomToHariView = require('animation_views/animation_slides/Two_ThreeZoomToHariView');
    var One_FourZoomOutTransitionView = require('animation_views/animation_slides/One_FourZoomOutTransitionView');
    var Two_EightCellView = require('animation_views/animation_slides/Two_EightCellView');
    var Two_NineClipboardView = require('animation_views/animation_slides/Two_NineClipboardView');
    var Two_ElevenUserGuide = require('animation_views/animation_slides/Two_ElevenUserGuide');
    var Two_TenVisitMayaView = require('animation_views/animation_slides/Two_TenVisitMayaView');
    var Two_TwelveMessageView = require('animation_views/animation_slides/Two_TwelveMessageView');
    var Three_OneRequirementsIntroView = require('animation_views/animation_slides/Three_OneRequirementsIntroView');
    var Three_TwoHardwareRequirementsView = require('animation_views/animation_slides/Three_TwoHardwareRequirementsView');
    var Three_ThreePhoneRequirementView = require('animation_views/animation_slides/Three_ThreePhoneRequirementView');
    var Three_FourLaptopRequirementView = require('animation_views/animation_slides/Three_FourLaptopRequirementView');
    var Three_FiveModemRequirementView = require('animation_views/animation_slides/Three_FiveModemRequirementView');
    var Three_SixOutletRequirementView = require('animation_views/animation_slides/Three_SixOutletRequirementView');
    var Three_SevenTrainingRequirementView = require('animation_views/animation_slides/Three_SevenTrainingRequirementView');

    var tutorialLengths = [14, 13, 7, 2]; //Holds the lengths of each tutorial
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
     * Sets the tutorial to the start of a given tutorial
     */
    AnimationController.prototype.setStartOfTutorial = function(tutorialNum) {
        currTutorial = tutorialNum;
        currTutorialSlide = 0;
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
    AnimationController.prototype.loadAnimationView = function(pageView, captionSurface) {
        renderController.hide(); 
        var currView = _getNextAnimationView();
        renderController.show(currView); 
        var captionArray = null;
        if (currView != null) captionArray = currView.returnCaptionArray();

        if (DEBUG) console.log(captionArray); 

        // Update the provided caption view
        captionSurface.setContent(captionArray);
        return captionArray;

        //Redraw all of the other layers on top
    }


    /** Controls the logic to determine which animation to load */
    function _getNextAnimationView() {
        var currView = null;
        if (currTutorial == 0) {              
            switch (currTutorialSlide) {
                case 0:
                    //currView = new SplitScreenView();
                    currView = new One_OneHariIntroView();
                    break;
                case 1:
                    currView = new One_TwoMayaIntroView();
                    break;
                case 2: 
                    currView = new One_ThreeLalitaIntroView();
                    break;
                case 3: 
                    currView = new One_FourZoomOutTransitionView();
                    break;
                case 4:
                    currView = new HariLaptopView_1_4();
                    break;
                case 5:
                    currView = new LalitaCellView_1_4();
                    break;
                case 6:
                    currView = new LongDistanceView();
                    break;
                case 7:
                    currView = new PaperPileupView_1_3();
                    break;
                case 8:
                    currView = new LalitaRegisteringMayaView();
                    break;
                case 9:
                    currView = new One_SixMedicMobileMessagesLalitaView();
                    break;
                case 10:
                    currView = new One_SixLalitaVisitsMayaView();
                    break;
                case 11:
                    currView = new One_SevenNurseCheckupView();
                    break;
                case 12:
                    currView = new LalitaToHariZoomView();
                    break;
                case 13:
                    currView = new LalitaConfirmView_1_8();
                    break;
                default:
                     //Temporary place holder to fade out to nothingness
                    break;
            }
            
        } else if (currTutorial == 1) {
            switch (currTutorialSlide) {
                case 0:
                    currView = new Two_OneIntroMayaAndHariView();
                    break;
                case 1:
                    currView = new Two_TwoIntroMayaHariCellView();
                    break;
                case 2:
                    currView = new Two_ThreeZoomToHariView();
                    break;
                case 3:
                    currView = new SplitScreenView();
                    break;
                case 4:
                    currView = new RegisterView();
                    break; 
                case 5:
                    currView = new RegisteredView();
                    break;
                case 6: 
                    currView = new Two_EightCellView();
                    break;
                case 7:
                    currView = new Two_NineClipboardView();
                    break;
                case 8:
                    currView = new Two_TenVisitMayaView();
                    break;
                case 9:
                    currView = new Two_ElevenUserGuide();
                    break;
                case 10:
                    currView = new Two_TwelveMessageView();
                    break;
                default:
                    break;
            } 
        } else if (currTutorial == 2) {
            switch (currTutorialSlide) {
                case 0:
                    currView = new Three_OneRequirementsIntroView();
                    break;
                case 1:
                    currView = new Three_TwoHardwareRequirementsView();
                    break;
                case 2:
                    currView = new Three_ThreePhoneRequirementView();
                    break;
                case 3:
                    currView = new Three_FourLaptopRequirementView();
                    break;
                case 4:
                    currView = new Three_FiveModemRequirementView();
                    break;
                case 5:
                    currView = new Three_SixOutletRequirementView();
                    break;
                case 6:
                    currView = new Three_SevenTrainingRequirementView();
                    break;
                default:
                    break;
            } 
        }

        return currView;
    }

    module.exports = AnimationController;

});
