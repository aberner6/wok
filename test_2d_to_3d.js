
var camera, scene, renderer, chart3d, secondChart, material, material2, materialLine, spriteMapCircle;

var dots;
var rotationX = 0;
var rotationY = 0;
var rotationZ = 0;
var secondRotationX = 0;
var secondRotationY = 0;
var secondRotationZ = 0;
var dotCitedFlag = true;

var d3chart = d3chart || {};



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

	//setup
	scene = new THREE.Scene();

	// fog
	scene.fog = new THREE.Fog( 0x000000, 1000, 7000 );


	// set up light
    var light = new THREE.DirectionalLight( 0xffffff );
    light.position.set( 0, 0, 1 );
    scene.add( light ); 

	var width = window.innerWidth;
	var height = window.innerHeight;

	var camerazoom = 1; //not 1/4

//	camera = new THREE.OrthographicCamera( window.innerWidth / - camerazoom, window.innerWidth / camerazoom, window.innerHeight / camerazoom, window.innerHeight / - camerazoom, 0.01, 100000 );
	camera = new THREE.OrthographicCamera( - width / camerazoom, width / camerazoom, height / camerazoom, - height / camerazoom, 0.01, 100000 );
	camera = new THREE.PerspectiveCamera( 35, window.innerWidth / window.innerHeight, 1, 10000 );
	camera.position.z = 10000;
	camera.position.x = 1000;
	camera.position.z = 3000;
	camera.position.x = 600;
	camera.position.y = 300;

	renderer = new THREE.WebGLRenderer( { alpha: true, clearColor: 0xff0000 } );
	renderer.setSize( width, height);
	renderer.setClearColor( 0xffffff, 1 );
	renderer.autoClear = false;

	/* geometry functions */

    // given a color, creates a sphere mesh with material with color
	meshSphere = new THREE.SphereGeometry( 50, 10, 10);
    newSphere = function(thiscolor) { 
		var thismaterial =  new THREE.MeshLambertMaterial( { color: thiscolor, shading: THREE.FlatShading, vertexColors: THREE.VertexColors } );
		return new THREE.Mesh( meshSphere, thismaterial ); 
	}

	// given a color, creates a sprite with color
	spriteMapCircle = THREE.ImageUtils.loadTexture( "images/sprite_circle.png" );
    newCircleSprite = function(thiscolor) { 
		var thismaterial = new THREE.SpriteMaterial( { map: spriteMapCircle, color: thiscolor, fog: true });
		var thissprite = new THREE.Sprite( thismaterial);
		thissprite.scale.set(100,100,10);
		return thissprite;
	}


//	renderer.setSize( 500, 500);
	document.body.appendChild( renderer.domElement );


}



function drawThreejsChart(csvFilename) {
/* MAGIC IS HERE */

	var color = d3.scale.category20c();

	// create objects, add them to scene
	chart3d = new THREE.Object3D();
	secondChart = new THREE.Object3D();
	scene.add( secondChart );
	scene.add( chart3d );


	d3.csv(csvFilename, function(error, data) {

		// use D3 to set up 3D bars
		dots = d3.select( chart3d )
			.selectAll("THREE.Mesh")
			.data(data)
			.enter()
			.append(function(d, i) { 
				return newCircleSprite(parseInt("0x" + color(i).substr(1), 16));
			});

		console.log(dots);
		// use D3 to set up 3D bars
		moreDots = d3.select( secondChart )
			.selectAll("THREE.Mesh")
			.data(data)
			.enter()
			.append(function(d, i) { 
				return newSphere(7057110);
				return newCircleSprite(parseInt("0x" + color(i).substr(1), 16));
			});

	});

}



function dotCited() {
	console.log("dotCited");

	dots
	.transition()
	.duration(3000)
	.attr("position.x", function(d, i) { return d3chart.xScale(d['Year']); })
	.attr("position.y", function(d, i) { return d['Cited'] ; })


	 rotationX = 0.01;
	 rotationY = 0.01;
	 rotationZ = 0.01;
}

function dotPage() {
	console.log("dotPage");


	moreDots
	.transition()
	.duration(3000)
	.attr("position.x", function(d, i) { return d3chart.xScale(d['Year']); })
	.attr("position.y", function(d, i) { return d['Cited'] ; })
	.attr("position.z", function(d, i) { return Math.sin(i/ 10.0) * 100 ; })

	secondRotationX = 0.01;
	secondRotationY = 0.01;
	secondRotationZ = 0.01;
}



function threejs_animate() {

	// note: three.js includes requestAnimationFrame shim
	requestAnimationFrame( threejs_animate );

	// this is the global rotation, so that each data-manipulation function can control the global rotation
	chart3d.rotation.x += rotationX;
	chart3d.rotation.y += rotationY;
	chart3d.rotation.z += rotationZ;

	secondChart.rotation.x += secondRotationX;
	secondChart.rotation.y += secondRotationY;
	secondChart.rotation.z += secondRotationZ; 

	animateLine();
	renderer.render( scene, camera );

}



function onWindowResize() {
	var width = window.innerWidth;
	var height = window.innerHeight;

	camera.aspect = width / height;				
	camera.updateProjectionMatrix();

	renderer.setSize( window.innerWidth, window.innerHeight );
}


function drawThings() {
	drawLine(scene);
	drawThreejsChart("memory_allyears_smallBatch.csv");
}


$( document ).ready(function() {

	// initiate threejs and d3 connection
	threejs_d3_functions();

/*	// initiate threejs renderer
	threejs_environment_init();

	// draw things
	drawThings();

	// animate data
	threejs_animate();  */


	var b = 0;
	$("body").keypress(function(){
		console.log(b);
		(b+=1);
		if (b==1){
			threejs_environment_init();
		}
		if (b==2){
			drawThings();
		}
		if(b==3){
			threejs_animate(); 
		}
	})	 

	$("#cited").click(function() {
		console.log("cited clicked");
		if(dotCitedFlag == true) {
			dotCited();
			dotCitedFlag = false;
		} else {
			dotPage();
			dotCitedFlag = true;
		}
	});

	window.addEventListener( 'resize', onWindowResize, false );

});

