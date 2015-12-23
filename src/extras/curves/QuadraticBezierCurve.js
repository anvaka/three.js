/**************************************************************
 *	Quadratic Bezier curve
 **************************************************************/


module.exports = QuadraticBezierCurve;

var CurveUtils = require('../CurveUtils.js');
var ShapeUtils = require('../ShapeUtils.js');
var Curve = require('../core/Curve.js');
var Vector2 = require('../../math/Vector2.js');

function QuadraticBezierCurve( v0, v1, v2 ) {

	this.v0 = v0;
	this.v1 = v1;
	this.v2 = v2;

};

QuadraticBezierCurve.prototype = Object.create( Curve.prototype );
QuadraticBezierCurve.prototype.constructor = QuadraticBezierCurve;


QuadraticBezierCurve.prototype.getPoint = function ( t ) {

	var b2 = ShapeUtils.b2;

	return new Vector2(
		b2( t, this.v0.x, this.v1.x, this.v2.x ),
		b2( t, this.v0.y, this.v1.y, this.v2.y )
	);

};


QuadraticBezierCurve.prototype.getTangent = function( t ) {

	var tangentQuadraticBezier = CurveUtils.tangentQuadraticBezier;

	return new Vector2(
		tangentQuadraticBezier( t, this.v0.x, this.v1.x, this.v2.x ),
		tangentQuadraticBezier( t, this.v0.y, this.v1.y, this.v2.y )
	).normalize();

};
