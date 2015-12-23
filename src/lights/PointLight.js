/**
 * @author mrdoob / http://mrdoob.com/
 */

module.exports = PointLight;

var Light = require('./Light.js');
var LightShadow = require('./LightShadow.js');
var PerspectiveCamera = require('../cameras/PerspectiveCamera.js');

function PointLight( color, intensity, distance, decay ) {

	Light.call( this, color, intensity );

	this.type = 'PointLight';

	this.distance = ( distance !== undefined ) ? distance : 0;
	this.decay = ( decay !== undefined ) ? decay : 1;	// for physically correct lights, should be 2.

	this.shadow = new LightShadow( new PerspectiveCamera( 90, 1, 0.5, 500 ) );

};

PointLight.prototype = Object.create( Light.prototype );
PointLight.prototype.constructor = PointLight;

PointLight.prototype.copy = function ( source ) {

	Light.prototype.copy.call( this, source );

	this.distance = source.distance;
	this.decay = source.decay;

	this.shadow = source.shadow.clone();

	return this;

};
