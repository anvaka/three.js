/**
 * @author mrdoob / http://mrdoob.com/
 */

module.exports = Face4;

var Face3 = require('./Face3.js');

function Face4( a, b, c, d, normal, color, materialIndex ) {

	console.warn( 'THREE.Face4 has been removed. A THREE.Face3 will be created instead.' );
	return new Face3( a, b, c, normal, color, materialIndex );

};
