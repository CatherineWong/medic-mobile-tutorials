/* 3.1 Tutorial 3 slide 1 -- requirements introduction*/


define(function(require, exports, module) {

	var View = require('famous/core/View');
	var Surface = require('famous/core/Surface');
	var Transform = require('famous/core/Transform');
	var StateModifier = require('famous/modifiers/StateModifier');
	var ImageSurface = require('famous/surfaces/ImageSurface');
	var Easing = require('famous/transitions/Easing');

   function Three_OneRequirementsIntroView () {
   		View.apply(this, arguments);
   		// _createBackground.call(this);
   		_createMMIcon.call(this);
   		//_createLalitaAndMaya.call(this);
   }

   Three_OneRequirementsIntroView.prototype = Object.create(View.prototype);
   Three_OneRequirementsIntroView.prototype.constructor = Three_OneRequirementsIntroView;

   Three_OneRequirementsIntroView.prototype.returnCaptionArray = function() {
   		var captionText = ["There are a couple things that you will need to set up Medic Mobile"];
   		return captionText;	
   }

   Three_OneRequirementsIntroView.DEFAULT_OPTIONS = {};


	function _createMMIcon() {

		var MMIcon = new ImageSurface ({
			size : [200, 200],
			content: 'animation-assets/Medic_Mobile_logo_200x200.png'
		});

		var placeMMIcon= new StateModifier ({
			align : [0.5, 0.5],
			origin : [0.5, 0.5],
		});
		this.add(placeMMIcon).add(MMIcon);

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

	module.exports = Three_OneRequirementsIntroView;

});