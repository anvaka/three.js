/**************************************************************
 *	Spline 3D curve
 **************************************************************/

var CurveUtils = require('../CurveUtils.js');
var Curve = require('../core/Curve.js');
var Vector3 = require('../../math/Vector3.js');

module.exports = Curve.create(

	function ( points /* array of Vector3 */ ) {

		console.warn( 'THREE.SplineCurve3 will be deprecated. Please use THREE.CatmullRomCurve3' );
		this.points = ( points == undefined ) ? [] : points;

	},

	function ( t ) {

		var points = this.points;
		var point = ( points.length - 1 ) * t;

		var intPoint = Math.floor( point );
		var weight = point - intPoint;

		var point0 = points[ intPoint == 0 ? intPoint : intPoint - 1 ];
		var point1 = points[ intPoint ];
		var point2 = points[ intPoint > points.length - 2 ? points.length - 1 : intPoint + 1 ];
		var point3 = points[ intPoint > points.length - 3 ? points.length - 1 : intPoint + 2 ];

		var interpolate = CurveUtils.interpolate;

		return new Vector3(
			interpolate( point0.x, point1.x, point2.x, point3.x, weight ),
			interpolate( point0.y, point1.y, point2.y, point3.y, weight ),
			interpolate( point0.z, point1.z, point2.z, point3.z, weight )
		);

	}

);
