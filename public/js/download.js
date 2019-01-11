var add = document.querySelector("#Add");
var Comic = require("../../models/comic");
var Page = require("../../models/page");
add.addEventlistener("click", function(){
	console.log("add button was clicked");
	// Comic.create(
	// {

	// },function(err, comic){
	// 	Page.find({title:title},function(err, pages){
	// 		comic.pages = pages;
			
	// 	});
	// });
});