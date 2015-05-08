/* ZoomOutIntroView -- YOU ARE NOT USING THIS ONE */


define(function(require, exports, module) {

	var View = require('famous/core/View');
	var Surface = require('famous/core/Surface');
	var Transform = require('famous/core/Transform');
	var StateModifier = require('famous/modifiers/StateModifier');
	var ImageSurface = require('famous/surfaces/ImageSurface');
	var Easing = require('famous/transitions/Easing');

	function ZoomOutIntroView () {
   		View.apply(this, arguments);
   		_createAndMoveBackground.call(this);
   		_createMovingTransitionBetweenScenes.call(this);
	}

   ZoomOutIntroView.prototype = Object.create(View.prototype);
   ZoomOutIntroView.prototype.constructor = ZoomOutIntroView;

   ZoomOutIntroView.prototype.returnCaptionArray = function() {
   		var captionText = ["Unfortunately, Maya lives X hours away from the nearest health provider, Hari’s clinic. She has never visited the clinic before."];
   		return captionText;	
   }

   ZoomOutIntroView.DEFAULT_OPTIONS = {};


	function _createAndMoveBackground() {
		var background = new ImageSurface ({
			size : [1300, 1200],
			content: 'animation-assets/scene-1.svg'
		});

		var middleground = new ImageSurface ({
			size : [1300, 1200],
			content: 'animation-assets/hills-middle-ground.svg'

		});

		var placeForeground = new StateModifier({
			align: [0.5, 0.3],
			origin: [0.4, 0.45],
			transform : Transform.translate(143, 30, 0),
		});

		var placeMiddleground = new StateModifier ({
			align: [0.5, 0.3],
			origin: [0.4, 0.45],
			transform : Transform.translate(143, 30, 0),
		});

		var foreground = new ImageSurface ({
			size : [1300, 1200],
			content: 'animation-assets/hills-foreground.svg'

		});

		var placeBackground = new StateModifier({
			align: [0.5, 0.3],
			origin: [0.3, 0.4],
		});

		this.add(placeBackground).add(background);
		this.add(placeMiddleground).add(middleground);
		this.add(placeForeground).add(foreground);

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


		placeForeground.setTransform(
			Transform.translate(-5000, 180, 0),
			{duration: 3000, curve: 'easeInOut'}
		);


		placeMiddleground.setTransform(
			Transform.translate(-5000, 180, 0),
			{duration: 3000, curve: 'easeInOut'}
		);

		placeBackground.setTransform(
			Transform.translate(-5000, 120, 0),
			{duration: 3000, curve: 'easeInOut'}
		);

		// placeForeground.setTransform(
		// 	Transform.scale(1.2, 1.3, 1),
		// 	{ duration : 1000, curve: Easing.outBack }
		// );

		// placeMiddleground.setTransform(
		// 	Transform.scale(1.2, 1.3, 1),
		// 	{ duration : 1000, curve: Easing.outBack }
		// );

		// placeBackground.setTransform(
		// 	Transform.scale(1.2, 1.3, 1),
		// 	{ duration : 1000, curve: Easing.outBack }
		// );
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
			Transform.translate(-3000, 0, 0),
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
			Transform.translate(-5000, 0, 0),
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

	module.exports = ZoomOutIntroView;

});





