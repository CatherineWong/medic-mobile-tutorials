
/* ZoomOutIntroView  -- Can't seem to correctly chain these surface movements, so I moved them to two different views. Will work on joining them more later*/


define(function(require, exports, module) {

	var View = require('famous/core/View');
	var Surface = require('famous/core/Surface');
	var Transform = require('famous/core/Transform');
	var StateModifier = require('famous/modifiers/StateModifier');
	var ImageSurface = require('famous/surfaces/ImageSurface');
	var Easing = require('famous/transitions/Easing');

	function ZoomOutIntroView () {
   		View.apply(this, arguments);
   		_createAndMoveBackground.call(this);
   		// _createMovingTransitionBetweenScenes.call(this);
	}

   ZoomOutIntroView.prototype = Object.create(View.prototype);
   ZoomOutIntroView.prototype.constructor = ZoomOutIntroView;

   ZoomOutIntroView.prototype.returnCaptionArray = function() {
   		var captionText = ["Unfortunately, Maya lives X hours away from the nearest health provider, Hari’s clinic. She has never visited the clinic before."];
   		return captionText;	
   }

   ZoomOutIntroView.DEFAULT_OPTIONS = {};

	function _createAndMoveBackground() {

		var background = new ImageSurface ({
			size : [1800, 1800],
			content: 'animation-assets/tutorialIntroBackgroundScene.svg'
		});
		var placeBackground = new StateModifier({
			align: [0.6, 0.56],
			origin: [0.78, 0.49],
			transform : Transform.scale(1, 1, 1),
			transform : Transform.translate(0, 0 ,0),
		});

		this.add(placeBackground).add(background);

		placeBackground.setTransform(
			Transform.scale(4, 4, 1),
			{ duration : 2000, curve: Easing.outBack }
		);

		placeBackground.setTransform(
			Transform.translate(400, 0, 0),
			{duration: 2000, curve: 'easeInOut'}
		);


	}

	module.exports = ZoomOutIntroView;

});
