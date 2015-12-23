/**
 *
 * A Track of keyframe values that represent color.
 *
 *
 * @author Ben Houston / http://clara.io/
 * @author David Sarno / http://lighthaus.us/
 * @author tschw
 */

module.exports = ColorKeyframeTrack;

var KeyframeTrack = require('../KeyframeTrack.js');

function ColorKeyframeTrack( name, times, values, interpolation ) {

  // TODO: there is no keys there:https://github.com/mrdoob/three.js/commit/2e5d9ef6b3fd42ca5b5f8074720b11c2ce0519ef#diff-43e1f5fad259d43550007e98e3820309R13
	KeyframeTrack.call( this, name, keys, interpolation );

};

ColorKeyframeTrack.prototype = Object.assign( Object.create( KeyframeTrack.prototype ), {

	constructor: ColorKeyframeTrack,

	ValueTypeName: 'color'

	// ValueBufferType is inherited

	// DefaultInterpolation is inherited


	// Note: Very basic implementation and nothing special yet.
	// However, this is the place for color space parameterization.

} );
