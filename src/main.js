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

headerLayout.footer.add(new Surface ({
	size: [undefined, 50],
	content: "Subtitles/Captions",
	properties: {
		fontFamily: 'Helvetica',
		fontSize: '30px',
		textAlign: 'center',
	}
}));

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
    //content: 'http://code.famo.us/assets/famous_logo.png',
    content: 'img/body.png',
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


mainContext.add(headerLayout);
mainContext.add(sidebarModifier).add(sidebar);
headerLayout.content.add(centerSpinModifier).add(logo);

//To add content simply just add it by nesting it into headerLayout.content
//by writing headerLayout.content.add(your_new_surface);


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
