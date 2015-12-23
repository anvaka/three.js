/**
 * @author mrdoob / http://mrdoob.com/
 */

var THREE = {};
var addLegacy = require('./Three.Legacy.js');

// animation

THREE.AnimationClip = require('./animation/AnimationClip.js');
THREE.AnimationMixer = require('./animation/AnimationMixer.js');
THREE.AnimationObjectGroup = require('./animation/AnimationObjectGroup.js');
THREE.AnimationUtils = require('./animation/AnimationUtils.js');
THREE.KeyframeTrack = require('./animation/KeyframeTrack.js');
THREE.PropertyBinding = require('./animation/PropertyBinding.js');
THREE.PropertyMixer = require('./animation/PropertyMixer.js');

// animtation tracks
THREE.BooleanKeyframeTrack = require('./animation/tracks/BooleanKeyframeTrack.js');
THREE.ColorKeyframeTrack = require('./animation/tracks/ColorKeyframeTrack.js');
THREE.NumberKeyframeTrack = require('./animation/tracks/NumberKeyframeTrack.js');
THREE.QuaternionKeyframeTrack = require('./animation/tracks/QuaternionKeyframeTrack.js');
THREE.StringKeyframeTrack = require('./animation/tracks/StringKeyframeTrack.js');
THREE.VectorKeyframeTrack = require('./animation/tracks/VectorKeyframeTrack.js');

// audio

THREE.Audio = require('./audio/Audio.js');
THREE.AudioAnalyser = require('./audio/AudioAnalyser.js');
THREE.AudioBuffer = require('./audio/AudioBuffer.js');
THREE.AudioListener = require('./audio/AudioListener.js');
THREE.PositionalAudio = require('./audio/PositionalAudio.js');

// cameras

THREE.Camera = require('./cameras/Camera.js');
THREE.CubeCamera = require('./cameras/CubeCamera.js');
THREE.OrthographicCamera = require('./cameras/OrthographicCamera.js');
THREE.PerspectiveCamera = require('./cameras/PerspectiveCamera.js');
THREE.StereoCamera = require('./cameras/StereoCamera.js');

// core

THREE.BufferGeometry = require('./core/BufferGeometry.js');
THREE.Clock = require('./core/Clock.js');
THREE.DirectGeometry = require('./core/DirectGeometry.js');
THREE.EventDispatcher = require('./core/EventDispatcher.js');
THREE.Face3 = require('./core/Face3.js');
THREE.Face4 = require('./core/Face4.js');
THREE.Geometry = require('./core/Geometry.js');
THREE.InstancedBufferAttribute = require('./core/InstancedBufferAttribute.js');
THREE.InstancedBufferGeometry = require('./core/InstancedBufferGeometry.js');
THREE.InstancedInterleavedBuffer = require('./core/InstancedInterleavedBuffer.js');
THREE.InterleavedBuffer = require('./core/InterleavedBuffer.js');
THREE.InterleavedBufferAttribute = require('./core/InterleavedBufferAttribute.js');
THREE.Layers = require('./core/Layers.js');
THREE.Object3D = require('./core/Object3D.js');
THREE.Raycaster = require('./core/Raycaster.js');
THREE.Uniform = require('./core/Uniform.js');

// core - BufferAttribute

THREE.BufferAttribute = require('./core/BufferAttribute.js');
copyPropertiesFromTo(THREE.BufferAttribute, THREE);


// lights
THREE.AmbientLight = require('./lights/AmbientLight.js');
THREE.DirectionalLight = require('./lights/DirectionalLight.js');
THREE.HemisphereLight = require('./lights/HemisphereLight.js');
THREE.Light = require('./lights/Light.js');
THREE.LightShadow = require('./lights/LightShadow.js');
THREE.PointLight = require('./lights/PointLight.js');
THREE.SpotLight = require('./lights/SpotLight.js');

// loadres

