/* BaseView */


define(function(require, exports, module) {

	var View = require('famous/core/View');
	var Surface = require('famous/core/Surface');
	var Transform = require('famous/core/Transform');
	var StateModifier = require('famous/modifiers/StateModifier');
	var ImageSurface = require('famous/surfaces/ImageSurface');
	//var HariIntroView = require('animation/HariIntroView'); 

   function BaseView () {
   		View.apply(this, arguments);

   		_createBackground.call(this);
   		//_createHuts.call(this);
   		//_createPath.call(this);
   }

   BaseView.prototype = Object.create(View.prototype);
   BaseView.prototype.constructor = BaseView;

   BaseView.DEFAULT_OPTIONS = {};


	function _createBackground() {
		var background = new ImageSurface ({
			//size : [undefined, undefined],
			content: 'animation-assets/scene-example-1.png'
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
			//transform: Transform.scale(2, 2, 2)
			//align: [-0.25, 0],
			//origin: [0, 0],
			//transform: Transform.behind
		});

		this.add(placeBackground).add(background);
		//this.add(placeMiddleground).add(middleground);
		//this.add(placeForeground).add(foreground);


	}

	function _createHuts() {
		var huts_one = new ImageSurface ({
			size : [150, 100],
			content: 'animation-assets/village-yurt.svg'
		});

		var place_huts_one = new StateModifier ({
			align : [0.4, 0.5],
			origin : [0.7, 0.5],
			transform : Transform.translate(0, 110, 0)
		});

		var huts_two = new ImageSurface ({
			size : [150, 100],
			content: 'animation-assets/village-yurt.svg'
		});

		var place_huts_two = new StateModifier ({
			align : [0.5, 0.5],
			origin : [0.5, 0.5],
			transform : Transform.translate(180, 110, 0)
		});

		var health_center = new ImageSurface ({
			size : [80, 50],
			content: 'animation-assets/rural-clinic-gold.svg'
		});

		var place_health_center= new StateModifier ({
			align : [0.5, 0.5],
			origin : [0.5, 0.5],
			transform : Transform.translate(520, 55, 0)
		});

		this.add(place_huts_one).add(huts_one);
		this.add(place_huts_two).add(huts_two);
		this.add(place_health_center).add(health_center);
	}


	function _createPath() {
		var path = new ImageSurface ({
			size : [950, 500],
			content: 'animation-assets/path-R-L.svg'
		});

		var placePath = new StateModifier ({
			align: [0.5, 0.55],
			origin: [0.5, 0.5],
			transform: Transform.translate(130, 165, 0)
		});

		this.add(placePath).add(path);

	}

	module.exports = BaseView;

});