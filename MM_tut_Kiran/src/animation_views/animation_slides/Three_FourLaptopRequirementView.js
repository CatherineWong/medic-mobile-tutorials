/* 3.4 Tutorial 3 slide 4 -- laptop*/


define(function(require, exports, module) {

	var View = require('famous/core/View');
	var Surface = require('famous/core/Surface');
	var Transform = require('famous/core/Transform');
	var StateModifier = require('famous/modifiers/StateModifier');
	var ImageSurface = require('famous/surfaces/ImageSurface');
	var Easing = require('famous/transitions/Easing');

   function Three_FourLaptopRequirementView () {
   		View.apply(this, arguments);
   		// _createBackground.call(this);
   		_createRequirementIcons.call(this);
   		//_createLalitaAndMaya.call(this);
   }

   Three_FourLaptopRequirementView.prototype = Object.create(View.prototype);
   Three_FourLaptopRequirementView.prototype.constructor = Three_FourLaptopRequirementView;

   Three_FourLaptopRequirementView.prototype.returnCaptionArray = function() {
   		var captionText = ["You’ll need a laptop to run the Medic Mobile software, receive messages from CHWs, and visualize historic data."];
   		return captionText;	
   }

   Three_FourLaptopRequirementView.DEFAULT_OPTIONS = {};


	function getX(total_number_of_icons, current_icon_number) {
		return Math.sin(current_icon_number*(2*Math.PI/total_number_of_icons));
	}


	function getY(total_number_of_icons, current_icon_number) {
		return -Math.cos(current_icon_number*(2*Math.PI/total_number_of_icons));
	}

	function _createRequirementIcons() {


		var PhoneIcon = new ImageSurface ({
			size : [400, 400],
			content: 'animation-assets/phone_logo.svg'
		});

		var placePhoneIcon = new StateModifier ({
			align : [0.5, 0.5],
			origin : [1.0, 1.0]
			//translate: 
		});

		placePhoneIcon.setTransform(
			Transform.translate(3*200*getX(5,2)+200, (200*getY(5,2) + 100)+50, 0)
		);

		var movePhoneIcon = new StateModifier ();

		movePhoneIcon.setTransform(
			Transform.scale(0.25, 0.25, 1),
			{duration: 1000, curve: 'easeInOut'}
		);





		var LaptopIcon = new ImageSurface ({
			size : [400, 400],
			content: 'animation-assets/laptop-logo.svg'
		});


		var placeLaptopIcon = new StateModifier ({
			align : [0.5, 0.5],
			origin : [0.0, 1.0]
		});

		placeLaptopIcon.setTransform(
			Transform.thenScale(Transform.translate(4*(200*getX(5,2) - 200), 4*(200*getY(5,2) + 100) + 200, 0), [0.25,0.25,1])
		);

		
		var moveLaptopIcon = new StateModifier ();

		moveLaptopIcon.setTransform(
			Transform.scale(4,4,1),
			{duration: 1000, curve: 'easeInOut'}
		);





		var GSMIcon = new ImageSurface ({
			size : [100, 50],
			content: 'animation-assets/modem.png'
		});


		var placeGSMIcon = new StateModifier ({
			align : [0.5, 0.5],
			origin : [0.5, 0.5]
		});

		placeGSMIcon.setTransform(
			Transform.translate(200*getX(5,3)-150, 200*getY(5,3) + 100, 0)
		);
		

		var moveGSMIcon = new StateModifier();

		moveGSMIcon.setTransform(
			Transform.translate(0, 0, 0),
			{duration: 1000, curve: 'easeInOut'}
		);





		var OutletIcon = new ImageSurface ({
			size : [100, 100],
			content: 'animation-assets/outlet.png'
		});


		var placeOutletIcon = new StateModifier ({
			align : [0.5, 0.5],
			origin : [0.5, 0.5]
		});

		placeOutletIcon.setTransform(
			Transform.translate(3*200*getX(5,3)-150, 200*getY(5,3) + 100, 0)
		);

		var moveOutletIcon = new StateModifier ();

		moveOutletIcon.setTransform(
			Transform.translate(0, 0, 0),
			{duration: 1000, curve: 'easeInOut'}
		);



 
		this.add(placePhoneIcon).add(movePhoneIcon).add(PhoneIcon);
		this.add(placeLaptopIcon).add(moveLaptopIcon).add(LaptopIcon);
		this.add(placeGSMIcon).add(moveGSMIcon).add(GSMIcon);
		this.add(placeOutletIcon).add(moveOutletIcon).add(OutletIcon);

	}



	module.exports = Three_FourLaptopRequirementView;

});