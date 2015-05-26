/* 2.10 --

TO DO: add a message that says "Time for you to visit the clinic"? */


define(function(require, exports, module) {

   var View = require('famous/core/View');
   var Surface = require('famous/core/Surface');
   var Transform = require('famous/core/Transform');
   var Transitionable = require('famous/transitions/Transitionable');
   var TransitionableTransform = require('famous/transitions/TransitionableTransform');
   var Modifier = require('famous/core/Modifier');
   var StateModifier = require('famous/modifiers/StateModifier');
   var ImageSurface = require('famous/surfaces/ImageSurface');
   var Easing = require('famous/transitions/Easing');

   function Two_TenVisitMayaView () {
         View.apply(this, arguments);
         _createHuts.call(this);
         _createLalitaAndMaya.call(this);
   }

   Two_TenVisitMayaView.prototype = Object.create(View.prototype);
   Two_TenVisitMayaView.prototype.constructor = Two_TenVisitMayaView;

   Two_TenVisitMayaView.prototype.returnCaptionArray = function() {
         var captionText = ["Now that Maya is registered, Lalita will get text messages from Medic Mobile whenever she needs to remind Maya to visit the clinic."];
         return captionText;  
   }

   Two_TenVisitMayaView.DEFAULT_OPTIONS = {};

   function _createHuts() {

      var hut = new ImageSurface ({
         size : [400, 700],
         content: 'animation-assets/yurt-1.svg'
      });

      var placeHut= new StateModifier ({
         align : [0.2, 0.5],
         origin : [0.3, 0.5],
      });
      this.add(placeHut).add(hut);

      var chickens = new ImageSurface ({
         size : [70, 150],
         content: 'animation-assets/chickens.svg'
      });

      var placeChickens= new StateModifier ({
         align : [0.1, 0.8],
         origin : [0.2, 0.7],
      });
      this.add(placeChickens).add(chickens);

   }



   function _createLalitaAndMaya() {

      var maya = new ImageSurface ({
         size : [150, 150],
         content: 'animation-assets/anc-trimester1.svg'
      });

      var placeMaya= new StateModifier ({
         align : [0.0, 0.5],
         origin: [0.9, 0.0]
      });

      var bringToFront = new StateModifier();
      bringToFront.setTransform(Transform.inFront);

      this.add(placeMaya).add(bringToFront).add(maya);


      placeMaya.setTransform(
         Transform.translate(300, 0, 0),
         {duration: 10, curve: 'easeInOut'}
      );

      var lalita = new ImageSurface ({
         size : [150, 150],
         content: 'animation-assets/chw-female-side-left.svg'
      });

      var placeLalita= new StateModifier ({
         align : [1.2, 0.5],
         origin: [0.4, 0.0]
      });

      var bringToFront = new StateModifier();
      bringToFront.setTransform(Transform.inFront);

      this.add(bringToFront).add(placeLalita).add(lalita);

      placeLalita.setTransform(
         Transform.translate(-570, 0, 0),
         {duration: 10, curve: 'easeInOut'}
      );

      // var sizeTransitionable = new Transitionable([250,250]);
      // var transitionableTransform = new TransitionableTransform();

      // var modifier = new Modifier({
      //    // align : [1.2, 0.55],
      //    // origin: [0.4, 0.0],
      //    size: this.sizeTransitionable,
      //    transform: this.transitionableTransform
      // });
      // this.add(modifier).add(placeLalita).add(lalita);

      var phone = new ImageSurface ({
         size : [25,25],
         content: 'animation-assets/phone_logo.svg'
      });

      var placePhone = new StateModifier ({
         align : [1.2, 0.47],
         origin: [0.4, 0.0]
      });

      var bringToFront = new StateModifier();
      bringToFront.setTransform(Transform.inFront);
      this.add(bringToFront).add(placePhone).add(phone);

      placePhone.setTransform(
         Transform.translate(-585, 15, 0)
      );

      var message = new ImageSurface({
         size: [25,25],
         content: 'animation-assets/Message-icon-grey.png'
      });

      var placeMessage = new StateModifier ({
         align : [1.2, 0.43],
         origin: [0.1, 0.1],
         opacity: 0
      });

      var bringToFront = new StateModifier();
      bringToFront.setTransform(Transform.inFront);
      this.add(bringToFront).add(placeMessage).add(message);

      placeMessage.setTransform(
         Transform.translate(-585, 15, 0)
      );

      setTimeout(function(){
         placeMessage.setOpacity(
            1,
            {duration: 1500, curve: 'easeInOut'}
         );

         setTimeout(function(){
            placeMessage.setOpacity(
               0,
               {duration: 1000, curve: 'easeInOut'}
            ); 
         }, 1000);

         setTimeout(function(){
            placePhone.setTransform(
               Transform.translate(-1100, 0, 0),
               {duration: 2000, curve: 'easeInOut'}
            );
            placePhone.setOpacity(
               0,
               {duration: 2000, curve: 'easeInOut'}
            );
            placeMessage.setTransform(
               Transform.translate(-1100, 0, 0),
               {duration: 2000, curve: 'easeInOut'}
            );
            placeLalita.setTransform(
               Transform.translate(-1100, 0, 0),
               {duration: 2000, curve: 'easeInOut'}
            );
         }, 2000);

      }, 500);



   }

   module.exports = Two_TenVisitMayaView;

});


