var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var multer = require('multer');
var path = require("path");
var seed = require("./seeds")
var mongoose = require("mongoose");
var Comic = require("./models/comic");
var Page = require("./models/page");
var Comment = require("./models/comments");
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
	res.render("landing");
})
app.get("/comics", function(req, res){
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
	Comic.findOne({_id:req.params.id}).populate("pages").populate({path:"comments", populate:{path:"comments"}}).exec(function(err, comic){
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
app.post("/comics/:id/comments/new", function(req, res){
	if(req.body.comment!=''){
		Comment.create({
			name:"some_name",
			text:req.body.comment
		}, function(err, comment){
			if(err){
				console.log(err);
			} else {
				Comic.findById(req.params.id, function(err, comic){
					if(err){
						console.log(err);
					} else {
						comic.comments.push(comment);
						comic.save();
						res.redirect("/comics/"+req.params.id);
					}
				});	
			}
		})
	} 
});
app.post("/comics/:id1/comments/:id2/new", function(req, res){
	if(req.body.reply!=''){
		Comment.findById(req.params.id2, function(err, comment){
			if(err){
				console.log(err);
			} else {
				Comment.create({name:"some_name", text:req.body.reply}, function(err, innerComment){
					comment.comments.push(innerComment);
					comment.save();
					res.redirect("/comics/"+req.params.id1);
				})
			}
		});
	}
});
app.post("/comics/create",function(req, res){
	title = req.body.title+'-'+Date.now();
	res.redirect("/comics/create/new");
});
app.listen(3000,function(req, res){
	console.log("The server's running");
})