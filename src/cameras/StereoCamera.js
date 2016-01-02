/**
 * @author mrdoob / http://mrdoob.com/
 */

module.exports = StereoCamera;

var PerspectiveCamera = require('./PerspectiveCamera.js');
var Matrix4 = require('../math/Matrix4.js');
var THREEMath = require('../math/Math.js');
var Object3D = require('../core/Object3D.js');

function StereoCamera() {

	this.type = 'StereoCamera';

	this.aspect = 1;

	this.cameraL = new PerspectiveCamera();
	this.cameraL.layers.enable( 1 );
	this.cameraL.matrixAutoUpdate = false;

	this.cameraR = new PerspectiveCamera();
	this.cameraR.layers.enable( 2 );
	this.cameraR.matrixAutoUpdate = false;

};

StereoCamera.prototype = {

	constructor: StereoCamera,

	update: ( function () {

		var focalLength, fov, aspect, near, far;

		var eyeRight = new Matrix4();
		var eyeLeft = new Matrix4();

		return function update ( camera ) {

			var needsUpdate = focalLength !== camera.focalLength || fov !== camera.fov ||
												aspect !== camera.aspect * this.aspect || near !== camera.near ||
												far !== camera.far;

			if ( needsUpdate ) {

				focalLength = camera.focalLength;
				fov = camera.fov;
				aspect = camera.aspect * this.aspect;
				near = camera.near;
				far = camera.far;

				// Off-axis stereoscopic effect based on
				// http://paulbourke.net/stereographics/stereorender/

				var projectionMatrix = camera.projectionMatrix.clone();
				var eyeSep = focalLength / 30 * 0.5;
				var eyeSepOnProjection = eyeSep * near / focalLength;
				var ymax = near * Math.tan( THREEMath.degToRad( fov * 0.5 ) );
				var xmin, xmax;

				// translate xOffset

				eyeLeft.elements[ 12 ] = - eyeSep;
				eyeRight.elements[ 12 ] = eyeSep;

				// for left eye

				xmin = - ymax * aspect + eyeSepOnProjection;
				xmax = ymax * aspect + eyeSepOnProjection;

				projectionMatrix.elements[ 0 ] = 2 * near / ( xmax - xmin );
				projectionMatrix.elements[ 8 ] = ( xmax + xmin ) / ( xmax - xmin );

				this.cameraL.projectionMatrix.copy( projectionMatrix );

				// for right eye

				xmin = - ymax * aspect - eyeSepOnProjection;
				xmax = ymax * aspect - eyeSepOnProjection;

				projectionMatrix.elements[ 0 ] = 2 * near / ( xmax - xmin );
				projectionMatrix.elements[ 8 ] = ( xmax + xmin ) / ( xmax - xmin );

				this.cameraR.projectionMatrix.copy( projectionMatrix );

			}

			this.cameraL.matrixWorld.copy( camera.matrixWorld ).multiply( eyeLeft );
			this.cameraR.matrixWorld.copy( camera.matrixWorld ).multiply( eyeRight );

		};

	} )()

};