THREE.AnimationLoader = require('./loaders/AnimationLoader.js');
THREE.BinaryTextureLoader = require('./loaders/BinaryTextureLoader.js');
THREE.BufferGeometryLoader = require('./loaders/BufferGeometryLoader.js');
THREE.Cache = require('./loaders/Cache.js');
THREE.CompressedTextureLoader = require('./loaders/CompressedTextureLoader.js');
THREE.CubeTextureLoader = require('./loaders/CubeTextureLoader.js');
THREE.ImageLoader = require('./loaders/ImageLoader.js');
THREE.LoadingManager = require('./loaders/LoadingManager.js');
THREE.JSONLoader = require('./loaders/JSONLoader.js');
THREE.Loader = require('./loaders/Loader.js');
THREE.MaterialLoader = require('./loaders/MaterialLoader.js');
THREE.ObjectLoader = require('./loaders/ObjectLoader.js');
THREE.TextureLoader = require('./loaders/TextureLoader.js');
THREE.XHRLoader = require('./loaders/XHRLoader.js');

// copy additional properties for backward compaitibility
copyPropertiesFromTo(THREE.BinaryTextureLoader, THREE);
copyPropertiesFromTo(THREE.LoadingManager, THREE);

// materials

THREE.LineBasicMaterial = require('./materials/LineBasicMaterial.js');
THREE.LineDashedMaterial = require('./materials/LineDashedMaterial.js');
THREE.Material = require('./materials/Material.js');
THREE.MeshBasicMaterial = require('./materials/MeshBasicMaterial.js');
THREE.MeshDepthMaterial = require('./materials/MeshDepthMaterial.js');
THREE.MeshLambertMaterial = require('./materials/MeshLambertMaterial.js');
THREE.MeshNormalMaterial = require('./materials/MeshNormalMaterial.js');
THREE.MeshPhongMaterial = require('./materials/MeshPhongMaterial.js');
THREE.MeshStandardMaterial = require('./materials/MeshStandardMaterial.js');
THREE.MultiMaterial = require('./materials/MultiMaterial.js');
THREE.PointsMaterial = require('./materials/PointsMaterial.js');
THREE.RawShaderMaterial = require('./materials/RawShaderMaterial.js');
THREE.ShaderMaterial = require('./materials/ShaderMaterial.js');
THREE.SpriteMaterial = require('./materials/SpriteMaterial.js');

// Math

THREE.Box2 = require('./math/Box2.js');
THREE.Box3 = require('./math/Box3.js');
THREE.Color = require('./math/Color.js');
THREE.ColorKeywords = THREE.Color.ColorKeywords; // TODO: Ideally this should live in a separate file
THREE.Euler = require('./math/Euler.js');
THREE.Frustum = require('./math/Frustum.js');
THREE.Line3 = require('./math/Line3.js');
THREE.Math = require('./math/Math.js');
THREE.Matrix3 = require('./math/Matrix3.js');
THREE.Matrix4 = require('./math/Matrix4.js');
THREE.Plane = require('./math/Plane.js');
THREE.Quaternion = require('./math/Quaternion.js');
THREE.Ray = require('./math/Ray.js');
THREE.Sphere = require('./math/Sphere.js');
THREE.Spline = require('./math/Spline.js');
THREE.Triangle  = require('./math/Triangle.js');
THREE.Vector2 = require('./math/Vector2.js');
THREE.Vector3 = require('./math/Vector3.js');
THREE.Vector4 = require('./math/Vector4.js');

// Math - Interpolants

THREE.Interpolant = require('./math/Interpolant.js');
THREE.CubicInterpolant = require('./math/interpolants/CubicInterpolant.js');
THREE.DiscreteInterpolant = require('./math/interpolants/DiscreteInterpolant.js');
THREE.LinearInterpolant = require('./math/interpolants/LinearInterpolant.js');
THREE.QuaternionLinearInterpolant = require('./math/interpolants/QuaternionLinearInterpolant.js');

// objects

