/* 2.8 Tutorial 2 Slide 8 --  Two_EightCellView
TO DO: add a facebook esque bubble with the message on it that shows up on the phone
*/

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

   function Two_EightCellView () {
   		View.apply(this, arguments);
		_placeCellphone.call(this);	
   }

   Two_EightCellView.prototype = Object.create(View.prototype);
   Two_EightCellView.prototype.constructor = Two_EightCellView;

   Two_EightCellView.prototype.returnCaptionArray = function() {
   		var captionText = ["Once Lalita registers Maya, Medic Mobile also sends a pregnancy ID to her phone - every registered patient gets a unique ID number to keep track of all medical records."];
   		return captionText;	
   }

   Two_EightCellView.DEFAULT_OPTIONS = {};

   function _placeCellphone() {

   		//phone on the right
   		var surface = new ImageSurface ({
   			size : [540, 510],
   			content : 'animation-assets/phone_logo.svg',
   		});

   		var surfaceModifier = new StateModifier({
   			align : [0.5, 0.5],
   			origin : [0.5, 0.5],
   			transform: Transform.translate(0, 30, 0)
   		});

   		this.add(surfaceModifier).add(surface);

		//wrong or right input notification surface
		var background3 = new Surface({
   			size : [140, 60],
   			content : 'Thank you for registering Maya. Pregnancy ID is 12345',
   			properties : {
   				color : 'black',
   				textAlign : 'left',
   			}
   		});

   		var backgroundModifier3 = new StateModifier({
   			align : [0.5, 0.3],
   			origin : [0.43, 0.3],
   			transform : Transform.translate(0, 0, 0.0)
   		});

   		this.add(backgroundModifier3).add(background3);

   }


	module.exports = Two_EightCellView;

});