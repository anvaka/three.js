/**
 * @author mrdoob / http://mrdoob.com/
 */

module.exports = ObjectLoader;

var LoadingManager = require('./LoadingManager.js');
var DefaultLoadingManager = LoadingManager.DefaultLoadingManager;
var XHRLoader = require('./XHRLoader.js');
var JSONLoader = require('./JSONLoader.js');
var ImageLoader = require('./ImageLoader.js');
var MaterialLoader = require('./MaterialLoader.js');
var BufferGeometryLoader = require('./BufferGeometryLoader.js');
var Default = require('../defaults.js');
var Vector2 = require('../math/Vector2.js');
var Matrix4 = require('../math/Matrix4.js');
var Scene = require('../scenes/Scene.js');
var PerspectiveCamera = require('../cameras/PerspectiveCamera.js');
var OrthographicCamera = require('../cameras/OrthographicCamera.js');
var AmbientLight = require('../lights/AmbientLight.js');
var DirectionalLight = require('../lights/DirectionalLight.js');
var PointLight = require('../lights/PointLight.js');
var SpotLight = require('../lights/SpotLight.js');
var HemisphereLight = require('../lights/HemisphereLight.js');
var AnimationClip = require('../animation/AnimationClip.js');
var Texture = require('../textures/Texture.js');
var SkinnedMesh = require('../objects/SkinnedMesh.js');
var Mesh = require('../objects/Mesh.js');
var LOD = require('../objects/LOD.js');
var Line = require('../objects/Line.js');
var Points = require('../objects/Points.js');
var Sprite = require('../objects/Sprite.js');

var Object3D = require('../core/Object3D.js');
var Group = require('../objects/Group.js');

var Geometries = {
	PlaneGeometry: require('../extras/geometries/PlaneGeometry.js'),
	PlaneBufferGeometry: require('../extras/geometries/PlaneBufferGeometry.js'),
	BoxGeometry: require('../extras/geometries/BoxGeometry.js'),
	CircleBufferGeometry: require('../extras/geometries/CircleBufferGeometry.js'),
	CircleGeometry: require('../extras/geometries/CircleGeometry.js'),
	CylinderGeometry: require('../extras/geometries/CylinderGeometry.js'),
	SphereGeometry: require('../extras/geometries/SphereGeometry.js'),
	SphereBufferGeometry: require('../extras/geometries/SphereBufferGeometry.js'),
	DodecahedronGeometry: require('../extras/geometries/DodecahedronGeometry.js'),
	IcosahedronGeometry: require('../extras/geometries/IcosahedronGeometry.js'),
	OctahedronGeometry: require('../extras/geometries/OctahedronGeometry.js'),
	TetrahedronGeometry: require('../extras/geometries/TetrahedronGeometry.js'),
	RingGeometry: require('../extras/geometries/RingGeometry.js'),
	TorusGeometry: require('../extras/geometries/TorusGeometry.js'),
	TorusKnotGeometry: require('../extras/geometries/TorusKnotGeometry.js')
};

function ObjectLoader( manager ) {

	this.manager = ( manager !== undefined ) ? manager : DefaultLoadingManager;
	this.texturePath = '';

};

