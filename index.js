// AM: does the file need to exist?
// cache pre-existing global values
var globals = ['d3'],
	globalValues = {};

globals.forEach(function (g) {
	if (g in global) globalValues[g] = global[g];
});

// ensure availability of d3 in global namespace
// eslint-disable-next-line no-undef
d3 = require('d3');

// load and export vega
// eslint-disable-next-line @typescript-eslint/no-require-imports
require('./idl');
// eslint-disable-next-line no-undef
module.exports = idl;

// restore pre-existing global values
globals.forEach(function (g) {
	if (g in globalValues) global[g] = globalValues[g];
	else delete global[g];
});
