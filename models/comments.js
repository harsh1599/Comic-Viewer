var mongoose = require('mongoose');
var commentSchema = new mongoose.Schema({
	name:String,
	text:String,
	likes:Number,
	comments:[
		{
			type:mongoose.Schema.Types.ObjectId,
			ref:"Comment"
		}
	]
})
module.exports = mongoose.model("Comment", commentSchema);