ObjectLoader.prototype = {

	constructor: ObjectLoader,

	load: function ( url, onLoad, onProgress, onError ) {

		if ( this.texturePath === '' ) {

			this.texturePath = url.substring( 0, url.lastIndexOf( '/' ) + 1 );

		}

		var scope = this;

		var loader = new XHRLoader( scope.manager );
		loader.load( url, function ( text ) {

			scope.parse( JSON.parse( text ), onLoad );

		}, onProgress, onError );

	},

	setTexturePath: function ( value ) {

		this.texturePath = value;

	},

	setCrossOrigin: function ( value ) {

		this.crossOrigin = value;

	},

	parse: function ( json, onLoad ) {

		var geometries = this.parseGeometries( json.geometries );

		var images = this.parseImages( json.images, function () {

			if ( onLoad !== undefined ) onLoad( object );

		} );

		var textures  = this.parseTextures( json.textures, images );
		var materials = this.parseMaterials( json.materials, textures );

		var object = this.parseObject( json.object, geometries, materials );

		if ( json.animations ) {

			object.animations = this.parseAnimations( json.animations );

		}

		if ( json.images === undefined || json.images.length === 0 ) {

			if ( onLoad !== undefined ) onLoad( object );

		}

		return object;

	},

	parseGeometries: function ( json ) {

		var geometries = {};

		if ( json !== undefined ) {

			var geometryLoader = new JSONLoader();
			var bufferGeometryLoader = new BufferGeometryLoader();

			for ( var i = 0, l = json.length; i < l; i ++ ) {

				var geometry;
				var data = json[ i ];

				switch ( data.type ) {

					case 'PlaneGeometry':
					case 'PlaneBufferGeometry':

						geometry = new Geometries[ data.type ](
							data.width,
							data.height,
							data.widthSegments,
							data.heightSegments
						);

						break;

					case 'BoxGeometry':
					case 'CubeGeometry': // backwards compatible

						geometry = new Geometries.BoxGeometry(
							data.width,
							data.height,
							data.depth,
							data.widthSegments,
							data.heightSegments,
							data.depthSegments
						);

						break;

					case 'CircleBufferGeometry':

						geometry = new Geometries.CircleBufferGeometry(
							data.radius,
							data.segments,
							data.thetaStart,
							data.thetaLength
						);

						break;

					case 'CircleGeometry':

						geometry = new Geometries.CircleGeometry(
							data.radius,
							data.segments,
							data.thetaStart,
							data.thetaLength
						);

						break;

					case 'CylinderGeometry':

						geometry = new Geometries.CylinderGeometry(
							data.radiusTop,
							data.radiusBottom,
							data.height,
							data.radialSegments,
							data.heightSegments,
							data.openEnded,
							data.thetaStart,
							data.thetaLength
						);

						break;

					case 'SphereGeometry':

						geometry = new Geometries.SphereGeometry(
							data.radius,
							data.widthSegments,
							data.heightSegments,
							data.phiStart,
							data.phiLength,
							data.thetaStart,
							data.thetaLength
						);

						break;

					case 'SphereBufferGeometry':

						geometry = new Geometries.SphereBufferGeometry(
							data.radius,
							data.widthSegments,
							data.heightSegments,
							data.phiStart,
							data.phiLength,
							data.thetaStart,
							data.thetaLength
						);

						break;

					case 'DodecahedronGeometry':

						geometry = new Geometries.DodecahedronGeometry(
							data.radius,
							data.detail
						);

						break;

					case 'IcosahedronGeometry':

						geometry = new Geometries.IcosahedronGeometry(
							data.radius,
							data.detail
						);

						break;

					case 'OctahedronGeometry':

						geometry = new Geometries.OctahedronGeometry(
							data.radius,
							data.detail
						);

						break;

					case 'TetrahedronGeometry':

						geometry = new Geometries.TetrahedronGeometry(
							data.radius,
							data.detail
						);

						break;

					case 'RingGeometry':

						geometry = new Geometries.RingGeometry(
							data.innerRadius,
							data.outerRadius,
							data.thetaSegments,
							data.phiSegments,
							data.thetaStart,
							data.thetaLength
						);

						break;

					case 'TorusGeometry':

						geometry = new Geometries.TorusGeometry(
							data.radius,
							data.tube,
							data.radialSegments,
							data.tubularSegments,
							data.arc
						);

						break;

					case 'TorusKnotGeometry':

						geometry = new Geometries.TorusKnotGeometry(
							data.radius,
							data.tube,
							data.radialSegments,
							data.tubularSegments,
							data.p,
							data.q,
							data.heightScale
						);

						break;

					case 'BufferGeometry':

						geometry = bufferGeometryLoader.parse( data );

						break;

					case 'Geometry':

						geometry = geometryLoader.parse( data.data, this.texturePath ).geometry;

						break;

					default:

						console.warn( 'THREE.ObjectLoader: Unsupported geometry type "' + data.type + '"' );

						continue;

				}

				geometry.uuid = data.uuid;

				if ( data.name !== undefined ) geometry.name = data.name;

				geometries[ data.uuid ] = geometry;

			}

		}

		return geometries;

	},

	parseMaterials: function ( json, textures ) {

		var materials = {};

		if ( json !== undefined ) {

			var loader = new MaterialLoader();
			loader.setTextures( textures );

			for ( var i = 0, l = json.length; i < l; i ++ ) {

				var material = loader.parse( json[ i ] );
				materials[ material.uuid ] = material;

			}

		}

		return materials;

	},

	parseAnimations: function ( json ) {

		var animations = [];

		for ( var i = 0; i < json.length; i ++ ) {

			var clip = AnimationClip.parse( json[ i ] );

			animations.push( clip );

		}

		return animations;

	},

	parseImages: function ( json, onLoad ) {

		var scope = this;
		var images = {};

		function loadImage( url ) {

			scope.manager.itemStart( url );

			return loader.load( url, function () {

				scope.manager.itemEnd( url );

			} );

		}

		if ( json !== undefined && json.length > 0 ) {

			var manager = new LoadingManager( onLoad );

			var loader = new ImageLoader( manager );
			loader.setCrossOrigin( this.crossOrigin );

			for ( var i = 0, l = json.length; i < l; i ++ ) {

				var image = json[ i ];
				var path = /^(\/\/)|([a-z]+:(\/\/)?)/i.test( image.url ) ? image.url : scope.texturePath + image.url;

				images[ image.uuid ] = loadImage( path );

			}

		}

		return images;

	},

	parseTextures: function ( json, images ) {

		function parseConstant( value ) {

			if ( typeof( value ) === 'number' ) return value;

			console.warn( 'THREE.ObjectLoader.parseTexture: Constant should be in numeric form.', value );

			return Default[ value ];

		}

		var textures = {};

		if ( json !== undefined ) {

			for ( var i = 0, l = json.length; i < l; i ++ ) {

				var data = json[ i ];

				if ( data.image === undefined ) {

					console.warn( 'THREE.ObjectLoader: No "image" specified for', data.uuid );

				}

				if ( images[ data.image ] === undefined ) {

					console.warn( 'THREE.ObjectLoader: Undefined image', data.image );

				}

				var texture = new Texture( images[ data.image ] );
				texture.needsUpdate = true;

				texture.uuid = data.uuid;

				if ( data.name !== undefined ) texture.name = data.name;
				if ( data.mapping !== undefined ) texture.mapping = parseConstant( data.mapping );
				if ( data.offset !== undefined ) texture.offset = new Vector2( data.offset[ 0 ], data.offset[ 1 ] );
				if ( data.repeat !== undefined ) texture.repeat = new Vector2( data.repeat[ 0 ], data.repeat[ 1 ] );
				if ( data.minFilter !== undefined ) texture.minFilter = parseConstant( data.minFilter );
				if ( data.magFilter !== undefined ) texture.magFilter = parseConstant( data.magFilter );
				if ( data.anisotropy !== undefined ) texture.anisotropy = data.anisotropy;
				if ( Array.isArray( data.wrap ) ) {

					texture.wrapS = parseConstant( data.wrap[ 0 ] );
					texture.wrapT = parseConstant( data.wrap[ 1 ] );

				}

				textures[ data.uuid ] = texture;

			}

		}

		return textures;

	},

	parseObject: function () {

		var matrix = new Matrix4();

		return function ( data, geometries, materials ) {

			var object;

			function getGeometry( name ) {

				if ( geometries[ name ] === undefined ) {

					console.warn( 'THREE.ObjectLoader: Undefined geometry', name );

				}

				return geometries[ name ];

			}

			function getMaterial( name ) {

				if ( name === undefined ) return undefined;

				if ( materials[ name ] === undefined ) {

					console.warn( 'THREE.ObjectLoader: Undefined material', name );

				}

				return materials[ name ];

			}

			switch ( data.type ) {

				case 'Scene':

					object = new Scene();

					break;

				case 'PerspectiveCamera':

					object = new PerspectiveCamera( data.fov, data.aspect, data.near, data.far );

					break;

				case 'OrthographicCamera':

					object = new OrthographicCamera( data.left, data.right, data.top, data.bottom, data.near, data.far );

					break;

				case 'AmbientLight':

					object = new AmbientLight( data.color, data.intensity );

					break;

				case 'DirectionalLight':

					object = new DirectionalLight( data.color, data.intensity );

					break;

				case 'PointLight':

					object = new PointLight( data.color, data.intensity, data.distance, data.decay );

					break;

				case 'SpotLight':

					object = new SpotLight( data.color, data.intensity, data.distance, data.angle, data.exponent, data.decay );

					break;

				case 'HemisphereLight':

					object = new HemisphereLight( data.color, data.groundColor, data.intensity );

					break;

				case 'Mesh':

					var geometry = getGeometry( data.geometry );
					var material = getMaterial( data.material );

					if ( geometry.bones && geometry.bones.length > 0 ) {

						object = new SkinnedMesh( geometry, material );

					} else {

						object = new Mesh( geometry, material );

					}

					break;

				case 'LOD':

					object = new LOD();

					break;

				case 'Line':

					object = new Line( getGeometry( data.geometry ), getMaterial( data.material ), data.mode );

					break;

				case 'PointCloud':
				case 'Points':

					object = new Points( getGeometry( data.geometry ), getMaterial( data.material ) );

					break;

				case 'Sprite':

					object = new Sprite( getMaterial( data.material ) );

					break;

				case 'Group':

					object = new Group();

					break;

				default:

					object = new Object3D();

			}

			object.uuid = data.uuid;

			if ( data.name !== undefined ) object.name = data.name;
			if ( data.matrix !== undefined ) {

				matrix.fromArray( data.matrix );
				matrix.decompose( object.position, object.quaternion, object.scale );

			} else {

				if ( data.position !== undefined ) object.position.fromArray( data.position );
				if ( data.rotation !== undefined ) object.rotation.fromArray( data.rotation );
				if ( data.scale !== undefined ) object.scale.fromArray( data.scale );

			}

			if ( data.castShadow !== undefined ) object.castShadow = data.castShadow;
			if ( data.receiveShadow !== undefined ) object.receiveShadow = data.receiveShadow;

			if ( data.visible !== undefined ) object.visible = data.visible;
			if ( data.userData !== undefined ) object.userData = data.userData;

			if ( data.children !== undefined ) {

				for ( var child in data.children ) {

					object.add( this.parseObject( data.children[ child ], geometries, materials ) );

				}

			}

			if ( data.type === 'LOD' ) {

				var levels = data.levels;

				for ( var l = 0; l < levels.length; l ++ ) {

					var level = levels[ l ];
					var child = object.getObjectByProperty( 'uuid', level.object );

					if ( child !== undefined ) {

						object.addLevel( child, level.distance );

					}

				}

			}

			return object;

		}

	}()

};
