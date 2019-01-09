var mongoose = require("mongoose");
var imageSchema = new mongoose.Schema({
	imagePath:String
});
module.exports = mongoose.model("Image", imageSchema);