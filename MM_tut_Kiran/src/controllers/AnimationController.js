define(function(require, exports, module) {
    var currTutorial = 0;
    var currTutorialSlide = 0;
    function AnimationController() {}

    AnimationController.prototype = Object.create(null);
    AnimationController.prototype.constructor = AnimationController;

    /** 
     *
     */
    AnimationController.prototype.getCurrTutorial = function() {
        return currTutorial;
    }


    module.exports = AnimationController;

});