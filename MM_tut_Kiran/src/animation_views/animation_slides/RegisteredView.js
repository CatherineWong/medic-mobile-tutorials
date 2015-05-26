/* RegisteredView.js*/

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

   function RegisteredView () {
   		View.apply(this, arguments);
   		_makeBackground.call(this);   				
   }

   RegisteredView.prototype = Object.create(View.prototype);
   RegisteredView.prototype.constructor = RegisteredView;

   RegisteredView.prototype.returnCaptionArray = function() {
   		var captionText = ["Great! Back at Hari’s clinic, his computer receives this text message, and Medic Mobile creates a new record for Maya. Hari can see all new registered patients in the “Reports” tab of the software."];
   		return captionText;	
   }

   RegisteredView.DEFAULT_OPTIONS = {};

   function _makeBackground() {

   		//gray surface on the left
   		var background = new Surface({
   			size : [605, 550],
   			//content : 'This is how it looks when a new patient is registered',
   			properties : {
   				color : 'black',
   				textAlign : 'left',
   				backgroundColor: 'gray'
   			}
   		});

   		var backgroundModifier = new StateModifier({
   			align : [0.5, 0.5],
   			origin : [1, 0.45],
   			transform : Transform.translate(0,8,-0.1)
   		});

   		this.add(backgroundModifier).add(background);


   		//white surface on the right
   		var background2 = new Surface({
   			size : [605, 550],
   			content : 'This is how it looks when a new patient is registered',
   			properties : {
   				color : 'black',
   				textAlign : 'left',
   				backgroundColor: 'white'
   			}
   		});

   		var backgroundModifier2 = new StateModifier({
   			align : [1, 0.5],
   			origin : [1, 0.45],
   			transform : Transform.translate(0,8,-0.1)
   		});

   		this.add(backgroundModifier2).add(background2);


   		//phone on the left
   		var surface = new ImageSurface ({
   			size : [690, 480],
   			content : 'animation-assets/phone_logo.svg',
   			properties : {
   				//backgroundColor : 'black'
   			}
   		});

   		var surfaceModifier = new StateModifier({
   			align : [0.5, 0.5],
   			origin : [0.5, 0.5],
   			transform: Transform.translate(-280, 60, 0)
   		});

   		this.add(surfaceModifier).add(surface);


   		//input surface
      var inputSurface = new InputSurface({
   			size : [100, 25],
            properties : {
               backgroundColor : 'gray'
            },
   			value : 'Message Sent!'
		});

		var surfaceModifier2 = new StateModifier({
   			align : [0.5, 0.5],
   			origin : [0.5, 0.5],
   			transform: Transform.translate(-270, 50, 0.1)
   		});

		this.add(surfaceModifier2).add(inputSurface);


		//submit form surface
		this.submitInputSurface = new SubmitInputSurface({
			size: [50, 45],
         properties : {
            backgroundColor : 'gray'
         },
			value : 'Send'
		});

		var surfaceModifier3 = new StateModifier({
   			align : [0.5, 0.5],
   			origin : [0.5, 0.5],
   			transform: Transform.translate(-280, 123, 0.1)
   		});

		this.add(surfaceModifier3).add(this.submitInputSurface);

		var input_str;


      var laptop = new ImageSurface ({
         size : [550, 600],
         content: 'animation-assets/laptop-logo.svg'
      });

      this.placeLaptop = new StateModifier ({
         align: [0.5, 0.5],
         origin: [0.5, 0.5],
         transform: Transform.translate(300, 0, 0)
      });
      
      this.add(this.placeLaptop).add(laptop);

	
         this.new_patient = new ImageSurface ({
            size : [380, 235],
            content : 'animation-assets/program_screenshot.png',
            properties : {
               color : 'black',
               textAlign : 'left',
               backgroundColor: 'white'
            }
         });

         var backgroundModifier5 = new StateModifier({
            align : [0.5, 0.5],
            origin : [1, 0.45],
            opacity : 1,
            transform : Transform.translate(490, -15, 0.2)
         });

         this.add(backgroundModifier5).add(this.new_patient);
   }

		

   module.exports = RegisteredView;

});