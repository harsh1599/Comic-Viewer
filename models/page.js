var mongoose = require("mongoose");
var Image = require("./images");
var pageSchema = new mongoose.Schema({
	images:	[
		{
			type: mongoose.Schema.Types.ObjectId,
			ref:"Image"
		}
	],
	text:String
});
var Page = mongoose.model("Page", pageSchema);
module.exports = Page;