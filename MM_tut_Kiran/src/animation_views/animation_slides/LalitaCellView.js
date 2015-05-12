/* LalitaCellView.js -- Lalita holds up her cell phone*/

define(function(require, exports, module) {

	var View = require('famous/core/View');
	var Surface = require('famous/core/Surface');
	var Transform = require('famous/core/Transform');
	var StateModifier = require('famous/modifiers/StateModifier');
	var ImageSurface = require('famous/surfaces/ImageSurface');
	var Easing = require('famous/transitions/Easing');

   function LalitaCellView () {
   		View.apply(this, arguments);
   		//_createBackground.call(this);
   		_createHuts.call(this);
   		_createLalita.call(this);
   }

   LalitaCellView.prototype = Object.create(View.prototype);
   LalitaCellView.prototype.constructor = LalitaCellView;

   LalitaCellView.prototype.returnCaptionArray = function() {
   		var captionText = ["Medic Mobile lets community health workers use cell phones to register and track patients, which can reduce time spent on recording data to only 1 day month."];
   		return captionText;	
   }

   LalitaCellView.DEFAULT_OPTIONS = {};


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
			align: [0.567, 0.5],
			origin: [0.6, 0.45],
		});

		this.add(placeBackground).add(background);
		this.add(placeMiddleground).add(middleground);
		this.add(placeForeground).add(foreground);


	}

	function _createHuts() {

		var hut = new ImageSurface ({
			size : [400, 400],
			content: 'animation-assets/yurt-1.svg'
		});

		var placeHut= new StateModifier ({
			align : [0.525, 0.6],
			origin : [0.5, 0.5],
		});
		this.add(placeHut).add(hut);

		var chickens = new ImageSurface ({
			size : [150, 150],
			content: 'animation-assets/chickens.svg'
		});

		var placeChickens= new StateModifier ({
			align : [.2, 0.7],
			origin : [0.4, 0.0],
		});
		this.add(placeChickens).add(chickens);

		var maya = new ImageSurface ({
			size : [250, 250],
			content: 'animation-assets/anc-trimester1.svg'
		});

		var placeMaya= new StateModifier ({
			align : [0.1, 0.5],
			origin: [0.4, 0.0]
		});
		this.add(placeMaya).add(maya);


		placeMaya.setTransform(
			Transform.translate(300, 0, 0)
			//{duration: 10, curve: 'easeInOut'}
		);

	}



	function _createLalita() {

		var lalita = new ImageSurface ({
			size : [250, 250],
			content: 'animation-assets/chw-female-side-left.svg'
		});

		var placeLalita= new StateModifier ({
			align : [1.1, 0.5],
			origin: [0.4, 0.0]
		});
		this.add(placeLalita).add(lalita);


		placeLalita.setTransform(
			Transform.translate(-570, 0, 0)
		);

		var phone = new ImageSurface ({
			size : [25,25],
			content: 'animation-assets/phone_logo.svg'
		});

		var placePhone = new StateModifier ({
			align : [1.1, 0.5],
			origin: [0.4, 0.0]
		});

		placePhone.setTransform(
			Transform.translate(-585, 15, 0)
		);

		var fade = new StateModifier();
		fade.setOpacity(0);
		fade.setOpacity(1, {duration : 500, curve : Easing.inQuart});

		this.add(fade).add(placePhone).add(phone);
	}


	module.exports = LalitaCellView;

});