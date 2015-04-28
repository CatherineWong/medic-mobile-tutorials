define(function(require, exports, module) {
	var Engine = require('famous/core/Engine');
	var Surface = require('famous/core/Surface');
	var Transform = require('famous/core/Transform');
	var StateModifier = require('famous/modifiers/StateModifier');

	var mainContext = Engine.createContext();

	var surface = new Surface({
	  size: [100, 100],
	  properties: {
	    color: 'white',
	    textAlign: 'center',
	    backgroundColor: '#FA5C4F'
	  }
	});

	var stateModifier = new StateModifier();

	test_animation1.runForward() = function() {
		mainContext.add(stateModifier).add(surface);
		stateModifier.setTransform(
		  Transform.translate(100, 300, 0),
		  { duration : 1000, curve: 'easeInOut' }
		);
	};

	test_animation1.runReverse() {
		stateModifier.setTransform(
		  Transform.translate(300, 100, 0),
		  { duration : 1000, curve: 'easeInOut' }
		);
		_removeSurface();
	};

	function _removeSurface() {
		// remove the surface
		surface.render = function() {return null;}
	}

	module.exports = SlideData;
});