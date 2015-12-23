/**
 * @author mrdoob / http://mrdoob.com/
 */

module.exports = AmbientLight;

var Light = require('./Light.js');

function AmbientLight( color, intensity ) {

	Light.call( this, color, intensity );

	this.type = 'AmbientLight';

	this.castShadow = undefined;

};

AmbientLight.prototype = Object.create( Light.prototype );
AmbientLight.prototype.constructor = AmbientLight;
