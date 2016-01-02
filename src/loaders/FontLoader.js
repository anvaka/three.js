/**
 * @author mrdoob / http://mrdoob.com/
 */

module.exports = FontLoader;

var DefaultLoadingManager = require('./LoadingManager.js').DefaultLoadingManager;
var XHRLoader = require('./XHRLoader.js');
var Font = require('../extras/core/Font.js');

function FontLoader( manager ) {

	this.manager = ( manager !== undefined ) ? manager : DefaultLoadingManager;

};

FontLoader.prototype = {

	constructor: FontLoader,

	load: function ( url, onLoad, onProgress, onError ) {

		var loader = new XHRLoader( this.manager );
		loader.load( url, function ( text ) {

			onLoad( new Font( JSON.parse( text.substring( 65, text.length - 2 ) ) ) );

		}, onProgress, onError );

	}

};