THREE.Bone = require('./objects/Bone.js');
THREE.Group = require('./objects/Group.js');
THREE.LensFlare = require('./objects/LensFlare.js');
THREE.Line = require('./objects/Line.js');
THREE.LineSegments = require('./objects/LineSegments.js');
THREE.LOD = require('./objects/LOD.js');
THREE.Mesh = require('./objects/Mesh.js');
THREE.Points = require('./objects/Points.js');
THREE.Skeleton = require('./objects/Skeleton.js');
THREE.SkinnedMesh = require('./objects/SkinnedMesh.js');
THREE.Sprite = require('./objects/Sprite.js');
copyPropertiesFromTo(THREE.Sprite, THREE); // backward comatibility

// renderers

// renderers -> shaders

THREE.ShaderChunk = require('./renderers/shaders/ShaderChunk.js');
THREE.ShaderLib = require('./renderers/shaders/ShaderLib.js');
THREE.UniformsLib = require('./renderers/shaders/UniformsLib.js');
THREE.UniformsUtils = require('./renderers/shaders/UniformsUtils.js');

// renderers -> webgl

THREE.LensFlarePlugin = require('./renderers/webgl/plugins/LensFlarePlugin.js');
THREE.SpritePlugin = require('./renderers/webgl/plugins/SpritePlugin.js');

THREE.WebGLBufferRenderer = require('./renderers/webgl/WebGLBufferRenderer.js');
THREE.WebGLCapabilities = require('./renderers/webgl/WebGLCapabilities.js');
THREE.WebGLExtensions = require('./renderers/webgl/WebGLExtensions.js');
THREE.WebGLGeometries = require('./renderers/webgl/WebGLGeometries.js');
THREE.WebGLIndexedBufferRenderer = require('./renderers/webgl/WebGLIndexedBufferRenderer.js');
THREE.WebGLLights = require('./renderers/webgl/WebGLLights.js');
THREE.WebGLObjects = require('./renderers/webgl/WebGLObjects.js');
THREE.WebGLProgram = require('./renderers/webgl/WebGLProgram.js');
THREE.WebGLPrograms = require('./renderers/webgl/WebGLPrograms.js');
THREE.WebGLProperties = require('./renderers/webgl/WebGLProperties.js');
THREE.WebGLShader = require('./renderers/webgl/WebGLShader.js');
THREE.WebGLShadowMap = require('./renderers/webgl/WebGLShadowMap.js');
THREE.WebGLState = require('./renderers/webgl/WebGLState.js');

THREE.WebGLRenderTarget = require('./renderers/WebGLRenderTarget.js');
THREE.WebGLRenderTargetCube = require('./renderers/WebGLRenderTargetCube.js');

THREE.WebGLRenderer = require('./renderers/WebGLRenderer.js');

// Scenes

THREE.Fog = require('./scenes/Fog.js');
THREE.FogExp2 = require('./scenes/FogExp2.js');
THREE.Scene = require('./scenes/Scene.js');

// Textures

THREE.CanvasTexture = require('./textures/CanvasTexture.js');
THREE.CompressedTexture = require('./textures/CompressedTexture.js');
THREE.CubeTexture = require('./textures/CubeTexture.js');
THREE.DataTexture = require('./textures/DataTexture.js');
THREE.Texture = require('./textures/Texture.js');
THREE.VideoTexture = require('./textures/VideoTexture.js');

// extras

THREE.CurveUtils = require('./extras/CurveUtils.js');
THREE.SceneUtils = require('./extras/SceneUtils.js');
THREE.ShapeUtils = require('./extras/ShapeUtils.js');

// extras - core

THREE.Curve = require('./extras/core/Curve.js');
THREE.CurvePath = require('./extras/core/CurvePath.js');
THREE.Path = require('./extras/core/Path.js');
THREE.Shape = require('./extras/core/Shape.js');

// extras - curves (TODO: I feel like this should all be under `curves` module)
THREE.ArcCurve = require('./extras/curves/ArcCurve.js');
THREE.CatmullRomCurve3 = require('./extras/curves/CatmullRomCurve3.js');
THREE.ClosedSplineCurve3 = require('./extras/curves/ClosedSplineCurve3.js');
THREE.CubicBezierCurve = require('./extras/curves/CubicBezierCurve.js');
THREE.CubicBezierCurve3 = require('./extras/curves/CubicBezierCurve3.js');
THREE.EllipseCurve = require('./extras/curves/EllipseCurve.js');
THREE.LineCurve = require('./extras/curves/LineCurve.js');
THREE.LineCurve3 = require('./extras/curves/LineCurve3.js');
THREE.QuadraticBezierCurve = require('./extras/curves/QuadraticBezierCurve.js');
THREE.QuadraticBezierCurve3 = require('./extras/curves/QuadraticBezierCurve3.js');
THREE.SplineCurve = require('./extras/curves/SplineCurve.js');
THREE.SplineCurve3 = require('./extras/curves/SplineCurve3.js');

