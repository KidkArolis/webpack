/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
var ModuleDependency = require("./ModuleDependency");

function LabeledModuleDependency(request, range) {
	ModuleDependency.call(this, request);
	this.Class = LabeledModuleDependency;
	this.range = range;
}
module.exports = LabeledModuleDependency;

LabeledModuleDependency.prototype = Object.create(ModuleDependency.prototype);
LabeledModuleDependency.prototype.type = "labeled require";

LabeledModuleDependency.Template = function LabeledModuleDependencyTemplate() {};

LabeledModuleDependency.Template.prototype.apply = function(dep, source, outputOptions, requestShortener) {
	var comment = "";
	if(outputOptions.pathinfo) comment = "/*! " + requestShortener.shorten(dep.request) + " */ ";
	if(dep.module && dep.module.meta && dep.module.meta.exports) {
		var content = "var __WEBPACK_LABELED_MODULE__" + dep.module.id + " = require(" + comment + dep.module.id + ")";
		dep.module.meta.exports.forEach(function(e) {
			content += ", " + e + " = __WEBPACK_LABELED_MODULE__" + dep.module.id + "." + e;
		});
		content += ";"
	} else if(dep.module) {
		var content = "!(function webpackMissingModuleMetaInfo() { throw new Error(" + JSON.stringify("Module cannot be imported because no meta info about exports is availible \"" + dep.request + "\"") + "); }())";
	} else {
		var content = "!(function webpackMissingModule() { throw new Error(" + JSON.stringify("Cannot find module \"" + dep.request + "\"") + "); }())";
	}
	source.replace(dep.range[0], dep.range[1]-1, content);
};