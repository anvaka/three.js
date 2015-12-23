/**
 * @author alteredq / http://alteredqualia.com/
 */

module.exports = ImmediateRenderObject;

var Object3D = require('../../core/Object3D.js');

function ImmediateRenderObject( material ) {

	Object3D.call( this );

	this.material = material;
	this.render = function ( renderCallback ) {};

};

ImmediateRenderObject.prototype = Object.create( Object3D.prototype );
ImmediateRenderObject.prototype.constructor = ImmediateRenderObject;
