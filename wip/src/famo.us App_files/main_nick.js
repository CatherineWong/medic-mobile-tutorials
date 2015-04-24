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

var headerLayout = new HeaderFooterLayout();

headerLayout.header.add(new Surface ({
	size: [undefined, 80],
	content: "Tutorials",
	properties: {
		backgroundColor: 'black',
		fontFamily: 'Helvetica',
		fontSize: '40px',
		lineHeight: '80px',
		textAlign: 'center',
		color: "white"
	}
}));

headerLayout.content.add(new Surface({
}));

headerLayout.content.add(new Surface({
	size: [50,50]
}));

var captionText = ["When Lalita learns that Maya is pregnant, she visits Maya \
	and uses a mobile phone to send a text message to the clinic to register that Maya is pregnant.", 
	"Next text", "MORE TEXT OH MY GOD"];

var captionTextIndex = 0;

var caption = new Surface ({
	size: [undefined, 60],
	content: captionText[captionTextIndex],
	properties: {
		fontFamily: 'Helvetica',
		fontSize: '12px',
		textAlign: 'center',
	}
});



headerLayout.footer.add(caption);

//Right now the sidebar will close and then re-open on click
//This is just to demo the closing and re-opening functionality
//Once I have added a dedicated button for this purpose, you
//will be able to open and close the sidebar separately

var sidebarModifier = new StateModifier({
  size: [200, undefined] // Initial size
});

var sidebar = new Surface({
	properties: {
		backgroundColor: '#212121',
	}
});

// your app here


var logo = new ImageSurface({
    size: [200, 200],
    content: 'square.png',
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

var backArrow = new ImageSurface({
    size: [50, 50],
    content: 'src/back_arrow.svg'
});

var placeBackArrow = new StateModifier({
  	align: [0.17, 0.5],
  	origin: [0.5, 0.5]
});

var nextArrow = new ImageSurface({
    content: 'src/next_arrow.svg',
    size: [50, 50]
});

var placeNextArrow = new StateModifier({
  	align: [0.95, 0.5],
  	origin: [0.5, 0.5]
});

var hills = new ImageSurface({
	content: 'animation-assets/hills-middle-ground.svg'
});

var placeHills = new StateModifier({
  	align: [0.139, 0.7],
  	origin: [0, 0.5]
});

var clinic = new ImageSurface({
	content: 'animation-assets/rural-clinic-gold.svg',
	size: [150,150]
});

var placeClinic = new StateModifier({
  	align: [0.2, 0.75],
  	origin: [0, 1]
});

var Lalita = new ImageSurface({
	content: 'animation-assets/chw-female-full.svg',
	size: [20, 40]
});

var placeLalita = new StateModifier({
  	align: [0.8, 0.67],
  	origin: [0.5, 0.5]
});

var Maya = new ImageSurface({
	content: 'animation-assets/anc-trimester1.svg',
	size: [20, 40]
});

var placeMaya = new StateModifier({
  	align: [0.82, 0.65],
  	origin: [0.5, 0.5]
});
mainContext.add(placeBackArrow).add(backArrow);
mainContext.add(placeNextArrow).add(nextArrow);
mainContext.add(placeBackArrow).add(backArrow);
mainContext.add(placeHills).add(hills);
mainContext.add(placeClinic).add(clinic);
mainContext.add(placeLalita).add(Lalita);
mainContext.add(placeMaya).add(Maya);
//mainContext.add(placeBackArrow).add(backArrow);
//mainContext.add(placeForwardArrow).add(forwardArrow);
//mainContext.add(caption)
mainContext.add(headerLayout);
mainContext.add(sidebarModifier).add(sidebar);




//headerLayout.content.add(centerSpinModifier).add(logo);


//To add content simply just add it by nesting it into headerLayout.content
//by writing headerLayout.content.add(your_new_surface);

Maya.on('click', function() {
	captionTextIndex += 1;
  	caption.setContent(captionText[captionTextIndex]);
});

backArrow.on('click', function() {
	captionTextIndex -= 1;
  	caption.setContent(captionText[captionTextIndex]);
});

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
