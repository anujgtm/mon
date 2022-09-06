function highlight(obj,num){
	$(".slider-text").eq(num).find("span").removeClass("slider-highlight");
	if(obj>0)$(".slider-text").eq(num).find("span:eq("+obj+")").addClass("slider-highlight");
}