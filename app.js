var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var multer = require('multer');
var path = require("path");
var seed = require("./seeds")
var mongoose = require("mongoose");
var Comic = require("./models/comic");
var Page = require("./models/page");
var tmpStorage = [];
var title ="";
var storage = multer.diskStorage({
	destination:'./public/images/',
	filename:function(req, file, cb){
		cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
	}
});
var upload = multer({
	storage:storage
}).single("myImage");
mongoose.connect("mongodb://localhost/comicdb", {useNewUrlParser:true});
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.get("/", function(req, res){
	Comic.find({},function(err, comics){
		if(err){
			console.log(err);
		} else {
			res.render("home", {comics:comics});
		}
	});
})
app.get("/comics/create/new", function(req, res){
	res.render("new");
});
app.get("/comics/create", function(req, res){
	res.render("create");
})
app.get("/comics/tmp", function(req, res){
	Comic.create(
	{
		title:title
	},
	function(err,comic){
		if(err){
			console.log(err);
		} else {
			Page.find({title:title}, function(err, pages){
				comic.pages = pages;
				comic.save();
				title = "";
				res.redirect("/");
			});
		}
	})
});
app.get("/comics/:id", function(req, res){
	Comic.findOne({_id:req.params.id}).populate({path:"pages",populate:{path:"images"}}).exec(function(err, comic){
		res.render("page", {comic:comic});
	})
});

app.post("/comics/new", function(req, res){
	upload(req, res, (err)=>{
		if(err){
			console.log(err);
		} else {
			Page.create(
				{
					title:title,
					text:req.body.textarea,
					image:"/images/"+req.file.filename
				},
				function(err, page){
					if(err){
						console.log(err);
					}
				}
			);
		}
	});
	res.redirect("/comics/create/new");
});
app.post("/comics/create",function(req, res){
	title = req.body.title;
	res.redirect("/comics/create/new");
});
app.listen(3000,function(req, res){
	console.log("The server's running");
})