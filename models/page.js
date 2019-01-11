var mongoose = require("mongoose");
var pageSchema = new mongoose.Schema({
	title:String,
	image:String,
	text:String
});
var Page = mongoose.model("Page", pageSchema);
module.exports = Page;