/* RegisterView.js*/

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

   function RegisterView () {
   		View.apply(this, arguments);
   		_makeBackground.call(this);
   		//_getInput.call(this);

   				
   }

   RegisterView.prototype = Object.create(View.prototype);
   RegisterView.prototype.constructor = RegisterView;

   RegisterView.prototype.returnCaptionArray = function() {
   		var captionText = ["Let’s have you try to register a patient."];
   		return captionText;	
   }

   RegisterView.DEFAULT_OPTIONS = {};

   function _makeBackground() {

   		//white surface on the left
   		var background = new Surface({
   			size : [605, 520],
   			content : 'To register Maya, you should type “R 5 Maya” into the phone below',
   			properties : {
   				color : 'black',
   				textAlign : 'left',
   				backgroundColor: 'white'
   			}
   		});

   		var backgroundModifier = new StateModifier({
   			align : [0.5, 0.5],
   			origin : [1, 0.45],
   			transform : Transform.translate(0,0,-0.1)
   		});

   		this.add(backgroundModifier).add(background);


   		//gray surface on the right
   		var background2 = new Surface({
   			size : [605, 524],
   			//content :'animation-assets/phone_logo.svg'
   			properties : {
   				color : 'black',
   				textAlign : 'left',
   				backgroundColor: 'gray'
   			}
   		});

   		var backgroundModifier2 = new StateModifier({
   			align : [1, 0.5],
   			origin : [1, 0.45],
   			transform : Transform.translate(0,0,-0.1)
   		});

   		this.add(backgroundModifier2).add(background2);


   		//phone on the right
   		var surface = new ImageSurface ({
   			size : [540, 510],
   			content : 'animation-assets/phone_logo.svg',
   			properties : {
   				//backgroundColor : 'black'
   			}
   		});

   		var surfaceModifier = new StateModifier({
   			align : [0.5, 0.5],
   			origin : [0.5, 0.5],
   			transform: Transform.translate(325, 30, 0)
   		});

   		this.add(surfaceModifier).add(surface);


   		//input surface
   		var inputSurface = new InputSurface({
   			size : [200, 20]
   			//value : 'hello'
		});

		var surfaceModifier2 = new StateModifier({
   			align : [0.5, 0.5],
   			origin : [0.5, 0.5],
   			transform: Transform.translate(-490, -200, 0.00001)
   		});

		this.add(surfaceModifier2).add(inputSurface);


		//submit form surface
		this.submitInputSurface = new SubmitInputSurface({
			size: [100, 50],
			value : 'Submit'
		});

		var surfaceModifier3 = new StateModifier({
   			align : [0.5, 0.5],
   			origin : [0.5, 0.5],
   			transform: Transform.translate(-480, -150, 0.00001)
   		});

		this.add(surfaceModifier3).add(this.submitInputSurface);

		var input_str;

		//wrong or right input notification surface
		var background3 = new Surface({
   			size : [205, 50],
   			content : '',
   			properties : {
   				color : 'black',
   				textAlign : 'left',
   				backgroundColor: 'white'
   			}
   		});

   		var backgroundModifier3 = new StateModifier({
   			align : [0.5, 0.5],
   			origin : [1, 0.45],
   			transform : Transform.translate(-180, -188, 0.00001)
   		});

   		this.add(backgroundModifier3).add(background3);


   		//prompt message on the phone
   		var background4 = new Surface({
   			size : [105, 30],
   			content : '',
   			properties : {
   				color : 'black',
   				textAlign : 'left'
   				//backgroundColor: 'gray'
   			}
   		});

   		var backgroundModifier4 = new StateModifier({
   			align : [0.5, 0.5],
   			origin : [1, 0.45],
   			transform : Transform.translate(370, -135, 0.2)
   		});

   		this.add(backgroundModifier4).add(background4);

		this.submitInputSurface.on('click', function() {
   			console.log('clicked');

            if (inputSurface.getValue() == 'R 5 Maya') {
            	console.log('value got');
            	input_str = inputSurface.getValue();
            	background3.setContent('Well done. Message sent!!!');
            	background4.setContent('R 5 Maya');
            } else {
            	console.log('wrong value');
            	background3.setContent('Wrong input. Please Enter again');
            }
        });

   }



   /*

   function _welldone() {
   		var background3 = new Surface({
   			size : [205, 50],
   			content : 'Well done',
   			properties : {
   				color : 'black',
   				textAlign : 'left',
   				backgroundColor: 'white'
   			}
   		});

   		var backgroundModifier3 = new StateModifier({
   			align : [0.5, 0.5],
   			origin : [1, 0.45],
   			transform : Transform.translate(-180, -188)
   		});

   		this.add(backgroundModifier3).add(background3);
   }


   function _enteragain() {
   		var background4 = new Surface({
   			size : [205, 50],
   			content : 'Wrong entry. Please enter again.',
   			properties : {
   				color : 'black',
   				textAlign : 'left',
   				backgroundColor: 'white'
   			}
   		});

   		var backgroundModifier4 = new StateModifier({
   			align : [0.5, 0.5],
   			origin : [1, 0.45],
   			transform : Transform.translate(-180, -188)
   		});

   		this.add(backgroundModifier4).add(background4);
   }

   function _getInput() {
   		var input_str;
   		//while (true) {
   		this.submitInputSurface.on('click', function() {
   			console.log('clicked');
            if (this.inputSurface.getValue()!= 'R 5 Maya') {
            	console.log('value got');
            	this.submitInputSurface.setValue('Well done');
            }
        });
   }
   */ 

   module.exports = RegisterView;

});