/* LongDistanceView */


define(function(require, exports, module) {

	var View = require('famous/core/View');
	var Surface = require('famous/core/Surface');
	var Transform = require('famous/core/Transform');
	var StateModifier = require('famous/modifiers/StateModifier');
	var ImageSurface = require('famous/surfaces/ImageSurface');

	var Transitionable = require('famous/transitions/Transitionable');
	var TransitionableTransform = require('famous/transitions/TransitionableTransform');
	var Modifier = require('famous/core/Modifier');

	var Easing = require('famous/transitions/Easing');

   function LongDistanceView () {
   		View.apply(this, arguments);

   		//_createBackground.call(this);
   		_createHuts.call(this);
   		_createPath.call(this);
   		_addAnimation.call(this);
   		_runAnimation.call(this);
   		//_goRoad.call(this);
   }

   LongDistanceView.prototype = Object.create(View.prototype);
   LongDistanceView.prototype.constructor = LongDistanceView;

   LongDistanceView.DEFAULT_OPTIONS = {};

    LongDistanceView.prototype.returnCaptionArray = function() {
   		var captionText = ["Before Medic Mobile, Lalita uses paper record to register pregnant women in her village"];
   		return captionText;	
   }


	function _createBackground() {
		var background = new ImageSurface ({
			size : [undefined, undefined],
			//size : [1600, 1400],
			content: 'animation-assets/scene-background-repeat-h.svg'
			//content: 'animation-assets/scene-1.svg'
		});

		 var middleground = new ImageSurface ({
		 	size : [950, 700],
		 	content: 'animation-assets/hills-middle-ground.svg'

		 });

		var placeForeground = new StateModifier({
		 	align: [0.5, 0.5],
		 	origin: [0.5, 0.5],
		 	transform : Transform.translate(150, 30, 0)
		});

		var placeMiddleground = new StateModifier ({
		 	align: [0.5, 0.5],
		 	origin: [0.5, 0.5],
		 	transform : Transform.translate(150, 30, 0)
		 });

		var foreground = new ImageSurface ({
		 	size : [950, 700],
		 	content: 'animation-assets/hills-foreground.svg'

		});

		var placeBackground = new StateModifier({
			/*transform: Transform.scale(4, 0, 0),
			origin : [0, 0],
			align : [-0.5, 0.5]
			align: [-0.25, 0],
			origin: [0, 0],*/
			transform: Transform.scale(8, 4, 0),
			align: [-0.25, 0],
			origin: [0, 0],
			transform: Transform.front
		});

		this.add(placeBackground).add(background);
		//this.add(placeMiddleground).add(middleground);
		//this.add(placeForeground).add(foreground);

		/*placeBackground.setTransform(
			Transform.scale(4, 4, 1),
			{ duration : 2000, curve: Easing.outBack }
		);

		placeBackground.setTransform(
			Transform.translate(400, 0, 0),
			{duration: 2000, curve: 'easeInOut'}
		);*/


	}

	function _createHuts() {
		var huts_one = new ImageSurface ({
			size : [200, 140],
			content: 'animation-assets/village-yurt.svg'
		});

		var place_huts_one = new StateModifier ({
			align : [0.4, 0.5],
			origin : [0.7, 0.5],
			transform : Transform.translate(-150, 70, 0)
		});

		var huts_two = new ImageSurface ({
			size : [200, 140],
			content: 'animation-assets/village-yurt.svg'
		});

		var place_huts_two = new StateModifier ({
			align : [0.5, 0.5],
			origin : [0.5, 0.5],
			transform : Transform.translate(30, 70, 0)
		});

		var health_center = new ImageSurface ({
			size : [80, 50],
			content: 'animation-assets/rural-clinic-gold.svg'
		});

		var place_health_center= new StateModifier ({
			align : [0.5, 0.5],
			origin : [0.5, 0.5],
			transform : Transform.translate(380, 15, 0)
		});

		this.add(place_huts_one).add(huts_one);
		this.add(place_huts_two).add(huts_two);
		this.add(place_health_center).add(health_center);
	}


	function _createPath() {
		var path = new ImageSurface ({
			size : [930, 500],
			content: 'animation-assets/path-R-L.svg'
		});

		var placePath = new StateModifier ({
			align: [0.5, 0.55],
			origin: [0.5, 0.5],
			transform: Transform.translate(5, 125, 0)
		});

		this.add(placePath).add(path);

	}

	function _addAnimation() {
		var preg_wom = new ImageSurface ({
			size : [70, 70],
			content: 'animation-assets/anc-trimester1.svg'
		});

		var placePreg_wom = new StateModifier ({
			align: [0.5, 0.55],
			origin: [0.5, 0.5],
			transform: Transform.translate(-200, 75, 0)
		});

		this.add(placePreg_wom).add(preg_wom);

		var preg_wom2 = new ImageSurface ({
			size : [70, 70],
			content: 'animation-assets/anc-trimester2.svg'
		});

		var placePreg_wom2 = new StateModifier ({
			align: [0.5, 0.55],
			origin: [0.5, 0.5],
			transform: Transform.translate(145, 85, 0)
		});

		this.add(placePreg_wom2).add(preg_wom2);

		var preg_wom3 = new ImageSurface ({
			size : [40, 40],
			content: 'animation-assets/anc-trimester2.svg'
		});

		var placePreg_wom3 = new StateModifier ({
			align: [0.5, 0.55],
			origin: [0.5, 0.5],
			transform: Transform.translate(125, 15, 0)
		});

		this.add(placePreg_wom3).add(preg_wom3);

		/*var chw = new ImageSurface ({
			size : [40, 40],
			content: 'animation-assets/chw-female-clipboard.svg'
		});*/

		var chw = new ImageSurface({
			//size : [40, 40],
			content : 'animation-assets/chw-female-clipboard.svg'
		});

		var placeCHW = new Modifier ({
			align: [0.5, 0.55],
			origin: [0.5, 0.5],
			transform: Transform.translate(145, 15, 0)
		});


		this.sizeTransitionable = new Transitionable([40,40]);
		this.transitionableTransform = new TransitionableTransform();

		this.modifier = new Modifier({
			align: [0.5, 0.55],
			origin: [0.5, 0.5],
  			size: this.sizeTransitionable,
  			transform: this.transitionableTransform
  			//content : 'animation-assets/chw-female-clipboard.svg'
		});

		//sizeTransitionable.set([200, 200], {duration: 1000});
		//transitionableTransform.setTranslate([100, 100, 0]);

		this.add(this.modifier).add(placeCHW).add(chw);


		/*var placeCHW = new StateModifier ({
			align: [0.5, 0.55],
			origin: [0.5, 0.5],
			transform: Transform.translate(145, 15, 0)
			//transform: Transform.rotateY(10);
		});


		this.chwModifier = new StateModifier();

		this.add(this.chwModifier).add(placeCHW).add(chw);*/

	}


	function _runAnimation() {

		//go to next woman
		this.sizeTransitionable.set([70, 70], {duration: 2000});
		this.transitionableTransform.setTranslate([55, 70, 0], {duration: 2000});

		//pause
		//this.transitionableTransform.setTranslate([55, 70, 0], {duration: 1000});

		//go to next woman	
		this.transitionableTransform.setTranslate([-300, 70, 0], {duration: 2000});

		//pause
		this.transitionableTransform.setTranslate([-300, 70, 0], {duration: 1000});

		//go to road		
		this.transitionableTransform.setTranslate([-300, 150, 0], {duration: 1000});
		this.sizeTransitionable.set([70, 70], {duration: 5000});

		this.transitionableTransform.setTranslate([55, 150, 0], {duration: 1000});

		this.transitionableTransform.setTranslate([275, 30, 0], {duration: 1000});
		this.sizeTransitionable.set([50, 50], {duration: 1000});

		//turn1
		this.transitionableTransform.setTranslate([205, 15, 0], {duration: 1000});
		this.sizeTransitionable.set([40, 40], {duration: 1000});

		//turn2
		this.transitionableTransform.setTranslate([290, 7, 0], {duration: 1000});
		this.sizeTransitionable.set([30, 30], {duration: 1000});

		//turn3
		this.transitionableTransform.setTranslate([245, -10, 0], {duration: 1000});
		this.sizeTransitionable.set([30, 30], {duration: 1000});

	}

	function _goRoad() {
		this.transitionableTransform.setTranslate([-300, 150, 0], {duration: 1000});
		this.sizeTransitionable.set([80, 80], {duration: 1000});
	}



	/*function _runAnimation() {


		/*this.chwModifier.transformFrom(function() {
  			var scaleX = 5;
  			var scaleY = 5;
  			return Transform.scale(scaleX, scaleY);
		});

		this.chwModifier.setTransform( Transform.translate(55, 70, 0),{
			duration: 2000, 
			curve: 'easeOut'
		});

		//this.chwModifier.setTransform(Transform.scale(4,4,0));
		this.chwModifier.setTransform(Transform.translate(55, 70, 0), {
            duration: 1000,
            curve: 'easeOut'
        });

        this.chwModifier.setTransform(Transform.translate(55, 70, 0), {
            duration: 500,
            curve: 'easeOut'
        });

        this.chwModifier.setTransform(Transform.scale(2.0, 2.0));

        this.chwModifier.setTransform(Transform.translate(-180, 75, 0), {
            duration: 1000,
            curve: 'easeOut'
        });
	}*/

	module.exports = LongDistanceView;

});