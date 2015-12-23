/**
 * @author mrdoob / http://mrdoob.com/
 */
module.exports = Uniform;

function Uniform( type, value ) {

	this.type = type;
	this.value = value;

	this.dynamic = false;

};

Uniform.prototype = {

	constructor: Uniform,

	onUpdate: function ( callback ) {

		this.dynamic = true;
		this.onUpdateCallback = callback;

		return this;

	}

};
