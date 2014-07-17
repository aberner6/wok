var spriteRotation = {};
spriteRotation.x = 0.0;
spriteRotation.y = 0.0;
spriteRotation.z = 0.0;


var authors = [];
var theseAuthors = [];




var geometryLine = new THREE.Geometry();
var materialLine = new THREE.LineBasicMaterial({
    color: 0x0000ff,
});
var dummyLine;
var b;
var originX = 0, originY = 0; 
// given a color, creates a sprite with color
spriteMapCircle = THREE.ImageUtils.loadTexture( "images/sprite_rect.png" );
newCircleSprite = function(thiscolor) { 
	var thismaterial = new THREE.SpriteMaterial( { map: spriteMapCircle, color: thiscolor, fog: true });
	var thissprite = new THREE.Sprite( thismaterial);
	thissprite.scale.set(15,10,10);
	return thissprite;
}


function drawSprite(csvFilename, thisscene) {
/* MAGIC IS HERE */

	var color = d3.scale.category20c();

	// create objects, add them to thisscene
	chart3d = new THREE.Object3D();
	secondChart = new THREE.Object3D();

	lineChart = new THREE.Object3D();





	thisscene.add( secondChart );
	thisscene.add( chart3d );
	thisscene.add(lineChart);
	
// Add axes
	// d3.csv(csvFilename, function(error, data) {
// if (uniqueTypes.length==372){
// 		// use D3 to set up 3D bars
// 		dots = d3.select( chart3d )
// 			.selectAll("THREE.Mesh")
// 			.data(data)
// 			.enter()
// 			.append(function(d, i) { 
//         for (j=0; j<uniqueTypes.length; j++){
//             if(d.Sourcetitle==uniqueTypes[j]){
// 				return newCircleSprite(parseInt("0x" + color(j).substr(1), 16));
//             }       
//         }  				
// 				// return newCircleSprite(parseInt("0x" + color(2).substr(1), 16));
// 			});		
// }
		// console.log(dots);
	// });

		// moreDots = d3.select( secondChart )
		// 	.selectAll("THREE.Mesh")
		// 	.data(sevenData)
		// 	.enter()
		// 	.append(function(d, i) { 
		// 		// return newSphere(7057110);
		// 		return newCircleSprite(parseInt("0x" + color(i).substr(1), 16));
		// 	});	
}


// var b = 0;
// $( document ).ready(function() {

// $("body").keypress(function(){
// 	console.log(b);
//     (b+=1);
// if(b==1){
// 	//SETTING UP A LINE WITH D3

	

// 	if (straightLine.length==thisData.length){	

// 		geometryLine.dynamic = true;

// 	    for (i=0; i<thisData.length; i++){
// 	        var o = straightLine[i];
// 	        geometryLine.vertices[i]=(new THREE.Vector3(originX+o.x, originY+o.y, 0)); //Math.sin(i/ 10.0) * 100)
			
// 		}


// 		dummyLine = d3
// 			.select('dummyLine')
// 			.data(geometryLine.vertices)
// 			.enter()
// 			.append('dummyLine')
// 			.attr("x", function(d, i) {	return geometryLine.vertices[i].x; })
// 			.attr("y", function(d, i) {	return geometryLine.vertices[i].y; })
// 			.attr("z", function(d, i) {	return geometryLine.vertices[i].z; });




// 		console.log("geometryLine = ");
// 		console.log(geometryLine);
	    
// 		var gLine = [1];
// 			aLine = d3.select( lineChart )
// 				.selectAll("THREE.Mesh")
// 				.data(gLine)
// 				.enter()
// 				.append(function() {
// 					return new THREE.Line(geometryLine, materialLine);
// 				});
// 				// .transition()
// 				// .duration(3000)
// 				// .attr("position.x",  function(d, i) { return Math.sin(i/ 10.0) * 100; })
// 				// .attr("position.y",  function(d, i) { 
// 				// 	console.log("changing position.y");
// 				// 	console.log(this);
// 				// 	return 100; 
// 				// })	

// 				// .each("end", function(){
// 				// 	lineRotation.z += 0.02;
// 				// })		


// 	}
// }

// if(b == 2) {

// 	aLine
// 		.transition()
// 		.duration(3000)
// 		// .attr("position.x",  function(d, i) { return Math.sin(i/ 10.0) * 100; })
// 		.attr("position.z",  function(d, i) { 
// 			console.log("changing position.y");
// 			for (j = 0; j < this.geometry.vertices.length; j++) {
// 				this.geometry.vertices[j].set(0,0,0);
// 				console.log(this.geometry.vertices[j]);
// 						geometryLine.vertices[ i ].y = 350 * Math.sin( i / 5 + ( 3+ i ) / 7 );
// 			}
// 			return 10; 
// 		});

	
// 	// 	console.log(geometryLine.vertices);

// 	// var d3gl = d3.select(geometryLine.vertices).data([1])
// 	// 			.enter().attr("fill", function(d, i) {
// 	// 				console.log(d);
// 	// 			});
// 	// console.log(d3gl);

// 	dummyLine
// 		.transition()
// 		.duration(3000)
// 		.attr("x", function(d,i) {
// 			return 30;
// 		});
// }
// })
// })
function animateSprite() {


	if (typeof secondChart !== 'undefined') {
if (secondChart.rotation.z < 1.55 && b==1) { 		
		secondChart.rotation.z += spriteRotation.z;
	}
	else {	
	}
}

	if (typeof chart3d !== 'undefined') {
		// if (dotCitedFlag==true && spriteRotation.y<1){
		// 	chart3d.rotation.y += spriteRotation.y;
		// }
		// variable is defined
		chart3d.rotation.x = spriteRotation.x; 
		chart3d.rotation.y = spriteRotation.y;
		chart3d.rotation.z = spriteRotation.z;
if (lineChart.rotation.z <1.55){
		lineChart.rotation.z += lineRotation.z;
	}

	}

}
