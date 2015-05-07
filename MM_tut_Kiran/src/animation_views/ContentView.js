/* ContentView */


define(function(require, exports, module) {

	var View = require('famous/core/View');
	var Surface = require('famous/core/Surface');
	var Transform = require('famous/core/Transform');
	var StateModifier = require('famous/modifiers/StateModifier');
	var ImageSurface = require('famous/surfaces/ImageSurface');

	var NavigationView = require('animation_views/NavigationView');

	var BaseView = require('animation_views/BaseView');
	var HariIntroView = require('animations/HariIntroView'); 
	var MayaIntroView = require('animations/MayaIntroView'); 
	var LalitaIntroView = require('animations/LalitaIntroView'); 
	var ZoomOutIntroView = require('animations/ZoomOutIntroView'); 

	var EventHandler = require('famous/core/EventHandler');

    var eventHandlerB = new EventHandler();
    //eventHandlerA.pipe(eventHandlerB);

	//var navigationView = var NavigationView();



   function ContentView () {
   		View.apply(this, arguments);

   		_createContent.call(this);
   		_setListeners.call(this);

   }

   ContentView.prototype = Object.create(View.prototype);
   ContentView.prototype.constructor = ContentView;

   ContentView.DEFAULT_OPTIONS = {};


	function _createContent() {	
		var baseView = new BaseView();

        var baseModifier = new StateModifier ({
            transform: Transform.behind
        });
        this.add(baseModifier).add(baseView);
	}

	var i = 0;
	function _setListeners() {
        

        /*this.navigationView.on('next', function() {
            i += 1;
            //this.caption.setContent(this.options.captionData[i].title);
        }.bind(this));

        this.navigationView.on('back', function() {
            i -= 1;
            //this.caption.setContent(this.options.captionData[i].title);
        }.bind(this));*/

    }


	module.exports = ContentView;

});