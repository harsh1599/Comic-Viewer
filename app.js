var express = require("express");
var app = express();
var mongoose = require("mongoose");
var seed = require("./seeds");
var Comic = require("./models/comic");
mongoose.connect("mongodb://localhost/comicdb", {useNewUrlParser:true});
//seed();
app.set("view engine", "ejs");
app.use(express.static("public"));
app.get("/", function(req, res){
	Comic.find({},function(err, comics){
		if(err){
			console.log(err);
		} else {
			res.render("home", {comics:comics});
		}
	});
})
app.get("/comics/:id", function(req, res){
	Comic.findOne({_id:req.params.id}).populate({path:"pages",populate:{path:"images"}}).exec(function(err, comic){
		res.render("page", {comic:comic});
	})
});
app.listen(3000,function(req, res){
	console.log("The server's running");
})