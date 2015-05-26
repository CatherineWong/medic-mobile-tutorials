/* MedicMobileMessagesLalitaView -- view where Medic Mobile sends a text message to Lalita. */


define(function(require, exports, module) {

	var View = require('famous/core/View');
	var Surface = require('famous/core/Surface');
	var Transform = require('famous/core/Transform');
	var StateModifier = require('famous/modifiers/StateModifier');
	var ImageSurface = require('famous/surfaces/ImageSurface');
	var Easing = require('famous/transitions/Easing');

   function MedicMobileMessagesLalitaView () {
   		View.apply(this, arguments);
   		_createLalita.call(this);
   		_createMessage.call(this);
   }

   MedicMobileMessagesLalitaView.prototype = Object.create(View.prototype);
   MedicMobileMessagesLalitaView.prototype.constructor = MedicMobileMessagesLalitaView;

   MedicMobileMessagesLalitaView.prototype.returnCaptionArray = function() {
   		var captionText = ["Medic Mobile will send text message reminders to Lalita at critical points in Maya’s pregnancy, when Maya needs to come to the clinic for check ups."];
   		return captionText;	
   }

   MedicMobileMessagesLalitaView.DEFAULT_OPTIONS = {};


	function _createLalita() {
		var lalita = new ImageSurface ({
			size : [250, 250],
			content: 'animation-assets/chw-nepali.svg'
		});

		var placeLalita= new StateModifier ({
			align : [0.5, 0.55],
			origin: [0.4, 0.0],
			opacity: 1,
		});

		var cellphoneLalita = new ImageSurface ({
			size : [250, 250],
			content: 'animation-assets/chw-female-side-left.svg'
		});

		var placeCellphoneLalita= new StateModifier ({
			align : [0.5, 0.55],
			origin: [0.4, 0.0],
			opacity: 0,
		});

		var phone = new ImageSurface ({
			size : [25, 25],
			content: 'animation-assets/phone_logo.svg'
		});

		var placePhone = new StateModifier ({
			align : [0.48, 0.58],
			origin: [0.4, 0.0],
			opacity: 0,
		});

		var bringToFront = new StateModifier();
		bringToFront.setTransform(Transform.inFront);

		this.add(bringToFront).add(placeLalita).add(lalita);
		this.add(placeCellphoneLalita).add(cellphoneLalita);
		this.add(placePhone).add(phone);

		
		setTimeout(function(){
			placeLalita.setOpacity(0),
			placeCellphoneLalita.setOpacity(1),
			placePhone.setOpacity(1)
		}, 3500);

		setTimeout(function(){
			placeCellphoneLalita.setTransform(
				Transform.translate(-800, 0, 0),
				{duration: 2000, curve: 'easeInOut'})
			placePhone.setTransform(
				Transform.translate(-800, 0, 0),
				{duration: 2000, curve: 'easeInOut'})
		}, 5000);
	}

	function _createMessage() {
		var message = new ImageSurface ({
			size : [100, 100],
			content: 'animation-assets/Message-icon-grey.png'
		});

		var placeMessage = new StateModifier ({
			align : [1.05, -0.8],
			origin: [0.5, 0.0],
			opacity: 1
		});

		placeMessage.setTransform(
			Transform.translate(-650,150,1)
		);

		var moveMessage = new StateModifier();
		
		setTimeout(function(){moveMessage.setTransform(
			Transform.translate(0, 525, 1),
			{duration: 2000, curve: 'easeInOut'}
		)}, 1000);

		var showMessage = new StateModifier();

		this.add(placeMessage).add(moveMessage).add(showMessage).add(message);
	
		setTimeout(function(){showMessage.setTransform(
			Transform.scale(0, 0, 0),
			{duration: 500, curve: Easing.outBack}
		)}, 4000);

	}

	module.exports = MedicMobileMessagesLalitaView;

});