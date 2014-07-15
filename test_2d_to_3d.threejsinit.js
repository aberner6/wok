
var camera, scene, renderer, controls, stats;
var cameraPersp, cameraOrtho;
var chart3d, secondChart, lineChart, material, material2, materialLine, spriteMapCircle;
	var thisData = [];
var sevenData = [];
var dots, mowreDots, aLine;
var rotationX = 0;
var rotationY = 0;
var rotationZ = 0;
var secondRotationX = 0;
var secondRotationY = 0;
var secondRotationZ = 0;
var dotCitedFlag = true;
var origPosition;

var threeJSDiv;
var width = 1400;
var height = 720;
var maxX = 850;
var maxY = 700;
var padding = 35;



function threejs_d3_functions() {
	/* THIS IS EVERYTHING TO KNIT D3 AND THREEJS TOGETHER */

	// these are, as before, to make D3's .append() and .selectAll() work
	// this is called by append()
	THREE.Object3D.prototype.appendChild = function (c) {
		this.add(c);
		// create parentNode property
		c.parentNode = this;
		return c;
	}
	// this is called by selectAll()
	THREE.Object3D.prototype.querySelectorAll =
	  function (selector) {
		var matches = [];
		var type = eval(selector);
		for (var i = 0; i < this.children.length; i++) {
			var child = this.children[i];
			if (child instanceof type) {
				matches.push(child);
			}
		}
		return matches;
	}
	// this one is to use D3's .attr() on THREE's objects
	THREE.Object3D.prototype.setAttribute = function (name, value) {
		var chain = name.split('.');
		var object = this;
		for (var i = 0; i < chain.length - 1; i++) {
			object = object[chain[i]];
		}
		object[chain[chain.length - 1]] = value;
	}
	// and this one is to make'em work with D3's .transition()-s
	THREE.Object3D.prototype.getAttribute =
	  function (name) {
		var chain = name.split('.');
		var object = this;
		for (var i = 0; i < chain.length - 1; i++) {
			object = object[chain[i]];
		}
		return object[chain[chain.length - 1]];
	}
	THREE.Object3D.prototype.appendChild = function (c) { this.add(c); c.parentNode = this; return c; };
	THREE.Object3D.prototype.removeChild = function (c) { this.remove(c); }

}



function threejs_environment_init() {

	// SCENE
	scene = new THREE.Scene();
//	scene.fog = new THREE.FogExp2( 0xcccccc, 0.002 );

	scene.fog = new THREE.Fog( 0x000000, 1000, 7000 );


	// LIGHTS
    var light = new THREE.DirectionalLight( 0xffffff );
    light.position.set( 0, 0, 1 );
    scene.add( light ); 

    var light2= new THREE.DirectionalLight( 0xCCCCCC );
    light.position.set( 1, 1, 0 );
    scene.add( light2 ); 

	threeJSDiv = $("#threeJS");

	var width = threeJSDiv.width(); 
	var height = threeJSDiv.height();

	// CAMERA
	var camerazoom = 1; //not 1/4

	cameraPersp = new THREE.PerspectiveCamera( 50, width / height, 1, 5000 );
	cameraOrtho = new THREE.OrthographicCamera( - width / camerazoom, width / camerazoom, height / camerazoom, - height / camerazoom, 0.01, 100000 );
	//camera = cameraOrtho;
	camera = cameraPersp;
	camera.position.z = 3000;
	camera.position.x = 0;
	camera.position.y = 0;
	origPosition = camera.position;

	// RENDERER
	renderer = new THREE.WebGLRenderer( { alpha: false, antialias: true } );
	renderer.setSize( width, height);
	renderer.setClearColor( 0xffffff, 1 );
	renderer.autoClear = false;
	container = document.getElementById( 'threeJS' );
	container.appendChild( renderer.domElement );

	// CONTROLS
//	controls.addEventListener( 'change', threejs_render );

	controls = new THREE.OrbitControls( camera );

/*    controls.rotateSpeed = 10.0;
    controls.zoomSpeed = 1.2;
    controls.panSpeed = 0.2;
*/
    controls.noZoom = false;
    controls.noPan = false; 

//    controls.staticMoving = true;
    controls.dynamicDampingFactor = 1.0;

/*    var radius = 5;
    controls.minDistance = radius * 1.1;
    controls.maxDistance = radius * 100; */
/*
    controls.keys = [ 65, 83, 68 ]; // [ rotateKey, zoomKey, panKey ]*/


	// STATS
	// displays current and past frames per second attained by scene
	stats = new Stats();
	stats.domElement.style.position = 'absolute';
	stats.domElement.style.bottom = '0px';
	stats.domElement.style.zIndex = 100;
	document.getElementById('stats').appendChild( stats.domElement );

	// AXES
	axes = buildAxes( maxX * 1.2 );
	scene.add( axes );

}