// extras - geometries

THREE.BoxGeometry = require('./extras/geometries/BoxGeometry.js');
copyPropertiesFromTo(THREE.BoxGeometry, THREE); // backward compatibility
THREE.CircleBufferGeometry = require('./extras/geometries/CircleBufferGeometry.js');
THREE.CircleGeometry = require('./extras/geometries/CircleGeometry.js');
THREE.CylinderGeometry = require('./extras/geometries/CylinderGeometry.js');
THREE.DodecahedronGeometry = require('./extras/geometries/DodecahedronGeometry.js');
THREE.EdgesGeometry = require('./extras/geometries/EdgesGeometry.js');
THREE.ExtrudeGeometry = require('./extras/geometries/ExtrudeGeometry.js');
THREE.IcosahedronGeometry = require('./extras/geometries/IcosahedronGeometry.js');
THREE.LatheGeometry = require('./extras/geometries/LatheGeometry.js');
THREE.OctahedronGeometry = require('./extras/geometries/OctahedronGeometry.js');
THREE.ParametricGeometry = require('./extras/geometries/ParametricGeometry.js');
THREE.PlaneBufferGeometry = require('./extras/geometries/PlaneBufferGeometry.js');
THREE.PlaneGeometry = require('./extras/geometries/PlaneGeometry.js');
THREE.PolyhedronGeometry = require('./extras/geometries/PolyhedronGeometry.js');
THREE.RingGeometry = require('./extras/geometries/RingGeometry.js');
THREE.ShapeGeometry = require('./extras/geometries/ShapeGeometry.js');
THREE.SphereBufferGeometry = require('./extras/geometries/SphereBufferGeometry.js');
THREE.SphereGeometry = require('./extras/geometries/SphereGeometry.js');
THREE.TetrahedronGeometry = require('./extras/geometries/TetrahedronGeometry.js');
THREE.TorusGeometry = require('./extras/geometries/TorusGeometry.js');
THREE.TorusKnotGeometry = require('./extras/geometries/TorusKnotGeometry.js');
THREE.TubeGeometry = require('./extras/geometries/TubeGeometry.js');
THREE.WireframeGeometry = require('./extras/geometries/WireframeGeometry.js');


// extras/helpers

THREE.ArrowHelper = require('./extras/helpers/ArrowHelper.js');
THREE.AxisHelper = require('./extras/helpers/AxisHelper.js');
THREE.BoundingBoxHelper = require('./extras/helpers/BoundingBoxHelper.js');
THREE.BoxHelper = require('./extras/helpers/BoxHelper.js');
THREE.CameraHelper = require('./extras/helpers/CameraHelper.js');
THREE.DirectionalLightHelper = require('./extras/helpers/DirectionalLightHelper.js');
THREE.EdgesHelper = require('./extras/helpers/EdgesHelper.js');
THREE.FaceNormalsHelper = require('./extras/helpers/FaceNormalsHelper.js');
THREE.GridHelper = require('./extras/helpers/GridHelper.js');
THREE.HemisphereLightHelper = require('./extras/helpers/HemisphereLightHelper.js');
THREE.PointLightHelper = require('./extras/helpers/PointLightHelper.js');
THREE.SkeletonHelper = require('./extras/helpers/SkeletonHelper.js');
THREE.SpotLightHelper = require('./extras/helpers/SpotLightHelper.js');
THREE.VertexNormalsHelper = require('./extras/helpers/VertexNormalsHelper.js');
THREE.WireframeHelper = require('./extras/helpers/WireframeHelper.js');

