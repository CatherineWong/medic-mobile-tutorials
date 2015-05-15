/* Lalita Scroll By-- view where Lalita is first introduced. */


define(function(require, exports, module) {

	var View = require('famous/core/View');
	var Surface = require('famous/core/Surface');
	var Transform = require('famous/core/Transform');
	var StateModifier = require('famous/modifiers/StateModifier');
	var ImageSurface = require('famous/surfaces/ImageSurface');
	var Easing = require('famous/transitions/Easing');

   function LalitaToHariZoomView () {
   		View.apply(this, arguments);
   		// _createBackground.call(this);
   		//_createHome.call(this);
   		//_createMaya.call(this);
   		//_createPhone.call(this);
   		//_createLalita.call(this);
   		//_createMessage.call(this);
   		_createEverything.call(this);
   		
   }

   LalitaToHariZoomView.prototype = Object.create(View.prototype);
   LalitaToHariZoomView.prototype.constructor = LalitaToHariZoomView;

   LalitaToHariZoomView.prototype.returnCaptionArray = function() {
   		var captionText = ["When Lalita learns that Maya is pregnant, she visits Maya and uses a mobile phone to send a text message to the clinic to register Maya's pregnancy."];
   		return captionText;	
   }

   LalitaToHariZoomView.DEFAULT_OPTIONS = {};


	function _createEverything() {

		//ADD HOUSE
		var small_house = new ImageSurface ({
			size : [500, 625],
			content: 'animation-assets/yurt-1.svg'
		});

		var place_small_house= new StateModifier ({
			align : [0.85, 0.5],
			origin : [0.5, 0.5],
		});
		this.add(place_small_house).add(small_house);

		//ADD MAYA
		var maya = new ImageSurface ({
			size : [500, 240],
			content: 'animation-assets/anc-trimester1.svg'
		});

		var placeMaya = new StateModifier ({
			align: [0.8, 0.7],
			origin: [0.5, 0.5],
			transform: Transform.inFront
		});

		this.add(placeMaya).add(maya);


		//ADD LALITA
		var lalita = new ImageSurface ({
			size : [1500, 720],
			content: 'animation-assets/chw-nepali.svg'
		});

		var placeLalita = new StateModifier ({
			align: [0.5, 0.5],
			origin: [0.5, 0.5],
			transform: Transform.translate(-200,500,1);
		});

		this.add(placeLalita).add(lalita);

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
			Transform.translate(-700,300,0)
		);

		var movePhone = new StateModifier();
		movePhone.setTransform(
			Transform.translate(600, 0, 0),
			{duration: 2000, curve: 'easeInOut'}
		);

		this.add(placePhone).add(movePhone).add(phone);
	}

	function _createMessage() {
		var message = new ImageSurface ({
			size : [1, 1],
			content: 'animation-assets/Message-icon-grey.png'
		});

		var placeMessage = new StateModifier ({
			align: [0.5, 0.5],
			origin: [0.5, 0.5],
			opacity: 1
		});

		placeMessage.setTransform(
			Transform.translate(-650,150,1)
		);

		var moveMessage = new StateModifier();
		moveMessage.setTransform(
			Transform.translate(600, 0, 1),
			{duration: 2000, curve: 'easeInOut'}
		);

		var showMessage = new StateModifier();

		this.add(placeMessage).add(moveMessage).add(showMessage).add(message);
	
		setTimeout(function(){showMessage.setTransform(
			Transform.scale(100, 100, 1),
			{duration: 500, curve: Easing.outBack}
		)}, 2000);

	}


	////////////////////////////////////////////////////////////

	module.exports = LalitaToHariZoomView;

});