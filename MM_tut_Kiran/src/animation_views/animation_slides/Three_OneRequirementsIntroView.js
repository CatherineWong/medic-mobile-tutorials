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
   		_createRequirementIcons.call(this);
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

		var placeMMIcon = new StateModifier ({
			align : [0.5, 0.5],
			origin : [0.5, 0.5]
		});

		this.add(placeMMIcon).add(MMIcon);

	}


	function getX(total_number_of_icons, current_icon_number) {
		return Math.sin(current_icon_number*(2*Math.PI/total_number_of_icons));
	}


	function getY(total_number_of_icons, current_icon_number) {
		return -Math.cos(current_icon_number*(2*Math.PI/total_number_of_icons));
	}

	function _createRequirementIcons() {


		var TrainingIcon = new ImageSurface ({
			size : [100, 100],
			content: 'animation-assets/chw-nepali.svg'
		});

		var placeTrainingIcon = new StateModifier ({
			align : [0.5, 0.5],
			origin : [0.5, 0.5]
		});

		placeTrainingIcon.setTransform(
			Transform.translate(800*getX(5,0), 800*getY(5,0), 0)
		);


		var moveTrainingIcon = new StateModifier ();

		moveTrainingIcon.setTransform(
			Transform.translate(-600*getX(5,0), -600*getY(5,0), 0),
			{duration: 1000, curve: 'easeInOut'}
		);





		var PhoneIcon = new ImageSurface ({
			size : [100, 100],
			content: 'animation-assets/phone_logo.svg'
		});

		var placePhoneIcon = new StateModifier ({
			align : [0.5, 0.5],
			origin : [0.5, 0.5]
			//translate: 
		});

		placePhoneIcon.setTransform(
			Transform.translate(800*getX(5,1), 800*getY(5,1), 0)
		);


		var movePhoneIcon = new StateModifier ();

		movePhoneIcon.setTransform(
			Transform.translate(-600*getX(5,1), -600*getY(5,1), 0),
			{duration: 1000, curve: 'easeInOut'}
		);




		var LaptopIcon = new ImageSurface ({
			size : [100, 100],
			content: 'animation-assets/laptop-logo.svg'
		});


		var placeLaptopIcon = new StateModifier ({
			align : [0.5, 0.5],
			origin : [0.5, 0.5]
		});

		placeLaptopIcon.setTransform(
			Transform.translate(800*getX(5,2), 800*getY(5,2), 0)
		);

		var moveLaptopIcon = new StateModifier ();

		moveLaptopIcon.setTransform(
			Transform.translate(-600*getX(5,2), -600*getY(5,2), 0),
			{duration: 1000, curve: 'easeInOut'}
		);





		var GSMIcon = new ImageSurface ({
			size : [100, 100],
			content: 'animation-assets/oxcart.svg'
		});


		var placeGSMIcon = new StateModifier ({
			align : [0.5, 0.5],
			origin : [0.5, 0.5]
		});

		placeGSMIcon.setTransform(
			Transform.translate(800*getX(5,3), 800*getY(5,3), 0)
		);

		var moveGSMIcon = new StateModifier ();

		moveGSMIcon.setTransform(
			Transform.translate(-600*getX(5,3), -600*getY(5,3), 0),
			{duration: 1000, curve: 'easeInOut'}
		);




		var OutletIcon = new ImageSurface ({
			size : [100, 100],
			content: 'animation-assets/chickens.svg'
		});


		var placeOutletIcon = new StateModifier ({
			align : [0.5, 0.5],
			origin : [0.5, 0.5]
		});

		placeOutletIcon.setTransform(
			Transform.translate(800*getX(5,4), 800*getY(5,4), 0)
		);

		var moveOutletIcon = new StateModifier ();

		moveOutletIcon.setTransform(
			Transform.translate(-600*getX(5,4), -600*getY(5,4), 0),
			{duration: 1000, curve: 'easeInOut'}
		);


		this.add(placeTrainingIcon).add(moveTrainingIcon).add(TrainingIcon);
		this.add(placePhoneIcon).add(movePhoneIcon).add(PhoneIcon);
		this.add(placeLaptopIcon).add(moveLaptopIcon).add(LaptopIcon);
		this.add(placeGSMIcon).add(moveGSMIcon).add(GSMIcon);
		this.add(placeOutletIcon).add(moveOutletIcon).add(OutletIcon);

	}



	module.exports = Three_OneRequirementsIntroView;

});