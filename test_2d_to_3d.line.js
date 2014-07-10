function drawLine(thisscene) {
	straightLine = [];
	d3chart = d3chart || {};

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

    thisscene.add(line);
	})

}

function animateLine() {
	line.rotation.x += secondRotationX;
	line.rotation.y += secondRotationY;
	line.rotation.z += secondRotationZ;
}
