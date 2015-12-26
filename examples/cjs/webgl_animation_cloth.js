/* eslint indent: 0 */
/* testing cloth simulation */
var Vector3 = require('../../src/math/Vector3.js');
var Scene = require('../../src/scenes/Scene.js');
var Fog = require('../../src/scenes/Fog.js');
var PerspectiveCamera = require('../../src/cameras/PerspectiveCamera.js');
var AmbientLight = require('../../src/lights/AmbientLight.js');
var DirectionalLight = require('../../src/lights/DirectionalLight.js');
var TextureLoader = require('../../src/loaders/TextureLoader.js');
var Default = require('../../src/defaults.js');
var MeshPhongMaterial = require('../../src/materials/MeshPhongMaterial.js');
var ParametricGeometry = require('../../src/extras/geometries/ParametricGeometry.js');
var Mesh = require('../../src/objects/Mesh.js');
var ShaderMaterial = require('../../src/materials/ShaderMaterial.js');
var SphereGeometry = require('../../src/extras/geometries/SphereGeometry.js');
var PlaneBufferGeometry = require('../../src/extras/geometries/PlaneBufferGeometry.js');
var BoxGeometry = require('../../src/extras/geometries/BoxGeometry.js');
var WebGLRenderer = require('../../src/renderers/WebGLRenderer.js');
 
var DAMPING = 0.03;
var DRAG = 1 - DAMPING;
var MASS = .1;
var restDistance = 25;


var xSegs = 10; //
var ySegs = 10; //

var clothFunction = plane( restDistance * xSegs, restDistance * ySegs );

var cloth = new Cloth( xSegs, ySegs );

var GRAVITY = 981 * 1.4; // 
var gravity = new Vector3( 0, - GRAVITY, 0 ).multiplyScalar( MASS );


var TIMESTEP = 18 / 1000;
var TIMESTEP_SQ = TIMESTEP * TIMESTEP;

var pins = [];


var wind = true;
var windStrength = 2;
var windForce = new Vector3( 0, 0, 0 );

var ballPosition = new Vector3( 0, - 45, 0 );
var ballSize = 60; //40

var tmpForce = new Vector3();

var lastTime;


function plane( width, height ) {

	return function( u, v ) {

		var x = ( u - 0.5 ) * width;
		var y = ( v + 0.5 ) * height;
		var z = 0;

		return new Vector3( x, y, z );

	};

}

function Particle( x, y, z, mass ) {

	this.position = clothFunction( x, y ); // position
	this.previous = clothFunction( x, y ); // previous
	this.original = clothFunction( x, y ); 
	this.a = new Vector3( 0, 0, 0 ); // acceleration
	this.mass = mass;
	this.invMass = 1 / mass;
	this.tmp = new Vector3();
	this.tmp2 = new Vector3();

}

// Force -> Acceleration
Particle.prototype.addForce = function( force ) {

	this.a.add(
		this.tmp2.copy( force ).multiplyScalar( this.invMass )
	);

};


// Performs verlet integration
Particle.prototype.integrate = function( timesq ) {

	var newPos = this.tmp.subVectors( this.position, this.previous );
	newPos.multiplyScalar( DRAG ).add( this.position );
	newPos.add( this.a.multiplyScalar( timesq ) );

	this.tmp = this.previous;
	this.previous = this.position;
	this.position = newPos;

	this.a.set( 0, 0, 0 );

};


var diff = new Vector3();

function satisifyConstrains( p1, p2, distance ) {

	diff.subVectors( p2.position, p1.position );
	var currentDist = diff.length();
	if ( currentDist == 0 ) return; // prevents division by 0
	var correction = diff.multiplyScalar( 1 - distance / currentDist );
	var correctionHalf = correction.multiplyScalar( 0.5 );
	p1.position.add( correctionHalf );
	p2.position.sub( correctionHalf );

}


function Cloth( w, h ) {

	w = w || 10;
	h = h || 10;
	this.w = w;
	this.h = h;

	var particles = [];
	var constrains = [];

	var u, v;

	// Create particles
	for ( v = 0; v <= h; v ++ ) {

		for ( u = 0; u <= w; u ++ ) {

			particles.push(
				new Particle( u / w, v / h, 0, MASS )
			);

		}

	}

	// Structural

	for ( v = 0; v < h; v ++ ) {

		for ( u = 0; u < w; u ++ ) {

			constrains.push( [
				particles[ index( u, v ) ],
				particles[ index( u, v + 1 ) ],
				restDistance
			] );

			constrains.push( [
				particles[ index( u, v ) ],
				particles[ index( u + 1, v ) ],
				restDistance
			] );

		}

	}

	for ( u = w, v = 0; v < h; v ++ ) {

		constrains.push( [
			particles[ index( u, v ) ],
			particles[ index( u, v + 1 ) ],
			restDistance

		] );

	}

	for ( v = h, u = 0; u < w; u ++ ) {

		constrains.push( [
			particles[ index( u, v ) ],
			particles[ index( u + 1, v ) ],
			restDistance
		] );

	}


	// While many system uses shear and bend springs,
	// the relax constrains model seem to be just fine
	// using structural springs.
	// Shear
	// var diagonalDist = Math.sqrt(restDistance * restDistance * 2);


	// for (v=0;v<h;v++) {
	// 	for (u=0;u<w;u++) {

	// 		constrains.push([
	// 			particles[index(u, v)],
	// 			particles[index(u+1, v+1)],
	// 			diagonalDist
	// 		]);

	// 		constrains.push([
	// 			particles[index(u+1, v)],
	// 			particles[index(u, v+1)],
	// 			diagonalDist
	// 		]);

	// 	}
	// }


	this.particles = particles;
	this.constrains = constrains;

	function index( u, v ) {

		return u + v * ( w + 1 );

	}

	this.index = index;

}

