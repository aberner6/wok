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
var sevenYears = ["2014", "2013", "2012", "2011", "2010", "2009", "2008"];

var kandel = false;

function dotTotals() {

if (kandel==true){
	console.log("kandelTotals");
	moreDots
	.transition()
	.duration(3000)
	.attr("position.x", function(d, i) { 
		return d3chart.xScale(d['Year']); 
	})
	.attr("position.y", function(d, i) { 
            for (j = 0; j<uniqueKandel.length; j++){
                if (d.Year==uniqueKandel[j]){
                    return (d3chart.heightScale(kandelTotals[j]*5));  //not height-             
                }
            }		
	})
	.attr("position.z", 0)

	dots.transition()
	.attr("position.y",0).attr("position.z",0).attr("position.x",0)
}
else{
	console.log("allTotals");
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
	})
	.attr("position.z", 0)
}
}

function dotCited() {
if (kandel==true){
	console.log("kandelCited");
	moreDots
	.transition()
	.duration(3000)
	.attr("position.x", function(d, i) { return d3chart.xScale(d['Year']); })
	.attr("position.z", function(d, i) { return d['Cited'] ; })

	dots.transition().attr("position.y",0)
}
else {
	console.log("allCited");
	dots
	.transition()
	.duration(3000)
	.attr("position.x", function(d, i) { return d3chart.xScale(d['Year']); })
	.attr("position.y", function(d, i) { return d['Cited'] ; })	
}
}



function loadBar(thisYear) {
if (kandel==true){	
	var total2 = 0;
	moreDots
	.transition()
//	.duration(3000)
	.attr("position.y", function(d, i) {
			if (d['Year']==thisYear){
				total2++;	
            	var tempKY = (d3chart.heightScale(total2*10)); //not height-
            	console.log(total2)
            	return tempKY;
        	} 
        	return this.position.y;
       })
	.attr("position.x", function(d, i) {
			if (d['Year']==thisYear){
            	var tempKX = (d3chart.xScale(d['Year'])); //not height-
            	return tempKX;
        	}    	
        	return this.position.x;
    	})		
	.attr("position.z", function(d){
		// console.log(d.Cited);
		return d.Cited; 
	});		
	// .attr("position.z",0)
	dots
	.transition()
	.attr("position.x",0)	
	.attr("position.y",0)	
	.attr("position.z",0)	
}
else {
	var total1 = 0;
	dots
	.transition()
//	.duration(3000)
	.attr("position.y", function(d, i) {
			if (d['Year']==thisYear){
				total1++;	
            	var tempy = (d3chart.heightScale(total1)); //not height-
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
}

//	cameraPositionTween(camera.position, {x: 1, y: 0, z: 1}, 3000, 0, true);
}

function prepCitations(){
if (kandel==true){
	moreDots
	.transition()
	.attr("position.z", function(d){
		// console.log(d.Cited);
		return d.Cited; 
	})	
}
else{
	dots
	.transition()
	.attr("position.z", function(d){
		return d.Cited; 
	})	
}
	cameraPositionTween(camera.position, {x: 427, y: -1011, z: 976}, 8000, 0, false);
	// console.log(camera.position)
}

function doCitations(){
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


	cameraPositionTween(camera.position, {x: 424, y: 421, z: 1963}, 8000, 0, false);
}









//IRRELEVANT
//IRRELEVANT
//IRRELEVANT
//IRRELEVANT
function allCitations(){
	dots
	.transition()	
	.attr("position.y", function(d){
		if(d.Year >= 2008) {
			return 0;
		} else { 
			if (d.Cited>0){
				return (d.Cited);
			}
			else {
				return 0;
			}
		}
	})
	// .attr("position.z", function(d){
	// 	if(d.Year >= 2008) {
	// 		return 0;
	// 	} else { 
	// 		if (d.Cited>0){
	// 			return (d.Cited);
	// 		}
	// 		else {
	// 			return 0;
	// 		}
	// 	}
	// })	
	.each("end", function(d,i){
		d3.select(this)
		.attr("position.x", function(d){
			if(d.Year >= 2008) {
				return 0;
			} else { 
				return d3chart.xScale(d.Year); 
			}
		})		
	})
	moreDots
		.transition()
		.attr("position.x", function(d){
			return d3chart.xScale(d.Year); 
		})	
}

// function kandel(){
// var total3 = 0;

// 	dots
// 	.transition()	
// 	.attr("position.y", function(d, i) {
//         for (j=0; j<authors[i].length; j++){ 
//             if(authors[i][j]=="Kandel, E.R."){
// 				// total3++;	
// 				return -1*d.Cited;
//             	// var kandY = -5*(d3chart.heightScale(total3)); //not height-
//             	// return kandY;
//             }} 
//         	return this.position.y;
//      }) 	
// }
// function kandel(){
// dots
// 	.transition()
// 	.attr("y",0)

// moreDots
// 	.transition()
// 	.duration(3000)
// 	.attr("position.x", function(d, i) { 
// 		return d3chart.xScale(d.Year); 
// 	})
// 	.attr("position.y", function(d, i) { 
//             for (j = 0; j<uniqueYears.length; j++){
//                 if (d.Year==uniqueYears[j]){
//                     return (d3chart.heightScale(totals[j]));            
//                 }
//             }		
// 	})
// 	.attr("position.z", 0)
// }

function dotRandom() {
if (kandel==true){
	console.log("kandelRandom");
	moreDots
	.transition()
	.duration(1000)
	.attr("position.x", function(d, i) { 
		return newX[i];
	})
	.attr("position.y", function(d, i) { 
		return newY[i];
	})
	.attr("position.z", function(d,i){
		// console.log("dealing with dot #" + i);
		return newZ[i];

	})	
	dots.transition()
	.attr("position.x", function(d, i) { 
		return newX[i]*2;
	})	
	.attr("position.y", function(d, i) { 
		return newY[i]*2;
	})
	.attr("position.z", function(d,i){
		return newZ[i]*2;
	})
}
else{
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
}
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
},200);	
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

			// dotCited();

			// loadDots();

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
		kandel=true;		
		dotTotals();
	}	
	if(b==5){
		firstLoad = 0;
		loadDots();		
	}	
	if(b==6){
		// dotCited();
		prepCitations();		
	}	
	if(b==7){
		doCitations();		
	}					
	});
})