function buildAxes( length ) {
	var axes = new THREE.Object3D();

	var axescolor = 0x888888;
	var axesdashed = false;

	axes.add( buildAxis( new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( length, 0, 0 ), axescolor, axesdashed ) ); // +X
	axes.add( buildAxis( new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( -length, 0, 0 ), axescolor, axesdashed) ); // -X
	axes.add( buildAxis( new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( 0, length, 0 ), axescolor, axesdashed ) ); // +Y
	axes.add( buildAxis( new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( 0, -length, 0 ), axescolor, axesdashed ) ); // -Y
	axes.add( buildAxis( new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( 0, 0, length ), axescolor, axesdashed ) ); // +Z
	axes.add( buildAxis( new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( 0, 0, -length ), axescolor, axesdashed) ); // -Z

	return axes;
}


function buildAxis( src, dst, colorHex, dashed ) {
	var geom = new THREE.Geometry(),
		mat; 

	if(dashed) {
		mat = new THREE.LineDashedMaterial({ linewidth: 1, color: colorHex, dashSize: 3, gapSize: 3 });
	} else {
		mat = new THREE.LineBasicMaterial({ linewidth: 1, color: colorHex });
	}

	geom.vertices.push( src.clone() );
	geom.vertices.push( dst.clone() );
	geom.computeLineDistances(); // This one is SUPER important, otherwise dashed lines will appear as simple plain lines

	var axis = new THREE.Line( geom, mat, THREE.LinePieces );

	return axis;
}


function threejs_animate() {

	requestAnimationFrame( threejs_animate );

	// animation functions, loaded by each different js shim
	animateSprite(); 
	animateLine();

	threejs_render();

	threejs_update();
}

function threejs_render() {
	renderer.render( scene, camera );
}

function threejs_update() {
	controls.update();
	stats.update();

    var currentTime = Date.now()*0.001;

	TWEEN.update();
}

function onWindowResize() {
	width = threeJSDiv.width(); 
	height = threeJSDiv.height();

	camera.aspect = width / height;				
	camera.updateProjectionMatrix();

	renderer.setSize( width, height);
}


$( document ).ready(function() {

	// initiate threejs and d3 connection
	threejs_d3_functions();

	// initiate threejs renderer
	threejs_environment_init();

	// draw things
	drawThings();

	// animate data
	threejs_animate();  

	// when window is resized, deal with that
	window.addEventListener( 'resize', onWindowResize, false );

});


/* **************** */

var whirlcount = 0;
var pyramidcount = 0;

$( document ).ready(function() {
	$("#camera").click(function() {
		var thisbutton = $("#camera");
		var formercamera = camera;// this doesn't work because formercamera is also a reference
		if(thisbutton.attr("name") == "ortho") {
			thisbutton.attr("name", "persp");
			thisbutton.removeClass("ortho");
			thisbutton.html("PERSP CAMERA");
			camera = cameraPersp; 
		} else {
			thisbutton.attr("name", "ortho");
			thisbutton.addClass("ortho");
			thisbutton.html("ORTHO CAMERA");
			camera = cameraOrtho; 
		} 
		camera.position = formercamera.position;
		camera.target = formercamera.target;
	});

	$("#pyramids").click(function() {
		switch(pyramidcount++) {
			case 0:
				drawTestPyramids(scene); //just for testing
				break;
		}
	});

	$("#whirl").click(function() {
		switch(whirlcount++) {
			case 0:
				cameraTweenSetup();
				break;
			default:
				cameraTweenSetup();
				break;
		}
	});
});

function cameraTweenSetup() {
	//https://github.com/sole/tween.js/blob/master/docs/user_guide.md

	var distFromCenter = 500;

	cameraPoses = [	{x: distFromCenter, y:0, z:0},
					{x: 0, y:distFromCenter, z:0},
					{x: 0, y:0, z:distFromCenter},
					{x: -distFromCenter, y:0, z:0},
					{x: 0, y:-distFromCenter, z:0},
					{x: 0, y:0, z:-distFromCenter}];

	var endPosition;
	while(true) {
 		endPosition = cameraPoses[Math.floor(Math.random()*cameraPoses.length)];
		if(Math.abs(camera.position.x - endPosition.x)  
		 + Math.abs(camera.position.x - endPosition.x)  
		 + Math.abs(camera.position.x - endPosition.x) > distFromCenter)  { break; }
	}
	//var randomMesh = pyramidMeshes[Math.floor(Math.random()*pyramidMeshes.length)];
	//var endPosition = randomMesh.position;


	cameraPositionTween(camera.position, endPosition, 4000, 0);

	//cameraFOVTween(camera.position, 300, 4000, 0);

}


function cameraPositionTween(position, destination, duration, delay) {

	var thistween = new TWEEN.Tween(position)
		.to(destination, duration)
		.delay(delay)
		.easing(TWEEN.Easing.Cubic.InOut)
		.onUpdate(function() {
		//	console.log(this);
		});

	console.log("alright, tweening! from" );
	console.log(position);
	console.log("to");
	console.log(destination);

	thistween.start();
}

/*function cameraFOVTween(camera, destFOV, duration, delay) {

	var thistween = new TWEEN.Tween({ fov: camera.fov })
		.to({ fov: destFOV }, duration)
		.delay(delay)
		.easing(TWEEN.Easing.Cubic.InOut)
		.onUpdate(function() {
			camera.fov = this.fov;
			console.log(this);
		});

	console.log("alright, tweening! from" );
	console.log(camera.fov);
	console.log("to");
	console.log(destFOV);

	thistween.start();
} */

