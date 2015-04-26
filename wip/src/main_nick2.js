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
var tutorialNames = [
	"1) Overview",
	"2) Training your Clinic",
	"3) Getting Going",
	"4) Learn More"];

var captionText = [
	[
		"1) Hi Cathy",
		"2) Sup Cathy",
		"3) Yo Cathy",
		"4) Hello Cathy",
		"5) Nick",
		"6) NICK",
		"7) hersh",
		"8) HERSHEY",
		"9) nhershey",
		"10) DDDDOOOONNNNEEEE!"
	],
	[
		"1) Hi Cathy",
		"2) Sup Cathy",
		"3) Yo Cathy",
		"4) Hello Cathy",
		"5) DDDDOOOONNNNEEEE!"
	],
	[
		"1) Hi Cathy",
		"2) Sup Cathy",
		"3) Yo Cathy",
		"4) Hello Cathy",
		"5) Nick",
		"6) NICK",
		"7) DDDDOOOONNNNEEEE!"
	],
	[
		"1) Hi Cathy",
		"2) Sup Cathy",
		"3) Yo Cathy",
		"4) Hello Cathy",
		"5) Nick",
		"6) DDDDOOOONNNNEEEE!"
	]];
var captionTextIndex = 0;
var tutorialIndex = 0;

var sidebarWidth = 280;
sidebar_backgroundColor = '#D8D8D8';

//make sideBar
var sideBarContent = '<div class="button incomplete selected" onclick="selectTutorial(this)">' + tutorialNames[0] + '</div>';
for (var i = 1; i < tutorialNames.length; i++) {
	sideBarContent += '<div class="button incomplete" onclick="selectTutorial(this)">' + tutorialNames[i] + '</div>'
}
var sidebar = new Surface({
	content: '<img id="logo" src="Medic-Mobile-logo+name_300.png"> \
	<div id="tutorials"> Tutorials </div>' + sideBarContent,
	size: [sidebarWidth, undefined], 
	properties: {
		backgroundColor: sidebar_backgroundColor,
		borderRightStyle: 'solid',
		fontFamily: 'Avenir',
		borderRightWidth: '1px',
		borderRightColor: '#585858'
	}
});
mainContext.add(sidebar);

//make headerBar
var headerBar = new Surface ({
	size: [screen.width - sidebarWidth, 80],
	content: tutorialNames[0],
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
mainContext.add(headerBar);

//make progressBar
var numSteps = captionText[tutorialIndex].length;
var stepWidth = headerBar.size[0] / numSteps;// - (0.2 * numSteps);
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

//make backArrow
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

//make nextArrow
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

// make caption
var caption = new Surface ({
	size: [screen.width - sidebarWidth, 80],
	content: captionText[tutorialIndex][captionTextIndex],
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
mainContext.add(placeCaption).add(caption);



//functions and such
function changeTutorial() {
	captionTextIndex = 0;
	var numSteps = captionText[tutorialIndex].length;;
	var stepWidth = headerBar.size[0] / numSteps;// / numSteps - (0.4 * numSteps);
	var content = '<div style="width:' + stepWidth + 'px;" class="completedStep"></div>';
	for (var i=1; i < numSteps; i++) {
		content += '<div style="width:' + stepWidth + 'px;" class="uncompletedStep"></div>'
	}
	progressBar.setContent('<div>'+content+'</div>');
	caption.setContent(captionText[tutorialIndex][captionTextIndex]);
	headerBar.setContent(tutorialNames[tutorialIndex]);
}

function selectTutorial(me) {
	var buttons = document.getElementsByClassName("button");
    for (var i = 0; i < buttons.length; i++){
    	buttons[i].className = buttons[i].className.replace('selected', '');
    	if (buttons[i] == me) {
    		tutorialIndex = i;
    	}
    }
    me.className = me.className + " selected";
    changeTutorial();
}

nextArrow.on('click', function() {
  	

  	if (captionTextIndex + 1 < captionText[tutorialIndex].length) {
  		captionTextIndex++;
  		caption.setContent(captionText[tutorialIndex][captionTextIndex]);
  		var uncompletedBars = document.getElementsByClassName('uncompletedStep');  
  		uncompletedBars[0].className = 'completedStep';
  	}
  	else if (tutorialIndex + 1 == captionText.length){
		//do nothing
	}
  	else {
  		var completedTutorial = document.getElementsByClassName('button selected');
  		var buttonBefore = completedTutorial[0];
  		completedTutorial[0].className = 'button completed';
  		var buttons = document.getElementsByClassName("button");
  		for (var i = 0; i < buttons.length; i++){
  			//alert(buttons[i].className);
  			if (buttons[i] == buttonBefore) {
  				//alert("momma we made it!");
  				buttons[i + 1].className = buttons[i+1].className + ' selected';
  			}
	    	/*buttons[i].className = buttons[i].className.replace('selected', '');
	    	if (buttons[i] == me) {
	    		tutorialIndex = i;
	    	}*/
	    }
  		/*var uncompletedTutorial = document.getElementsByClassName('button incomplete');
  		uncompletedTutorial[0].className = 'button incomplete selected';*/
  		/*var buttons = document.getElementsByClassName("button");
	    for (var i = 0; i < buttons.length; i++){
	    	if (buttons[i] == completedTutorial[0]) {
	    		//tutorialIndex = i;// + 1;
	    		alert("it happened");
	    		buttons[i+1].className = 'button selected';
	    	}
	    }*/
	    tutorialIndex++;
  		changeTutorial();
  	}
  	
});
backArrow.on('click', function() {
  	if (captionTextIndex > 0) {
  		captionTextIndex--;
  		caption.setContent(captionText[tutorialIndex][captionTextIndex]);
  		var completedBars = document.getElementsByClassName('completedStep');  
  		completedBars[completedBars.length - 1].className = 'uncompletedStep';
  	}
  	else {
  		//do nothing
  	}
});
