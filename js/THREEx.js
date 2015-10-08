// This THREEx helper makes it easy to handle window resize.
// It will update renderer and camera when window is resized.
//
// # Usage
//
// **Step 1**: Start updating renderer and camera
//
// ```var windowResize = THREEx.WindowResize(aRenderer, aCamera)```
//    
// **Step 2**: Start updating renderer and camera
//
// ```windowResize.stop()```
// # Code

//

/** @namespace */
var THREEx	= THREEx 		|| {};

/**
 * Update renderer and camera when the window is resized
 * 
 * @param {Object} renderer the renderer to update
 * @param {Object} Camera the camera to update
*/
THREEx.WindowResize	= function(renderer, camera){
	windowHalfX = window.innerWidth / 2;
				windowHalfY = window.innerHeight / 2;

	var callback	= function(){
		// notify the renderer of the size change
		renderer.setSize( window.innerWidth, window.innerHeight );
		// update the camera
		camera.aspect	= window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();
	}
	// bind the resize event
	window.addEventListener('resize', callback, false);
	// return .stop() the function to stop watching window resize
	return {
		/**
		 * Stop watching window resize
		*/
		stop	: function(){
			window.removeEventListener('resize', callback);
		}
	};
}

THREEx.GeometryUtils	= THREEx.GeometryUtils	|| {};

/**
 * Change the scale of a geometry
 * 
 * @params {THREE.Geometry} geometry the geometry to compute on
 * @params {THREE.Vector3} scale the middlepoint of the geometry
*/
THREEx.GeometryUtils.scale	= function(geometry, scale)
{
	for(var i = 0; i < geometry.vertices.length; i++) {
		var vertex	= geometry.vertices[i];
		console.log(vertex)
		vertex.multiply(scale); 
	}
	
	geometry.__dirtyVertices = true;
	return this;
}

THREEx.GeometryUtils.translate	= function(geometry, delta)
{
	for(var i = 0; i < geometry.vertices.length; i++) {
		var vertex	= geometry.vertices[i];
		vertex.add(delta); 
	}
	geometry.__dirtyVertices = true;
	return this;
}

/**
 * Compute the "middlePoint" aka the point at the middle of the boundingBox
 * 
 * @params {THREE.Geometry} the geometry to compute on
 * @returns {THREE.Vector3} the middlepoint of the geometry
*/
THREEx.GeometryUtils.middlePoint	= function(geometry)
{
	geometry.computeBoundingBox();
	var middle	= new THREE.Vector3()
	middle.x	= ( geometry.boundingBox.x[ 1 ] + geometry.boundingBox.x[ 0 ] ) / 2;
	middle.y	= ( geometry.boundingBox.y[ 1 ] + geometry.boundingBox.y[ 0 ] ) / 2;
	middle.z	= ( geometry.boundingBox.z[ 1 ] + geometry.boundingBox.z[ 0 ] ) / 2;
	return middle;
}

/**
 * Center the geometry on its middlepoint
*/
THREEx.GeometryUtils.center	= function(geometry, noX, noY, noZ)
{
	var delta	= this.middlePoint(geometry).negate();
	if( noX )	delta.x	= 0;
	if( noY )	delta.y	= 0;
	if( noZ )	delta.z	= 0;

	return this.translate(geometry, delta)
}

/**
 * Initial version of attachement
 * - geometry2 is the one which is moved
 * - TODO make something more flexible... especially on the attachement config
*/
THREEx.GeometryUtils.attachRightLeft	= function(geometry1, geometry2, delta)
{
	if( delta === undefined )	delta	= 0;
	geometry1.computeBoundingBox();
	geometry2.computeBoundingBox();
	
	var maxX1	= geometry1.boundingBox.x[ 1 ]
	var minX2	= geometry2.boundingBox.x[ 0 ];

	var vector	= new THREE.Vector3();
	vector.x	= maxX1+ (-minX2) + delta;

	this.translate(geometry2, vector);
	
	return this;
}