/*global famous*/
// import dependencies
var Engine = famous.core.Engine;
var Modifier = famous.core.Modifier;
var Transform = famous.core.Transform;
var Surface = famous.core.Surface
var ImageSurface = famous.surfaces.ImageSurface;
var HeaderFooterLayout = famous.views.HeaderFooterLayout
var StateModifier = famous.modifiers.StateModifier;


// create the main context
var mainContext = Engine.createContext();


/* break */

var sidebarWidth = 280;

/*var logo = new ImageSurface({
	content: 'Medic-Mobile-logo+name_300.png',
	size: [sidebarWidth, headerBar.size[1]],
	properties: {
		backgroundColor: '#33CC33',
		borderStyle: 'solid',
		borderWidth: '1px',
		borderColor: '#585858',
		boxShadow: '0px 5px 1px #888888'
	}
});
mainContext.add(logo);*/


sidebar_backgroundColor = '#D8D8D8';
sidebar_hoverColor = '#DB5320';
var sidebar = new Surface({
	content: '\
	<img id="logo" src="Medic-Mobile-logo+name_300.png"> \
	<div id="tutorials"> TUTORIALS </div> \
	<div class="button completed" onclick="select(this)"> 1) Overview </div> \
	<div class="button selected" onclick="select(this)"> 2) Training your Clinic </div> \
	<div class="button" onclick="select(this)"> 3) Getting Going </div> \
	<div class="button" onclick="select(this)"> 4) Learn More </div>',
	size: [sidebarWidth, undefined], 
	properties: {
		backgroundColor: sidebar_backgroundColor,
		borderRightStyle: 'solid',
		fontFamily: 'Avenir',
		borderRightWidth: '1px',
		borderRightColor: '#585858'
	}
});

//boxShadow: '10px 10px 10px #888888'
//,marginTop: headerBar.size[1] + 'px'
function select(me) {
	var buttons = document.getElementsByClassName("button");
    for (var i = 0; i < buttons.length; i++){
    	buttons[i].className = buttons[i].className.replace('selected', '');
    }
    me.className = me.className + " selected";
    headerBar.setContent(me.innerHTML);
}

/**/
mainContext.add(sidebar);

var headerLayout = new HeaderFooterLayout();

var headerBar = new Surface ({
	size: [screen.width - sidebarWidth, 80],
	content: "Tutorials",
	properties: {
		backgroundColor: 'black',
		fontFamily: 'Avenir',
		fontSize: '40px',
		lineHeight: '80px',
		textAlign: 'center',
		color: "white",
		marginLeft: sidebarWidth + 'px'
	}
})
//boxShadow: '0px 5px 1px #888888',
mainContext.add(headerBar);

var numSteps = 10;
var stepWidth = headerBar.size[0] / numSteps - (0.2 * numSteps);
var content = '<div style="width:' + stepWidth + 'px;" class="completedStep"></div>';
for (var i=1; i < numSteps; i++) {
	content += '<div style="width:' + stepWidth + 'px;" class="uncompletedStep"></div>'
}
var progressBar = new Surface ({
	size: [screen.width - sidebarWidth, 20],
	content: '<div>'+content+'</div>',
	properties: {
		boxShadow: '0px 5px 1px #888888',
		marginTop: headerBar.size[1] + 'px',
		marginLeft: sidebarWidth + 'px'
	}
})
mainContext.add(progressBar);



var backArrow = new ImageSurface({
    size: [50, 50],
    content: 'src/back_arrow.svg',
    properties: {
		marginLeft: (sidebarWidth + 50) + 'px',
		marginTop: (headerBar.size[1]+progressBar.size[1]) + 'px'
	}
});

var placeBackArrow = new StateModifier({
  	align: [0, 0.4],
  	origin: [0.5, 0.5]
});
mainContext.add(placeBackArrow).add(backArrow);

var nextArrow = new ImageSurface({
    size: [50, 50],
    content: 'src/next_arrow.svg',
    properties: {
		marginLeft: (sidebarWidth + headerBar.size[0] - 50) + 'px',
		marginTop: (headerBar.size[1]+progressBar.size[1]) + 'px'
	}
});

var placeNextArrow = new StateModifier({
  	align: [0, 0.4],
  	origin: [0.5, 0.5]
});
mainContext.add(placeNextArrow).add(nextArrow);

var captionText = [
	"1) Hi Cathy",
	"2) Sup Cathy",
	"3) Yo Cathy",
	"4) Hello Cathy"];
var captionTextIndex = 0;

