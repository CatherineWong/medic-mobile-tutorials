/*** AppView.js ***/

define(function(require, exports, module) {
    var View            = require('famous/core/View');
    var Surface         = require('famous/core/Surface');
    var Modifier        = require('famous/core/Modifier');
    var Transform       = require('famous/core/Transform');
    var StateModifier   = require('famous/modifiers/StateModifier');

    var HeaderFooterLayout = require('famous/views/HeaderFooterLayout');
    var AnimationView = require('animation_views/AnimationView');
    function AppView() {
        View.apply(this, arguments);

        _createLayout.call(this);
    }

    AppView.prototype = Object.create(View.prototype);
    AppView.prototype.constructor = AppView;

    AppView.DEFAULT_OPTIONS = {};


    function _createLayout() {

        var animationview = new AnimationView();

        var layout = new HeaderFooterLayout();

        layout.header.add(new Surface({
            size: [undefined, 100],
            content: "Header",
            properties: {
                backgroundColor: 'gray',
                lineHeight: "100px",
                textAlign: "center"
            }
        }));

        /*layout.content.add(new Surface({
            content: "Content",
            properties: {
                backgroundColor: '#fa5c4f',
                lineHeight: '400px',
                textAlign: "center"
            }
        }));*/
        layout.content.add(animationview);

        layout.footer.add(new Surface({
            size: [undefined, 50],
            content: "Footer",
            properties: {
                backgroundColor: 'gray',
                lineHeight: "50px",
                textAlign: "center"
            }
        }));

        this.add(layout);      

    }

    module.exports = AppView;
});


