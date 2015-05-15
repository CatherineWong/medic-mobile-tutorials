/* HariLaptopView -- where Hari opens a laptop*/


define(function(require, exports, module) {

	var View = require('famous/core/View');
	var Surface = require('famous/core/Surface');
	var Transform = require('famous/core/Transform');
	var StateModifier = require('famous/modifiers/StateModifier');
	var ImageSurface = require('famous/surfaces/ImageSurface');
	var Easing = require('famous/transitions/Easing');

   function HariLaptopView () {
   		View.apply(this, arguments);
   		//_createBackground.call(this);
   		_createHuts.call(this);
   		_createHari.call(this);
   		_addLaptop.call(this);
   }

   HariLaptopView.prototype = Object.create(View.prototype);
   HariLaptopView.prototype.constructor = HariLaptopView;

   HariLaptopView.prototype.returnCaptionArray = function() {
   		var captionText = ["Now, Hari’s clinic uses Medic Mobile software to keep track of pregnancies in Maya’s village."];
   		return captionText;	
   }

   HariLaptopView.DEFAULT_OPTIONS = {};


	function _createHuts() {

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
	}



	function _createHari() {
		var hari = new ImageSurface ({
			size : [500, 240],
			content: 'animation-assets/i-chw-male50.svg'
		});

		var placeHari = new StateModifier ({
			align: [0.0, 0.5],
			origin: [0.0, -0.2],
			transform: Transform.translate(700, 0, 0)
		});

		this.add(placeHari).add(hari);

		placeHari.setTransform(
			Transform.translate(580, 0, 0),
			{duration: 1000, curve: Easing.easeInOut}
		);
	}

	function _addLaptop() {

		var laptop_closed = new ImageSurface ({
			size : [100, 100],
			content: 'animation-assets/laptop-closed.svg'
		});


		var placeLaptop = new StateModifier ({
			align: [0.0, 0.6],
			origin: [0.0, -0.2],
			opacity: 0,
			transform: Transform.translate(870, 0, 0),
			//transform: Transform.behind
		});

		var moveBack = new StateModifier ({transform: Transform.behind});

		this.add(placeLaptop).add(moveBack).add(laptop_closed);
		//Change the opacity after Hari walks by to reveal the laptop
		setTimeout(function(){placeLaptop.setOpacity(1);}, 400);

		setTimeout(function(){
			laptop_closed.setContent('animation-assets/laptop-logo.svg'),
			placeLaptop.setTransform(Transform.translate(870,-25,0))
			}, 750);
	}

	module.exports = HariLaptopView;

});