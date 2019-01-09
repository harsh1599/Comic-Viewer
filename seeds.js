var mongoose = require("mongoose");
var arr = 
[
	{
		title:"title one",
		image:"/images/image1.jpeg"
	},
	{
		title:"title two",
		image:"/images/image2.jpeg"
	},
	{
		title:"title three",
		image:"/images/image3.jpeg"
	},
	{
		title:"title four",
		image:"/images/image4.jpeg"
	}
];
var Comic = require("./models/comic");
var Page = require("./models/page");
var Image = require("./models/images");
module.exports=function(){	
 	Comic.remove({}, function(err){
		if(err){
			console.log(err);
		} else {
			Comic.create({title:"First Comic"}, function(err, comic){
				if(err){
					console.log(err);
				} else {
					arr.forEach(function(element){
						Image.create({imagePath:element.image}, function(err, image){
							if(err){
								console.log(err);
							} else {
								Page.create({text:element.title}, function(err,page){
									if(err){
										console.log(err);
									} else {
										page.images.push(image);
										page.save();
									}
								});	
							}
						});
					});	
					Page.find({}, function(err,pages){
						if(err){
							console.log(err); 
						} else {
							comic.pages = pages;
							comic.save();
						}
					});
				}
			})
		}
	});
}
