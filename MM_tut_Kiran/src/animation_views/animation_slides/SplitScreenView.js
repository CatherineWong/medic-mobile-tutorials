/* SplitScreenView.js*/

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

   function SplitScreenView () {
   		View.apply(this, arguments);
   		_createLalita.call(this);
   		_placeHari.call(this);
   		_moveBoth.call(this);
   		_zoomInto.call(this);
   		_moveandzoom.call(this);		
   }

   SplitScreenView.prototype = Object.create(View.prototype);
   SplitScreenView.prototype.constructor = SplitScreenView;

   SplitScreenView.prototype.returnCaptionArray = function() {
   		var captionText = ["Let’s take a look at how Lalita can use her phone to register new patients, and how that information is stored at the clinic using Medic Mobile."];
   		return captionText;	
   }

   SplitScreenView.DEFAULT_OPTIONS = {};


    function _placeHari() {


    	//white surface on the left
   		var background = new Surface({
   			size : [605, 550],
   			//content : 'To register Maya, you should type “R 5 Maya” into the phone below',
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


   		//gray surface on the right
   		var background2 = new Surface({
   			size : [605, 550],
   			//content :'animation-assets/phone_logo.svg'
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

    	var background = new Surface({
    		size : [800, 800],
    		background : 'Black' 
    	});
    	
    	this.add(background);
		
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
  			//transform: this.transitionableTransform
  			//content : 'animation-assets/chw-female-clipboard.svg'
		});

		//sizeTransitionable.set([200, 200], {duration: 1000});
		//transitionableTransform.setTranslate([100, 100, 0]);

		this.add(this.modifier).add(this.placeLaptop).add(laptop);

    }





	function _createLalita() {

		var lalita = new ImageSurface ({
			size : [250, 250],
			content: 'animation-assets/chw-female-side.svg'
		});

		this.placeLalita= new StateModifier ({
			align : [0.5, 0.5],
			origin: [0.5, 0.5]
		});

		this.placeLalita.setTransform(
			Transform.translate(-470, 110, 0)
		);

		this.add(this.placeLalita).add(lalita);

		var phone = new ImageSurface ({
			//size : [45,45],
			content: 'animation-assets/phone_logo.svg'
		});

		this.placePhone = new StateModifier ({
			align : [0.5, 0.5],
			origin: [0.5, 0.5]
		});

		this.placePhone.setTransform(
			Transform.translate(-445, 0, 0)
		);

		

		this.sizeTransitionable2 = new Transitionable([45,45]);
		this.transitionableTransform2 = new TransitionableTransform();

		this.modifier2 = new Modifier({
			align: [0.5, 0.5],
			origin: [0.5, 0.5],
  			size: this.sizeTransitionable2
  			//transform: this.transitionableTransform2
  			//content : 'animation-assets/chw-female-clipboard.svg'
		});

		//sizeTransitionable.set([200, 200], {duration: 1000});
		//transitionableTransform.setTranslate([100, 100, 0]);

		this.add(this.modifier2).add(this.placePhone).add(phone);

	}

	function _moveBoth() {

		//this.transitionableTransform.setTranslate([40, 0, 0], {duration: 2500});
		//this.transitionableTransform2.setTranslate([-40,0,0], {duration: 2500});


		this.placeLalita.setTransform(
			Transform.translate(-80, 110, 0),
			{duration: 2500, curve: 'easeInOut'}
		);


		this.placePhone.setTransform(
			Transform.translate(-40, 0, 0),
			{duration: 2500, curve: 'easeInOut'}
		);

		

		this.placeHari.setTransform(
			Transform.translate(160, 110, 0),
			{duration: 2500, curve: 'easeInOut'}
		);



		this.placeLaptop.setTransform(
			Transform.translate(80, 0, 0),
			{duration: 2500, curve: 'easeInOut'}
		);
	}
 
 	function _zoomInto() {
 		this.placeLalita.setTransform(
			Transform.translate(-808,110,0),
			{ duration : 2500, curve: Easing.outBack }
		);

		/*this.placeLalita.setTransform(
			Transform.translate(-508, 110, 0),
			{duration: 2000, curve: 'easeInOut'}
		);*/		

		this.placePhone.setTransform(
			Transform.translate(-280, 0, 0),
			{duration: 2500}
		);

		this.placeLaptop.setTransform(
			Transform.translate(300, 0, 0),
			{duration: 2500}
		);

		/*this.placePhone.setTransform(
			Transform.scale(4, 1, 1),
			//Transform.translate(-240, 0, 0),
			{ duration : 2500, curve: Easing.outBack }
		);*/

		

		this.placeHari.setTransform(
			Transform.translate(908,110,0),
			{ duration : 2500, curve: Easing.outBack }
		);

		/*this.transitionableTransform.setTranslate([40, 0, 0], {duration: 2500});
		this.sizeTransitionable.set([100, 100], {duration: 500});


		this.transitionableTransform.setTranslate([240, 0, 0], {duration: 2000});
		this.sizeTransitionable.set([400, 400], {duration: 2000});*/



		/*this.placeLaptop.setTransform(
			Transform.scale(4, 1, 1),
			//Transform.translate(240, 0, 0),
			{ duration : 2500, curve: Easing.outBack }
		);*/
 	}

 	function _moveandzoom() {
 		this.sizeTransitionable.set([100, 100], {duration : 3500});
 		this.sizeTransitionable2.set([45, 45], {duration : 3500});

 		this.sizeTransitionable.set([550, 600], {duration : 1500});
 		this.sizeTransitionable2.set([540, 470], {duration : 1500});


 		//this.transitionableTransform.setTranslate([40, 0, 0], {duration: 2500});
 		//this.transitionableTransform2.setTranslate([-40, 0, 0], {duration: 2500});
 	}

	module.exports = SplitScreenView;

});