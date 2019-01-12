var mongoose = require("mongoose");
var Page = require("./page");
var Comment = require("./comments");
var comicSchema = mongoose.Schema({
	title:String,
	pages:[
		{
			type:mongoose.Schema.Types.ObjectId,
			ref:"Page"
		}
	],
	comments:[
		{
			type:mongoose.Schema.Types.ObjectId,
			ref:"Comment"
		}
	]
});
module.exports = mongoose.model("Comic", comicSchema);