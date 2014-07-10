
var camera, scene, renderer, chart3d, secondChart, material, material2, materialLine, spriteMap;
var rotationX = 0;
var rotationY = 0;
var rotationZ = 0;
var secondRotationX = 0;
var secondRotationY = 0;
var secondRotationZ = 0;
var dotCitedFlag = true;

var d3chart = d3chart || {};


function drawD3Chart() {


	var svg, dots, moreDots, path, line, geometryLine;

	var svg;

	// var d3chart.xScale;
	var xAxis;
	var straightLine = [];
	var years = [];
	var uniqueYears;
	var uniqueAuthors;
	var uniqueKeywords;
	var journalTypes = [];
	var authors = [];
	var keywords = [];
	var goSecond = false;

	var totals = [];
	var totalAuthors = [];
	var totalKeywords = [];

	var total1 = 0;

	var color =  d3.scale.category20c();
	var opacityMap;

	var firstLoadVar;
	var firstLoad = -1;
	var secLoad = -1;

	var padding = 35;

	var minYear;
	var maxYear;
	var maxAuthor;
	var thisTotal;
	var eachPaper;

	var heightScale;
	var singleScale;
	var thisData = [];
	var theseAuthors = [];
	var theseKeywords = [];
	var theX = [];
	var maxEntries;
	var width = 1400;
	var height = 720;

	d3.csv("memory_allyears_smallBatch.csv", function(data) {
	        thisData=(data);
	    for (i = 0;i<thisData.length; i++){ 
	        years[i] = data[i].Year;
	        authors[i] = data[i].Authors.split("., ");
	        for (j=0; j<authors[i].length; j++){
	        theseAuthors.push(authors[i][j]);            
	        }
	        journalTypes[i] = data[i].Sourcetitle;
	    }


	////finds unique names etc
	    function onlyUnique(value, index, self) { 
	        return self.indexOf(value) === index;
	    } 
	    uniqueTypes = journalTypes.filter( onlyUnique ); //finds unique names
	    uniqueYears = years.filter( onlyUnique ); //finds unique names

	////consolidates the Value for all values of a given Name
	    function valueConsolidation(givenYear, i) { 
	        var total = 0;
	        for (i = 0;i<data.length; i++){ 
	            if(data[i].Year== givenYear){
	                total++;
	            }else{
	            }}
	         return total;
	     } 
	 //creates a new aray with the sums of all the different Names 
	    for (i = 0; i<uniqueYears.length; i++){
	        totals[i]= valueConsolidation(uniqueYears[i])
	    } 

	   maxAuthor = d3.max(totalAuthors, function(d) { return d; });
	   singleScale = d3.scale.linear()
	        .domain([1, maxAuthor*5])
	        .range([1, height/6-100]);

	    maxEntries = d3.max(totals, function(d) { return d; });

	    minYear = d3.min(years, function(d) { return d; });
	    maxYear = d3.max(years, function(d) { return d; });

	    d3chart.xScale = d3.scale.linear()
	        .domain([minYear, maxYear]) //not min year to max year
	        .range([100, width*1.2]);

	    var maxCited = d3.max(data, function(d) { return d.Cited; });
	    opacityMap = d3.scale.linear()
	        .domain([0, maxCited])
	        .range([.2, 1])        

	    heightScale = d3.scale.linear()
	        .domain([0, maxEntries*3])
	        .range([padding, height/1.2]);


	////FOR X AXIS
	// var xTime = d3.time.scale()
	//     .domain([new Date(1965,7,1), new Date(2014,7,1)])
	//     .range([65, w-46]);

	// xAxis = d3.svg.axis()
	//     .scale(xTime)
	//     .ticks(d3.time.years)
	//     .tickSize(6,0)
	//     .orient("bottom");

	// svg.append("g")
	//     .attr("class", "axis")  //Assign "axis" class
	//     .attr("transform", "translate(0," + (h - padding+5) + ")")
	//     .call(xAxis);

	})


}



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



