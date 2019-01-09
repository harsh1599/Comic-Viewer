var content = document.querySelectorAll(".myImage");
var buttonLeft = document.querySelector("#buttonLeft");
var buttonRight = document.querySelector("#buttonRight");
var check = 1 ;
var showDivs = function(n){
	content.forEach(function(element){
		element.style.display = "none";
	});
	check+=n;
	if(check>content.length){
		check=1;
	} else if(check<1){
		check = content.length();
	}
	content[check-1].style.display = "block";
}
buttonLeft.addEventListener("click", function(){
	console.log("left button was clicked");
});
buttonRight.addEventListener("click", function(){
	console.log("right button was clicked");
});