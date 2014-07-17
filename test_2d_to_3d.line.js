var lineRotation = {};
lineRotation.x = 0; //0.01;
lineRotation.y = 0;//0.01;
lineRotation.z = 0;//1.55;//0.02;


var kandelYears = [];
var uniqueKandel;
var kandelTotals = [];
function drawLine(thisscene) {

	chart3d = new THREE.Object3D();
	thisscene.add( chart3d );

	straightLine = [];
	d3chart = d3chart || {};

	var svg;

	var xScale, sevenScale, maxSevenCited, citeYScale;
	var xAxis;

	var uniqueAuthors;
	var uniqueKeywords;
	var journalTypes = [];

	var keywords = [];
	var goSecond = false;

	var totalAuthors = [];
	var totalKeywords = [];

	var total1 = 0;

	var color =  d3.scale.category20c();
	var opacityMap;

	var firstLoadVar;
	var firstLoad = -1;
	var secLoad = -1;


	var minYear;
	var maxYear;
	var maxAuthor;
	var thisTotal;
	var eachPaper;

	var heightScale, kandelHeightScale;

	var singleScale;

	var theseKeywords = [];
	var theX = [];
	var maxEntries;
var kandelData = [];

	var lineX = [];
	var lineY = [];
var storeCited = [];

	var randomX, randomY, randomZ;


	d3.csv("memory_neuro_only_some_scientists.csv", function(data) {
			thisData=(data);
		for (i = 0;i<thisData.length; i++){ 
			years[i] = data[i].Year;
			if(data[i].Cited>0){
			storeCited[i] = data[i].Cited;
		}
		else {
			storeCited[i]=(0);
		}
			authors[i] = data[i].Authors.split("., ");
			for (j=0; j<authors[i].length; j++){
			theseAuthors.push(authors[i][j]);            
			}

			journalTypes[i] = data[i].Sourcetitle;
		}
		console.log(theseAuthors[0])


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









		for (i = 0;i<thisData.length; i++){ 
        for (j=0; j<authors[i].length; j++){ 
            if(authors[i][j]=="Kandel, E.R."){
				kandelData.push(thisData[i]);
			}
			}
		}            	
		console.log(kandelData)
var maxKandel = d3.max(kandelData, function(d,i) { 
	// console.log(i+"index"+" and journal "+d.Sourcetitle+" and title "+d.Title);

	return d.Cited; 
});
console.log(maxKandel)
for (i=0; i<kandelData.length; i++){
	if(kandelData[i].Cited==94){
	console.log(kandelData[i].Year+" year "+i+"index"+" and journal "+kandelData[i].Sourcetitle+" and title "+kandelData[i].Title);
	}
}
		for (i=0; i<kandelData.length; i++){
			kandelYears[i] = kandelData[i].Year;
		}
		uniqueKandel = kandelYears.filter( onlyUnique ); //finds unique names
	////consolidates the Value for all values of a given Name
		function valueKandelConsolidation(givenYear, i) { 
			var total = 0;
			for (i = 0;i<kandelData.length; i++){ 
				if(kandelData[i].Year== givenYear){
					total++;
				}else{
				}}
			 return total;
		 } 
	 //creates a new aray with the sums of all the different Names 
		for (i = 0; i<uniqueKandel.length; i++){
			kandelTotals[i]= valueKandelConsolidation(uniqueKandel[i])
		} 



	if (uniqueTypes.length>0){		
		dots = d3.select( chart3d )
			.selectAll("THREE.Mesh")
			.data(thisData)
			.enter()
			.append(function(d, i) { 
        for (j=0; j<uniqueTypes.length; j++){
            if(d.Sourcetitle==uniqueTypes[j]){
            if (i==5140){
            	console.log(d.Title+d.Authors+d.Year+d.Cited);
            	console.log(parseInt("0x" + color(j).substr(1), 16));
            }		            	
				return newCircleSprite(parseInt("0x" + color(j).substr(1), 16));
            }       
        }  				
			});		
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
			.range([0, maxX]);
     
var maxCited = 2817;
		d3chart.citeYScale = d3.scale.linear()
			.domain([0, maxCited])
			.range([0, maxY])        

		


		opacityMap = d3.scale.linear()
			.domain([0, maxCited])
			.range([.2, 1])        

//FOR TOTALS
		d3chart.heightScale = d3.scale.linear()
			.domain([0, maxEntries])
			.range([0, maxY]);

d3chart.randomX = d3.scale.linear()
    .domain([0,1]) 
    .range([-maxX*2, maxX*2]);
d3chart.randomY = d3.scale.linear()
    .domain([0,1]) 
    .range([-maxY*2, maxY*2]);
d3chart.randomZ = d3.scale.linear()
    .domain([0,1]) 
    .range([-2000, 2000]);

for (i=0; i<thisData.length; i++){
    newX.push(d3chart.randomX(Math.random()))
    newY.push(d3chart.randomY(Math.random()))
	newZ.push(d3chart.randomZ(Math.random()))
}


	for (i=0; i<thisData.length; i++){
		lineX.push(d3chart.xScale(years[i]))
		lineY.push(thisData[i].Cited) //height-10-
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








    // geometryLine = new THREE.Geometry();
    // materialLine = new THREE.LineBasicMaterial({
    //     color: 0x0000ff,
    // });

    // var originX = 0, originY = 0; 

    // for (var pt = 0; pt < straightLine.length; ++pt) {
    //     var o = straightLine[pt];
    //     geometryLine.vertices.push(new THREE.Vector3(originX+o.x, originY+o.y, Math.sin(pt/ 10.0) * 100));
    // }

    // line = new THREE.Line(geometryLine, materialLine);

    // thisscene.add(line);

	})

}

			var clock = new THREE.Clock();


function animateLine() {
	if (typeof line !== 'undefined') {

		// variable is defined
		line.rotation.x = lineRotation.x;
		line.rotation.y = lineRotation.y;
		line.rotation.z = lineRotation.z;
	}

	// 				var delta = clock.getDelta(),
	// 				time = clock.getElapsedTime() * 10;
	
	// for ( var i = 0; i <  geometryLine.vertices.length; i ++ ) {

	// 	geometryLine.vertices[ i ].y = 35 * Math.sin( i / 5 + ( time + i ) / 7 );

	// }
	// for ( var i = 0; i <  geometryLine.vertices.length; i ++ ) {
	// 	dummyLine[i]
	// 	geometryLine.vertices[ i ].y = 35 * Math.sin( i / 5 + ( time + i ) / 7 );

	// }

	geometryLine.verticesNeedUpdate = true;


}