function threejs_environment_init() {

	//setup
	scene = new THREE.Scene();

	// set up light
    var light = new THREE.DirectionalLight( 0xffffff );
    light.position.set( 0, 0, 1 );
    scene.add( light );

	var width = window.innerWidth;
	var height = window.innerHeight;

	//camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );
	//camera = new THREE.PerspectiveCamera( 105, 1, 1, 10000 );
	var camerazoom = 1; //not 1/4

//	camera = new THREE.OrthographicCamera( window.innerWidth / - camerazoom, window.innerWidth / camerazoom, window.innerHeight / camerazoom, window.innerHeight / - camerazoom, 0.01, 100000 );
	camera = new THREE.OrthographicCamera( - width / camerazoom, width / camerazoom, height / camerazoom, - height / camerazoom, 0.01, 100000 );
	camera.position.z = 10000;
	camera.position.x = 1000;

	renderer = new THREE.WebGLRenderer( { alpha: true, clearColor: 0xff0000 } );
	renderer.setSize( width, height);
	renderer.setClearColor( 0xffffff, 1 );
	renderer.autoClear = false;

//	renderer.setSize( 500, 500);
	document.body.appendChild( renderer.domElement );

	window.addEventListener( 'resize', onWindowResize, false );

}


function onWindowResize() {
	var width = window.innerWidth;
	var height = window.innerHeight;

	camera.aspect = width / height;				
	camera.updateProjectionMatrix();

	renderer.setSize( window.innerWidth, window.innerHeight );
}


function addGeometry() {
	// adding geometry
	//geometry = new THREE.BoxGeometry( 20, 20, 20 );
	// geometry = new THREE.SphereGeometry( 50, 10, 10);
	// geometry = new THREE.SphereGeometry( 15, 8, 8);

	geometry = new THREE.CircleGeometry( 10, 10);


    var geometryLine = new THREE.Geometry();
    // geometryLine.vertices.push(new THREE.Vector3(-10, 0, 0));
    // geometryLine.vertices.push(new THREE.Vector3(0, 10, 0));
    // geometryLine.vertices.push(new THREE.Vector3(10, 0, 0));	
    var path = [
        { x:0,   y:0 },
        { x:40,  y:0 },
        { x:40,  y:30 },
        { x:70,  y:30 },
        { x:70,  y:40 },
        { x:80,  y:40 },
        { x:80,  y:100 },
        { x:120,  y:100 },
        { x:120,  y:200 }
    ];
    
    var originX = -100, originY = -100;    
    for (var pt = 0; pt < path.length; ++pt) {
        var o = path[pt];
        geometryLine.vertices.push(new THREE.Vector3(originX+o.x, originY+o.y, 1));
    }


//	material = new THREE.MeshBasicMaterial( { color: 0xff00ff, wireframe: false } );
//	material2 = new THREE.MeshLambertMaterial( { color: 0x4682B4, shading: THREE.FlatShading, vertexColors: THREE.VertexColors } );
 // Draw lines
    materialLine = new THREE.LineBasicMaterial({
        color: 0x0000ff,
    });
	
    var line = new THREE.Line(geometryLine, material);

	getSphere = new THREE.SphereGeometry( 50, 10, 10);
	getSprite = new THREE.Sprite();
//	geometry = new THREE.SphereGeometry( 50, 10, 10);
//	geometry = new THREE.CircleGeometry( 50, 8);
//	material = new THREE.MeshBasicMaterial( { color: 0xff00ff, wireframe: false } );
//	material2 = new THREE.MeshLambertMaterial( { color: 0x4682B4, shading: THREE.FlatShading, vertexColors: THREE.VertexColors } );
	
	getMaterial = function(thiscolor) {
		return new THREE.MeshLambertMaterial( { color: thiscolor, shading: THREE.FlatShading, vertexColors: THREE.VertexColors } );
		return new THREE.MeshBasicMaterial( { color: thiscolor, wireframe: false } );
	}

	// create container for our 3D chart
	chart3d = new THREE.Object3D();
	secondChart = new THREE.Object3D();
    // line = new THREE.Line(geometry, materialLine);
	spriteMap = THREE.ImageUtils.loadTexture( "images/sprite0.png" );

/*	getSpriteMaterial = function(thiscolor) {
		return new THREE.SpriteMaterial( { map: spriteMap, color: thiscolor });
	} */

	//var spriteMaterial = new THREE.SpriteMaterial( { map: spriteMap, color: thiscolor });
	console.log(spriteMap);

	scene.add( chart3d );
	scene.add( secondChart );
   
    scene.add(line);
    
    // create function for D3 to set up 3D bars
    newSphere = function(thiscolor) { return new THREE.Mesh( getSphere, getMaterial(thiscolor) ); }
    //newSprite = function(thiscolor) { return new THREE.Sprite( getSpriteMaterial(thiscolor) ); }
    newSprite = function(thiscolor) { 
		var thismap = THREE.ImageUtils.loadTexture( "images/sprite0.png" );
		var thismaterial = new THREE.SpriteMaterial( { map: thismap, color: 0xff00ff });
		var thissprite = new THREE.Sprite( thismaterial);
		thissprite.scale.set(100,100,1);
		return thissprite;
	}

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
			return newSprite(parseInt("0x" + color(i).substr(1), 16));
		});

	console.log(dots);
	// use D3 to set up 3D bars
	moreDots = d3.select( secondChart )
		.selectAll("THREE.Mesh")
		.data(data)
		.enter()
		.append(function(d, i) { 
			return newSphere(7057110);
			return newSprite(parseInt("0x" + color(i).substr(1), 16));
		});

	// path = d3.select(line)
	// 	.selectAll("THREE.Mesh")
	// 	.data(data)
	// 	.enter()
	// 	.append(function(d, i) { 
	// 		return newSphere(7057110);
	// 	});	
});



}



