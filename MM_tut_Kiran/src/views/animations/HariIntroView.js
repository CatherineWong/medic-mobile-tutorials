/* HariIntroView -- view where Hari is first introduced. */


define(function(require, exports, module) {

	var View = require('famous/core/View');
	var Surface = require('famous/core/Surface');
	var Transform = require('famous/core/Transform');
	var StateModifier = require('famous/modifiers/StateModifier');
	var ImageSurface = require('famous/surfaces/ImageSurface');
	var Easing = require('famous/transitions/Easing');

   function HariIntroView () {
   		View.apply(this, arguments);
   		_createBackground.call(this);
   		_createHuts.call(this);
   		_createHari.call(this);
   }

   HariIntroView.prototype = Object.create(View.prototype);
   HariIntroView.prototype.constructor = HariIntroView;

   HariIntroView.prototype.returnCaptionArray = function() {
   		var captionText = ["This is Hari. Hari is the clinic director at a rural health post."];
   		return captionText;	
   }

   HariIntroView.DEFAULT_OPTIONS = {};


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
			align: [0.5, 0.5],
			origin: [0.6, 0.4]
		});

		this.add(placeBackground).add(background);
		this.add(placeMiddleground).add(middleground);
		this.add(placeForeground).add(foreground);


	}

	function _createHuts() {

		var health_center = new ImageSurface ({
			size : [400, 500],
			content: 'animation-assets/rural-clinic-gold.svg'
		});

		var place_health_center= new StateModifier ({
			align : [0.6, 0.5],
			origin : [0.1, 0.5],
			// sets initial x- and y-scale to be 0
			transform: Transform.scale(0, 0, 1),
			// sets inital opacity to 0
			opacity: 0
		});
		this.add(place_health_center).add(health_center);

		// animates x- and y-scale to 1
		place_health_center.setTransform(
			Transform.scale(1, 1, 1),
			{ duration : 1000, curve: Easing.outBack }
		);
		// animates opacity to 1
		place_health_center.setOpacity(1, {
			duration: 1000, curve: Easing.outBack
		});
	}



	function _createHari() {
		var hari = new ImageSurface ({
			size : [500, 240],
			content: 'animation-assets/i-chw-male50.svg'
		});

		var placeHari = new StateModifier ({
			align: [0.0, 0.5],
			origin: [0.0, -0.2]
		});

		this.add(placeHari).add(hari);

		placeHari.setTransform(
			Transform.translate(400, 0, 0),
			{duration: 2000, curve: 'easeInOut'}
		);

	}

	module.exports = HariIntroView;

});