/**
 * @author bhouston / http://clara.io/
 */

module.exports = AnimationLoader;

var XHRLoader = require('./XHRLoader.js');
var DefaultLoadingManager = require('./LoadingManager.js').DefaultLoadingManager;
var AnimationClip = require('../animation/AnimationClip.js');

function AnimationLoader( manager ) {

	this.manager = ( manager !== undefined ) ? manager : DefaultLoadingManager;

};

AnimationLoader.prototype = {

	constructor: AnimationLoader,

	load: function ( url, onLoad, onProgress, onError ) {

		var scope = this;

		var loader = new XHRLoader( scope.manager );
		loader.load( url, function ( text ) {

			onLoad( scope.parse( JSON.parse( text ) ) );

		}, onProgress, onError );

	},

	parse: function ( json, onLoad ) {

		var animations = [];

		for ( var i = 0; i < json.length; i ++ ) {

			var clip = AnimationClip.parse( json[ i ] );

			animations.push( clip );

		}

		onLoad( animations );

	}

};
