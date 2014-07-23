
var camera, scene, renderer, controls, stats;
var cameraPersp, cameraOrtho;
var graphCenter;
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
var totalFlag = true;

var origPosition;

var threeJSDiv;
var width = 1400;
var height = 720;
var maxAxis = 850;
var maxX = maxAxis;
var maxY = maxAxis;
var cameraDistanceMult = 2.0;
var padding = 35;

var textX, textY, textZ;

var xAxisMesh, yAxisMesh, zAxisMesh;
var tickMarks;
var axesLabels;

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
	var camerazoom = 1;

	// cameraPersp = new THREE.PerspectiveCamera( 50, width / height, 1, 1000 );
	cameraPersp = new THREE.PerspectiveCamera( 50, width / height, 1, 5000 );
	cameraOrtho = new THREE.OrthographicCamera( - width / camerazoom, width / camerazoom, height / camerazoom, - height / camerazoom, 0.01, 100000 );
	camera = cameraOrtho;
	//camera = cameraPersp;
	camera.position.z = 3000;
	camera.position.x = 0;
	camera.position.y = 0;

	graphCenter = new THREE.Vector3(maxAxis/2, maxAxis/2, maxAxis/2);
	camera.lookAt(graphCenter);
/*	camera.target.x = 500;
	camera.target.y = 500;
	camera.target.z = 500; */
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

	controls.target = graphCenter;


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

	// WINDOW RESIZE
	window.addEventListener( 'resize', onWindowResize, false );


}


function drawAxes() {

	var length = maxAxis;
	var axes = new THREE.Object3D();
	axesLabels = new THREE.Object3D();

	var axescolor = 0x000000;
	var axesdashed = false;

	axes.add( buildAxis( new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( length, 0, 0 ), axescolor, axesdashed ) ); // +X
	axes.add( buildAxis( new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( 0, length, 0 ), axescolor, axesdashed ) ); // +Y
	axes.add( buildAxis( new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( 0, 0, length ), axescolor, axesdashed ) ); // +Z

	xAxisMesh = buildTextMesh( new THREE.Vector3( length + 70, -10, 0 ), "") ;
	yAxisMesh = buildTextMesh( new THREE.Vector3( -30, length + 70, 0 ), "") ;
	zAxisMesh = buildTextMesh( new THREE.Vector3( -30, -10, length + 70 ), "") ;
//	zAxisMesh.lookAt(0, 0,rotation.set(Math.Pi / 2, 0,0);
//	zAxisMesh.rotation.set(3.14 / 2, 0,0);
//	xAxisMesh.rotation.set(3.14 / 4, 0,0);
	axesLabels.add( xAxisMesh );
	axesLabels.add( yAxisMesh );
	axesLabels.add( zAxisMesh );

	scene.add(axes);
	scene.add(axesLabels);

	tickMarks = new THREE.Object3D();
	scene.add(tickMarks);

	
	}

function changeAxisText(axis, text) {
	switch(axis) {
		case "xaxis":
			var xAxisPosition = xAxisMesh.position;
			axesLabels.remove(xAxisMesh);
			xAxisMesh = buildTextMesh( xAxisPosition, text) ;
			axesLabels.add(xAxisMesh);
			break;
		case "yaxis":
			var yAxisPosition = yAxisMesh.position;
			axesLabels.remove(yAxisMesh);
			yAxisMesh = buildTextMesh( yAxisPosition, text) ;
			axesLabels.add(yAxisMesh);
			break;
		case "zaxis":
			var zAxisPosition = zAxisMesh.position;
			axesLabels.remove(zAxisMesh);
			zAxisMesh = buildTextMesh( zAxisPosition, text) ;
			axesLabels.add(zAxisMesh);
			break;
	}	
}

function clearTickMarks(axis) {
	switch(axis) {
		case "all":
			scene.remove(tickMarks); 
			tickMarks = new THREE.Object3D(); 
			scene.add(tickMarks);
			break;
		default:
			for(var i = 0; i < tickMarks.children.length; i++) {
				var thisMark = tickMarks.children[i];
				if(thisMark.axis == axis) {
					tickMarks.remove(thisMark);
				}
			}
			break;
	}	
}


function buildTickMark ( axis, amplitude, text)  {
	var coordsTick;
	var coordsText;
	var tick;
	var thisTick = new THREE.Object3D();
	//tick mark coordinates are hardcoded here
	switch(axis) {
		case "xaxis":
			coordsTick = new THREE.Vector3(amplitude, -5, 0);
			coordsText = new THREE.Vector3(amplitude - 10, -35, 0);
			tick = "|";
			break;
		case "yaxis":
			coordsTick = new THREE.Vector3(-10, amplitude, 0);
			coordsText = new THREE.Vector3(-60, amplitude, 0);
			tick = "—";
			break;
		case "zaxis":
			coordsTick = new THREE.Vector3(-10, 0, amplitude);
			coordsText = new THREE.Vector3(-60, 0, amplitude);
			tick = "—";
			break;
	}	
	thisTick.add( buildTextMesh( coordsTick , tick) );
	thisTick.add( buildTextMesh( coordsText , text) );
	thisTick.axis = axis;
//	scene.add( buildTextMesh( new THREE.Vector3( 300, 300, 0 ), "Y AXISsS") );
	return thisTick;
}

