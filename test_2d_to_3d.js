
var camera, scene, renderer, chart3d, secondChart, material, material2, materialLine;
var rotationX = 0;
var rotationY = 0;
var rotationZ = 0;
var secondRotationX = 0;
var secondRotationY = 0;
var secondRotationZ = 0;
var svg, dots, moreDots, path, line, geometryLine;
var dotCitedFlag = true;

var svg;

var xScale;
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
var newX = [];
var newY = [];

function d3scales(){
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

    xScale = d3.scale.linear()
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
    newX.push(xScale(years[i]))
    newY.push(thisData[i].Cited) //height-10-
}
    // var path = [
    //     { x:0,   y:0 },
    //     { x:40,  y:0 },
    //     { x:40,  y:30 },
    //     { x:70,  y:30 },
    //     { x:70,  y:40 },
    //     { x:80,  y:40 },
    //     { x:80,  y:100 },
    //     { x:120,  y:100 },
    //     { x:120,  y:200 }
    // ];


for (i=0; i<thisData.length; i++){
    straightLine.push({
    	x: newX[i],
    	y: newY[i]
    })
    // straightLine.y.push([newY[i]]);
    // straightLine.x.push([newX[i]]);
    // straightLine.y.push([newY[i]]); 
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



function threejs_init() {

	//setup
	scene = new THREE.Scene();

	// set up light
    var light = new THREE.DirectionalLight( 0xffffff );
    light.position.set( 0, 0, 1 );
    scene.add( light );

	//camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );
	//camera = new THREE.PerspectiveCamera( 105, 1, 1, 10000 );
	var camerazoom = 1; //not 1/4
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
	// geometry = new THREE.SphereGeometry( 50, 10, 10);
	// geometry = new THREE.SphereGeometry( 15, 8, 8);

	geometry = new THREE.CircleGeometry( 10, 10);

    



        geometryLine = new THREE.Geometry();

	    materialLine = new THREE.LineBasicMaterial({
        color: 0x0000ff,
    });
    // geometryLine.vertices.push(new THREE.Vector3(-10, 0, 0));
    // geometryLine.vertices.push(new THREE.Vector3(0, 10, 0));
    // geometryLine.vertices.push(new THREE.Vector3(10, 0, 0));	
 //    var path = [
 //        { x:0,   y:0 },
 //        { x:40,  y:0 },
 //        { x:40,  y:30 },
 //        { x:70,  y:30 },
 //        { x:70,  y:40 },
 //        { x:80,  y:40 },
 //        { x:80,  y:100 },
 //        { x:120,  y:100 },
 //        { x:120,  y:200 }
 //    ];
 //    var originX = -100, originY = -100;  
 //    if(thisData.length==straightLine.length){  
 //    for (var pt = 0; pt < path.length; ++pt) {
 //        var o = path[pt];
 //        console.log(o)
 //        console.log(o.x)
 //        geometryLine.vertices.push(new THREE.Vector3(originX+o.x, originY+o.y, 1));
 //    }
	// }



    var originX = 0, originY = 0; 

    // if(thisData.length==straightLine.length){   
    for (var pt = 0; pt < straightLine.length; ++pt) {
        var o = straightLine[pt];
        console.log(straightLine[pt])
        console.log(straightLine[pt].x)
        geometryLine.vertices.push(new THREE.Vector3(originX+o.x, originY+o.y, Math.sin(pt/ 10.0) * 100));
    }






//	material = new THREE.MeshBasicMaterial( { color: 0xff00ff, wireframe: false } );
//	material2 = new THREE.MeshLambertMaterial( { color: 0x4682B4, shading: THREE.FlatShading, vertexColors: THREE.VertexColors } );
 // Draw lines


	getMaterial = function(thiscolor) {
		return new THREE.MeshLambertMaterial( { color: thiscolor, shading: THREE.FlatShading, vertexColors: THREE.VertexColors } );
		return new THREE.MeshBasicMaterial( { color: thiscolor, wireframe: false } );
	}

	// create container for our 3D chart
	chart3d = new THREE.Object3D();
	secondChart = new THREE.Object3D();
    line = new THREE.Line(geometryLine, materialLine);









	scene.add( chart3d );
	scene.add( secondChart );
   
    scene.add(line);
//to draw the path?




    // Draw lines
    // var material = new THREE.LineBasicMaterial({
    //     color: 0x0000ff,
    // });

    // var path = [
    //     { x:0,   y:0 },
    //     { x:40,  y:0 },
    //     { x:40,  y:30 },
    //     { x:70,  y:30 },
    //     { x:70,  y:40 },
    //     { x:80,  y:40 },
    //     { x:80,  y:100 },
    //     { x:120,  y:100 },
    //     { x:120,  y:200 }
    // ];
    
    // var originX = -100, originY = -100;
    
    // var geometry = new THREE.Geometry();
    // for (var pt = 0; pt < path.length; ++pt) {
    //     var o = path[pt];
    //     geometry.vertices.push(new THREE.Vector3(originX+o.x, originY+o.y, 1));
    // }

    // var line = new THREE.Line(geometry, material);

    // scene.add(line);




    // create function for D3 to set up 3D bars
    // newLine = function(thiscolor) { return new THREE.Mesh( geometry, getMaterial(thiscolor) ); }


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
			return newSphere(parseInt("0x" + color(i).substr(1), 16));
		});
	// use D3 to set up 3D bars
	moreDots = d3.select( secondChart )
		.selectAll("THREE.Mesh")
		.data(data)
		.enter()
		.append(function(d, i) { 
			return newSphere(7057110);
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
	.attr("position.x", function(d, i) { return xScale(d['Year']); })
	.attr("position.y", function(d, i) { return d['Cited'] ; })
//		.attr("position.z", function(d, i) { return d['Cited'] * 1 ; })


	// moreDots
	// .transition()
	// .duration(3000)
	// .attr("position.x", function(d, i) { return xScale(d['Year']); })
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
	// .attr("position.x", function(d, i) { return xScale(d['Year']); })
	// .attr("position.y", function(d, i) { return d['Cited'] ; })

	moreDots
	.transition()
	.duration(3000)
	.attr("position.x", function(d, i) { return xScale(d['Year']); })
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

}

var b = 0;

$( document ).ready(function() {
	d3scales();
	threejs_d3_functions();
$("body").keypress(function(){
	console.log(b);
    (b+=1);
    if (b==1){
    	threejs_init();
    }
    if (b==2){
		drawThreejsChart("memory_allyears_smallBatch.csv");    	
    }
    if(b==3){
		threejs_animate(); 
    }
})	
	// threejs_init();

	// drawThreejsChart("memory_allyears_smallBatch.csv");

	// threejs_animate(); 

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

});

// var dd=0;
// d3.select("canvas").on("click", function(){ console.log("hey")})
// d3.select("canvas").on("click", function(){
// 	console.log("keypress")
//     (dd+=1);
//     if (dd==1){
//     	dod3();
// }
// })

// function dod3(){
// console.log("dod3")
// svg = d3.select("canvas")
//     .append("svg")
//     .attr("width", width)
//     .attr("height", height);
// d3.csv("memory_allyears_smallBatch.csv", function(data) {
    
//     eachPaper = svg.selectAll("theseRects")
//         .data(data)
//         .enter()
//         .append("rect");
//     eachPaper
//         .attr("class", function(d,i){
//             theX.push(xScale(d.Year));
//             for (j = 0; j<uniqueYears.length; j++){
//                 if (d.Year==uniqueYears[j]){
//                     return "theseRects"+uniqueYears[j];               
//                 }
//             }
//         })
//         .attr("x", function(d,i) {
//             return  xScale(d.Year);               
//          })
//         .attr("y", function(d,i){
//                      //if your year matches the unique name year
//                      //go through the unique name year's total at index of unique name
//                      // map on the y region according to this
//             for (j = 0; j<uniqueYears.length; j++){
//                 if (d.Year==uniqueYears[j]){
//                     return ((height)-heightScale(totals[j]));               
//                 }
//             }
//             })
//         .attr("width", 20)
//         .attr("height", 5)
//         .attr("stroke-width",.5);

// $('rect').tipsy({
//     gravity: 'w', 
//     html: true, 
//     delayIn: 500, 
//     title: function() {
//         var d = this.__data__;     
//         var whichCited;
//         if (d.Cited>0){
//             whichCited = d.Cited;
//         } 
//         else {
//             whichCited = 0;
//         }
//         return d.Year+" "+", Journal: "+d.Sourcetitle+"<br/>Cited by "+whichCited+" other sources"+"<br/>Author: "+d.Authors;         
//     }
// });



// firstLoadVar = setInterval(function(){ 
// if(totals.length>0){    
//     if (firstLoad<totals.length-1){
//         firstLoad++; 
//         if (firstLoad>=0){
//             total1=0;
//             prep(firstLoad, totals[firstLoad], uniqueYears[firstLoad]); //store inner subjects is the loading function for the big data      
//         }
//     }
//     else {
//     console.log(journalTypes.length)
//     clearInterval(firstLoadVar); //and stop loading stuff in
//     }
// }
// },100);  
// })

// var b=0;
// $("body").keypress(function(){
//     (b+=1);
//     if (b==1){
//         for (i=0; i<thisData.length; i++){
//             straightLine.push([theX[i], theHeight[i]]);    
//         }
//     }
//     if (b==2){
//         addLines();
//     }
//     if (b==3){
//         goRandom();
//     }
//     if (b==4){
//         goBack();
//     }
//   });



// var theHeight = [];
// function prep(z,tots, thisYear){
// if(totals.length>0){    
// d3.selectAll(".theseRects"+thisYear)
//     .transition()
//     .attr('y', function(d,i) {
//         if (d.Year==thisYear){
//             total1++;
//             theHeight.push((height)-heightScale(total1*3))                     
//             return (height)-heightScale(total1*3);   
//         }
//     })
//     .attr("fill", function(d,i){

//         for (j=0; j<uniqueTypes.length; j++){
//             if(d.Sourcetitle==uniqueTypes[j]){
//                return color(j);
//             }       
//         }   
//     })
//     .attr("opacity", function(d,i){
//         return opacityMap(d.Cited);
//     })
// }
// }


// var line = d3.svg.line()
//     .interpolate("monotone") //cardinal is cool also monotone
//     .x(function(d, i) { 
//         return d[0];
//     })
//     .y(function(d, i) { 
//         return d[1];
//     });

// function addLines(){
// var thisd = [1];
// var people = svg.selectAll(".people")
//     .data(thisd);    
// people
//     .enter()
//     .append("g")
//     .attr("class", "people")
//     .append("path")
//     .attr("class", "line")
//     .attr("d", function(d){
//         return line(straightLine);
//     });

// }
// function goRandom(){
// console.log("random")
// straightLine.length = 0;
// var newLine = [];
// newLine.push([0,height]);

// d3.selectAll("path.line")
// .transition()
// .attr("d", function(d){
//     return line(newLine);
// })



// var newX = [];
// var newY = [];
// var randomX = d3.scale.linear()
//     .domain([0,1]) 
//     .range([padding, width-padding]);
// var randomY = d3.scale.linear()
//     .domain([0,1]) 
//     .range([padding, height-padding]);


// for (i=0; i<thisData.length; i++){
//     newX.push(randomX(Math.random()))
//     newY.push(randomY(Math.random()))
// }
// for (i=0; i<thisData.length; i++){
//     straightLine.push([newX[i], newY[i]]); 
// }

// if (straightLine.length==thisData.length){
// d3.selectAll("rect")
//     .transition()
//     .duration(100)
//     .attr("x", function(d,i){
//         return randomX(Math.random());
//     })
//     .attr("y", function(d,i){
//         return randomY(Math.random());
//     })
//     .attr("width",1)
//     .attr("height",1);
// eachNode = svg.selectAll("nodeCircs")
//     .data(thisData)
//     .enter()
//     .append("circle")
//     .attr("class", function(d,i){
//         for (j = 0; j<uniqueYears.length; j++){
//             if (d.Year==uniqueYears[j]){
//                 return "nodeCircs"+uniqueYears[j];               
//             }
//         }
//     })
//     .attr("fill", "none")
//     .attr("stroke","none")
//     .attr("cx",function(d,i){
//         return xScale(d.Year)
//     })
//     .attr("cy",function(d,i){
//         for (j = 0; j<uniqueYears.length; j++){
//             if (d.Year==uniqueYears[j]){
//                 return ((height)-heightScale(totals[j]));               
//             }
//         }
//     })
//     .attr("r",0)
//     .transition()
//     .attr("cx", function(d,i){
//         return newX[i];
//     })
//     .attr("cy", function(d,i){ 
//         return newY[i];
//     })
//     .attr("r", function(){
//         return 5;        
//     })
//     .attr("fill", function(d,i){
//         for (j=0; j<uniqueTypes.length; j++){
//             if(d.Sourcetitle==uniqueTypes[j]){
//                return color(j);
//             }       
//         }
//     });
// d3.selectAll("path.line")
// .transition()
// .attr("d", function(d){
//     return line(straightLine);
// })   
//     .each("end", function(){
//         d3.selectAll("rect")
//             .transition()
//             .attr("width",.1)
//             .attr("height",.1)
//     })
// }
// }


// function goBack(){
// straightLine.length = 0;
// var newX = [];
// var newY = [];


// for (i=0; i<thisData.length; i++){
//     newX.push(xScale(years[i]))
//     newY.push(height-10-thisData[i].Cited)
// }
// for (i=0; i<thisData.length; i++){
//     straightLine.push([newX[i], newY[i]]); 
// }


// if (straightLine.length==thisData.length){
// d3.selectAll("circle")
//     .transition()
//     .attr("cx",function(d,i){
//         return  newX[i];               
//     })
//     .attr("cy", function(d,i){ 
//         return height-10-d.Cited;
//     })
//     .attr("r", function(){
//         return 5;        
//     })
//     .attr("fill", function(d,i){
//         for (j=0; j<uniqueTypes.length; j++){
//             if(d.Sourcetitle==uniqueTypes[j]){
//                return color(j);
//             }       
//         }
//     });
// d3.selectAll("path.line")
// .transition()
// .attr("d", function(d){
//     return line(straightLine);
// })   
// }
// }
// $('circle').tipsy({
//     gravity: 'w', 
//     html: true, 
//     delayIn: 500, 
//     title: function() {
//         var d = this.__data__;     
//         var whichCited;
//         if (d.Cited>0){
//             whichCited = d.Cited;
//         } 
//         else {
//             whichCited = 0;
//         }
//         return d.Year+" "+", Journal: "+d.Sourcetitle+"<br/>Cited by "+whichCited+" other sources"+"<br/>Author: "+d.Authors;         
//     }
// });
// }


