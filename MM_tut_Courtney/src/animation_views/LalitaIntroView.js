/* LailaIntroView -- view where Maya is first introduced. */


define(function(require, exports, module) {

	var View = require('famous/core/View');
	var Surface = require('famous/core/Surface');
	var Transform = require('famous/core/Transform');
	var StateModifier = require('famous/modifiers/StateModifier');
	var ImageSurface = require('famous/surfaces/ImageSurface');
	var Easing = require('famous/transitions/Easing');

   function LalitaIntroView () {
   		View.apply(this, arguments);
   		_createBackground.call(this);
   		_createHuts.call(this);
   		_createLalita.call(this);
   }

   LalitaIntroView.prototype = Object.create(View.prototype);
   LalitaIntroView.prototype.constructor = LalitaIntroView;

   LalitaIntroView.prototype.returnCaptionArray = function() {
   		var captionText = ["This is Lalita. Lalita is a community health worker in Maya’s village."];
   		return captionText;	
   }

   LalitaIntroView.DEFAULT_OPTIONS = {};


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
		});
		this.add(placeHut).add(hut);

		var chickens = new ImageSurface ({
			size : [50, 50],
			content: 'animation-assets/chickens.svg'
		});

		var placeChickens= new StateModifier ({
			align : [0.5, 0.7],
			origin : [0.2, 0.8],
		});
		this.add(placeChickens).add(chickens);

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
			{duration: 10, curve: 'easeInOut'}
		);

	}



	function _createLalita() {
		var lalita = new ImageSurface ({
			size : [130, 130],
			content: 'animation-assets/chw-nepali.svg'
		});

		var placeLalita= new StateModifier ({
			align : [0.2, 0.78],
			origin: [0.0, 0.2]
		});
		this.add(placeLalita).add(lalita);


		placeLalita.setTransform(
			Transform.translate(800, 0, 0),
			{duration: 2000, curve: 'easeInOut'}
		);


	}

	module.exports = LalitaIntroView;

});