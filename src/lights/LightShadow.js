/**
 * @author mrdoob / http://mrdoob.com/
 */

module.exports = LightShadow;

var Vector2 = require('../math/Vector2.js');

function LightShadow( camera ) {

	this.camera = camera;

	this.bias = 0;
	this.darkness = 1;

	this.mapSize = new Vector2( 512, 512 );

	this.map = null;
	this.matrix = null;

};

LightShadow.prototype = {

	constructor: LightShadow,

	copy: function ( source ) {

		this.camera = source.camera.clone();

		this.bias = source.bias;
		this.darkness = source.darkness;

		this.mapSize.copy( source.mapSize );

		return this;

	},

	clone: function () {

		return new this.constructor().copy( this );

	}

};
