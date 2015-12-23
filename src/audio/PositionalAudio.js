/**
 * @author mrdoob / http://mrdoob.com/
 */

module.exports = PositionalAudio;

var Audio = require('./Audio.js');
var Vector3 = require('../math/Vector3.js');
var Object3D = require('../core/Object3D.js');

function PositionalAudio( listener ) {

	Audio.call( this, listener );

	this.panner = this.context.createPanner();
	this.panner.connect( this.gain );

};

PositionalAudio.prototype = Object.create( Audio.prototype );
PositionalAudio.prototype.constructor = PositionalAudio;

PositionalAudio.prototype.getOutput = function () {

	return this.panner;

};

PositionalAudio.prototype.setRefDistance = function ( value ) {

	this.panner.refDistance = value;

};

PositionalAudio.prototype.getRefDistance = function () {

	return this.panner.refDistance;

};

PositionalAudio.prototype.setRolloffFactor = function ( value ) {

	this.panner.rolloffFactor = value;

};

PositionalAudio.prototype.getRolloffFactor = function () {

	return this.panner.rolloffFactor;

};

PositionalAudio.prototype.setDistanceModel = function ( value ) {

	this.panner.distanceModel = value;

};

PositionalAudio.prototype.getDistanceModel = function () {

	return this.panner.distanceModel;

};

PositionalAudio.prototype.setMaxDistance = function ( value ) {

	this.panner.maxDistance = value;

};

PositionalAudio.prototype.getMaxDistance = function () {

	return this.panner.maxDistance;

};

PositionalAudio.prototype.updateMatrixWorld = ( function () {

	var position = new Vector3();

	return function updateMatrixWorld( force ) {

		Object3D.prototype.updateMatrixWorld.call( this, force );

		position.setFromMatrixPosition( this.matrixWorld );

		this.panner.setPosition( position.x, position.y, position.z );

	};

} )();
