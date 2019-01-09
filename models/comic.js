var mongoose = require("mongoose");
var Page = require("./page");
var comicSchema = mongoose.Schema({
	title:String,
	pages:[
		{
			type:mongoose.Schema.Types.ObjectId,
			ref:"Page"
		}
	]
});
module.exports = mongoose.model("Comic", comicSchema);