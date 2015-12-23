/**
 * @author WestLangley / http://github.com/WestLangley
 * @param object THREE.Mesh whose geometry will be used
 * @param hex line color
 * @param thresholdAngle the minimum angle (in degrees),
 * between the face normals of adjacent faces,
 * that is required to render an edge. A value of 10 means
 * an edge is only rendered if the angle is at least 10 degrees.
 */

module.exports = EdgesHelper;

var LineSegments = require('../../objects/LineSegments.js');
var LineBasicMaterial = require('../../materials/LineBasicMaterial.js');
var EdgesGeometry = require('../geometries/EdgesGeometry.js');

function EdgesHelper( object, hex, thresholdAngle ) {

	var color = ( hex !== undefined ) ? hex : 0xffffff;

	LineSegments.call( this, new EdgesGeometry( object.geometry, thresholdAngle ), new LineBasicMaterial( { color: color } ) );

	this.matrix = object.matrixWorld;
	this.matrixAutoUpdate = false;

};

EdgesHelper.prototype = Object.create( LineSegments.prototype );
EdgesHelper.prototype.constructor = EdgesHelper;
