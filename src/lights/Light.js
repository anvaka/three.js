/**
 * @author mrdoob / http://mrdoob.com/
 * @author alteredq / http://alteredqualia.com/
 */

module.exports = Light;

var Object3D = require('../core/Object3D.js');
var Color = require('../math/Color.js');

function Light( color, intensity ) {

	Object3D.call( this );

	this.type = 'Light';

	this.color = new Color( color );
	this.intensity = intensity !== undefined ? intensity : 1;

	this.receiveShadow = undefined;

};

Light.prototype = Object.create( Object3D.prototype );
Light.prototype.constructor = Light;

Light.prototype.copy = function ( source ) {

	Object3D.prototype.copy.call( this, source );

	this.color.copy( source.color );
	this.intensity = source.intensity;

	return this;

};

Light.prototype.toJSON = function ( meta ) {

	var data = Object3D.prototype.toJSON.call( this, meta );

	data.object.color = this.color.getHex();
	data.object.intensity = this.intensity;

	if ( this.groundColor !== undefined ) data.object.groundColor = this.groundColor.getHex();

	if ( this.distance !== undefined ) data.object.distance = this.distance;
	if ( this.angle !== undefined ) data.object.angle = this.angle;
	if ( this.decay !== undefined ) data.object.decay = this.decay;
	if ( this.exponent !== undefined ) data.object.exponent = this.exponent;

	return data;

};
