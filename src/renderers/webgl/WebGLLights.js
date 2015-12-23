/**
* @author mrdoob / http://mrdoob.com/
*/

module.exports = WebGLLights;

var Vector3 = require('../../math/Vector3.js');
var Color = require('../../math/Color.js');

function WebGLLights () {

	var lights = {};

	this.get = function ( light ) {

		if ( lights[ light.id ] !== undefined ) {

			return lights[ light.id ];

		}

		var uniforms;

		switch ( light.type ) {

			case 'HemisphereLight':
				uniforms = {
					direction: new Vector3(),
					skyColor: new Color(),
					groundColor: new Color()
				};
				break;

			case 'DirectionalLight':
				uniforms = {
					direction: new Vector3(),
					color: new Color(),
					shadow: -1
				};
				break;

			case 'PointLight':
				uniforms = {
					position: new Vector3(),
					color: new Color(),
					distance: 0,
					decay: 0,
					shadow: -1
				};
				break;

			case 'SpotLight':
				uniforms = {
					position: new Vector3(),
					direction: new Vector3(),
					color: new Color(),
					distance: 0,
					angleCos: 0,
					exponent: 0,
					decay: 0,
					shadow: -1
				};
				break;

		}

		lights[ light.id ] = uniforms;

		return uniforms;

	};

};
