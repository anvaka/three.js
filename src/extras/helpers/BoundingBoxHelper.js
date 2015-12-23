/**
 * @author WestLangley / http://github.com/WestLangley
 */

// a helper to show the world-axis-aligned bounding box for an object

module.exports = BoundingBoxHelper;

var Box3 = require('../../math/Box3.js');
var Mesh = require('../../objects/Mesh.js');

var BoxGeometry = require('../geometries/BoxGeometry.js');
var MeshBasicMaterial = require('../../materials/MeshBasicMaterial.js');

function BoundingBoxHelper( object, hex ) {

	var color = ( hex !== undefined ) ? hex : 0x888888;

	this.object = object;

	this.box = new Box3();

	Mesh.call( this, new BoxGeometry( 1, 1, 1 ), new MeshBasicMaterial( { color: color, wireframe: true } ) );

};

BoundingBoxHelper.prototype = Object.create( Mesh.prototype );
BoundingBoxHelper.prototype.constructor = BoundingBoxHelper;

BoundingBoxHelper.prototype.update = function () {

	this.box.setFromObject( this.object );

	this.box.size( this.scale );

	this.box.center( this.position );

};
