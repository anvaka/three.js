/**
 * @author mrdoob / http://mrdoob.com/
 */

module.exports = BufferGeometryLoader;

var DefaultLoadingManager = require('./LoadingManager.js').DefaultLoadingManager;
var XHRLoader = require('./XHRLoader.js');
var BufferGeometry = require('../core/BufferGeometry.js');
var BufferAttribute = require('../core/BufferAttribute.js');
var Vector3 = require('../math/Vector3.js');
var Sphere = require('../math/Sphere.js');

function BufferGeometryLoader( manager ) {

	this.manager = ( manager !== undefined ) ? manager : DefaultLoadingManager;

};

BufferGeometryLoader.prototype = {

	constructor: BufferGeometryLoader,

	load: function ( url, onLoad, onProgress, onError ) {

		var scope = this;

		var loader = new XHRLoader( scope.manager );
		loader.load( url, function ( text ) {

			onLoad( scope.parse( JSON.parse( text ) ) );

		}, onProgress, onError );

	},

	parse: function ( json ) {

		var geometry = new BufferGeometry();

		var index = json.data.index;

		if ( index !== undefined ) {

			var typedArray = new self[ index.type ]( index.array );
			geometry.setIndex( new BufferAttribute( typedArray, 1 ) );

		}

		var attributes = json.data.attributes;

		for ( var key in attributes ) {

			var attribute = attributes[ key ];
			var typedArray = new self[ attribute.type ]( attribute.array );

			geometry.addAttribute( key, new BufferAttribute( typedArray, attribute.itemSize ) );

		}

		var groups = json.data.groups || json.data.drawcalls || json.data.offsets;

		if ( groups !== undefined ) {

			for ( var i = 0, n = groups.length; i !== n; ++ i ) {

				var group = groups[ i ];

				geometry.addGroup( group.start, group.count, group.materialIndex );

			}

		}

		var boundingSphere = json.data.boundingSphere;

		if ( boundingSphere !== undefined ) {

			var center = new Vector3();

			if ( boundingSphere.center !== undefined ) {

				center.fromArray( boundingSphere.center );

			}

			geometry.boundingSphere = new Sphere( center, boundingSphere.radius );

		}

		return geometry;

	}

};
