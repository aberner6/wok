
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


straightLine = [];

function drawD3Chart() {

	var svg;

	var xScale;
	var xAxis;
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
	var newX = [];
	var newY = [];



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


	for (i=0; i<thisData.length; i++){
		newX.push(d3chart.xScale(years[i]))
		newY.push(thisData[i].Cited) //height-10-
	}

	for (i=0; i<thisData.length; i++){
		straightLine.push({
			x: newX[i],
			y: newY[i]
		})
	}


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


    var geometryLine = new THREE.Geometry();
    materialLine = new THREE.LineBasicMaterial({
        color: 0x0000ff,
    });

    var originX = 0, originY = 0; 

    for (var pt = 0; pt < straightLine.length; ++pt) {
        var o = straightLine[pt];
        console.log(straightLine[pt])
        console.log(straightLine[pt].x)
        geometryLine.vertices.push(new THREE.Vector3(originX+o.x, originY+o.y, Math.sin(pt/ 10.0) * 100));
    }
	console.log("GEOMLINE");
	console.log(geometryLine.vertices);
    line = new THREE.Line(geometryLine, materialLine);
    scene.add(line);
	console.log(line);



	})

}



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


function onWindowResize() {
	var width = window.innerWidth;
	var height = window.innerHeight;

	camera.aspect = width / height;				
	camera.updateProjectionMatrix();

	renderer.setSize( window.innerWidth, window.innerHeight );
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

	line.rotation.x += secondRotationX;
	line.rotation.y += secondRotationY;
	line.rotation.z += secondRotationZ;
	renderer.render( scene, camera );
//	renderSprites();

}



function drawThings() {

	// draw threejs chart
	drawD3Chart();

	drawThreejsChart("memory_allyears_smallBatch.csv");

}

var b = 0;

$( document ).ready(function() {

	// initiate threejs and d3 connection
	threejs_d3_functions();

/*	// initiate threejs renderer
	threejs_environment_init();

	// draw things
	drawThings();

	// animate data
	threejs_animate();  */


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
			// dotPage();
			dotCitedFlag = false;
		} else {
	// rotationX = 0.0;
	// rotationY = 0.0;
	// rotationZ = 0.0;
			dotPage();
			dotCitedFlag = true;
		}
	});

	window.addEventListener( 'resize', onWindowResize, false );

});
