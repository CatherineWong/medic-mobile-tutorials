/* 2.9 -- Tutorial Two Slide 9: shows Lalita recording Maya's ID on her clipboard*/

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
	var SubmitInputSurface = require('famous/surfaces/SubmitInputSurface');
	var InputSurface = require('famous/surfaces/InputSurface');

   function Two_NineClipboardView () {
   		View.apply(this, arguments);
   		_placeClipboard.call(this);
         _changeClipboard.call(this);
   }

   Two_NineClipboardView.prototype = Object.create(View.prototype);
   Two_NineClipboardView.prototype.constructor = Two_NineClipboardView;

   Two_NineClipboardView.prototype.returnCaptionArray = function() {
   		var captionText = ["It’s very important that Lalita records this pregnancy ID, so that every time she visits Maya in the future, she can use the number to update the clinic on how Maya is doing and whether Maya has been completing her check ups."];
   		return captionText;	
   }

   Two_NineClipboardView.DEFAULT_OPTIONS = {};

   function _placeClipboard() {

         //phone on the right
         var surface = new ImageSurface ({
            size : [540, 510],
            content : 'animation-assets/CHW-clipboard-Lalita.svg',
         });

         var surfaceModifier = new StateModifier({
            align : [0.5, 0.5],
            origin : [0.5, 0.5],
            transform: Transform.translate(0, 30, 0)
         });

         this.add(surfaceModifier).add(surface);
   }

   function _changeClipboard() {

         var clipboard2 = new ImageSurface ({
            size : [540, 510],
            content : 'animation-assets/CHW-clipboard-LalitaWithMaya.svg',
         });

         var placeClipboard2 = new StateModifier({
            align : [0.5, 0.5],
            origin : [0.5, 0.5],
            opacity: 0,
            transform: Transform.translate(0, 30, 0)
         });

         this.add(placeClipboard2).add(clipboard2);

      setTimeout(function(){
         placeClipboard2.setOpacity(
            1,
            {duration: 1500, curve: 'easeInOut'}
         );
         
      }, 400);
   }


   module.exports = Two_NineClipboardView;

});








