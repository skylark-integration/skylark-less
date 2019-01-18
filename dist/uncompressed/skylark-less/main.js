define([
	"./less",
	"./engine/index",
	"./browser/index"
],function(less,engine){
	less.engine = engine;
	return less;
});