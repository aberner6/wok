
var camera, scene, renderer, controls, stats;
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
	scene.fog = new THREE.FogExp2( 0xcccccc, 0.002 );

	//scene.fog = new THREE.Fog( 0x000000, 1000, 7000 );


	// LIGHT
    var light = new THREE.DirectionalLight( 0xffffff );
    light.position.set( 0, 0, 1 );
    scene.add( light ); 

	threeJSDiv = $("#threeJS");

	var width = threeJSDiv.width(); 
	var height = threeJSDiv.height();

	// CAMERA
	var camerazoom = 1; //not 1/4

//	camera = new THREE.OrthographicCamera( - width / camerazoom, width / camerazoom, height / camerazoom, - height / camerazoom, 0.01, 100000 );
	camera = new THREE.PerspectiveCamera( 35, width / height, 1, 10000 );
	camera.position.z = 3000;
	camera.position.x = 600;
	camera.position.y = 300;
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

    var radius = 5;
    controls.minDistance = radius * 1.1;
    controls.maxDistance = radius * 100;
/*
    controls.keys = [ 65, 83, 68 ]; // [ rotateKey, zoomKey, panKey ]*/


	// STATS
	// displays current and past frames per second attained by scene
	stats = new Stats();
	stats.domElement.style.position = 'absolute';
	stats.domElement.style.bottom = '0px';
	stats.domElement.style.zIndex = 100;
	document.getElementById('stats').appendChild( stats.domElement );

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
$( document ).ready(function() {
	$("#whirl").click(function() {
		switch(whirlcount++) {
			case 0:
				drawTestPyramids(scene); //just for testing
				console.log("campos = ");
				console.log(camera.position);
				break;
			case 1:
				cameraTween();
				break;
			default:
				cameraTween();
				break;
		}
	});
});

function cameraTween() {

	// clone so we're not actually changing the camera position as a reference
	var randomMesh = pyramidMeshes[Math.floor(Math.random()*pyramidMeshes.length)];
	var endPosition = randomMesh.position;
	var randomMesh2 = pyramidMeshes[Math.floor(Math.random()*pyramidMeshes.length)];
	var endTarget = randomMesh2.position;


	console.log("alright, tweening!");

	// TWEENING CAMERA POSITION

	var tweenPosition = new TWEEN.Tween(camera.position)
		.to(endPosition, 3000)
		.easing(TWEEN.Easing.Cubic.InOut);
		tweenPosition.start();

	// TWEENING CAMERA TARGET

	var tweenTarget = new TWEEN.Tween(controls.target)
		.to(endTarget, 3000)
		.easing(TWEEN.Easing.Cubic.InOut)
		.onComplete(function () {
			camera.lookAt(endTarget);
		})
		tweenTarget.start();
}

