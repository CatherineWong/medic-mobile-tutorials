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

   function Two_TwelveMessageView () {
   		View.apply(this, arguments);
   		_placeLaptop.call(this);
   		_addGuide.call(this);
   }

   Two_TwelveMessageView.prototype = Object.create(View.prototype);
   Two_TwelveMessageView.prototype.constructor = Two_TwelveMessageView;

   Two_TwelveMessageView.prototype.returnCaptionArray = function() {
   		var captionText = ["Back at the clinic, Hari can also send text messages to community health workers directly from his computer using the Messages tab."];
   		return captionText;	
   }

   Two_TwelveMessageView.DEFAULT_OPTIONS = {};

	function _placeLaptop() {
	
		var laptop = new ImageSurface ({
			size : [600, 600],
			opacity : 1,
			backgroundColor : 'White',
			content: 'animation-assets/laptop-logo.svg'
		});

		this.placeLaptop = new StateModifier ({
			align: [0.5, 0.5],
			origin: [0.5, 0.5],
			transform: Transform.translate(40, 0, 0),
		});

		
		this.add(this.placeLaptop).add(laptop);

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
			opacity: 1
 		});

 		this.add(placeGuide).add(guide);

 		setTimeout(function(){
			guide.setContent('animation-assets/message_page.png');
		}, 500);
 	};

	module.exports = Two_TwelveMessageView;

});