function dotCited() {
	console.log("dotCited");

	dots
	.transition()
	.duration(3000)
	.attr("position.x", function(d, i) { return d3chart.xScale(d['Year']); })
	.attr("position.y", function(d, i) { return d['Cited'] ; })
//		.attr("position.z", function(d, i) { return d['Cited'] * 1 ; })


	// moreDots
	// .transition()
	// .duration(3000)
	// .attr("position.x", function(d, i) { return d3chart.xScale(d['Year']); })
	// .attr("position.y", function(d, i) { return d['Cited'] ; })


	// rotationX = 0.01;
	// rotationY = 0.01;
	// rotationZ = 0.01;
	.attr("position.x", function(d, i) { return 30 * i; })
	.attr("position.y", function(d, i) { return d['Cited'] * 1 ; })
//		.attr("position.z", function(d, i) { return d['Cited'] * 1 ; })

	rotationX = 0.01;
	rotationY = 0.03;
	rotationZ = 0.02;
}

function dotPage() {
	console.log("dotPage");

	// moreDots
	// .transition()
	// .duration(3000)
	// .attr("position.x", function(d, i) { return d3chart.xScale(d['Year']); })
	// .attr("position.y", function(d, i) { return d['Cited'] ; })

	moreDots
	.transition()
	.duration(3000)
	.attr("position.x", function(d, i) { return d3chart.xScale(d['Year']); })
	.attr("position.y", function(d, i) { return d['Cited'] ; })
	// .attr("position.x", function(d, i) { return 30 * i; })
	// .attr("position.z", function(d, i) { return d['Page end'] * 1 ; })
		// .attr("position.z", function(d, i) { return d['Page end'] * 1 ; })
		.attr("position.z", function(d, i) { return Math.sin(i/ 10.0) * 100 ; })

	secondRotationX = 0.01;
	secondRotationY = 0.01;
	secondRotationZ = 0.01;
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
/*	chart3d.rotation.x += rotationX;
	chart3d.rotation.y += rotationY;
	chart3d.rotation.z += rotationZ;

	secondChart.rotation.x += secondRotationX;
	secondChart.rotation.y += secondRotationY;
	secondChart.rotation.z += secondRotationZ; */


	renderer.render( scene, camera );
//	renderSprites();

}


$( document ).ready(function() {

	// initiate threejs and d3 connection
	threejs_d3_functions();

	// initiate threejs renderer
	threejs_environment_init();

	//  add geometry
	addGeometry();

	// draw threejs chart
	drawD3Chart();

	// draw threejs chart
	drawThreejsChart("memory_allyears_smallBatch.csv");

	// animate data
	threejs_animate(); 

	// deal with other behavior
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

