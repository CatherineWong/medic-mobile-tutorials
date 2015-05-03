/* LailaIntroView -- view where Maya is first introduced. */


define(function(require, exports, module) {

	var View = require('famous/core/View');
	var Surface = require('famous/core/Surface');
	var Transform = require('famous/core/Transform');
	var StateModifier = require('famous/modifiers/StateModifier');
	var ImageSurface = require('famous/surfaces/ImageSurface');
	var Easing = require('famous/transitions/Easing');

   function LailaIntroView () {
   		View.apply(this, arguments);
   		_createBackground.call(this);
   		_createHuts.call(this);
   		_createLaila.call(this);
   }

   LailaIntroView.prototype = Object.create(View.prototype);
   LailaIntroView.prototype.constructor = LailaIntroView;

   LailaIntroView.prototype.returnCaptionArray = function() {
   		var captionText = ["This is Hari. Hari is the clinic director at a rural health post."];
   		return captionText;	
   }

   LailaIntroView.DEFAULT_OPTIONS = {};


	function _createBackground() {
		var background = new ImageSurface ({
			size : [1300, 1200],
			content: 'animation-assets/scene-1.svg'
		});

		var middleground = new ImageSurface ({
			size : [1300, 1200],
			content: 'animation-assets/hills-middle-ground.svg'

		});

		var placeForeground = new StateModifier({
			align: [0.5, 0.3],
			origin: [0.4, 0.45],
			transform : Transform.translate(143, 30, 0)
		});

		var placeMiddleground = new StateModifier ({
			align: [0.5, 0.3],
			origin: [0.4, 0.45],
			transform : Transform.translate(143, 30, 0)
		});

		var foreground = new ImageSurface ({
			size : [1300, 1200],
			content: 'animation-assets/hills-foreground.svg'

		});

		var placeBackground = new StateModifier({
			align: [0.5, 0.3],
			origin: [0.3, 0.4]
		});

		this.add(placeBackground).add(background);
		this.add(placeMiddleground).add(middleground);
		this.add(placeForeground).add(foreground);


	}

	function _createHuts() {

		var hut = new ImageSurface ({
			size : [400, 500],
			content: 'animation-assets/village-yurt.svg'
		});

		var placeHut= new StateModifier ({
			align : [0.5, 0.5],
			origin : [0.0, 0.25],
			// sets initial x- and y-scale to be 0
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
			size : [50, 50],
			content: 'animation-assets/chickens.svg'
		});

		var placeChickens= new StateModifier ({
			align : [0.5, 0.7],
			origin : [0.2, 0.8],
			// sets initial x- and y-scale to be 0
			transform: Transform.scale(0, 0, 1),
			// sets inital opacity to 0
			opacity: 0
		});
		this.add(placeChickens).add(chickens);

		// animates x- and y-scale to 1
		placeChickens.setTransform(
			Transform.scale(1, 1, 1),
			{ duration : 1000, curve: Easing.outBack }
		);
		// animates opacity to 1
		placeChickens.setOpacity(1, {
			duration: 1000, curve: Easing.outBack
		});

		var maya = new ImageSurface ({
			size : [130, 130],
			content: 'animation-assets/anc-trimester1.svg'
		});

		var placeMaya= new StateModifier ({
			align : [0.2, 0.78],
			origin: [0.0, 0.2]
		});
		this.add(placeMaya).add(maya);


		placeMaya.setTransform(
			Transform.translate(350, 0, 0),
			{duration: 100, curve: 'easeInOut'}
		);

	}



	function _createMaya() {



	}

	module.exports = LailaIntroView;

});