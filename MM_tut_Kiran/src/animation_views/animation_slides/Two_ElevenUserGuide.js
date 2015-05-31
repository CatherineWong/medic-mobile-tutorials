/* 2.1 Tutorial 2 slide 1 -- view where Lalita and Maya are chilling together */


define(function(require, exports, module) {

	var View = require('famous/core/View');
	var Surface = require('famous/core/Surface');
	var Transform = require('famous/core/Transform');
	var StateModifier = require('famous/modifiers/StateModifier');
	var ImageSurface = require('famous/surfaces/ImageSurface');
	var Easing = require('famous/transitions/Easing');

	var Transitionable = require('famous/transitions/Transitionable');
	var TransitionableTransform = require('famous/transitions/TransitionableTransform');
	var Modifier = require('famous/core/Modifier');	

   function Two_ElevenUserGuide () {
   		View.apply(this, arguments);
   		_placeHari.call(this);
   		_moveHari.call(this);
   		_moveandzoom.call(this);
   		_zoomInto.call(this);
   		_addGuide.call(this);
   }

   Two_ElevenUserGuide.prototype = Object.create(View.prototype);
   Two_ElevenUserGuide.prototype.constructor = Two_ElevenUserGuide;

   Two_ElevenUserGuide.prototype.returnCaptionArray = function() {
   		var captionText = ["After downloading Medic Mobile, Hari can refer back to the User Guide that comes with the Medic Mobile software to learn what these text messages look like, and how community health workers in the village need to respond."];
   		return captionText;	
   }

   Two_ElevenUserGuide.DEFAULT_OPTIONS = {};

	function _placeHari() {
		
		var hari = new ImageSurface ({
			size : [500, 240],
			content: 'animation-assets/nurse.svg'
		});


		this.placeHari = new StateModifier ({
			align: [0.5, 0.5],
			origin: [0.5, 0.5],
			transform: Transform.translate(520, 110, 0)
		});

		this.add(this.placeHari).add(hari);

		var laptop = new ImageSurface ({
			//size : [100, 100],
			opacity : 1,
			backgroundColor : 'White',
			content: 'animation-assets/laptop-logo.svg'
		});

		this.placeLaptop = new StateModifier ({
			align: [0.5, 0.5],
			origin: [0.5, 0.5],
			transform: Transform.translate(440, 0, 0),
		});

		

		this.sizeTransitionable = new Transitionable([100,100]);
		this.transitionableTransform = new TransitionableTransform();

		this.modifier = new Modifier({
			align: [0.5, 0.5],
			origin: [0.5, 0.5],
  			size: this.sizeTransitionable
		});

		this.add(this.modifier).add(this.placeLaptop).add(laptop);

    }
		

	function _moveHari() {
		

		this.placeHari.setTransform(
			Transform.translate(120, 110, 0),
			{duration: 2500, curve: 'easeInOut'}
		);



		this.placeLaptop.setTransform(
			Transform.translate(40, 0, 0),
			{duration: 2500, curve: 'easeInOut'}
		);
	}


	function _zoomInto() {

		this.placeHari.setTransform(
			Transform.translate(908,110,0),
			{ duration : 2500, curve: Easing.outBack }
		);

 	}

 	 function _moveandzoom() {
 		this.sizeTransitionable.set([100, 100], {duration : 2500});

 		this.sizeTransitionable.set([600, 600], {duration : 1000});
 	}

 	function _addGuide() {
 		var guide = new ImageSurface ({
 			size: [450, 270],
 			content:  'animation-assets/user_guide.png'
 		});

 		var placeGuide = new StateModifier ({
 			align: [0.5, 0.5],
			origin: [0.5, 0.5],
			transform: Transform.translate(40, -7, 1),
			opacity: 0
 		});

 		this.add(placeGuide).add(guide);

 		setTimeout(function(){
			placeGuide.setOpacity(1);
		}, 4000);
 	};

	module.exports = Two_ElevenUserGuide;

});