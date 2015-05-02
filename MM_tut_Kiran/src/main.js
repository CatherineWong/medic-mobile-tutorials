/*** main.js ***/

define(function(require, exports, module) {
    var Engine = require('famous/core/Engine');
    var AppView = require('animation_views/AppView');

    var mainContext = Engine.createContext();
    var appView = new AppView();

    mainContext.add(appView);
});