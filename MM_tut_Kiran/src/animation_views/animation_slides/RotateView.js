
define(function(require, exports, module) {

  var View = require('famous/core/View');
  var Modifier = require('famous/core/Modifier');
  var Surface = require('famous/core/Surface');
  var PhysicsEngine = require('famous/physics/PhysicsEngine');
  var Particle = require('famous/physics/bodies/Particle');
  var RepulsionForce = require('famous/physics/forces/Repulsion');

//var context = Engine.createContext();
 function RotateView () {
    View.apply(this, arguments);
    //_rotateThis.call(this);     
  }

  RotateView.prototype.returnCaptionArray = function() {
      var captionText = ["Lalita checks in with Maya after the visits and reports that she completed the visit, and can also send text messages if she notices any danger signs."];
      return captionText; 
  }

  var physics = new PhysicsEngine();

   RotateView.prototype = Object.create(View.prototype);
   RotateView.prototype.constructor = RotateView;

   RotateView.DEFAULT_OPTIONS = {};

   /*function _rotateThis () {

  var planetSurface = new Surface({
    properties: {
      backgroundColor: 'blue'
    }
  });

  var planetParticle = new Particle();

  physics.addBody(planetParticle);

  var planetModifier = new Modifier({
    size: [100, 100],
    align: [0.5, 0.5],
    origin: [0.5, 0.5],
    transform: function() {
      return planetParticle.getTransform();
    }
  });

  var satelliteSurface = new Surface({
    properties: {
      backgroundColor: 'gray'
    }
  });

  var satelliteParticle = new Particle({
    position: [0, -100, 0]
  });

  physics.addBody(satelliteParticle);

  var satelliteModifier = new Modifier({
    size: [25, 25],
    align: [0.5, 0.5],
    origin: [0.5, 0.5],
    transform: function() {
      return satelliteParticle.getTransform();
    }
  });

  var gravity = new RepulsionForce({
    strength: -2
  });

  physics.attach(gravity, satelliteParticle, planetParticle);

  satelliteParticle.setVelocity([0.1, 0, 0]);

  this.add(planetModifier).add(planetSurface);

  this.add(satelliteModifier).add(satelliteSurface);

}*/

module.exports = RotateView;


});