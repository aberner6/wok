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



function drawThings() {
	drawLine(scene); //loaded by external js
	drawSprite("memory_allyears_smallBatch.csv", scene);
//	drawSprite("memory_neuro_only_some_scientists.csv", scene);

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




$( document ).ready(function() {
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

	$("body").keypress(function(){
	b+=1;
	console.log(b);
	if(b==1){
		loadDots();
	}
	});
})

