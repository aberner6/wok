var years = [];
var uniqueYears;
var newX = [];
var newY = [];
var newZ = [];
var totals = [];
var b = 0;
var total1 = 0;
var theHeight = [];
var firstLoadVar;
var firstLoad = 0;
var d3chart = d3chart || {};


function dotTotals() {

	console.log("allTotals");
	dots
	.transition()
	.duration(3000)
	.attr("position.x", function(d, i) { 
//     thisData[5140].Title
// "Cognitive neuroscience and the study of memory" 		
            if (i==5140){
				console.log("x:"+d3chart.xScale(d['Year']));
            }		
		return d3chart.xScale(d['Year']); 
	})
	.attr("position.y", function(d, i) { 		
            for (j = 0; j<uniqueYears.length; j++){
                if (d.Year==uniqueYears[j]){
                    return (d3chart.heightScale(totals[j]));  //not height-             
                }
            }       		
	})
	.attr("position.z", 0)
}

function dotCited() {
	console.log("allCited");
	dots
	.transition()
	.duration(3000)
	.attr("position.x", function(d, i) { return d3chart.xScale(d['Year']); })
	.attr("position.y", function(d, i) { return d['Cited'] ; })	
}



function loadBar(thisYear) {

	var total1 = 0;
	dots
	.transition()
//	.duration(3000)
	.attr("position.y", function(d, i) {
			if (d['Year']==thisYear){
				
				total1++;	
            	var tempy = (d3chart.heightScale(total1)); //not height-
            	if (i==5140&&thisYear==1998){
					console.log("y:"+d3chart.heightScale(total1));
            	}		            	
            	return tempy;
        	} 
        	return this.position.y;
       })
	.attr("position.x", function(d, i) {
			if (d['Year']==thisYear){
            	var tempx = (d3chart.xScale(thisYear)); //not height-
            	return tempx;
        	}    	
        	return this.position.x;
    	})		
	.attr("position.z",0)	

//	cameraPositionTween(camera.position, {x: 1, y: 0, z: 1}, 3000, 0, true);
}

function prepCitations(){
console.log("prep");
	dots
	.transition()
	.duration(2000)
	.attr("position.z", function(d,i){
        if (i==5140&&d.Year==1998){
			console.log("y Cited:"+d3chart.citeYScale(d.Cited));
        }			
		return (d3chart.citeYScale(d.Cited)); 
	})	
//shows an inbetween
	cameraPositionTween(camera.position, {x: 702, y: -463, z: 1649}, 2000, 2000, false);
	cameraPositionTween({x: 702, y: -463, z: 1649}, {x: 550, y: -750, z: 1249}, 2000, 5000, false);

//flip side
cameraPositionTween({x: 550, y: -750, z: 1249}, {x: 775.9634148076755, y: -468.53095876153293, z: -775.7814568827}, 2000, 9000, false);

}

function doCitations(){
	console.log("do");
	cameraPositionTween(camera.position, {x: 424.99573832199366, y: -1112.991560126789, z: 431.5544609364713}, 2000, 0, false);


	// cameraPositionTween(camera.position, {x: 424.99573832199366, y: -1112.991560126789, z: 431.5544609364713}, 2000, 0, false);

	// moreDots
	// .transition()
	// .duration(3000)
	// .attr("position.z", function(d){
	// 	return 0;
	// })		
	// .attr("position.y", function(d){		
	// 	if (d.Cited>0){
	// 	return (d.Cited);
	// 	}
	// 	else {
	// 		return 0;
	// 	}
	// })
//this makes it show CITATIONS
	// cameraPositionTween({x: 550, y: -750, z: 1249}, {x: 427, y: -1011, z: 976}, 2000, 6000, false);

	// cameraPositionTween(camera.position, {x: 702, y: -463, z: 1649}, 4000, 0, false);
//makes it show totals
// 	cameraPositionTween({x: 424.99573832199366, y: -1112.991560126789, z: 431.5544609364713}, {x: -118.70351357384163, y: 316.19463559993744
// , z: 1859.5762029258426}, 2000, 5000, false);
}


// 	cameraPositionTween(camera.position, {x: -118.70351357384163, y: 316.19463559993744
// , z: 1859.5762029258426}, 2000, 5000, false);



function allCitations(){
	console.log("all")
	// cameraPositionTween(camera.position, {x: 424.99573832199366, y: -1112.991560126789, z: 431.5544609364713}, 2000, 0, false);
	cameraPositionTween(camera.position, {x: -118.70351357384163, y: 316.19463559993744
, z: 1859.5762029258426}, 2000, 0, false);	
}


function dotRandom() {

	console.log("random");
	dots
	.transition()
	.duration(1000)
	.attr("position.x", function(d, i) { 
		return newX[i];
	})
	.attr("position.y", function(d, i) { 
		return newY[i];
	})
	.attr("position.z", function(d,i){
		return newZ[i];
	})
	console.log("dots transition random called");
}



function drawThings() {
	drawLine(scene); //loaded by external js
	// drawSprite("memory_allyears_smallBatch.csv", scene);
	drawSprite("memory_neuro_only_some_scientists.csv", scene);

//	drawTestPyramids(scene);

}

var pyramidMeshes = [];
function drawTestPyramids(thisscene) {
	var geometry = new THREE.CylinderGeometry( 0, 10, 30, 4, 1 );
	  var material = new THREE.MeshLambertMaterial( { color:0xffffff, shading: THREE.FlatShading } );

	  for ( var i = 0; i < 500; i ++ ) {

		var mesh = new THREE.Mesh( geometry, material );
		mesh.position.x = ( Math.random() - 0.5 ) * 1000;
		mesh.position.y = ( Math.random() - 0.5 ) * 1000;
		mesh.position.z = ( Math.random() - 0.5 ) * 1000;
		mesh.updateMatrix();
		mesh.matrixAutoUpdate = false;
		pyramidMeshes.push(mesh);
		thisscene.add( mesh );

	  }
}


function loadDots(){
	console.log("in here")
firstLoadVar = setInterval(function(){ 
if(totals.length>0){    
    if (firstLoad<=uniqueYears.length){
        var oneYear = uniqueYears[firstLoad];
        // console.log("going into loadbar TO READ " + oneYear);
        if (oneYear!="undefined"){
        loadBar(oneYear); //store inner subjects is the loading function for the big data      
    	firstLoad++;
    	} 
    }
    else {
    	clearInterval(firstLoadVar); //and stop loading stuff in
    }
}
},400);	
}



$( document ).ready(function() {
	// deal with debug button
	$("#cited").click(function() {
		console.log("cited clicked");
		if(dotCitedFlag == true) {
			dotTotals();
			dotCitedFlag = false;
		} else {
			dotRandom();

			dotCitedFlag = true;
		}
	});

	$("body").keypress(function(){
	b+=1;
	console.log(b);
	if(b==1){
		loadDots();
	}
	if(b==2){
		prepCitations();
	}
	if(b==3){
		doCitations();
	}	
	if(b==4){
		allCitations();
	}
	if(b==5){
	cameraPositionTween(camera.position, {x: 426.0379905336258,
y: 431.44996989494274,
z: 3067.3052685035245},2000,0,false);				
		dotTotals();
	}	
	if(b==6){
		firstLoad = 0;
		loadDots();				
	}	
	if(b==7){
		prepCitations();		
	}	
	if(b==8){
		doCitations();		
	}	
	if(b==9){
		allCitations();
	}						
	});
})

