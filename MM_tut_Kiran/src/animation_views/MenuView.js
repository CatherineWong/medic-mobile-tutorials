/*** MenuView.js ***/

define(function(require, exports, module) {
    var DEBUG = true;
    var View          = require('famous/core/View');
    var Surface       = require('famous/core/Surface');
    var Transform     = require('famous/core/Transform');
    var StateModifier = require('famous/modifiers/StateModifier');

    var StripView = require('animation_views/StripView');
    var StripTitleView = require('animation_views/StripTitleView');
    var colors = ['#B5BD21','#F47963','#79B1B1','#E9A722'];

    stripViews = [];

    function MenuView() {
        View.apply(this, arguments);

        _createStripViews.call(this);
        _setListeners.call(this);
    }

    MenuView.prototype = Object.create(View.prototype);
    MenuView.prototype.constructor = MenuView;

    MenuView.DEFAULT_OPTIONS = {
        stripData: {},
        topOffset: 70, //(100 * 0.7)
        stripOffset: 42 //(60 * 0.7)
    };

    function _createStripViews() {
        this.stripModifiers = [];

        

        var yOffset = this.options.topOffset;

            var stripView = new StripTitleView({
                //iconUrl: this.options.stripData[i].iconUrl,
                title: "Tutorials"
            });

            var stripModifier = new StateModifier({
                transform: Transform.translate(0, yOffset, 0)
            });

            this.stripModifiers.push(stripModifier);
            this.add(stripModifier).add(stripView);

            yOffset += this.options.stripOffset;

        for (var i = 0; i < this.options.stripData.length; i++) {

            var stripView = new StripView({
                //iconUrl: this.options.stripData[i].iconUrl,
                title: this.options.stripData[i].title,
                selectColor: colors[i]
            });

            stripViews.push(stripView);

            var stripModifier = new StateModifier({
                transform: Transform.translate(0, yOffset, 0)
            });

            this.stripModifiers.push(stripModifier);
            this.add(stripModifier).add(stripView);

            yOffset += this.options.stripOffset;
        }
        //stripViews[1].selectMe();
    }

    MenuView.prototype.changeSelected = function(selected) {
        for (var i = 0; i < 3; i++) {
            if (i == selected) {
                stripViews[i].selectMe(colors[i]); 
            }
            else {
                stripViews[i].unselectMe(); 
            }
        }
    }

    /*MenuView.prototype.colorSelected = function(whichButton) {
        alert('in');
        /*this.stripViews[whichButton].setProperties({
            color: 'red'
        }); 
    }*/

    /** Set listeners on all of the strips for click and hover*/
    function _setListeners() {
        /* The fact that we need to do this is actually ridiculous...not sure why normal for loops don't work */
        var i = 0; var j = 1; var k = 2;
        stripViews[i].on('stripViewClick', function() {
                this._eventOutput.emit('menuViewClick' + i);
                if (DEBUG) console.log('menuViewClick' + i);
            }.bind(this));

            stripViews[i].on('stripViewMouseOver', function() {
                this._eventOutput.emit('menuViewMouseOver' + i);
                if (DEBUG) console.log('menuViewMouseOver' + i);
            }.bind(this));

        
        stripViews[j].on('stripViewClick', function() {
                this._eventOutput.emit('menuViewClick' + j);
                if (DEBUG) console.log('menuViewClick' + j);
            }.bind(this));

        stripViews[j].on('stripViewMouseOver', function() {
            this._eventOutput.emit('menuViewMouseOver' + j);
            if (DEBUG) console.log('menuViewMouseOver' + j);
        }.bind(this));

        
        stripViews[k].on('stripViewClick', function() {
                this._eventOutput.emit('menuViewClick' + k);
                if (DEBUG) console.log('menuViewClick' + k);
            }.bind(this));

        stripViews[k].on('stripViewMouseOver', function() {
            this._eventOutput.emit('menuViewMouseOver' + k);
           if (DEBUG) console.log('menuViewMouseOver' + k);
        }.bind(this));
  
    } 



    module.exports = MenuView;
});
