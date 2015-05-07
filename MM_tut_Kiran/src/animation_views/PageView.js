define(function(require, exports, module) {
    var View          = require('famous/core/View');
    var Surface       = require('famous/core/Surface');
    var Transform     = require('famous/core/Transform');
    var StateModifier = require('famous/modifiers/StateModifier');
    var HeaderFooter = require('famous/views/HeaderFooterLayout');

    var ImageSurface = require('famous/surfaces/ImageSurface');
    var FastClick       = require('famous/inputs/FastClick');
    var BaseView = require('animation_views/BaseView');
    var NavigationView = require('animation_views/NavigationView');
    var ContentView = require('animation_views/ContentView');

    var EventHandler = require('famous/core/EventHandler');

    var eventHandlerA = new EventHandler();
    var eventHandlerB = new EventHandler();

    function PageView() {
        View.apply(this, arguments);

        _createLayout.call(this);
        _createHeader.call(this);
        _createBody.call(this);
        _createNavigationView.call(this);

        _setListeners.call(this);

    }

    PageView.prototype = Object.create(View.prototype);
    PageView.prototype.constructor = PageView;

    PageView.DEFAULT_OPTIONS = {
        headerSize: 44,
        captionData: {}
    };


    function _createLayout() {
        this.layout = new HeaderFooter({
            headerSize: this.options.headerSize
        });

        var layoutModifier = new StateModifier({
            transform: Transform.translate(0, 0, 0.01)//0.1)
        });

        this.add(layoutModifier).add(this.layout);
    }

    function _createHeader() {
        var backgroundSurface = new Surface({
            content : "MEDIC MOBILE FOR ANTENATAL CARE",
            properties: {
                backgroundColor: 'black',
                fontSize: "30px",
                textAlign: "center",
                color: 'white'
            }
        });

        var backgroundModifier = new StateModifier({
            transform: Transform.behind
        });

        this.hamburgerSurface = new ImageSurface({
            size: [44, 44],
            content: 'mm-assets/hamburger.png'
        });

        var iconSurface = new ImageSurface({
            size: [120, 40],
            content: 'Medic-Mobile-logo+name_white150.png'
        });

        var hamburgerModifier = new StateModifier({
            origin: [0, 0.5],
            align : [0, 0.5],
            transform: Transform.front
        });

        var iconModifier = new StateModifier({
            origin: [0, 0.5],
            align : [0.05, 0.5]
        });


        
        this.layout.header.add(hamburgerModifier).add(this.hamburgerSurface);
        this.layout.header.add(iconModifier).add(iconSurface);
        this.layout.header.add(backgroundModifier).add(backgroundSurface);
    }


    /*var sidebarWidth = 180;
    var sidebarHeight = 420;
    sidebar_backgroundColor = '#D8D8D8';

    var sideBarContent = '<div class="button incomplete selected" onclick="selectTutorial(this)">' + tutorialNames[0] + '</div>';
    for (var i = 1; i < tutorialNames.length; i++) {
        sideBarContent += '<div class="button incomplete" onclick="selectTutorial(this)">' + tutorialNames[i] + '</div>'
    }

    function _createBody() {
        this.sideSurface = new Surface({
            content: '<div id="tutorials"> Tutorials </div>' + sideBarContent,
            size: [sidebarWidth, sidebarHeight], 
            properties: {
                boxShadow: '1px 0px 2px #888888',
                backgroundColor: sidebar_backgroundColor,
                borderRightStyle: 'solid',
                borderRightWidth: '1px',
                borderRightColor: '#848484',
                fontSize: "100px"
            }
        });

        this.layout.content.add(this.sideSurface);
    }*/
    var sidebarWidth = 290;
    var i = 0;
    function _createBody() {
        //this.captionModifiers = [];
        
        this.caption = new Surface({
            size: [screen.width - sidebarWidth, 80],
            content: this.options.captionData[i].title,
            properties: {
                lineHeight: '80px',
                textAlign: 'center',
            }
        });

        this.placeCaption = new StateModifier({
            align: [0, 1],
            origin: [0, 1]
        });
        this.layout.content.add(this.placeCaption).add(this.caption);
 
        var contentView = new ContentView();

        var contentModifier = new StateModifier ({
            transform: Transform.behind
        });
        this.layout.content.add(contentModifier).add(contentView);


        /*var baseView = new BaseView();

        var baseModifier = new StateModifier ({
            transform: Transform.behind
        });
        this.layout.content.add(baseModifier).add(baseView);*/
    }


    function _createNavigationView() {
        this.navigationView = new NavigationView();
        var navigationModifier = new StateModifier({
            Transform: Transform.translate(0, 0, 0.3),
            opacity: 0.7
        });

        this.layout.content.add(navigationModifier).add(this.navigationView);
    }


    function _setListeners() {
        this.hamburgerSurface.on('click', function() {
            this._eventOutput.emit('menuToggle');
        }.bind(this));

        this.navigationView.on('next', function() {
            i += 1;
            this.caption.setContent(this.options.captionData[i].title);
            //eventHandlerA.emit('hello');
        }.bind(this));

        this.navigationView.on('back', function() {
            i -= 1;
            this.caption.setContent(this.options.captionData[i].title);
        }.bind(this));

    } 

    module.exports = PageView;
});