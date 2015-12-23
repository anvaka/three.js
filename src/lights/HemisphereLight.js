/**
 * @author alteredq / http://alteredqualia.com/
 */

module.exports = HemisphereLight;

var Light = require('./Light.js');
var Color = require('../math/Color.js');

function HemisphereLight( skyColor, groundColor, intensity ) {

	Light.call( this, skyColor, intensity );

	this.type = 'HemisphereLight';

	this.castShadow = undefined;

	this.position.set( 0, 1, 0 );
	this.updateMatrix();

	this.groundColor = new Color( groundColor );

};

HemisphereLight.prototype = Object.create( Light.prototype );
HemisphereLight.prototype.constructor = HemisphereLight;

HemisphereLight.prototype.copy = function ( source ) {

	Light.prototype.copy.call( this, source );

	this.groundColor.copy( source.groundColor );

	return this;

};
