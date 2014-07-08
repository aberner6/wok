
var camera, scene, renderer, chart3d, material, material2;
var rotationX = 0;
var rotationY = 0;
var rotationZ = 0;

var svg, dots, d3chart3d;
var dotCitedFlag = true;


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



function threejs_init() {

	//setup
	scene = new THREE.Scene();

	// set up light
    var light = new THREE.DirectionalLight( 0xffffff );
    light.position.set( 0, 0, 1 );
    scene.add( light );

	//camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );
	//camera = new THREE.PerspectiveCamera( 105, 1, 1, 10000 );
	var camerazoom = 1/4;
	camera = new THREE.OrthographicCamera( window.innerWidth / - camerazoom, window.innerWidth / camerazoom, window.innerHeight / camerazoom, window.innerHeight / - camerazoom, 0.01, 100000 );
	camera.position.z = 10000;
	camera.position.x = 1000;
	renderer = new THREE.WebGLRenderer( { alpha: true, clearColor: 0xff0000 } );

	renderer.setClearColor( 0xffffff, 1 );

	renderer.setSize( window.innerWidth , window.innerHeight);
//	renderer.setSize( 500, 500);
	document.body.appendChild( renderer.domElement );

	// adding geometry
	//geometry = new THREE.BoxGeometry( 20, 20, 20 );
	geometry = new THREE.SphereGeometry( 50, 10, 10);
//	geometry = new THREE.CircleGeometry( 50, 8);
//	material = new THREE.MeshBasicMaterial( { color: 0xff00ff, wireframe: false } );
//	material2 = new THREE.MeshLambertMaterial( { color: 0x4682B4, shading: THREE.FlatShading, vertexColors: THREE.VertexColors } );
	
	getMaterial = function(thiscolor) {
		return new THREE.MeshLambertMaterial( { color: thiscolor, shading: THREE.FlatShading, vertexColors: THREE.VertexColors } );
		return new THREE.MeshBasicMaterial( { color: thiscolor, wireframe: false } );
	}

	// create container for our 3D chart
	chart3d = new THREE.Object3D();
	scene.add( chart3d );

    // create function for D3 to set up 3D bars
    newSphere = function(thiscolor) { return new THREE.Mesh( geometry, getMaterial(thiscolor) ); }

}




function drawThreejsChart(csvFilename) {
/* MAGIC IS HERE */

var color = d3.scale.category20c();

d3.csv(csvFilename, function(error, data) {

	// use D3 to set up 3D bars
	dots = d3.select( chart3d )
		.selectAll("THREE.Mesh")
		.data(data)
		.enter()
		.append(function(d, i) { 
			console.log(color(i));
			return newSphere(parseInt("0x" + color(i).substr(1), 16));
		});

});



}



function dotCited() {
	console.log("dotCited");

	dots
	.transition()
	.duration(3000)
	.attr("position.x", function(d, i) { return 30 * i; })
	.attr("position.y", function(d, i) { return d['Cited'] * 1 ; })
//		.attr("position.z", function(d, i) { return d['Cited'] * 1 ; })

	rotationX = 0.01;
	rotationY = 0.03;
	rotationZ = 0.02;
}

function dotPage() {
	console.log("dotPage");

	dots
	.transition()
	.duration(3000)
	.attr("position.x", function(d, i) { return 30 * i; })
	.attr("position.y", function(d, i) { return d['Page end'] * 1 ; })
//		.attr("position.z", function(d, i) { return d['Page end'] * 1 ; })
//		.attr("position.z", function(d, i) { return Math.sin(i/ 10.0) * 100 ; })
//
	rotationX = 0.0;
	rotationY = 0.0;
	rotationZ = 0.0;
}



function threejs_animate() {

	// note: three.js includes requestAnimationFrame shim
	requestAnimationFrame( threejs_animate );

	// this is the global rotation, so that each data-manipulation function can control the global rotation
	chart3d.rotation.x += rotationX;
	chart3d.rotation.y += rotationY;
	chart3d.rotation.z += rotationZ;

	renderer.render( scene, camera );

}


$( document ).ready(function() {

	threejs_d3_functions();
	
	threejs_init();

	drawThreejsChart("memory_allyears_smallBatch.csv");

	threejs_animate(); 

	$("#cited").click(function() {
		console.log("cited clicked");
		if(dotCitedFlag == true) {
			dotPage();
			dotCitedFlag = false;
		} else {
			dotCited();
			dotCitedFlag = true;
		}
	});

});