// extras/objects

THREE.ImmediateRenderObject = require('./extras/objects/ImmediateRenderObject.js');
THREE.MorphBlendMesh = require('./extras/objects/MorphBlendMesh.js');

// finish with renderers

if ( typeof define === 'function' && define.amd ) {

	define( 'three', THREE );

} else if ( 'undefined' !== typeof exports && 'undefined' !== typeof module ) {

	module.exports = THREE;

}


// polyfills

if ( self.requestAnimationFrame === undefined || self.cancelAnimationFrame === undefined ) {

	// Missing in Android stock browser.

	( function () {

		var lastTime = 0;
		var vendors = [ 'ms', 'moz', 'webkit', 'o' ];

		for ( var x = 0; x < vendors.length && ! self.requestAnimationFrame; ++ x ) {

			self.requestAnimationFrame = self[ vendors[ x ] + 'RequestAnimationFrame' ];
			self.cancelAnimationFrame = self[ vendors[ x ] + 'CancelAnimationFrame' ] || self[ vendors[ x ] + 'CancelRequestAnimationFrame' ];

		}

		if ( self.requestAnimationFrame === undefined && self.setTimeout !== undefined ) {

			self.requestAnimationFrame = function ( callback ) {

				var currTime = Date.now(), timeToCall = Math.max( 0, 16 - ( currTime - lastTime ) );
				var id = self.setTimeout( function () {

					callback( currTime + timeToCall );

				}, timeToCall );
				lastTime = currTime + timeToCall;
				return id;

			};

		}

		if ( self.cancelAnimationFrame === undefined && self.clearTimeout !== undefined ) {

			self.cancelAnimationFrame = function ( id ) {

				self.clearTimeout( id );

			};

		}

	} )();

}

//

if ( self.performance === undefined ) {

	self.performance = {};

}

if ( self.performance.now === undefined ) {

	( function () {

		var start = Date.now();

		self.performance.now = function () {

			return Date.now() - start;

		}

	} )();

}

//

if ( Number.EPSILON === undefined ) {

	Number.EPSILON = Math.pow( 2, - 52 );

}

//

if ( Math.sign === undefined ) {

	// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/sign

	Math.sign = function ( x ) {

		return ( x < 0 ) ? - 1 : ( x > 0 ) ? 1 : + x;

	};

}

if ( Function.prototype.name === undefined && Object.defineProperty !== undefined ) {

	// Missing in IE9-11.
	// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/name

	Object.defineProperty( Function.prototype, 'name', {

		get: function () {

			return this.toString().match( /^\s*function\s*(\S*)\s*\(/ )[ 1 ];

		}

	} );

}

if ( Object.assign === undefined ) {

	// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign

	Object.defineProperty( Object, 'assign', {

		writable: true,
		configurable: true,

		value: function ( target ) {

			'use strict';

			if ( target === undefined || target === null ) {

				throw new TypeError( "Cannot convert first argument to object" );

			}

			var to = Object( target );

			for ( var i = 1, n = arguments.length; i !== n; ++ i ) {

				var nextSource = arguments[ i ];

				if ( nextSource === undefined || nextSource === null ) continue;

				nextSource = Object( nextSource );

				var keysArray = Object.keys( nextSource );

				for ( var nextIndex = 0, len = keysArray.length; nextIndex !== len; ++ nextIndex ) {

					var nextKey = keysArray[ nextIndex ];
					var desc = Object.getOwnPropertyDescriptor( nextSource, nextKey );

					if ( desc !== undefined && desc.enumerable ) {

						to[ nextKey ] = nextSource[ nextKey ];

					}

				}

			}

			return to;

		}

	} );

}

// https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent.button

THREE.MOUSE = { LEFT: 0, MIDDLE: 1, RIGHT: 2 };
// For backward compatibility plop all defaults onto THREE:
var Default = require('./defaults.js');
copyPropertiesFromTo(Default, THREE);

function copyPropertiesFromTo(from, to) {
	
	Object.keys( from ).forEach( function(key) {
		to[key] = from[key];
	} );
	
}

addLegacy(THREE);
