/* Tutorial 1 Slide 4: ZoomOutTransitionView -- move the CHW + pregnant lady + village off, have some trees zoom by, jump over to where Hari is and zoom out! */


define(function(require, exports, module) {

	var View = require('famous/core/View');
	var Surface = require('famous/core/Surface');
	var Transform = require('famous/core/Transform');
	var StateModifier = require('famous/modifiers/StateModifier');
	var ImageSurface = require('famous/surfaces/ImageSurface');
	var Easing = require('famous/transitions/Easing');

	function One_FourZoomOutTransitionView () {
   		View.apply(this, arguments);
   		_createAndMoveBackground.call(this);
   		_createMovingTransitionBetweenScenes.call(this);
   		_finalZoom.call(this);
	}

   One_FourZoomOutTransitionView.prototype = Object.create(View.prototype);
   One_FourZoomOutTransitionView.prototype.constructor = One_FourZoomOutTransitionView;

   One_FourZoomOutTransitionView.prototype.returnCaptionArray = function() {
   		var captionText = ["Unfortunately, Maya lives 10 hours away from the nearest health provider, Hari’s clinic. She has never visited the clinic before."];
   		return captionText;	
   }

   One_FourZoomOutTransitionView.DEFAULT_OPTIONS = {};


	function _createAndMoveBackground() {

		var hut = new ImageSurface ({
			size : [700, 700],
			content: 'animation-assets/yurt-1.svg'
		});

		var placeHut= new StateModifier ({
			align : [0.5, 0.5],
			origin : [0.3, 0.5],
		});
		this.add(placeHut).add(hut);

		var chickens = new ImageSurface ({
			size : [150, 150],
			content: 'animation-assets/chickens.svg'
		});

		var placeChickens= new StateModifier ({
			align : [0.35, 0.8],
			origin : [0.9, 0.3],
		});
		this.add(placeChickens).add(chickens);

		var maya = new ImageSurface ({
			size : [250, 250],
			content: 'animation-assets/anc-trimester1.svg'
		});

		var placeMaya= new StateModifier ({
			align : [0.2, 0.55],
			origin: [0.4, 0.0]
		});
		this.add(placeMaya).add(maya);


		placeMaya.setTransform(
			Transform.translate(300, 0, 0),
			{duration: 10, curve: 'easeInOut'}
		);

		var lalita = new ImageSurface ({
			size : [250, 250],
			content: 'animation-assets/chw-nepali.svg'
		});

		var placeLalita= new StateModifier ({
			align : [1.2, 0.55],
			origin: [0.4, 0.0]
		});
		this.add(placeLalita).add(lalita);


		placeLalita.setTransform(
			Transform.translate(-570, 0, 0),
			{duration: 10, curve: 'easeInOut'}
		);

		placeLalita.setTransform(
			Transform.translate(-3000, 0, 0),
			{duration: 2000, curve: 'easeInOut'}
		);

		placeMaya.setTransform(
			Transform.translate(-3000, 0, 0),
			{duration: 2000, curve: 'easeInOut'}
		);

		placeChickens.setTransform(
			Transform.translate(-1000, 0, 0),
			{duration: 1000, curve: 'easeInOut'}
		);

		placeHut.setTransform(
			Transform.translate(-2000, 0, 0),
			{duration: 1000, curve: 'easeInOut'}
		);
	}

	function _createMovingTransitionBetweenScenes() {

		var tree = new ImageSurface ({
			size : [500, 500],
			content: 'animation-assets/tree-1.svg'
		});

		var placeTree = new StateModifier ({
			align : [2.2, 0.5],
			origin : [0.4, 0.6],
		});
		this.add(placeTree).add(tree);

		placeTree.setTransform(
			Transform.translate(-4000, 0, 0),
			{duration: 3000, curve: 'easeInOut'}
		);

		var tree2 = new ImageSurface ({
			size : [500, 500],
			content: 'animation-assets/tree-1.svg'
		});

		var placeTree2 = new StateModifier ({
			align : [2.5, 0.6],
			origin : [0.4, 0.6],
		});
		this.add(placeTree2).add(tree2);

		placeTree2.setTransform(
			Transform.translate(-6000, 0, 0),
			{duration: 3000, curve: 'easeInOut'}
		);

		var tree3 = new ImageSurface ({
			size : [500, 500],
			content: 'animation-assets/tree-1.svg'
		});

		var placeTree3 = new StateModifier ({
			align : [2.8, 0.4],
			origin : [0.4, 0.6],
		});
		this.add(placeTree3).add(tree3);

		placeTree3.setTransform(
			Transform.translate(-6000, 0, 0),
			{duration: 3000, curve: 'easeInOut'}
		);

	}

	//Zooms to Hari YAY Finally
	function _finalZoom() {

		var background = new ImageSurface ({
			size : [1800, 1800],
			content: 'animation-assets/tutorialIntroBackgroundScene.svg'
		});
		var placeBackground = new StateModifier({
			align: [0.6, 0.56],
			origin: [0.78, 0.49],
			opacity: 0,
			transform : Transform.scale(1, 1, 1),
			transform : Transform.translate(0, 0 ,0),
		});

		this.add(placeBackground).add(background);

		setTimeout(function(){
			placeBackground.setOpacity(1, 
				{duration: 1000, curve: 'easeInOut'}
			);


			placeBackground.setTransform(
				Transform.scale(4, 4, 1),
				{ duration : 2000, curve: Easing.outBack }
			);

			placeBackground.setTransform(
				Transform.translate(400, 0, 0),
				{duration: 2000, curve: 'easeInOut'}
			);

		}, 2000);

	}

	module.exports = One_FourZoomOutTransitionView;

});





