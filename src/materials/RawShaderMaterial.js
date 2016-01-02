/**
 * @author mrdoob / http://mrdoob.com/
 */

module.exports = RawShaderMaterial;

var ShaderMaterial = require('./ShaderMaterial.js');

function RawShaderMaterial( parameters ) {

	ShaderMaterial.call( this, parameters );

	this.type = 'RawShaderMaterial';

};

RawShaderMaterial.prototype = Object.create( ShaderMaterial.prototype );
RawShaderMaterial.prototype.constructor = RawShaderMaterial;
