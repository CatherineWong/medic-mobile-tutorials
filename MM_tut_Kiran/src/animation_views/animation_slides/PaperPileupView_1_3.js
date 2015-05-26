/* PaperPileupView*/


define(function(require, exports, module) {

	var View = require('famous/core/View');
	var Surface = require('famous/core/Surface');
	var Transform = require('famous/core/Transform');
	var StateModifier = require('famous/modifiers/StateModifier');
	var ImageSurface = require('famous/surfaces/ImageSurface');
	var Easing = require('famous/transitions/Easing');

   function PaperPileupView () {
   		View.apply(this, arguments);
   		//_createBackground.call(this);
   		_createHuts.call(this);
   		_createHari.call(this);
   		_addPaper.call(this);
   }

   PaperPileupView.prototype = Object.create(View.prototype);
   PaperPileupView.prototype.constructor = PaperPileupView;

   PaperPileupView.prototype.returnCaptionArray = function() {
   		var captionText = ["Dealing with these paper records alone could take up to 11-15 days a month."];
   		return captionText;	
   }

   PaperPileupView.DEFAULT_OPTIONS = {};


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
			content: 'animation-assets/nurse.svg'
		});

		var placeHari = new StateModifier ({
			align: [0.5, 0.5],
			origin: [0.5, 0.5],
			transform: Transform.translate(300, 150, 0)
		});

		this.add(placeHari).add(hari);

		placeHari.setTransform(
			Transform.translate(200, 150, 0),
			{duration: 1000, curve: Easing.easeInOut}
		);
	}

	var paper_pos = -220;
	var init_pos = -600;
	var base_pos = 100;

	function _addPaper() {

		//place pile 1
		var paper_pile = new ImageSurface ({
			size : [200, 200],
			content: 'animation-assets/paper-pile-no-logo.svg'
		});

		//870 for the right hand side


		var placePile = new StateModifier ({
			align: [0.5, 0.5],
			origin: [0.5, 0.5],
			opacity: 0,
			transform: Transform.translate(paper_pos, init_pos, 0)
		});

		this.add(placePile).add(paper_pile);

		placePile.setTransform(
			Transform.translate(paper_pos, init_pos, 0),
			{duration: 1000, curve: 'easeOut'}
		);


		placePile.setTransform(
			Transform.translate(paper_pos, base_pos + 150, 0),
			{duration: 500, curve: 'easeInOut'}
		);

		//placePile.setTransform(Transform.inFront);


		//place pile 2
		var paper_pile2 = new ImageSurface ({
			size : [200, 200],
			content: 'animation-assets/paper-pile-no-logo.svg'
		});


		var placePile2 = new StateModifier ({
			align: [0.5, 0.5],
			origin: [0.5, 0.5],
			transform: Transform.translate(paper_pos, init_pos, 0)
		});

		this.add(placePile2).add(paper_pile2);

		placePile2.setTransform(
			Transform.translate(paper_pos, init_pos, 0),
			{duration: 1500, curve: 'easeOut'}
		);

		placePile2.setTransform(
			Transform.translate(paper_pos, base_pos + 130, 1),
			{duration: 500, curve: 'easeInOut'}
		);


		//place pile 3
		var paper_pile3 = new ImageSurface ({
			size : [200, 200],
			content: 'animation-assets/paper-pile-no-logo.svg'
		});


		var placePile3 = new StateModifier ({
			align: [0.5, 0.5],
			origin: [0.5, 0.5],
			transform: Transform.translate(paper_pos, init_pos, 0)
			//transform: Transform.behind
		});

		this.add(placePile3).add(paper_pile3);

		placePile3.setTransform(
			Transform.translate(paper_pos, init_pos, 0),
			{duration: 2000, curve: 'easeOut'}
		);

		placePile3.setTransform(
			Transform.translate(paper_pos, base_pos + 100, 2),
			{duration: 500, curve: 'easeInOut'}
		);

		//placePile3.setTransform(Transform.inFront);

		//place pile 4
		var paper_pile4 = new ImageSurface ({
			size : [200, 200],
			content: 'animation-assets/paper-pile-no-logo.svg'
		});


		var placePile4 = new StateModifier ({
			align: [0.5, 0.5],
			origin: [0.5, .5],
			transform: Transform.translate(paper_pos, init_pos, 0)
			//transform: Transform.behind
		});

		this.add(placePile4).add(paper_pile4);

		placePile4.setTransform(
			Transform.translate(paper_pos, init_pos, 0),
			{duration: 2500, curve: 'easeOut'}
		);

		placePile4.setTransform(
			Transform.translate(paper_pos, base_pos + 70, 3),
			{duration: 500, curve: 'easeInOut'}
		);

		//placePile4.setTransform(Transform.inFront);

		//place pile 5
		var paper_pile5 = new ImageSurface ({
			size : [200, 200],
			content: 'animation-assets/paper-pile-no-logo.svg'
		});


		var placePile5 = new StateModifier ({
			align: [0.5, 0.5],
			origin: [0.5, 0.5],
			transform: Transform.translate(paper_pos, init_pos, 0)
			//transform: Transform.behind
		});


		this.add(placePile5).add(paper_pile5);

		placePile5.setTransform(
			Transform.translate(paper_pos, init_pos, 0),
			{duration: 3000, curve: 'easeOut'}
		);

		placePile5.setTransform(
			Transform.translate(paper_pos, base_pos + 50, 4),
			{duration: 500, curve: 'easeInOut'}
		);

		//placePile5.setTransform(Transform.inFront);

		//place pile 6
		var paper_pile6 = new ImageSurface ({
			size : [200, 200],
			content: 'animation-assets/paper-pile-no-logo.svg'
		});


		var placePile6 = new StateModifier ({
			align: [0.5, 0.5],
			origin: [0.5, 0.5],
			transform: Transform.translate(paper_pos, init_pos, 0)
			//transform: Transform.behind
		});

		this.add(placePile6).add(paper_pile6);

		placePile6.setTransform(
			Transform.translate(paper_pos, init_pos, 0),
			{duration: 3500, curve: 'easeOut'}
		);

		placePile6.setTransform(
			Transform.translate(paper_pos, base_pos + 30, 5),
			{duration: 500, curve: 'easeInOut'}
		);

		//placePile6.setTransform(Transform.inFront);

		//place pile 7
		var paper_pile7 = new ImageSurface ({
			size : [200, 200],
			content: 'animation-assets/paper-pile-no-logo.svg'
		});


		var placePile7 = new StateModifier ({
			align: [0.5, 0.5],
			origin: [0.5, 0.5],
			transform: Transform.translate(paper_pos, init_pos, 0)
			//transform: Transform.behind
		});

		this.add(placePile7).add(paper_pile7);

		placePile7.setTransform(
			Transform.translate(paper_pos, init_pos, 0),
			{duration: 4000, curve: 'easeOut'}
		);

		placePile7.setTransform(
			Transform.translate(paper_pos, base_pos + 0, 6),
			{duration: 500, curve: 'easeInOut'}
		);

		//placePile7.setTransform(Transform.inFront);

		//place pile 8
		var paper_pile8 = new ImageSurface ({
			size : [200, 200],
			content: 'animation-assets/paper-pile-no-logo.svg'
		});


		var placePile8 = new StateModifier ({
			align: [0.5, 0.5],
			origin: [0.5, 0.5],
			transform: Transform.translate(paper_pos, init_pos, 0)
			//transform: Transform.behind
		});

		this.add(placePile8).add(paper_pile8);

		placePile8.setTransform(
			Transform.translate(paper_pos, init_pos, 0),
			{duration: 4500, curve: 'easeOut'}
		);

		placePile8.setTransform(
			Transform.translate(paper_pos, base_pos + -30, 7),
			{duration: 500, curve: 'easeInOut'}
		);

		//placePile8.setTransform(Transform.inFront);

		//place pile 9
		var paper_pile9 = new ImageSurface ({
			size : [200, 200],
			content: 'animation-assets/paper-pile-no-logo.svg'
		});


		var placePile9 = new StateModifier ({
			align: [0.5, 0.5],
			origin: [0.5, 0.5],
			transform: Transform.translate(paper_pos, init_pos, 0)
			//transform: Transform.behind
		});

		this.add(placePile9).add(paper_pile9);

		placePile9.setTransform(
			Transform.translate(paper_pos, init_pos, 0),
			{duration: 5000, curve: 'easeOut'}
		);

		placePile9.setTransform(
			Transform.translate(paper_pos, base_pos + -50, 8),
			{duration: 500, curve: 'easeInOut'}
		);

		//placePile9.setTransform(Transform.inFront);

	}

	module.exports = PaperPileupView;

});