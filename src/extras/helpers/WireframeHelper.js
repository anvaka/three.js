/**
 * @author mrdoob / http://mrdoob.com/
 */

module.exports = WireframeHelper;

var WireframeGeometry = require('../geometries/WireframeGeometry.js');
var LineSegments = require('../../objects/LineSegments.js');
var LineBasicMaterial = require('../../materials/LineBasicMaterial.js');

function WireframeHelper( object, hex ) {

	var color = ( hex !== undefined ) ? hex : 0xffffff;

	LineSegments.call( this, new WireframeGeometry( object.geometry ), new LineBasicMaterial( { color: color } ) );

	this.matrix = object.matrixWorld;
	this.matrixAutoUpdate = false;

};

WireframeHelper.prototype = Object.create( LineSegments.prototype );
WireframeHelper.prototype.constructor = WireframeHelper;
