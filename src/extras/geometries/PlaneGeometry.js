/**
 * @author mrdoob / http://mrdoob.com/
 * based on http://papervision3d.googlecode.com/svn/trunk/as3/trunk/src/org/papervision3d/objects/primitives/Plane.as
 */
module.exports = PlaneGeometry;

var Geometry = require('../../core/Geometry.js');
var PlaneBufferGeometry = require('./PlaneBufferGeometry.js');

function PlaneGeometry( width, height, widthSegments, heightSegments ) {

	Geometry.call( this );

	this.type = 'PlaneGeometry';

	this.parameters = {
		width: width,
		height: height,
		widthSegments: widthSegments,
		heightSegments: heightSegments
	};

	this.fromBufferGeometry( new PlaneBufferGeometry( width, height, widthSegments, heightSegments ) );

};

PlaneGeometry.prototype = Object.create( Geometry.prototype );
PlaneGeometry.prototype.constructor = PlaneGeometry;
