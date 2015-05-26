/* 2.1 Tutorial 2 slide 1 -- view where Lalita and Maya are chilling together */


define(function(require, exports, module) {

	var View = require('famous/core/View');
	var Surface = require('famous/core/Surface');
	var Transform = require('famous/core/Transform');
	var StateModifier = require('famous/modifiers/StateModifier');
	var ImageSurface = require('famous/surfaces/ImageSurface');
	var Easing = require('famous/transitions/Easing');

   function Two_OneIntroMayaAndHariView () {
   		View.apply(this, arguments);
   		// _createBackground.call(this);
   		_createHuts.call(this);
   		_createLalitaAndMaya.call(this);
   }

   Two_OneIntroMayaAndHariView.prototype = Object.create(View.prototype);
   Two_OneIntroMayaAndHariView.prototype.constructor = Two_OneIntroMayaAndHariView;

   Two_OneIntroMayaAndHariView.prototype.returnCaptionArray = function() {
   		var captionText = ["Let’s take a closer look at how community health workers use Medic Mobile to register a patient! Lalita, the community health worker, wants to register Maya, who is pregnant."];
   		return captionText;	
   }

   Two_OneIntroMayaAndHariView.DEFAULT_OPTIONS = {};


	function _createBackground() {
		var background = new ImageSurface ({
			size : [1700, 1200],
			content: 'animation-assets/scene-1.svg'
		});

		var middleground = new ImageSurface ({
			size : [1700, 1200],
			content: 'animation-assets/hills-middle-ground.svg'

		});

		var placeForeground = new StateModifier({
			align: [0.5, 0.5],
			origin: [0.6, 0.45],
			transform : Transform.translate(143, 30, 0)
		});

		var placeMiddleground = new StateModifier ({
			align: [0.5, 0.5],
			origin: [0.6, 0.45],
			transform : Transform.translate(143, 30, 0)
		});

		var foreground = new ImageSurface ({
			size : [1700, 1200],
			content: 'animation-assets/hills-foreground.svg'

		});

		var placeBackground = new StateModifier({
			align: [0.5, 0.5],
			origin: [0.6, 0.4]
		});

		this.add(placeBackground).add(background);
		this.add(placeMiddleground).add(middleground);
		this.add(placeForeground).add(foreground);


	}

	function _createHuts() {

		var hut = new ImageSurface ({
			size : [700, 700],
			content: 'animation-assets/yurt-1.svg'
		});

		var placeHut= new StateModifier ({
			align : [0.5, 0.5],
			origin : [0.3, 0.5],
		});
		this.add(placeHut).add(hut);

		var chickens = new ImageSurface ({
			size : [150, 150],
			content: 'animation-assets/chickens.svg'
		});

		var placeChickens= new StateModifier ({
			align : [0.35, 0.8],
			origin : [0.9, 0.3],
		});
		this.add(placeChickens).add(chickens);

	}



	function _createLalitaAndMaya() {

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

		var lalita = new ImageSurface ({
			size : [250, 250],
			content: 'animation-assets/chw-female-side-left.svg'
		});

		var placeLalita= new StateModifier ({
			align : [1.2, 0.55],
			origin: [0.4, 0.0]
		});

		var bringToFront = new StateModifier();
		bringToFront.setTransform(Transform.inFront);

		this.add(bringToFront).add(placeLalita).add(lalita);


		placeLalita.setTransform(
			Transform.translate(-570, 0, 0),
			{duration: 2000, curve: 'easeInOut'}
		);


	}

	module.exports = Two_OneIntroMayaAndHariView;

});