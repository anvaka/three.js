/**
 *
 * A Track of quaternion keyframe values.
 *
 * @author Ben Houston / http://clara.io/
 * @author David Sarno / http://lighthaus.us/
 * @author tschw
 */

module.exports = QuaternionKeyframeTrack;

var KeyframeTrack = require('../KeyframeTrack.js');
var Default = require('../../defaults.js');
var QuaternionLinearInterpolant = require('../../math/interpolants/QuaternionLinearInterpolant.js');

function QuaternionKeyframeTrack( name, times, values, interpolation ) {

	KeyframeTrack.call( this, name, times, values, interpolation );

};

QuaternionKeyframeTrack.prototype = Object.assign( Object.create( KeyframeTrack.prototype ), {

	constructor: QuaternionKeyframeTrack,

	ValueTypeName: 'quaternion',

	// ValueBufferType is inherited

	DefaultInterpolation: Default.InterpolateLinear,

	InterpolantFactoryMethodLinear: function( result ) {

		return new QuaternionLinearInterpolant(
				this.times, this.values, this.getValueSize(), result );

	},

	InterpolantFactoryMethodSmooth: undefined // not yet implemented

} );