var caption = new Surface ({
	size: [screen.width - sidebarWidth, 80],
	content: captionText[captionTextIndex],
	properties: {
		fontFamily: 'Avenir',
		fontSize: '40px',
		lineHeight: '80px',
		textAlign: 'center',
		marginLeft: sidebarWidth + 'px'
	}
})
var placeCaption = new StateModifier({
  	align: [0, 1],
  	origin: [0, 1]
});

nextArrow.on('click', function() {
  	captionTextIndex++;
  	caption.setContent(captionText[captionTextIndex]);
  	var uncompletedBars = document.getElementsByClassName('uncompletedStep');  
  	uncompletedBars[0].className = 'completedStep';
});
backArrow.on('click', function() {
  	captionTextIndex--;
  	caption.setContent(captionText[captionTextIndex]);
  	var completedBars = document.getElementsByClassName('completedStep');  
  	completedBars[completedBars.length - 1].className = 'uncompletedStep';
});

//boxShadow: '0px 5px 1px #888888',
mainContext.add(placeCaption).add(caption);

/*

headerLayout.footer.add(new Surface ({
	size: [screen.width - sidebarWidth, 80],
	content: "Lalita visits Maya.",
	properties: {
		fontFamily: 'Helvetica',
		fontSize: '30px',
		textAlign: 'center',
	}
}));



/* video progress */


/*var buttonContents = [
	'1) Overview',
	'2) Training your Clinic',
	'3) Getting Going'
]
var buttons = [0,0,0];
var buttonHeight = 100;
for (var i = 0; i < buttons.length; i++) { 
	buttons[i] = new Surface({
		content: buttonContents[i],
		size: [sidebarWidth, buttonHeight], 
		properties: {
			backgroundColor: sidebar_backgroundColor,
			borderStyle: 'solid',
			borderWidth: '1px',
			borderColor: '#585858',
			padding: buttonHeight / 3 +'px',
			fontFamily: 'Avenir',
			fontSize: '20px',
			marginTop: (headerBar.size[1] + buttonHeight * i) + 'px'
		}
	});
	mainContext.add(buttons[i]);
	
}*/


/* stupid circle
var circle = new Surface({
	size: [headerBar.size[1] / 2,headerBar.size[1] / 2], 
	properties: {
		backgroundColor: '#D8D8D8',
		borderStyle: 'solid',
		borderWidth: '1px',
		borderColor: '#585858',
		borderRadius: (headerBar.size[1] / 4) + 'px',
		marginTop: (headerBar.size[1] / 4) + 'px',
    	marginLeft: sidebarWidth + 'px'
	}
});

var placeCircle = new StateModifier({
  	align: [0.1, 0],
  	origin: [0, 0]
});

mainContext.add(circle);


for (i = 0; i < buttons.length; i++){
	
}
/* video progress */

//To add content simply just add it by nesting it into headerLayout.content
//by writing headerLayout.content.add(your_new_surface);
/*buttons[0].on('mouseover', function() {
	buttons[0].setProperties({
	   	backgroundColor: sidebar_hoverColor
 	});
}); 
buttons[0].on('mouseleave', function() {
	buttons[0].setProperties({
    	backgroundColor: sidebar_backgroundColor
  	});
}); 
//
buttons[1].on('mouseover', function() {
	buttons[1].setProperties({
	   	backgroundColor: sidebar_hoverColor
 	});
}); 
buttons[1].on('mouseleave', function() {
	buttons[1].setProperties({
    	backgroundColor: sidebar_backgroundColor
  	});
}); 
//
buttons[2].on('mouseover', function() {
	buttons[2].setProperties({
	   	backgroundColor: sidebar_hoverColor
 	});
}); 
buttons[2].on('mouseleave', function() {
	buttons[2].setProperties({
    	backgroundColor: sidebar_backgroundColor
  	});
}); 
*/
/*

var logo = new ImageSurface({
    size: [200, 200],
    content: 'http://code.famo.us/assets/famous_logo.png',
    classes: ['double-sided']
});

var initialTime = Date.now();
var centerSpinModifier = new Modifier({
    origin: [0.5, 0.5],
    align: [0.5, 0.5],
    transform : function () {
        return Transform.rotateY(.002 * (Date.now() - initialTime));
    }
});

headerLayout.content.add(centerSpinModifier).add(logo);

function slideOut() {
	sidebarModifier.setTransform(
		Transform.translate(-180,0),
		{ duration: 300 }
	);
}

function slideIn() {
	sidebarModifier.setTransform(
		Transform.translate(0,0),
		{ duration: 300 }
	);
}

sidebar.on('click', function() {
	slideOut();
	slideIn();
});
*/