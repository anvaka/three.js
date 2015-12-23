/**
 * @author mrdoob / http://mrdoob.com/
 */

module.exports = CubeTextureLoader;

var DefaultLoadingManager = require('./LoadingManager.js').DefaultLoadingManager;
var ImageLoader = require('./ImageLoader.js');
var CubeTexture = require('../textures/CubeTexture.js');

function CubeTextureLoader( manager ) {

	this.manager = ( manager !== undefined ) ? manager : DefaultLoadingManager;

};

CubeTextureLoader.prototype = {

	constructor: CubeTextureLoader,

	load: function ( urls, onLoad, onProgress, onError ) {

		var texture = new CubeTexture( [] );

		var loader = new ImageLoader();
		loader.setCrossOrigin( this.crossOrigin );
		loader.setPath( this.path );

		var loaded = 0;

		function loadTexture( i ) {

			loader.load( urls[ i ], function ( image ) {

				texture.images[ i ] = image;

				loaded ++;

				if ( loaded === 6 ) {

					texture.needsUpdate = true;

					if ( onLoad ) onLoad( texture );

				}

			}, undefined, onError );

		}

		for ( var i = 0; i < urls.length; ++ i ) {

			loadTexture( i );

		}

		return texture;

	},

	setCrossOrigin: function ( value ) {

		this.crossOrigin = value;

	},

	setPath: function ( value ) {

		this.path = value;

	}

};
