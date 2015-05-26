/* LalitaConfirmView_1_8.js -- Lalita sends a message that travels to Hari's*/

define(function(require, exports, module) {

	var View = require('famous/core/View');
	var Surface = require('famous/core/Surface');
	var Transform = require('famous/core/Transform');
	var StateModifier = require('famous/modifiers/StateModifier');
	var ImageSurface = require('famous/surfaces/ImageSurface');
	var Easing = require('famous/transitions/Easing');

   function LalitaConfirmView () {
   		View.apply(this, arguments);
   		_createHuts.call(this);
   		_createLalita.call(this);
   		_placeHari.call(this);
   		_createMovingTransitionBetweenScenes.call(this);   		
   }

   LalitaConfirmView.prototype = Object.create(View.prototype);
   LalitaConfirmView.prototype.constructor = LalitaConfirmView;

   LalitaConfirmView.prototype.returnCaptionArray = function() {
   		var captionText = ["Lalita checks in with Maya after the visits and reports that she completed the visit, and can also send text messages if she notices any danger signs."];
   		return captionText;	
   }

   LalitaConfirmView.DEFAULT_OPTIONS = {};


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
			transform: Transform.translate(580, -20, 0)
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

		//Moves elements on screen at a rate of 1 align per second.
		setTimeout(function(){
			placeHari.setAlign(
				[0, .5],
				{duration: 1500, curve: 'easeInOut'}
			);
			
			placeLaptop.setAlign(
				[0, 0.6],
				{duration: 1500, curve: 'easeInOut'}
			);
			
			place_health_center.setAlign(
				[.5, .5],
				{duration: 1500, curve: 'easeInOut'}
			);


		}, 2500);

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
			placeTree.setAlign([-1.3, .5], {duration: 3000, curve: 'easeInOut'});
			placeTree2.setAlign([-1.6, .6], {duration: 3000, curve: 'easeInOut'});
			placeTree3.setAlign([-1.9, .4], {duration: 3000, curve: 'easeInOut'});
		}, 2000);

	}


	function _createHuts() {

		var hut = new ImageSurface ({
			size : [700, 700],
			content: 'animation-assets/yurt-1.svg'
		});

		var placeHut= new StateModifier ({
			align : [.5, 0.5],
			origin : [0.3, 0.5],
			opacity: 1
		});
		placeHut.setTransform(Transform.behind);
		this.add(placeHut).add(hut);

		var chickens = new ImageSurface ({
			size : [150, 150],
			content: 'animation-assets/chickens.svg'
		});

		var placeChickens= new StateModifier ({
			align : [.3, 0.7],
			origin : [0.4, 0.0],
			opacity : 1,
			transform: Transform.behind
		});

		this.add(placeChickens).add(chickens);

		var maya = new ImageSurface ({
			size : [250, 250],
			content: 'animation-assets/mother_newborn.svg'
		});

		var placeMaya= new StateModifier ({
			align : [.2, 0.55],
			origin: [0.4, 0.0],
			opacity: 1
		});
		this.add(placeMaya).add(maya);


		placeMaya.setTransform(
			Transform.translate(300, 0, 0)
		);

		//Move huts, chickens, and Maya into position for the next scene.
		setTimeout(function(){
			placeMaya.setOpacity(1),
			placeMaya.setAlign([-2.8, 0.55], {duration : 2000, curve: 'easeInOut'}),
			placeChickens.setOpacity(1),
			placeChickens.setAlign([-2.7, 0.7], {duration : 2000, curve: 'easeInOut'}),
			placeHut.setOpacity(1),
			placeHut.setAlign([-2.5, 0.5], {duration : 2000, curve: 'easeInOut'})
		}, 2000);

	}



	function _createLalita() {

		var lalita = new ImageSurface ({
			size : [250, 250],
			content: 'animation-assets/chw-female-side-left.svg'
		});

		var placeLalita= new StateModifier ({
			align : [1.2, 0.55],
			origin: [0.4, 0.0],
			opacity: 1
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
			opacity: 1
		});

		placePhone.setTransform(
			Transform.translate(-585, 15, 0)
		);

		var message = new ImageSurface ({
			size : [1, 1],
			content: 'animation-assets/Message-icon-blank.png'
		});


		var placeMessage = new StateModifier ({
			align: [1.2, 0.55],
			origin: [0.4, 0.0],
			opacity: 1,
			transform: Transform.translate(-570 - 200,-100 + 200,1)
		});


		var moveMessage = new StateModifier();
		moveMessage.setTransform(
			Transform.translate(200, -200, 1),
			{duration: 1000, curve: 'easeInOut'}
		);

		var showMessage = new StateModifier();

		this.add(placeMessage).add(moveMessage).add(showMessage).add(message);
	
		setTimeout(function(){
			showMessage.setTransform(
			Transform.scale(100, 100, 1),
			{duration: 500, curve: Easing.outBack})
		}, 1000);


		//Move out Lalita and then add her cell phone.
		setTimeout(function(){
			placeLalita.setOpacity(1),
			placeLalita.setAlign([-1.8, 0.55], {duration : 2000, curve : 'easeInOut'}),
			placePhone.setAlign([-1.8, 0.55], {duration : 2000, curve : 'easeInOut'}),
			placeMessage.setAlign([0, 0.55], {duration : 2000, curve : 'easeInOut'}),
			placeMessage.setOrigin([0.0, 0], {duration : 2000, curve : 'easeInOut'}),
			placeMessage.setTransform(Transform.translate(870 - 200, -100 + 200, 0), {duration : 2000, curve : 'easeInOut'})
		}, 2000);

		this.add(placePhone).add(phone);
	}


	module.exports = LalitaConfirmView;

});