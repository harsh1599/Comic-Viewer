var replyForm = document.querySelector("#form");
var expandReply = document.querySelector("#expandReply");
expandReply.addEventListener("click", function(){
	console.log("This button was clicked");
	replyForm.style.display = "block";
	expandReply.style.display = "none";
});