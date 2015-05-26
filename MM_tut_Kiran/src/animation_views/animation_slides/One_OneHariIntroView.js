/* Tutorial 1 Slide 1: HariIntroView -- view where Hari is first introduced. */


define(function(require, exports, module) {

	var View = require('famous/core/View');
	var Surface = require('famous/core/Surface');
	var Transform = require('famous/core/Transform');
	var StateModifier = require('famous/modifiers/StateModifier');
	var ImageSurface = require('famous/surfaces/ImageSurface');
	var Easing = require('famous/transitions/Easing');

   function One_OneHariIntroView () {
   		View.apply(this, arguments);
   		_createHuts.call(this);
   		_createHari.call(this);
   }

   One_OneHariIntroView.prototype = Object.create(View.prototype);
   One_OneHariIntroView.prototype.constructor = One_OneHariIntroView;

   One_OneHariIntroView.prototype.returnCaptionArray = function() {
   		var captionText = ["This is Hari. Hari is a nurse at a rural health post."];
   		return captionText;	
   }

   One_OneHariIntroView.DEFAULT_OPTIONS = {};

	function _createHuts() {

		var health_center = new ImageSurface ({
			size : [400, 500],
			content: 'animation-assets/rural-clinic-gold.svg'
		});

		var place_health_center= new StateModifier ({
			align : [0.5, 0.5],
			origin : [0.5, 0.5],
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
			content: 'animation-assets/nurse.svg'
		});

		var placeHari = new StateModifier ({
			align: [0.0, 0.5],
			origin: [0.0, -0.2]
		});

		var bringToFront = new StateModifier();
		bringToFront.setTransform(Transform.inFront);

		this.add(placeHari).add(bringToFront).add(hari);

		placeHari.setTransform(
			Transform.translate(700, 0, 0),
			{duration: 2000, curve: 'easeInOut'}
		);

	}

	module.exports = One_OneHariIntroView;

});