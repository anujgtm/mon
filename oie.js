function highlight(obj,num){
	$(".slider-text").eq(num).find("span").removeClass("slider-highlight");
	if(obj>0)$(".slider-text").eq(num).find("span:eq("+obj+")").addClass("slider-highlight");
}


window.addEventListener('load',function(){
    
    let mark = "";
    if ($(".completed-ca_option1")) {
        mark = "ca_option1";
    }
    else if($(".completed-ca_option2")) {
        mark = "ca_option2";
    }
    else if($(".completed-ca_option3")) {
        mark = "ca_option3";
    }
    
    var transOptions = localStorage.getItem("options");
    if (mark!="") {
        if (transOptions != null && transOptions != "") {
            var transJson = JSON.parse(transOptions);
            transJson[mark] = "yes";
            localStorage.setItem("options",JSON.stringify(transJson)); 
        } else {
            var transJson = { mark: "yes" };
            localStorage.setItem("options",JSON.stringify(transJson)); 
        }
    }
    
});

// Set tick for options page
// <script type="text/javascript">// <![CDATA[
// var transOptions = localStorage.getItem("options");
//   if (transOptions != null && transOptions != "") {
//     var transJson = JSON.parse(transOptions);
//     transJson.ca_option1 = "yes";
//     localStorage.setItem("options",JSON.stringify(transJson)); 
//   } else {
//     var transJson = { "ca_option1": "yes" };
//     localStorage.setItem("options",JSON.stringify(transJson)); 
//   }
// // ]]></script>