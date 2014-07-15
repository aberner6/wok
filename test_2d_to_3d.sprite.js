var spriteRotation = {};
spriteRotation.x = 0.0;
spriteRotation.y = 0.0;
spriteRotation.z = 0.0;

var geometryLine = new THREE.Geometry();
var materialLine = new THREE.LineBasicMaterial({
    color: 0x0000ff,
});
var dummyLine;
var b;
var originX = 0, originY = 0; 
// given a color, creates a sprite with color
spriteMapCircle = THREE.ImageUtils.loadTexture( "images/sprite_circle.png" );
newCircleSprite = function(thiscolor) { 
	var thismaterial = new THREE.SpriteMaterial( { map: spriteMapCircle, color: thiscolor, fog: true });
	var thissprite = new THREE.Sprite( thismaterial);
	thissprite.scale.set(15,15,10);
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
	axes = buildAxes( width*1.2 );
	thisscene.add( axes );

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
	});

		// moreDots = d3.select( secondChart )
		// 	.selectAll("THREE.Mesh")
		// 	.data(sevenData)
		// 	.enter()
		// 	.append(function(d, i) { 
		// 		// return newSphere(7057110);
		// 		return newCircleSprite(parseInt("0x" + color(i).substr(1), 16));
		// 	});	
}

function buildAxes( length ) {
	var axes = new THREE.Object3D();

	var axescolor = 0x000000;
	axes.add( buildAxis( new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( length, 0, 0 ), axescolor, false ) ); // +X
	axes.add( buildAxis( new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( -length, 0, 0 ), axescolor, false) ); // -X
	axes.add( buildAxis( new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( 0, length, 0 ), axescolor, false ) ); // +Y
	axes.add( buildAxis( new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( 0, -length, 0 ), axescolor, false ) ); // -Y
	axes.add( buildAxis( new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( 0, 0, length ), axescolor, false ) ); // +Z
	axes.add( buildAxis( new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( 0, 0, -length ), axescolor, false) ); // -Z

	return axes;

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
