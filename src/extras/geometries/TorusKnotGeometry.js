/**
 * @author oosmoxiecode
 * based on http://code.google.com/p/away3d/source/browse/trunk/fp10/Away3D/src/away3d/primitives/TorusKnot.as?spec=svn2473&r=2473
 */

module.exports = TorusKnotGeometry;

var Geometry = require('../../core/Geometry.js');
var Face3 = require('../../core/Face3.js');
var Vector3 = require('../../math/Vector3.js');
var Vector2 = require('../../math/Vector2.js');

function TorusKnotGeometry( radius, tube, radialSegments, tubularSegments, p, q, heightScale ) {

	Geometry.call( this );

	this.type = 'TorusKnotGeometry';

	this.parameters = {
		radius: radius,
		tube: tube,
		radialSegments: radialSegments,
		tubularSegments: tubularSegments,
		p: p,
		q: q,
		heightScale: heightScale
	};

	radius = radius || 100;
	tube = tube || 40;
	radialSegments = radialSegments || 64;
	tubularSegments = tubularSegments || 8;
	p = p || 2;
	q = q || 3;
	heightScale = heightScale || 1;

	var grid = new Array( radialSegments );
	var tang = new Vector3();
	var n = new Vector3();
	var bitan = new Vector3();

	for ( var i = 0; i < radialSegments; ++ i ) {

		grid[ i ] = new Array( tubularSegments );
		var u = i / radialSegments * 2 * p * Math.PI;
		var p1 = getPos( u, q, p, radius, heightScale );
		var p2 = getPos( u + 0.01, q, p, radius, heightScale );
		tang.subVectors( p2, p1 );
		n.addVectors( p2, p1 );

		bitan.crossVectors( tang, n );
		n.crossVectors( bitan, tang );
		bitan.normalize();
		n.normalize();

		for ( var j = 0; j < tubularSegments; ++ j ) {

			var v = j / tubularSegments * 2 * Math.PI;
			var cx = - tube * Math.cos( v ); // TODO: Hack: Negating it so it faces outside.
			var cy = tube * Math.sin( v );

			var pos = new Vector3();
			pos.x = p1.x + cx * n.x + cy * bitan.x;
			pos.y = p1.y + cx * n.y + cy * bitan.y;
			pos.z = p1.z + cx * n.z + cy * bitan.z;

			grid[ i ][ j ] = this.vertices.push( pos ) - 1;

		}

	}

	for ( var i = 0; i < radialSegments; ++ i ) {

		for ( var j = 0; j < tubularSegments; ++ j ) {

			var ip = ( i + 1 ) % radialSegments;
			var jp = ( j + 1 ) % tubularSegments;

			var a = grid[ i ][ j ];
			var b = grid[ ip ][ j ];
			var c = grid[ ip ][ jp ];
			var d = grid[ i ][ jp ];

			var uva = new Vector2( i / radialSegments, j / tubularSegments );
			var uvb = new Vector2( ( i + 1 ) / radialSegments, j / tubularSegments );
			var uvc = new Vector2( ( i + 1 ) / radialSegments, ( j + 1 ) / tubularSegments );
			var uvd = new Vector2( i / radialSegments, ( j + 1 ) / tubularSegments );

			this.faces.push( new Face3( a, b, d ) );
			this.faceVertexUvs[ 0 ].push( [ uva, uvb, uvd ] );

			this.faces.push( new Face3( b, c, d ) );
			this.faceVertexUvs[ 0 ].push( [ uvb.clone(), uvc, uvd.clone() ] );

		}

	}

	this.computeFaceNormals();
	this.computeVertexNormals();

	function getPos( u, in_q, in_p, radius, heightScale ) {

		var cu = Math.cos( u );
		var su = Math.sin( u );
		var quOverP = in_q / in_p * u;
		var cs = Math.cos( quOverP );

		var tx = radius * ( 2 + cs ) * 0.5 * cu;
		var ty = radius * ( 2 + cs ) * su * 0.5;
		var tz = heightScale * radius * Math.sin( quOverP ) * 0.5;

		return new Vector3( tx, ty, tz );

	}

};

TorusKnotGeometry.prototype = Object.create( Geometry.prototype );
TorusKnotGeometry.prototype.constructor = TorusKnotGeometry;