function simulate( time ) {

	if ( ! lastTime ) {

		lastTime = time;
		return;

	}
	
	var i, il, particles, particle, pt, constrains, constrain;

	// Aerodynamics forces
	if ( wind ) {

		var face, faces = clothGeometry.faces, normal;

		particles = cloth.particles;

		for ( i = 0, il = faces.length; i < il; i ++ ) {

			face = faces[ i ];
			normal = face.normal;

			tmpForce.copy( normal ).normalize().multiplyScalar( normal.dot( windForce ) );
			particles[ face.a ].addForce( tmpForce );
			particles[ face.b ].addForce( tmpForce );
			particles[ face.c ].addForce( tmpForce );

		}

	}
	
	for ( particles = cloth.particles, i = 0, il = particles.length
			; i < il; i ++ ) {

		particle = particles[ i ];
		particle.addForce( gravity );

		particle.integrate( TIMESTEP_SQ );

	}

	// Start Constrains

	constrains = cloth.constrains,
	il = constrains.length;
	for ( i = 0; i < il; i ++ ) {

		constrain = constrains[ i ];
		satisifyConstrains( constrain[ 0 ], constrain[ 1 ], constrain[ 2 ] );

	}

	// Ball Constrains


	ballPosition.z = - Math.sin( Date.now() / 600 ) * 90 ; //+ 40;
	ballPosition.x = Math.cos( Date.now() / 400 ) * 70;

	if ( sphere.visible )
	for ( particles = cloth.particles, i = 0, il = particles.length
			; i < il; i ++ ) {

		particle = particles[ i ];
		var pos = particle.position;
		diff.subVectors( pos, ballPosition );
		if ( diff.length() < ballSize ) {

			// collided
			diff.normalize().multiplyScalar( ballSize );
			pos.copy( ballPosition ).add( diff );

		}

	}

	// Floor Constains
	for ( particles = cloth.particles, i = 0, il = particles.length
			; i < il; i ++ ) {

		particle = particles[ i ];
		pos = particle.position;
		if ( pos.y < - 250 ) {

			pos.y = - 250;

		}

	}

	// Pin Constrains
	for ( i = 0, il = pins.length; i < il; i ++ ) {

		var xy = pins[ i ];
		var p = particles[ xy ];
		p.position.copy( p.original );
		p.previous.copy( p.original );

	}


}
var pinsFormation = [];
var pins = [6];

pinsFormation.push( pins );

pins = [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ];
pinsFormation.push( pins );

pins = [ 0 ];
pinsFormation.push( pins );

pins = []; // cut the rope ;)
pinsFormation.push( pins );

pins = [ 0, cloth.w ]; // classic 2 pins
pinsFormation.push( pins );

pins = pinsFormation[ 1 ];


function togglePins() {

  pins = pinsFormation[ ~~( Math.random() * pinsFormation.length ) ];

}

var container;
var camera, scene, renderer;

var clothGeometry;
var sphere;
var scene;
var object;

var rotate = true;

