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
                	            	// var tempKY = (d3chart.heightScale(total2*10))-10; //not height-

                    return (d3chart.heightScale(kandelTotals[j]*3))-3;  //not height-             
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
            	var tempKY = (d3chart.heightScale(total2*3))-3; //not height-
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
console.log("prep");
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
	.duration(2000)
	.attr("position.z", function(d){
		return d.Cited; 
	})	
}
//shows an inbetween
	cameraPositionTween(camera.position, {x: 702, y: -463, z: 1649}, 2000, 2000, false);
	cameraPositionTween({x: 702, y: -463, z: 1649}, {x: 550, y: -750, z: 1249}, 2000, 5000, false);

//flip side
cameraPositionTween({x: 550, y: -750, z: 1249}, {x: 775.9634148076755, y: -468.53095876153293, z: -775.7814568827}, 2000, 9000, false);

//show citation
// x: 425.00000461508205
// y: -1112.3512936196137
// z: 425.0015373443668
//430-460 interesting in x
	// cameraPositionTween({x: 775.9634148076755, y: -468.53095876153293, z: -775.7814568827}, {x: 424.99573832199366, y: -1112.991560126789, z: 431.5544609364713}, 4000, 16000, false);

	// cameraPositionTween(camera.position, {x: 427, y: -1011, z: 976}, 4000, 0, false);

	// cameraPositionTween(camera.position, {x: 427, y: -1011, z: 976}, 8000, 0, false);
	// console.log(camera.position)
//"normal position"
// x: 6.684786058031023e-11
// y: 5.229594535194337e-12
// z: 2999.9999999995935
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




//IRRELEVANT
//IRRELEVANT
//IRRELEVANT
//IRRELEVANT
// function allCitations(){
// 	dots
// 	.transition()	
// 	.attr("position.y", function(d){
// 		if(d.Year >= 2008) {
// 			return 0;
// 		} else { 
// 			if (d.Cited>0){
// 				return (d.Cited);
// 			}
// 			else {
// 				return 0;
// 			}
// 		}
// 	})
// 	// .attr("position.z", function(d){
// 	// 	if(d.Year >= 2008) {
// 	// 		return 0;
// 	// 	} else { 
// 	// 		if (d.Cited>0){
// 	// 			return (d.Cited);
// 	// 		}
// 	// 		else {
// 	// 			return 0;
// 	// 		}
// 	// 	}
// 	// })	
// 	.each("end", function(d,i){
// 		d3.select(this)
// 		.attr("position.x", function(d){
// 			if(d.Year >= 2008) {
// 				return 0;
// 			} else { 
// 				return d3chart.xScale(d.Year); 
// 			}
// 		})		
// 	})
// 	moreDots
// 		.transition()
// 		.attr("position.x", function(d){
// 			return d3chart.xScale(d.Year); 
// 		})	
// }

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

			// dotCited();

			// loadDots();

			dotCitedFlag = true;
		}
	});

	$("body").keypress(function(){
	b+=1;
	console.log(b);
	if(b==1){
	if(kandel==true){
	cameraPositionTween(camera.position, {x: 426.0379905336258,
y: 431.44996989494274,
z: 3067.3052685035245},0,0,false);			
	}
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
		kandel=true;		
		dotTotals();
	}	
	if(b==6){
		firstLoad = 0;
		loadDots();		
// 	cameraPositionTween(camera.position, {x: 426.0379905336258,
// y: 431.44996989494274,
// z: 3067.3052685035245},2000,0,false);		
	}	
	if(b==7){
		// dotCited();
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

