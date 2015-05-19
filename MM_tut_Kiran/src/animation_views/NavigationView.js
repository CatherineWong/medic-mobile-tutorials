define(function(require, exports, module) {
    var View          = require('famous/core/View');
    var Surface       = require('famous/core/Surface');
    var Transform     = require('famous/core/Transform');
    var StateModifier = require('famous/modifiers/StateModifier');

    var ImageSurface = require('famous/surfaces/ImageSurface');

    function NavigationView() {
        View.apply(this, arguments);

        _createArrow.call(this);
        _setListeners.call(this);
    }

    NavigationView.prototype = Object.create(View.prototype);
    NavigationView.prototype.constructor = NavigationView;

    NavigationView.DEFAULT_OPTIONS = {};

    function _createArrow() {


        this.backArrow = new ImageSurface({
            size: [50, 50],
            content: 'src/back_arrow.svg',
            properties: {
                cursor: 'pointer'
                //marginLeft: (sidebarWidth + 50) + 'px',
                //marginTop: (headerBar.size[1]+progressBar.size[1]) + 'px'
            }
        });

        var placeBackArrow = new StateModifier({
            align: [0.05, 0.5],
            origin: [0.5, 0.5],
            Transform: Transform.front
        });
        
        this.add(placeBackArrow).add(this.backArrow);


        this.nextArrow = new ImageSurface({
            size: [50, 50],
            content: 'src/next_arrow.svg',
            properties: {
                cursor: 'pointer'
                //marginLeft: (sidebarWidth + headerBar.size[0] - 50) + 'px',
                //marginTop: (headerBar.size[1]+progressBar.size[1]) + 'px'
            }
        });

        var placeNextArrow = new StateModifier({
            align: [0.95, 0.5],
            origin: [1, 0.5],
            Transform: Transform.front,

        }); 
        
        this.add(placeNextArrow).add(this.nextArrow);
    }


    function _setListeners() {
        this.nextArrow.on('click', function() {
            this._eventOutput.emit('next');
        }.bind(this));

        this.backArrow.on('click', function() {
            this._eventOutput.emit('back');
        }.bind(this));
    } 

    module.exports = NavigationView;
});
