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
   		_placeHari.call(this);
   		_createMovingTransitionBetweenScenes.call(this);
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


    function _placeHari() {
    	//Picks up from previous scene to transition back to Lalita
    	var health_center = new ImageSurface ({
			size : [400, 500],
			content: 'animation-assets/rural-clinic-gold.svg'
		});

		var place_health_center= new StateModifier ({
			align : [0.5, 0.5],
			origin : [0.5, 0.5],
			opacity: 1,
			transform: Transform.behind
		});
		
		this.add(place_health_center).add(health_center);

		
		var hari = new ImageSurface ({
			size : [500, 240],
			content: 'animation-assets/i-chw-male50.svg'
		});


		var placeHari = new StateModifier ({
			align: [0.0, 0.5],
			origin: [0.0, -0.2],
			transform: Transform.translate(580, 0, 0)
		});

		this.add(placeHari).add(hari);

		var laptop_closed = new ImageSurface ({
			size : [100, 100],
			content: 'animation-assets/laptop-logo.svg'
		});

		var placeLaptop = new StateModifier ({
			align: [0.0, 0.6],
			origin: [0.0, -0.2],
			opacity: 1,
			transform: Transform.translate(870, -25, 0),
		});

		var moveBack = new StateModifier ({transform: Transform.behind});

		this.add(placeLaptop).add(moveBack).add(laptop_closed);

		//Moves elements off screen at a rate of 1 align per second.
		placeHari.setAlign(
			[1.5, .5],
			{duration: 1500, curve: 'easeInOut'}
		);
		
		placeLaptop.setAlign(
			[1.5, 0.6],
			{duration: 1500, curve: 'easeInOut'}
		);
		
		place_health_center.setAlign(
			[2, .5],
			{duration: 1500, curve: 'easeInOut'}
		);
    }

function _createMovingTransitionBetweenScenes() {

		//Initialize trees with 0 opacity

		var tree = new ImageSurface ({
			size : [500, 500],
			content: 'animation-assets/tree-1.svg'
		});

		var placeTree = new StateModifier ({
			align : [-.3, 0.5],
			origin : [0.4, 0.6],
			opacity : 0
		});
		this.add(placeTree).add(tree);


		var tree2 = new ImageSurface ({
			size : [500, 500],
			content: 'animation-assets/tree-1.svg'
		});

		var placeTree2 = new StateModifier ({
			align : [-.6, 0.6],
			origin : [0.4, 0.6],
			opacity: 0
		});
		this.add(placeTree2).add(tree2);


		var tree3 = new ImageSurface ({
			size : [400, 400],
			content: 'animation-assets/tree-1.svg'
		});

		var placeTree3 = new StateModifier ({
			align : [-.9, 0.4],
			origin : [0.4, 0.6],
			opacity: 0
		});
		this.add(placeTree3).add(tree3);

		//This function moves the trees at a rate of 1 align per second after setting their
		//opacities to 1. It could do this after a delay, but the delay is actually not 
		//needed to make the animations look fluid.
		setTimeout(function(){
			placeTree2.setOpacity(1);
			placeTree3.setOpacity(1);
			placeTree.setOpacity(1);
			placeTree.setAlign([1.8, .5], {duration: 3000, curve: 'easeInOut'});
			placeTree2.setAlign([1.5, .6], {duration: 3000, curve: 'easeInOut'});
			placeTree3.setAlign([1.2, .4], {duration: 3000, curve: 'easeInOut'});
		}, 0);

	}


	function _createHuts() {

		var hut = new ImageSurface ({
			size : [700, 700],
			content: 'animation-assets/yurt-1.svg'
		});

		var placeHut= new StateModifier ({
			align : [-2.5, 0.5],
			origin : [0.3, 0.5],
			opacity: 0
		});
		placeHut.setTransform(Transform.behind);
		this.add(placeHut).add(hut);

		var chickens = new ImageSurface ({
			size : [150, 150],
			content: 'animation-assets/chickens.svg'
		});

		var placeChickens= new StateModifier ({
			align : [-2.7, 0.7],
			origin : [0.4, 0.0],
			opacity : 0,
			transform: Transform.behind
		});

		this.add(placeChickens).add(chickens);

		var maya = new ImageSurface ({
			size : [250, 250],
			content: 'animation-assets/anc-trimester1.svg'
		});

		var placeMaya= new StateModifier ({
			align : [-2.8, 0.55],
			origin: [0.4, 0.0],
			opacity: 0
		});
		this.add(placeMaya).add(maya);


		placeMaya.setTransform(
			Transform.translate(300, 0, 0)
		);

		//Move huts, chickens, and Maya into position for the next scene.
		setTimeout(function(){
			placeMaya.setOpacity(1),
			placeMaya.setAlign([.2, 0.55], {duration : 2000, curve: 'easeOut'}),
			placeChickens.setOpacity(1),
			placeChickens.setAlign([.3, 0.7], {duration : 2000, curve: 'easeOut'}),
			placeHut.setOpacity(1),
			placeHut.setAlign([.5, 0.5], {duration : 2000, curve: 'easeOut'})
		}, 1000);

	}



	function _createLalita() {

		var lalita = new ImageSurface ({
			size : [250, 250],
			content: 'animation-assets/chw-female-side-left.svg'
		});

		var placeLalita= new StateModifier ({
			align : [-1.8, 0.55],
			origin: [0.4, 0.0],
			opacity: 0
		});

		placeLalita.setTransform(
			Transform.translate(-570, 0, 0)
		);

		this.add(placeLalita).add(lalita);

		var phone = new ImageSurface ({
			size : [25,25],
			content: 'animation-assets/phone_logo.svg'
		});

		var placePhone = new StateModifier ({
			align : [1.2, 0.55],
			origin: [0.4, 0.0],
			opacity: 0
		});

		placePhone.setTransform(
			Transform.translate(-585, 15, 0)
		);

		//Move in Lalita and then add her cell phone.
		setTimeout(function(){
			placeLalita.setOpacity(1),
			placeLalita.setAlign([1.2, 0.55], {duration : 2000, curve : 'easeOut'}),
			setTimeout(function(){placePhone.setOpacity(1, {duration : 1000, curve: 'easeInOut'})}, 2000);
		}, 1000);

		this.add(placePhone).add(phone);
	}


	module.exports = LalitaCellView;

});