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



function dotTotals() {


	console.log("dotTotals");
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


	moreDots
	.transition()
	.duration(3000)
	.attr("position.x", function(d, i) { 
		return d3chart.xScale(d.Year); 
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
	console.log("dotCited");
	moreDots
	.transition()
	.duration(3000)
	.attr("position.x", function(d, i) { return d3chart.xScale(d['Year']); })
	.attr("position.y", function(d, i) { return d['Cited'] ; })
}



function loadBar(thisYear) {
	var total1 = 0;
	moreDots
	.transition()
	// .duration(3000)
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
            	var tempx = (d3chart.sevenScale(thisYear)); //not height-
            	return tempx;
        	}    	
        	return this.position.x;
    	})		
	.attr("position.z",0)
}

function prepCitations(){
	moreDots
	.transition()
	.attr("position.z", function(d){

		return Math.sin(d.Cited/ 100.0) * 300 ; 
	})	
}

function doCitations(){
	moreDots
	.transition()
	.attr("position.z", function(d){
		return 0;
	})		
	.attr("position.y", function(d){		
		if (d.Cited>0){
		return (d.Cited);
		}
		else {
			return 0;
		}
	})
}

function allCitations(){
	dots
	.transition()	
	.attr("position.y", function(d){
		if (d.Cited>0){
		return (d.Cited);
		}
		else {
			return 0;
		}
	})
	.each("end", function(d,i){
		d3.select(this)
		.attr("position.x", function(d){
			return d3chart.xScale(d.Year); 
		})		
	})
	moreDots
		.transition()
		.attr("position.x", function(d){
			return d3chart.xScale(d.Year); 
		})	
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
		// console.log("dealing with dot #" + i);
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

function drawTestPyramids(thisscene) {
	var geometry = new THREE.CylinderGeometry( 0, 10, 30, 4, 1 );
	  var material = new THREE.MeshLambertMaterial( { color:0xffffff, shading: THREE.FlatShading } );

	  for ( var i = 0; i < 5000; i ++ ) {

		var mesh = new THREE.Mesh( geometry, material );
		mesh.position.x = ( Math.random() - 0.5 ) * 1000;
		mesh.position.y = ( Math.random() - 0.5 ) * 1000;
		mesh.position.z = ( Math.random() - 0.5 ) * 1000;
		mesh.updateMatrix();
		mesh.matrixAutoUpdate = false;
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
firstLoadVar = setInterval(function(){ 
if(totals.length>0){    
    if (firstLoad<=sevenYears.length){
        var oneYear = sevenYears[firstLoad];
        console.log("going into loadbar TO READ " + oneYear);
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
	});
})

