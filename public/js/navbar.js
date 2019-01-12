var content = document.querySelectorAll(".myImage");
var paragraph = document.querySelectorAll(".comicContent");
var buttonLeft = document.querySelector("#buttonLeft");
var buttonRight = document.querySelector("#buttonRight");
var check = 1 ;
var showDivs = function(n){
	content.forEach(function(element){
		element.style.display = "none";
	});
	paragraph.forEach(function(el){
		el.style.display = "none";
	})
	check+=n;
	if(check>content.length){
		check=1;
	} else if(check<1){
		check = content.length();
	}
	paragraph[check-1].style.display = "block";
	content[check-1].style.display = "block";
}
buttonLeft.addEventListener("click", function(){
	console.log("left button was clicked");
});
buttonRight.addEventListener("click", function(){
	console.log("right button was clicked");
});