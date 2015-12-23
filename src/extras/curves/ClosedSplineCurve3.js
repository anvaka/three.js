/**************************************************************
 *	Closed Spline 3D curve
 **************************************************************/


module.exports = ClosedSplineCurve3;

var CatmullRomCurve3 = require('./CatmullRomCurve3');

function ClosedSplineCurve3( points ) {

	console.warn( 'THREE.ClosedSplineCurve3 has been deprecated. Please use THREE.CatmullRomCurve3.' );

	CatmullRomCurve3.call( this, points );
	this.type = 'catmullrom';
	this.closed = true;

};

ClosedSplineCurve3.prototype = Object.create( CatmullRomCurve3.prototype );