function buildTextMesh(location, text) {
	console.log("printping +" + text);
	var textGeo = new THREE.TextGeometry(text, {
		size: 16,
		height: 2,
		curveSegments: 6,
		font: "helvetiker",
		style: "normal"
	});

	
	console.log(textGeo)

	var color = 0x888888;
//THREE.Color();
//	color.setRGB(255,  0, 0);
	var  textMaterial = new THREE.MeshBasicMaterial({ color: color });

	var textMesh = new THREE.Mesh(textGeo , textMaterial);
	textMesh.position.x = location.x;
	textMesh.position.y = location.y;
	textMesh.position.z = location.z;
	textMesh.orientation
	//textMesh.quaternion.copy( camera.quaternion );

	return textMesh;
//	scene.add(textMesh);
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

    //var currentTime = Date.now()*0.001;

	TWEEN.update();

//	axesLabels
//	tickMarks
	xAxisMesh.rotation.set(camera.rotation.x,0,0);
	yAxisMesh.rotation.set(camera.rotation.x,0,0);
	zAxisMesh.rotation.set(camera.rotation.x,0,0);
	for(i = 0; i < tickMarks.children.length; i++) {
	//textMesh.quaternion.copy( camera.quaternion );
		for (j = 0; j < tickMarks.children[i].children.length; j++) {
			tickMarks.children[i].children[j].rotation.set(camera.rotation.x,0,0);
//		axesLabels.rotation =   camera.rotation ;
		//axesLabels.children[i].lookAt(camera.position);
		}
	} 
}

function onWindowResize() {
	width = threeJSDiv.width(); 
	height = threeJSDiv.height();

	camera.aspect = width / height;				
	camera.updateProjectionMatrix();

	renderer.setSize( width, height);
}

/************************************/
/****** SEQUENCE OF OPERATIONS ******/
/************************************/

$( document ).ready(function() {

	// initiate threejs and d3 connection
	threejs_d3_functions();

	// initiate threejs renderer
	threejs_environment_init();

	// draw axes
	drawAxes();

	// draw things
	drawThings();

	// animate data
	threejs_animate();  

});


/* **************** */

var whirlcount = 0;
var pyramidcount = 0;

$( document ).ready(function() {
	$("#camera").click(function() {
		/*
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
		camera.target = formercamera.target;*/
	});

	// $("#pyramids").click(function() {
	// 	switch(pyramidcount++) {
	// 		case 0:
	// 			drawParticles(scene); //just for testing
	// 			break;
	// 		case 1:
	// 			drawTestPyramids(scene); //just for testing
	// 			break;
	// 	}
	// });

	// $("#whirl").click(function() {
	// 	switch(whirlcount++) {
	// 		case 0:
	// 			cameraTweenSetup();
	// 			break;
	// 		default:
	// 			cameraTweenSetup();
	// 			break;
	// 	}
	// });
});

function cameraTweenSetup() {
	//https://github.com/sole/tween.js/blob/master/docs/user_guide.md

	var distFromCenter = 500;

	cameraPoses = [	{x: distFromCenter, y:0, z:0},
					{x: 0, y:distFromCenter, z:0},
					{x: 0, y:0, z:distFromCenter},
					{x: -distFromCenter, y:0, z:0},
					{x: 0, y:-distFromCenter, z:0},
					{x: 0, y:0, z:distFromCenter}];

	var endPosition;
	while(true) {
 		endPosition = cameraPoses[Math.floor(Math.random()*cameraPoses.length)];
		if(Math.abs(camera.position.x - endPosition.x)  
		 + Math.abs(camera.position.x - endPosition.x)  
		 + Math.abs(camera.position.x - endPosition.x) > distFromCenter)  { break; }
	}
	//var randomMesh = pyramidMeshes[Math.floor(Math.random()*pyramidMeshes.length)];
	//var endPosition = randomMesh.position;


//	cameraPositionTween(camera.position, {x: 500, y:0, z: 0}, 4000, 0);
	cameraPositionTween(camera.position, endPosition, 4000, 0, false);

	//cameraFOVTween(camera.position, 300, 4000, 0);

}


function cameraPositionTween(position, destination, duration, delay, normalized) {

	if(normalized == true) {
		if(destination.x == 0) { destination.x = maxAxis / 2; }
		if(destination.x == 1) { destination.x *= maxAxis / 2; }
		if(destination.y == 0) { destination.y = maxAxis / 2; }
		if(destination.y == 1) { destination.y *= maxAxis / 2; }
		if(destination.z == 0) { destination.z = maxAxis / 2; }
		if(destination.z == 1) { destination.z *= maxAxis / 2; }
	}

	var thistween = new TWEEN.Tween(position)
		.to(destination, duration)
		.delay(delay)
		.easing(TWEEN.Easing.Cubic.InOut)
		.onStart(function() {
			console.log("START we just stopped a tween that took " + duration + "s and was delayed " + delay + "s");
		})
		.onUpdate(function() {
		//	console.log(this);
		})
		.onComplete(function() {
			console.log("STOP we just stopped a tween that took " + duration + "s and was delayed " + delay + "s");
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

