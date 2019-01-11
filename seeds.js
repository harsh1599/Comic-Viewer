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
						Page.create({text:element.title,image:element.image}, function(err,page){
							if(err){
								console.log(err);
							}
						});	
					});
				}	
				Page.find({}, function(err,pages){
					if(err){
						console.log(err); 
					} else {
						comic.pages = pages;
						comic.save();
					}
				});
			})
		}
	});
}
