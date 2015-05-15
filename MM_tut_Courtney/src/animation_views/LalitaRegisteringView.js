/* LalitaRegisteringView -- view where Hari is first introduced. */


define(function(require, exports, module) {

	var View = require('famous/core/View');
	var Surface = require('famous/core/Surface');
	var Transform = require('famous/core/Transform');
	var StateModifier = require('famous/modifiers/StateModifier');
	var ImageSurface = require('famous/surfaces/ImageSurface');
	var Easing = require('famous/transitions/Easing');

   function LalitaRegisteringView () {
   		View.apply(this, arguments);
   		//_createBackground.call(this);
   		
   		_createHome.call(this);
   		_createMaya.call(this);
   		_createLalita.call(this);
   		_createPhone.call(this);

   }

   LalitaRegisteringView.prototype = Object.create(View.prototype);
   LalitaRegisteringView.prototype.constructor = LalitaRegisteringView;

   LalitaRegisteringView.prototype.returnCaptionArray = function() {
   		var captionText = ["When Lalita learns that Maya is pregnant, she visits Maya and uses a mobile phone to send a text message to the clinic to register Maya's pregnancy."];
   		return captionText;	
   }

   LalitaRegisteringView.DEFAULT_OPTIONS = {};

	function _createHome() {

		var small_house = new ImageSurface ({
			size : [600, 750],
			content: 'animation-assets/single-yurt.svg'
		});

		var place_small_house= new StateModifier ({
			align : [0.85, 0.5],
			origin : [0.5, 0.5],
			// sets initial x- and y-scale to be 0
			transform: Transform.scale(0, 0, 1),
			// sets inital opacity to 0
			opacity: 0
		});
		this.add(place_small_house).add(small_house);

		// animates x- and y-scale to 1
		place_small_house.setTransform(
			Transform.scale(1, 1, 1),
			{ duration : 1000, curve: Easing.outBack }
		);
		// animates opacity to 1
		place_small_house.setOpacity(1, {
			duration: 1000, curve: Easing.outBack
		});
	}

	function _createMaya() {
		var maya = new ImageSurface ({
			size : [500, 240],
			content: 'animation-assets/anc-trimester1.svg'
		});

		var placeMaya = new StateModifier ({
			align: [0.8, 0.7],
			origin: [0.5, 0.5],
			transform: Transform.scale(0, 0, 2)
		});

		this.add(placeMaya).add(maya);

		placeMaya.setTransform(
			Transform.scale(1, 1, 1),
			{ duration : 1000, curve: Easing.outBack }
		);

		placeMaya.setOpacity(
			1,
			{ duration: 1000, curve: Easing.outBack }
		);


	}



	function _createLalita() {
		var lalita = new ImageSurface ({
			size : [1500, 720],
			content: 'animation-assets/chw-nepali.svg'
		});

		var placeLalita = new StateModifier ({
			align: [0.5, 0.5],
			origin: [0.5, 0.5]
		});

		placeLalita.setTransform(
			Transform.translate(-800, 500, 0)
		);

		var moveLalita = new StateModifier();

		moveLalita.setTransform(
			Transform.translate(600, 0, 0),
			{duration: 2000, curve: 'easeInOut'}
		);

		this.add(placeLalita).add(moveLalita).add(lalita);

	}

	function _createPhone() {
		var phone = new ImageSurface ({
			size : [45, 90],
			content: 'animation-assets/phone_logo.svg'
		});

		var placePhone = new StateModifier ({
			align: [0.5, 0.5],
			origin: [0.5, 0.5]
		});

		placePhone.setTransform(
			Transform.translate(-700,300,-1)
		);

		var movePhone = new StateModifier();
		movePhone.setTransform(
			Transform.translate(600, 0, -1),
			{duration: 2000, curve: 'easeInOut'}
		);

		this.add(placePhone).add(movePhone).add(phone);
	}


	/*function _createDivider() {
		var line = new Surface({ 
		    size:[10,900],
		    properties: {
		      backgroundColor: 'rgba(100,100,100,1.0)'
		    }
		});

		
		var tMatrix = Transform.rotateAxis([0,0,1], 30*3.14159/180.0);
		var angle = 1;
		var placeLine = new StateModifier ({
			align: [0.10,0.2],
			origin: [0.0, 0.6],
			transform: tMatrix
		});

		var rotatedLine = new StateModifier ();
		rotatedLine.setTransform(
			Transform.translate(700, 0, 0),
			{duration: 2000, curve: 'easeInOut'}
		);

		this.add(placeLine).add(rotatedLine).add(line);
	}*/


	module.exports = LalitaRegisteringView;

});