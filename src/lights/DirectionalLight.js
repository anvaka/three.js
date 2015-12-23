/**
 * @author mrdoob / http://mrdoob.com/
 * @author alteredq / http://alteredqualia.com/
 */

module.exports = DirectionalLight;

var Object3D = require('../core/Object3D.js');
var Light = require('./Light.js');
var LightShadow = require('./LightShadow.js');
var OrthographicCamera = require('../cameras/OrthographicCamera.js');

function DirectionalLight( color, intensity ) {

	Light.call( this, color, intensity );

	this.type = 'DirectionalLight';

	this.position.set( 0, 1, 0 );
	this.updateMatrix();

	this.target = new Object3D();

	this.shadow = new LightShadow( new OrthographicCamera( - 5, 5, 5, - 5, 0.5, 500 ) );

};

DirectionalLight.prototype = Object.create( Light.prototype );
DirectionalLight.prototype.constructor = DirectionalLight;

DirectionalLight.prototype.copy = function ( source ) {

	Light.prototype.copy.call( this, source );

	this.target = source.target.clone();

	this.shadow = source.shadow.clone();

	return this;

};
