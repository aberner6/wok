var spriteRotation = {};
spriteRotation.x = 0.01;
spriteRotation.y = 0.03;
spriteRotation.z = 0.02;


// given a color, creates a sprite with color
spriteMapCircle = THREE.ImageUtils.loadTexture( "images/sprite_circle.png" );
newCircleSprite = function(thiscolor) { 
	var thismaterial = new THREE.SpriteMaterial( { map: spriteMapCircle, color: thiscolor, fog: true });
	var thissprite = new THREE.Sprite( thismaterial);
	thissprite.scale.set(100,100,10);
	return thissprite;
}


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


	if (typeof secondChart !== 'undefined') {
		// variable is defined
		secondChart.rotation.x += spriteRotation.x; 
		secondChart.rotation.y += spriteRotation.y;
		secondChart.rotation.z += spriteRotation.z;
	}


	if (typeof chart3d !== 'undefined') {
		// variable is defined
		chart3d.rotation.x += spriteRotation.x; 
		chart3d.rotation.y += spriteRotation.y;
		chart3d.rotation.z += spriteRotation.z;
	}

}
