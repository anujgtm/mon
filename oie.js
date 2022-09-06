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


    // Sortable Drag Drop
    if($(".sortable-list").length > 0) {
        sortable('.sortable-list', {
            forcePlaceholderSize: true,
            placeholderClass: 'mb1 bg-navy border border-yellow',
            hoverClass: 'bg-maroon yellow',
            itemSerializer: function (item, container) {
                item.parent = '[parentNode]'
                item.node = '[Node]'
                item.html = item.html.replace('<','&lt;')
                return item
            },
            containerSerializer: function (container) {
                container.node = '[Node]'
                console.log(container);
                return container
            }
        })
        let sortableList = document.querySelector('.sortable-list');
        let buttonS = document.querySelector('.drag-drop-submit'); 
        let buttonR = document.querySelector('.retry-sort-button');
        let feedback = document.querySelector('.feedback');

        // Sort start EventListener
        sortable('.sortable-list')[0].addEventListener('sortstart', function(e) {
            buttonS.disabled = false;
        });

        // Randomize List
        randomizeList();
    }

    // Function to randomize List items
    function randomizeList() {
        for (var i = sortableList.children.length; i >= 0; i--) {
            sortableList.appendChild(sortableList.children[Math.random() * i | 0]);
        }
    }


    // Submit EventListener
    document.querySelector('.drag-drop-submit').addEventListener('click', function () {
        // console.log("No option is incorrect!");
        // let error = document.createElement("p");
        // error.innerHTML = "No option is incorrect!";
        this.disabled = true;
        buttonR.disabled = false;
        buttonS.classList.toggle('hid');
        buttonR.classList.toggle('hid');
        sortable(".sortable-list", "disable");
        feedback.classList.toggle('hid');
    });

    // Retry EventListener
    document.querySelector('.retry-sort-button').addEventListener('click', function () {
        buttonR.disabled = true;
        sortable(".sortable-list", "enable");
        feedback.classList.toggle('hid');
        buttonS.classList.toggle('hid');
        buttonR.classList.toggle('hid');
        randomizeList();
    });

    


    
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