/**
 *
 * Interpolant that evaluates to the sample value at the position preceeding
 * the parameter.
 *
 * @author tschw
 */
module.exports = DiscreteInterpolant;

var Interpolant = require('../Interpolant.js');

function DiscreteInterpolant(
		parameterPositions, sampleValues, sampleSize, resultBuffer ) {

	Interpolant.call(
			this, parameterPositions, sampleValues, sampleSize, resultBuffer );

};

var DiscreteInterpolantPrototype = {

	constructor: DiscreteInterpolant,

	interpolate_: function( i1, t0, t, t1 ) {

		return this.copySampleValue_( i1 - 1 );

	}

}

DiscreteInterpolant.prototype =
		Object.assign( Object.create( Interpolant.prototype ), DiscreteInterpolantPrototype );
