
var camera, scene, renderer, chart3d, secondChart, lineChart, material, material2, materialLine, spriteMapCircle;
	var thisData = [];

var dots, mowreDots, aLine;
var rotationX = 0;
var rotationY = 0;
var rotationZ = 0;
var secondRotationX = 0;
var secondRotationY = 0;
var secondRotationZ = 0;
var dotCitedFlag = true;


var years = [];
var uniqueYears;
var width = 1400;
var height = 720;
var totals = [];
var b = 0;
var total1 = 0;
var theHeight = [];
var firstLoadVar;
var firstLoad = 0;
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

	renderer = new THREE.WebGLRenderer( { alpha: true, clearColor: 0xff0000, antialias: true } );
	renderer.setSize( width, height);
	renderer.setClearColor( 0xffffff, 1 );
	renderer.autoClear = false;

	/* geometry functions */

    // given a color, creates a sphere mesh with material with color
	/*
	meshSphere = new THREE.SphereGeometry( 50, 10, 10);
    newSphere = function(thiscolor) { 
		var thismaterial =  new THREE.MeshLambertMaterial( { color: thiscolor, shading: THREE.FlatShading, vertexColors: THREE.VertexColors } );
		return new THREE.Mesh( meshSphere, thismaterial ); 
	}*/


//	renderer.setSize( 500, 500);
	document.body.appendChild( renderer.domElement );


}
// var b = 0;
// $( document ).ready(function() {
// $("body").keypress(function(){
// (b+=1);
// console.log(b);
// })
// })

function loadDots(){
// $( document ).ready(function() {

console.log("setting interval");
firstLoadVar = setInterval(function(){ 
	console.log("inside interval");
// console.log(totals.length);

if(totals.length>0){    
    if (firstLoad<totals.length){
//         console.log("yyy");

            if(uniqueYears[firstLoad]!=undefined){
            	var oneYear = uniqueYears[firstLoad];
            	console.log("going into loadbar TO READ " + oneYear);
            	// loadBar2(oneYear); //store inner subjects is the loading function for the big data      

            	loadBar(oneYear); //store inner subjects is the loading function for the big data      
//            	console.log("came back from loadbar");

        	}

    	firstLoad++; 

    }
    else {
    	clearInterval(firstLoadVar); //and stop loading stuff in
    }
	console.log("finishing last if");

}
},500);	
console.log("done with set inverfal");

// })

}



function dotCited() {


	console.log("dotCited2");

	dots
	.transition()
	.duration(3000)
	.attr("position.x", function(d, i) { return d3chart.xScale(d['Year']); })
	.attr("position.y", function(d, i) { 
            for (j = 0; j<uniqueYears.length; j++){
                if (d.Year==uniqueYears[j]){
                    return ((height)-d3chart.heightScale(totals[j]));               
                }
            }		
		// return d['Cited'] ; 
	})

}

function dotPage() {
	console.log("dotPage");


	moreDots
	.transition()
	.duration(3000)
	.attr("position.x", function(d, i) { return d3chart.xScale(d['Year']); })
	.attr("position.y", function(d, i) { return d['Cited'] ; })
	.attr("position.z", function(d, i) { return Math.sin(i/ 10.0) * 100 ; })

	// aLine
	// .transition()
	// .duration(3000)
	// .attr("")
		// aLine = d3.select( lineChart )
		// 	.selectAll("THREE.Mesh")
		// 	.data(data)
		// 	.enter()
		// 	.append(function(d,i) {
  //       var o = straightLine[i];
  //       geometryLine.vertices.push(new THREE.Vector3(originX+o.x, originY+o.y, Math.sin(i/ 10.0) * 100)); 
		// 		return new THREE.Line(geometryLine, materialLine);
		// 	});	
}



function loadBar(thisYear) {

	// console.log("dotBarDraft");

	// var thisYear = 2013;
	var total1 = 0;

	dots
	.transition()
	.duration(300)
	.attr("position.y", function(d, i) {

			console.log(this);
			if (d['Year']==thisYear){
				total1++;	
			// }

            	var tempvar = (height-d3chart.heightScale(total1*3)); 
            return tempvar;
        	}
        	
        	return this.position.y;
        	
		// return d['Cited'] ; 
	})
}


function threejs_animate() {

	// note: three.js includes requestAnimationFrame shim
	requestAnimationFrame( threejs_animate );

	// animation functions, loaded by each different js shim
	animateSprite(); 
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
	drawLine(scene); //loaded by external js
	drawSprite("memory_allyears_smallBatch.csv", scene);
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

	// deal with debug button
	$("#cited").click(function() {
		console.log("cited clicked");
		if(dotCitedFlag == true) {
			dotCited();
			dotCitedFlag = false;
		} else {
			loadDots();

			// dotPage();
			dotCitedFlag = true;
		}
	});

	// when window is resized, deal with that
	window.addEventListener( 'resize', onWindowResize, false );

});

