/**
 * @author mikael emtinger / http://gomo.se/
 * @author alteredq / http://alteredqualia.com/
 */

var BufferGeometry = require('../core/BufferGeometry.js');
var BufferAttribute = require('../core/BufferAttribute.js');
var Object3D = require('../core/Object3D.js');

var SpriteMaterial = require('../materials/SpriteMaterial.js');

var Vector3 = require('../math/Vector3.js');

// TODO: This could extracted, since commonjs is a closure
var Sprite = ( function () {

	var indices = new Uint16Array( [ 0, 1, 2,  0, 2, 3 ] );
	var vertices = new Float32Array( [ - 0.5, - 0.5, 0,   0.5, - 0.5, 0,   0.5, 0.5, 0,   - 0.5, 0.5, 0 ] );
	var uvs = new Float32Array( [ 0, 0,   1, 0,   1, 1,   0, 1 ] );

	var geometry = new BufferGeometry();
	geometry.setIndex( new BufferAttribute( indices, 1 ) );
	geometry.addAttribute( 'position', new BufferAttribute( vertices, 3 ) );
	geometry.addAttribute( 'uv', new BufferAttribute( uvs, 2 ) );

	return function Sprite( material ) {

		Object3D.call( this );

		this.type = 'Sprite';

		this.geometry = geometry;
		this.material = ( material !== undefined ) ? material : new SpriteMaterial();

	};

} )();

Sprite.prototype = Object.create( Object3D.prototype );
Sprite.prototype.constructor = Sprite;

Sprite.prototype.raycast = ( function () {

	var matrixPosition = new Vector3();

	return function raycast( raycaster, intersects ) {

		matrixPosition.setFromMatrixPosition( this.matrixWorld );

		var distanceSq = raycaster.ray.distanceSqToPoint( matrixPosition );
		var guessSizeSq = this.scale.x * this.scale.y;

		if ( distanceSq > guessSizeSq ) {

			return;

		}

		intersects.push( {

			distance: Math.sqrt( distanceSq ),
			point: this.position,
			face: null,
			object: this

		} );

	};

}() );

Sprite.prototype.clone = function () {

	return new this.constructor( this.material ).copy( this );

};

// Backwards compatibility

Sprite.Particle = Sprite;

module.exports = Sprite;
