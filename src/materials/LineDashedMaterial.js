/**
 * @author alteredq / http://alteredqualia.com/
 *
 * parameters = {
 *  color: <hex>,
 *  opacity: <float>,
 *
 *  blending: THREE.NormalBlending,
 *  depthTest: <bool>,
 *  depthWrite: <bool>,
 *
 *  linewidth: <float>,
 *
 *  scale: <float>,
 *  dashSize: <float>,
 *  gapSize: <float>,
 *
 *  vertexColors: THREE.NoColors / THREE.FaceColors / THREE.VertexColors
 *
 *  fog: <bool>
 * }
 */
module.exports = LineDashedMaterial;

var Material = require('./Material.js');

var Color = require('../math/Color.js');
var Default = require('../defaults.js');

function LineDashedMaterial( parameters ) {

	Material.call( this );

	this.type = 'LineDashedMaterial';

	this.color = new Color( 0xffffff );

	this.linewidth = 1;

	this.scale = 1;
	this.dashSize = 3;
	this.gapSize = 1;

	this.vertexColors = Default.NoColors;

	this.fog = true;

	this.setValues( parameters );

};

LineDashedMaterial.prototype = Object.create( Material.prototype );
LineDashedMaterial.prototype.constructor = LineDashedMaterial;

LineDashedMaterial.prototype.copy = function ( source ) {

	Material.prototype.copy.call( this, source );

	this.color.copy( source.color );
	
	this.linewidth = source.linewidth;

	this.scale = source.scale;
	this.dashSize = source.dashSize;
	this.gapSize = source.gapSize;

	this.vertexColors = source.vertexColors;

	this.fog = source.fog;

	return this;

};
