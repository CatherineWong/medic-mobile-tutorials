/* Tutorial 1 Slide 2 -- MayaIntroView -- view where Maya is first introduced. */


define(function(require, exports, module) {

	var View = require('famous/core/View');
	var Surface = require('famous/core/Surface');
	var Transform = require('famous/core/Transform');
	var StateModifier = require('famous/modifiers/StateModifier');
	var ImageSurface = require('famous/surfaces/ImageSurface');
	var Easing = require('famous/transitions/Easing');

   function One_TwoMayaIntroView () {
   		View.apply(this, arguments);
   		_createHuts.call(this);
   		_createMaya.call(this);
   }

   One_TwoMayaIntroView.prototype = Object.create(View.prototype);
   One_TwoMayaIntroView.prototype.constructor = One_TwoMayaIntroView;

   One_TwoMayaIntroView.prototype.returnCaptionArray = function() {
   		var captionText = ["This is Maya. She’s just learned that she is pregnant for the first time. Congratulations, Maya!"];
   		return captionText;	
   }

   One_TwoMayaIntroView.DEFAULT_OPTIONS = {};


	function _createHuts() {

		var hut = new ImageSurface ({
			size : [700, 700],
			content: 'animation-assets/yurt-1.svg'
		});

		var placeHut = new StateModifier ({
			align : [0.5, 0.5],
			origin : [0.3, 0.5],

			transform: Transform.scale(0, 0, 1),
			// sets inital opacity to 0
			opacity: 0
		});
		this.add(placeHut).add(hut);

		// animates x- and y-scale to 1
		placeHut.setTransform(
			Transform.scale(1, 1, 1),
			{ duration : 1000, curve: Easing.outBack }
		);
		// animates opacity to 1
		placeHut.setOpacity(1, {
			duration: 1000, curve: Easing.outBack
		});

		var chickens = new ImageSurface ({
			size : [150, 150],
			content: 'animation-assets/chickens.svg'
		});

		var placeChickens= new StateModifier ({
			align : [0.35, 0.8],
			origin : [0.9, 0.3],
			// sets initial x- and y-scale to be 0
			transform: Transform.scale(0, 0, 1),
			// sets inital opacity to 0
			opacity: 0
		});

		var bringToFront = new StateModifier();
		bringToFront.setTransform(Transform.inFront);

		this.add(placeChickens).add(bringToFront).add(chickens);

		// animates x- and y-scale to 1
		placeChickens.setTransform(
			Transform.scale(1, 1, 1),
			{ duration : 1000, curve: Easing.outBack }
		);
		// animates opacity to 1
		placeChickens.setOpacity(1, {
			duration: 1000, curve: Easing.outBack
		});

	}

	function _createMaya() {

		var maya = new ImageSurface ({
			size : [250, 250],
			content: 'animation-assets/anc-trimester1.svg'
		});

		var placeMaya= new StateModifier ({
			align : [0.2, 0.55],
			origin: [0.4, 0.0]
		});

		var bringToFront = new StateModifier();
		bringToFront.setTransform(Transform.inFront);

		this.add(placeMaya).add(bringToFront).add(maya);


		placeMaya.setTransform(
			Transform.translate(300, 0, 0),
			{duration: 2000, curve: 'easeInOut'}
		);

	}

	module.exports = One_TwoMayaIntroView;

});