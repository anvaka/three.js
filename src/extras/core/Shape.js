/**
 * @author zz85 / http://www.lab4games.net/zz85/blog
 * Defines a 2d shape plane using paths.
 **/

// STEP 1 Create a path.
// STEP 2 Turn path into shape.
// STEP 3 ExtrudeGeometry takes in Shape/Shapes
// STEP 3a - Extract points from each shape, turn to vertices
// STEP 3b - Triangulate each shape, add faces.

module.exports = Shape;

var ShapeUtils = require('../ShapeUtils.js');
var Path = require('./Path.js');
var ExtrudeGeometry = require('../geometries/ExtrudeGeometry.js');
var ShapeGeometry = require('../geometries/ShapeGeometry.js');

function Shape() {

	Path.apply( this, arguments );

	this.holes = [];

};

Shape.prototype = Object.create( Path.prototype );
Shape.prototype.constructor = Shape;

// Convenience method to return ExtrudeGeometry

Shape.prototype.extrude = function ( options ) {

	return new ExtrudeGeometry( this, options );

};

// Convenience method to return ShapeGeometry

Shape.prototype.makeGeometry = function ( options ) {

	return new ShapeGeometry( this, options );

};

// Get points of holes

Shape.prototype.getPointsHoles = function ( divisions ) {

	var holesPts = [];

	for ( var i = 0, l = this.holes.length; i < l; i ++ ) {

		holesPts[ i ] = this.holes[ i ].getPoints( divisions );

	}

	return holesPts;

};


// Get points of shape and holes (keypoints based on segments parameter)

Shape.prototype.extractAllPoints = function ( divisions ) {

	return {

		shape: this.getPoints( divisions ),
		holes: this.getPointsHoles( divisions )

	};

};

Shape.prototype.extractPoints = function ( divisions ) {

	return this.extractAllPoints( divisions );

};

Shape.Utils = ShapeUtils; // backwards compatibility
