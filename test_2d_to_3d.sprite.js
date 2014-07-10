var lineRotation = {};
lineRotation.x = 0.01;
lineRotation.y = 0.03;
lineRotation.z = 0.02;

function drawSprite(csvFilename, thisscene) {
/* MAGIC IS HERE */

	var color = d3.scale.category20c();

	// create objects, add them to thisscene
	chart3d = new THREE.Object3D();
	secondChart = new THREE.Object3D();
	thisscene.add( secondChart );
	thisscene.add( chart3d );


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
		// use D3 to set up 3D bars
		moreDots = d3.select( secondChart )
			.selectAll("THREE.Mesh")
			.data(data)
			.enter()
			.append(function(d, i) { 
				return newSphere(7057110);
				return newCircleSprite(parseInt("0x" + color(i).substr(1), 16));
			});

	});

}

function animateSprite() {
	if (typeof sprite !== 'undefined') {
		// variable is defined
		sprite.rotation.x += spriteRotation.x;
		sprite.rotation.y += spriteRotation.y;
		sprite.rotation.z += spriteRotation.z;
	}
}
