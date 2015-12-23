/**************************************************************
 *	Quadratic Bezier 3D curve
 **************************************************************/

var ShapeUtils = require('../ShapeUtils.js');
var Curve = require('../core/Curve.js');
var Vector3 = require('../../math/Vector3.js');

module.exports = Curve.create(

	function ( v0, v1, v2 ) {

		this.v0 = v0;
		this.v1 = v1;
		this.v2 = v2;

	},

	function ( t ) {

		var b2 = ShapeUtils.b2;		

		return new Vector3(
			b2( t, this.v0.x, this.v1.x, this.v2.x ),
			b2( t, this.v0.y, this.v1.y, this.v2.y ),
			b2( t, this.v0.z, this.v1.z, this.v2.z )
		);

	}

);
