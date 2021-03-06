/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
var ModuleDependency = require("./ModuleDependency");

function PrefetchDependency(request) {
	ModuleDependency.call(this, request);
	this.Class = PrefetchDependency;
}
module.exports = PrefetchDependency;

PrefetchDependency.prototype = Object.create(ModuleDependency.prototype);
PrefetchDependency.prototype.type = "prefetch";
