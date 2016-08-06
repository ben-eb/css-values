import isCaseInsensitiveKeyword from './isCaseInsensitiveKeyword';

export const blendValues = [
	'normal',
	'multiply',
	'screen',
	'overlay',
	'darken',
	'lighten',
	'color-dodge',
	'color-burn',
	'hard-light',
	'soft-light',
	'difference',
	'exclusion',
	'hue',
	'saturation',
	'color',
	'luminosity'
];

export default node => isCaseInsensitiveKeyword(node, blendValues);

export const type = 'node';