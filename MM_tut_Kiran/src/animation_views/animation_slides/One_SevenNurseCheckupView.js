/* One_SevenNurseCheckupView -- view where Maya goes to a checkup with the clinic nurse */


define(function(require, exports, module) {

	var View = require('famous/core/View');
	var Surface = require('famous/core/Surface');
	var Transform = require('famous/core/Transform');
	var StateModifier = require('famous/modifiers/StateModifier');
	var ImageSurface = require('famous/surfaces/ImageSurface');
	var Easing = require('famous/transitions/Easing');
	var Transitionable = require('famous/transitions/Transitionable');
	var TransitionableTransform = require('famous/transitions/TransitionableTransform');
	var Modifier = require('famous/core/Modifier');

   function One_SevenNurseCheckupView () {
   		View.apply(this, arguments);
   		_createBackground.call(this);
   		_createClinic.call(this);
   		_createMaya.call(this);
   		_createNurse.call(this);
   }

   One_SevenNurseCheckupView.prototype = Object.create(View.prototype);
   One_SevenNurseCheckupView.prototype.constructor = One_SevenNurseCheckupView;

   One_SevenNurseCheckupView.prototype.returnCaptionArray = function() {
   		var captionText = ["At these checkups, nurses at the clinic make sure that Maya is on track to deliver safely."];
   		return captionText;	
   }

   One_SevenNurseCheckupView.DEFAULT_OPTIONS = {};


	function _createBackground() {
		var background = new ImageSurface ({
			size : [undefined, undefined],
			content: 'animation-assets/scene-inside-no-nurse.svg',
			transform: Transform.scale(0.7, 0, 0),
		});

		var placeBackground = new StateModifier({
			align: [0.5, 0.6],
			origin: [0.5, 0.5],
			opacity: 0
		});

		this.add(placeBackground).add(background);

    	//tan background 
   		var background = new Surface({
   			size : [1500, 1500],
   			properties : {
   				color : 'black',
   				textAlign : 'left',
   				backgroundColor: 'black'
   			}
   		});

   		var backgroundModifier = new StateModifier({
   			align : [0.5, 0.5],
   			origin : [0.5, 0.45],
   			transform : Transform.translate(0,8,-0.1),
   			opacity: 0
   		});

   		this.add(backgroundModifier).add(background);

   		setTimeout(function(){
			placeBackground.setOpacity(1, {duration: 1000})
			backgroundModifier.setOpacity(1, {duration: 1000})
		}, 3500);

	}

	function _createClinic() {

		var health_center = new ImageSurface ({
			size : [400, 500],
			content: 'animation-assets/rural-clinic-gold.svg'
		});

		var place_health_center= new StateModifier ({
			align : [0.5, 0.5],
			origin : [0.5, 0.5],
		});

		var bringToBack = new StateModifier();
		bringToBack.setTransform(Transform.behind);

		this.add(bringToBack);

		this.add(place_health_center).add(health_center);

		setTimeout(function(){
			place_health_center.setOpacity(0, {duration: 1000})
		}, 3500);
	}


	function _createMaya() {

		var maya = new ImageSurface ({
			size : [250, 250],
			content: 'animation-assets/anc-trimester3.svg'
		});
		var placeMaya= new StateModifier ({
			align : [-0.2, 0.55],
			origin: [0.4, 0.0], 
			opacity: 1
		});

		var mayaClinic = new ImageSurface ({
			size : [250, 250],
			content: 'animation-assets/anc-trimester3.svg'
		});
		var placeMayaClinic= new StateModifier ({
			align : [-0.2, 0.55],
			origin: [0.4, 0.0], 
			opacity: 0,
			transform: Transform.translate(500, 0, 0),
		});



		var bringToFront = new StateModifier();
		bringToFront.setTransform(Transform.inFront);

		this.add(bringToFront);
		this.add(placeMayaClinic).add(mayaClinic);
		this.add(placeMaya).add(maya);

		setTimeout(function(){
			placeMaya.setTransform(
				Transform.translate(900, 0, 0),
				{duration: 2500, curve: 'easeInOut'})
		}, 1000);

		setTimeout(function(){
			placeMaya.setOpacity(0,{duration: 1000, curve: 'easeInOut'})
		}, 3500);
		setTimeout(function(){
			placeMayaClinic.setOpacity(1,{duration: 1000, curve: 'easeInOut'})
		}, 3500);
		setTimeout(function(){
			placeMayaClinic.setTransform(
				Transform.translate(800, 0, 0),
				{duration: 2000, curve: 'easeInOut'})
		}, 3500);

	}

	function _createNurse() {

		var nurse = new ImageSurface ({
			size : [250, 250],
			content: 'animation-assets/nurse.svg'
		});
		var placeNurse = new StateModifier ({
			align : [-0.2, 0.55],
			origin: [0.4, 0.0], 
			transform: Transform.translate(1000, -50, 0),
			opacity: 0
		});


		var bringToFront = new StateModifier();
		bringToFront.setTransform(Transform.inFront);

		this.add(bringToFront);
		this.add(placeNurse).add(nurse);
		setTimeout(function(){
			placeNurse.setOpacity(1,{duration: 1000, curve: 'easeInOut'})
		}, 3500);

	}

	module.exports = One_SevenNurseCheckupView;

});