/* 2.3 Tutorial 2 Slide 3 -- transitions from Maya and Lalita to Hari with Medic Mobile! */


define(function(require, exports, module) {

	var View = require('famous/core/View');
	var Surface = require('famous/core/Surface');
	var Transform = require('famous/core/Transform');
	var StateModifier = require('famous/modifiers/StateModifier');
	var ImageSurface = require('famous/surfaces/ImageSurface');
	var Easing = require('famous/transitions/Easing');

   function Two_ThreeZoomToHariView () {
   		View.apply(this, arguments);
   		_placeHari.call(this);
   		_createMovingTransitionBetweenScenes.call(this);    		
   }

   Two_ThreeZoomToHariView.prototype = Object.create(View.prototype);
   Two_ThreeZoomToHariView.prototype.constructor = Two_ThreeZoomToHariView;

   Two_ThreeZoomToHariView.prototype.returnCaptionArray = function() {
   		var captionText = ["Back at the clinic, Hari can view these messages, along with information about the registered patients, using the Medic Mobile software on his computer."];
   		return captionText;	
   }

   Two_ThreeZoomToHariView.DEFAULT_OPTIONS = {};


    function _placeHari() {
    	//Picks up from previous scene to transition back to Lalita
    	var health_center = new ImageSurface ({
			size : [400, 500],
			content: 'animation-assets/rural-clinic-gold.svg'
		});

		var place_health_center= new StateModifier ({
			align : [2.0, 0.5],
			origin : [0.5, 0.5],
			opacity: 1,
			transform: Transform.behind
		});
		
		this.add(place_health_center).add(health_center);

		
		var hari = new ImageSurface ({
			size : [500, 240],
			content: 'animation-assets/nurse.svg'
		});


		var placeHari = new StateModifier ({
			align: [1.5, 0.5],
			origin: [0.0, -0.2],
			transform: Transform.translate(580, 0, 0)
		});

		this.add(placeHari).add(hari);

		var laptop = new ImageSurface ({
			size : [100, 100],
			content: 'animation-assets/laptop-logo.svg'
		});

		var placeLaptop = new StateModifier ({
			align: [1.5, 0.6],
			origin: [0.0, -0.2],
			opacity: 1,
			transform: Transform.translate(870, -25, 0),
		});

		var moveBack = new StateModifier ({transform: Transform.behind});

		this.add(placeLaptop).add(moveBack).add(laptop);

		//Moves elements off screen at a rate of 1 align per second.
		setTimeout(function(){
			placeHari.setAlign(
				[0, .5],
				{duration: 2000, curve: 'easeInOut'}
			);
			
			placeLaptop.setAlign(
				[0, 0.6],
				{duration: 2000, curve: 'easeInOut'}
			);
			
			place_health_center.setAlign(
				[.5, .5],
				{duration: 2000, curve: 'easeInOut'}
			);


		}, 1200);

    }

function _createMovingTransitionBetweenScenes() {

		//Initialize trees with 0 opacity

		var tree = new ImageSurface ({
			size : [500, 500],
			content: 'animation-assets/tree-1.svg'
		});

		var placeTree = new StateModifier ({
			align : [1.8, 0.5],
			origin : [0.4, 0.6],
			opacity : 0
		});
		this.add(placeTree).add(tree);


		var tree2 = new ImageSurface ({
			size : [500, 500],
			content: 'animation-assets/tree-1.svg'
		});

		var placeTree2 = new StateModifier ({
			align : [1.5, 0.6],
			origin : [0.4, 0.6],
			opacity: 0
		});
		this.add(placeTree2).add(tree2);


		var tree3 = new ImageSurface ({
			size : [400, 400],
			content: 'animation-assets/tree-1.svg'
		});

		var placeTree3 = new StateModifier ({
			align : [1.2, 0.4],
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
			placeTree.setAlign([-.3, .5], {duration: 3000, curve: 'easeInOut'});
			placeTree2.setAlign([-.6, .6], {duration: 3000, curve: 'easeInOut'});
			placeTree3.setAlign([-.9, .4], {duration: 3000, curve: 'easeInOut'});
		}, 100);

	}


	module.exports = Two_ThreeZoomToHariView;

});