function init() {

  container = document.createElement( 'div' );
  document.body.appendChild( container );

  // scene

  scene = new Scene();
  scene.fog = new Fog( 0xcce0ff, 500, 10000 );

  // camera

  camera = new PerspectiveCamera( 30, window.innerWidth / window.innerHeight, 1, 10000 );
  camera.position.y = 50;
  camera.position.z = 1500;
  scene.add( camera );

  // lights

  var light, materials;

  scene.add( new AmbientLight( 0x666666 ) );

  light = new DirectionalLight( 0xdfebff, 1.75 );
  light.position.set( 50, 200, 100 );
  light.position.multiplyScalar( 1.3 );

  light.castShadow = true;
  // light.shadowCameraVisible = true;

  light.shadowMapWidth = 1024;
  light.shadowMapHeight = 1024;

  var d = 300;

  light.shadowCameraLeft = -d;
  light.shadowCameraRight = d;
  light.shadowCameraTop = d;
  light.shadowCameraBottom = -d;

  light.shadowCameraFar = 1000;

  scene.add( light );

  // cloth material


  var loader = new TextureLoader();
  var clothTexture = loader.load( '../textures/patterns/circuit_pattern.png' );
  clothTexture.wrapS = clothTexture.wrapT = Default.RepeatWrapping;
  clothTexture.anisotropy = 16;

  var clothMaterial = new MeshPhongMaterial( {
    specular: 0x030303,
    map: clothTexture,
    side: Default.DoubleSide,
    alphaTest: 0.5
  } );

  // cloth geometry
  clothGeometry = new ParametricGeometry( clothFunction, cloth.w, cloth.h );
  clothGeometry.dynamic = true;

  var uniforms = { texture:  { type: "t", value: clothTexture } };
  var vertexShader = document.getElementById( 'vertexShaderDepth' ).textContent;
  var fragmentShader = document.getElementById( 'fragmentShaderDepth' ).textContent;

  // cloth mesh

  object = new Mesh( clothGeometry, clothMaterial );
  object.position.set( 0, 0, 0 );
  object.castShadow = true;
  scene.add( object );

  object.customDepthMaterial = new ShaderMaterial( {
    uniforms: uniforms,
    vertexShader: vertexShader,
    fragmentShader: fragmentShader,
    side: Default.DoubleSide
  } );

  // sphere

  var ballGeo = new SphereGeometry( ballSize, 20, 20 );
  var ballMaterial = new MeshPhongMaterial( { color: 0xaaaaaa } );

  sphere = new Mesh( ballGeo, ballMaterial );
  sphere.castShadow = true;
  sphere.receiveShadow = true;
  scene.add( sphere );

  // ground

  var groundTexture = loader.load( "../textures/terrain/grasslight-big.jpg" );
  groundTexture.wrapS = groundTexture.wrapT = Default.RepeatWrapping;
  groundTexture.repeat.set( 25, 25 );
  groundTexture.anisotropy = 16;

  var groundMaterial = new MeshPhongMaterial( { color: 0xffffff, specular: 0x111111, map: groundTexture } );

  var mesh = new Mesh( new PlaneBufferGeometry( 20000, 20000 ), groundMaterial );
  mesh.position.y = -250;
  mesh.rotation.x = - Math.PI / 2;
  mesh.receiveShadow = true;
  scene.add( mesh );

  // poles

  var poleGeo = new BoxGeometry( 5, 375, 5 );
  var poleMat = new MeshPhongMaterial( { color: 0xffffff, specular: 0x111111, shininess: 100 } );

  var mesh = new Mesh( poleGeo, poleMat );
  mesh.position.x = -125;
  mesh.position.y = -62;
  mesh.receiveShadow = true;
  mesh.castShadow = true;
  scene.add( mesh );

  var mesh = new Mesh( poleGeo, poleMat );
  mesh.position.x = 125;
  mesh.position.y = -62;
  mesh.receiveShadow = true;
  mesh.castShadow = true;
  scene.add( mesh );

  var mesh = new Mesh( new BoxGeometry( 255, 5, 5 ), poleMat );
  mesh.position.y = -250 + 750/2;
  mesh.position.x = 0;
  mesh.receiveShadow = true;
  mesh.castShadow = true;
  scene.add( mesh );

  var gg = new BoxGeometry( 10, 10, 10 );
  var mesh = new Mesh( gg, poleMat );
  mesh.position.y = -250;
  mesh.position.x = 125;
  mesh.receiveShadow = true;
  mesh.castShadow = true;
  scene.add( mesh );

  var mesh = new Mesh( gg, poleMat );
  mesh.position.y = -250;
  mesh.position.x = -125;
  mesh.receiveShadow = true;
  mesh.castShadow = true;
  scene.add( mesh );

  //

  renderer = new WebGLRenderer( { antialias: true } );
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( window.innerWidth, window.innerHeight );
  renderer.setClearColor( scene.fog.color );

  container.appendChild( renderer.domElement );

  renderer.gammaInput = true;
  renderer.gammaOutput = true;

  renderer.shadowMap.enabled = true;

  //

  //

  window.addEventListener( 'resize', onWindowResize, false );

  sphere.visible = !true

}

//

function onWindowResize() {

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize( window.innerWidth, window.innerHeight );

}

//

function animate() {

  requestAnimationFrame( animate );

  var time = Date.now();

  windStrength = Math.cos( time / 7000 ) * 20 + 40;
  windForce.set( Math.sin( time / 2000 ), Math.cos( time / 3000 ), Math.sin( time / 1000 ) ).normalize().multiplyScalar( windStrength );

  simulate(time);
  render();

}

function render() {

  var timer = Date.now() * 0.0002;

  var p = cloth.particles;

  for ( var i = 0, il = p.length; i < il; i ++ ) {

    clothGeometry.vertices[ i ].copy( p[ i ].position );

  }

  clothGeometry.computeFaceNormals();
  clothGeometry.computeVertexNormals();

  clothGeometry.normalsNeedUpdate = true;
  clothGeometry.verticesNeedUpdate = true;

  sphere.position.copy( ballPosition );

  if ( rotate ) {

    camera.position.x = Math.cos( timer ) * 1500;
    camera.position.z = Math.sin( timer ) * 1500;

  }

  camera.lookAt( scene.position );

  renderer.render( scene, camera );

}

init();
animate();

