
var camera, scene, renderer, controls;
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


var years = [];
var uniqueYears;
var threeJSDiv;
var newX = [];
var newY = [];
var newZ = [];
var width = 1400;
var height = 720;
var maxX = 850;
var maxY = 700;
var padding = 35;

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

	// SCENE
	scene = new THREE.Scene();
	scene.fog = new THREE.Fog( 0x000000, 1000, 7000 );


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
	camera.position.z = 10000;
	camera.position.x = 1000;
	camera.position.z = 3000;
	camera.position.x = 600;
	camera.position.y = 300;

	// RENDERER
	renderer = new THREE.WebGLRenderer( { alpha: true, clearColor: 0xff0000, antialias: true } );
	renderer.setSize( width, height);
	renderer.setClearColor( 0xffffff, 1 );
	renderer.autoClear = false;
	container = document.getElementById( 'threeJS' );
	container.appendChild( renderer.domElement );

	// CONTROLS
	controls = new THREE.OrbitControls( camera );
	controls.addEventListener( 'change', threejs_render );



}

var sevenYears = ["2014", "2013", "2012", "2011", "2010", "2009", "2008"];
function loadDots(){
firstLoadVar = setInterval(function(){ 
if(totals.length>0){    
    if (firstLoad<=sevenYears.length){
        var oneYear = sevenYears[firstLoad];
        console.log("going into loadbar TO READ " + oneYear);
        loadBar(oneYear); //store inner subjects is the loading function for the big data      
    	firstLoad++; 
    }
    else {
    	clearInterval(firstLoadVar); //and stop loading stuff in
    }
}
},100);	
}

// function loadDots(){
// firstLoadVar = setInterval(function(){ 
// if(totals.length>0){    
//     if (firstLoad<totals.length){

//             if(uniqueYears[firstLoad]!=undefined){
//             	var oneYear = uniqueYears[firstLoad];
//             	console.log("going into loadbar TO READ " + oneYear);

//             	loadBar(oneYear); //store inner subjects is the loading function for the big data      
//         	}
//     	firstLoad++; 
//     }
//     else {
//     	clearInterval(firstLoadVar); //and stop loading stuff in
//     }
// }
// },100);	
// }



function dotCited() {


	console.log("dotCited2");
	dots
	.transition()
	.duration(3000)
	.attr("position.x", function(d, i) { 
		return d3chart.xScale(d['Year']); 
	})
	.attr("position.y", function(d, i) { 
            for (j = 0; j<uniqueYears.length; j++){
                if (d.Year==uniqueYears[j]){
                    return (d3chart.heightScale(totals[j]));  //not height-             
                }
            }		
	});
	// .attr("position.z", -10000)
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
	var total1 = 0;
	dots
	.transition()
	.duration(300)
	.attr("position.y", function(d, i) {
			if (d['Year']==thisYear){
				total1++;	
            	var tempvar = (d3chart.heightScale(total1)); //not height-
            return tempvar;
        	}
        	if (d['Year']<2008){
        		return newY[i]*-1;
        	}   
        	console.log("these are the elses:");
        	console.log()
        	return this.position.y;
       })
	.attr("position.x", function(d, i) {
			console.log(this);
			if (d['Year']==thisYear){
				total1++;	
            	var tempvar = (d3chart.sevenScale(thisYear)); //not height-
            return tempvar;
        	}
        	if (d['Year']<2008){
        		return newX[i]*-1;
        	}        	
        	// else{
        	// 	return newX[i];
        	// }
        	return this.position.x;
       })
}

function dotRandom() {
	console.log("random");
	dots
	.transition()
	.duration(5000)
	.attr("position.x", function(d, i) { 
		return newX[i];
	})
	.attr("position.y", function(d, i) { 
		return newY[i];
	})
	.attr("position.z", function(d,i){
		return newZ[i];
	})
}
$( document ).ready(function() {
$("body").keypress(function(){
b+=1;
console.log(b);
if(b==1){
	loadDots();
}
})
})
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
}

function onWindowResize() {
	width = threeJSDiv.width(); 
	height = threeJSDiv.height();

	camera.aspect = width / height;				
	camera.updateProjectionMatrix();

	renderer.setSize( width, height);
}


function drawThings() {
	drawLine(scene); //loaded by external js
	drawSprite("memory_neuro_only_some_scientists.csv", scene);
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
			dotRandom();

			// dotCited();

			// loadDots();

			// dotPage();
			dotCitedFlag = true;
		}
	});

	// when window is resized, deal with that
	window.addEventListener( 'resize', onWindowResize, false );

});

