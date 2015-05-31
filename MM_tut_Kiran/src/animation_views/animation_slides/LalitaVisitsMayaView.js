/* LalitaVisitsMaya -- view where Lalita visits to Maya */


define(function(require, exports, module) {

	var View = require('famous/core/View');
	var Surface = require('famous/core/Surface');
	var Transform = require('famous/core/Transform');
	var StateModifier = require('famous/modifiers/StateModifier');
	var ImageSurface = require('famous/surfaces/ImageSurface');
	var Easing = require('famous/transitions/Easing');

   function LalitaVisitsMaya () {
   		View.apply(this, arguments);
   		_createHuts.call(this);
   		_createCalendar.call(this);
   		_createMaya.call(this);
   		_createLalita1.call(this);
   		_createLalita2.call(this);
   		_createLalita3.call(this);

   }

   LalitaVisitsMaya.prototype = Object.create(View.prototype);
   LalitaVisitsMaya.prototype.constructor = LalitaVisitsMaya;

   LalitaVisitsMaya.prototype.returnCaptionArray = function() {
   		var captionText = ["Each time, Lalita visits Maya to let her know."];
   		return captionText;	
   }

   LalitaVisitsMaya.DEFAULT_OPTIONS = {};

	function _createHuts() {

		var hut = new ImageSurface ({
			size : [700, 700],
			content: 'animation-assets/yurt-1.svg'
		});

		var placeHut = new StateModifier ({
			align : [0.5, 0.5],
			origin : [0.3, 0.5],
			opacity: 1
		});
		this.add(placeHut).add(hut);

		// animates x- and y-scale to 1
		placeHut.setTransform(
			Transform.scale(1, 1, 1),
			{ duration : 1000, curve: Easing.outBack }
		);
		// animates opacity to 1
		placeHut.setOpacity(1, {
			duration: 1000, curve: Easing.outBack
		});

		var chickens = new ImageSurface ({
			size : [150, 150],
			content: 'animation-assets/chickens.svg'
		});

		var placeChickens= new StateModifier ({
			align : [0.35, 0.8],
			origin : [0.9, 0.3],
			opacity: 1
		});

		var bringToFront = new StateModifier();
		bringToFront.setTransform(Transform.inFront);

		this.add(placeChickens).add(bringToFront).add(chickens);

	}

	function _createCalendar() {

		var calendar1 = new ImageSurface ({
			size : [150, 150],
			content: 'animation-assets/calendar.svg'
		});
		var placeCalendar1 = new StateModifier ({
			align : [0.9, 0.2],
			origin : [0.3, 0.5],
			opacity: 1
		});
		var calendar2 = new ImageSurface ({
			size : [150, 150],
			content: 'animation-assets/calendar.svg'
		});
		var placeCalendar2 = new StateModifier ({
			align : [0.9, 0.2],
			origin : [0.3, 0.5],
			opacity: 0.8
		});
		var calendar3 = new ImageSurface ({
			size : [150, 150],
			content: 'animation-assets/calendar.svg'
		});
		var placeCalendar3 = new StateModifier ({
			align : [0.9, 0.2],
			origin : [0.3, 0.5],
			opacity: 0.6
		});
		var calendar4 = new ImageSurface ({
			size : [150, 150],
			content: 'animation-assets/calendar.svg'
		});
		var placeCalendar4 = new StateModifier ({
			align : [0.9, 0.2],
			origin : [0.3, 0.5],
			opacity: 0.4
		});
		var calendar5 = new ImageSurface ({
			size : [150, 150],
			content: 'animation-assets/calendar.svg'
		});
		var placeCalendar5 = new StateModifier ({
			align : [0.9, 0.2],
			origin : [0.3, 0.5],
			opacity: 0.2
		});
		
		this.add(placeCalendar1).add(calendar1);
		this.add(placeCalendar2).add(calendar2);
		this.add(placeCalendar3).add(calendar3);
		this.add(placeCalendar4).add(calendar4);
		this.add(placeCalendar5).add(calendar5);
		
		setTimeout(function(){
			placeCalendar1.setOpacity(0, {duration: 1000}),
			placeCalendar1.setTransform(
				Transform.translate(0,75,0),
				{ duration : 1500, curve: Easing.outBack });
		}, 6000);
		setTimeout(function(){
			placeCalendar2.setOpacity(0, {duration: 1000}),
			placeCalendar2.setTransform(
				Transform.translate(0,75,0),
				{ duration : 1500, curve: Easing.outBack });
		}, 7000);
		setTimeout(function(){
			placeCalendar3.setOpacity(0, {duration: 1000}),
			placeCalendar3.setTransform(
				Transform.translate(0,75,0),
				{ duration : 1500, curve: Easing.outBack });
		}, 11500);
		setTimeout(function(){
			placeCalendar4.setOpacity(0, {duration: 1000}),
			placeCalendar4.setTransform(
				Transform.translate(0,75,0),
				{ duration : 1500, curve: Easing.outBack });
		}, 12500);
	}

	function _createMaya() {

		var maya1 = new ImageSurface ({
			size : [250, 250],
			content: 'animation-assets/anc-trimester1.svg'
		});
		var placeMaya1= new StateModifier ({
			align : [0.45, 0.55],
			origin: [0.4, 0.0]
		});

		var maya2 = new ImageSurface ({
			size : [250, 250],
			content: 'animation-assets/anc-trimester2.svg'
		});
		var placeMaya2= new StateModifier ({
			align : [0.45, 0.55],
			origin: [0.4, 0.0],
			opacity: 0

		});var maya3 = new ImageSurface ({
			size : [250, 250],
			content: 'animation-assets/anc-trimester3.svg'
		});
		var placeMaya3= new StateModifier ({
			align : [0.45, 0.55],
			origin: [0.4, 0.0],
			opacity: 0
		});


		var bringToFront = new StateModifier();
		bringToFront.setTransform(Transform.inFront);

		this.add(placeMaya1).add(bringToFront).add(maya1);
		this.add(placeMaya2).add(maya2);
		this.add(placeMaya3).add(maya3);


		setTimeout(function(){
			placeMaya1.setTransform(
				Transform.translate(800, 0, 0),
				{duration: 2000, curve: 'easeInOut'})
		}, 4500);
		setTimeout(function(){
			placeMaya2.setOpacity(1, {duration: 1000, curve: Easing.outBack});
		}, 6500);
		setTimeout(function(){
			placeMaya2.setTransform(
				Transform.translate(800, 0, 0),
				{duration: 2000, curve: 'easeInOut'})
		}, 10000);
		setTimeout(function(){
			placeMaya3.setOpacity(1, {duration: 1000, curve: Easing.outBack});
		}, 12000);
		setTimeout(function(){
			placeMaya3.setTransform(
				Transform.translate(800, 0, 0),
				{duration: 2000, curve: 'easeInOut'})
		}, 15500);

	}

	function _createLalita1() {
		var cellphoneLalita1 = new ImageSurface ({
			size : [250, 250],
			content: 'animation-assets/chw-female-side-left.svg'
		});
		var placeCellphoneLalita1 = new StateModifier ({
			align : [1.2, 0.55],
			origin: [0.4, 0.0],
		});
		var phone1 = new ImageSurface ({
			size : [25, 25],
			content: 'animation-assets/phone_logo.svg'
		});
		var placePhone1 = new StateModifier ({
			align : [1.18, 0.575],
			origin: [0.4, 0.0],
		});

		this.add(placeCellphoneLalita1).add(cellphoneLalita1);
		this.add(placePhone1).add(phone1);

		setTimeout(function(){
			placeCellphoneLalita1.setTransform(
				Transform.translate(-800, 0, 0),
				{duration: 2000, curve: 'easeInOut'})
			placePhone1.setTransform(
				Transform.translate(-800, 0, 0),
				{duration: 2000, curve: 'easeInOut'})
		}, 1000);
		setTimeout(function(){
			placeCellphoneLalita1.setTransform(
				Transform.translate(-1600, 0, 0),
				{duration: 2000, curve: 'easeInOut'})
			placePhone1.setTransform(
				Transform.translate(-1600, 0, 0),
				{duration: 2000, curve: 'easeInOut'})
		}, 4500);
	}

	function _createLalita2() {
		var cellphoneLalita2 = new ImageSurface ({
			size : [250, 250],
			content: 'animation-assets/chw-female-side-left.svg'
		});
		var placeCellphoneLalita2 = new StateModifier ({
			align : [1.2, 0.55],
			origin: [0.4, 0.0],
		});
		var phone2 = new ImageSurface ({
			size : [25, 25],
			content: 'animation-assets/phone_logo.svg'
		});
		var placePhone2 = new StateModifier ({
			align : [1.18, 0.575],
			origin: [0.4, 0.0],
		});

		this.add(placeCellphoneLalita2).add(cellphoneLalita2);
		this.add(placePhone2).add(phone2);

		setTimeout(function(){
			placeCellphoneLalita2.setTransform(
				Transform.translate(-800, 0, 0),
				{duration: 2000, curve: 'easeInOut'})
			placePhone2.setTransform(
				Transform.translate(-800, 0, 0),
				{duration: 2000, curve: 'easeInOut'})
		}, 6500);
		setTimeout(function(){
			placeCellphoneLalita2.setTransform(
				Transform.translate(-1600, 0, 0),
				{duration: 2000, curve: 'easeInOut'})
			placePhone2.setTransform(
				Transform.translate(-1600, 0, 0),
				{duration: 2000, curve: 'easeInOut'})
		}, 10000);
	}

	function _createLalita3() {
		var cellphoneLalita3 = new ImageSurface ({
			size : [250, 250],
			content: 'animation-assets/chw-female-side-left.svg'
		});
		var placeCellphoneLalita3 = new StateModifier ({
			align : [1.2, 0.55],
			origin: [0.4, 0.0],
		});
		var phone3 = new ImageSurface ({
			size : [25, 25],
			content: 'animation-assets/phone_logo.svg'
		});
		var placePhone3 = new StateModifier ({
			align : [1.18, 0.575],
			origin: [0.4, 0.0],
		});

		this.add(placeCellphoneLalita3).add(cellphoneLalita3);
		this.add(placePhone3).add(phone3);

		setTimeout(function(){
			placeCellphoneLalita3.setTransform(
				Transform.translate(-800, 0, 0),
				{duration: 2000, curve: 'easeInOut'})
			placePhone3.setTransform(
				Transform.translate(-800, 0, 0),
				{duration: 2000, curve: 'easeInOut'})
		}, 12000);
		setTimeout(function(){
			placeCellphoneLalita3.setTransform(
				Transform.translate(-1600, 0, 0),
				{duration: 2000, curve: 'easeInOut'})
			placePhone3.setTransform(
				Transform.translate(-1600, 0, 0),
				{duration: 2000, curve: 'easeInOut'})
		}, 15500);
	}

	module.exports = LalitaVisitsMaya;

});