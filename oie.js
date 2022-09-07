function highlight(obj,num){
	$(".slider-text").eq(num).find("span").removeClass("slider-highlight");
	if(obj>0)$(".slider-text").eq(num).find("span:eq("+obj+")").addClass("slider-highlight");
}


window.addEventListener('load',function(){
    let sortableList;
    let buttonS; 
    let buttonR;
    let feedback;
    let mark = "";
    if ($(".completed-ca_option1")) {
        mark = "ca_option1";
    }
    if($(".completed-ca_option2")) {
        mark = "ca_option2";
    }
    if($(".completed-ca_option3")) {
        mark = "ca_option3";
    }
    
    var transOptions = localStorage.getItem("options");
    if (mark!="") {
        if (transOptions != null && transOptions != "") {
            var transJson = JSON.parse(transOptions);
            console.log(transJson);
            console.log(mark);
            transJson[mark] = "yes";
            console.log(transJson);
            localStorage.setItem("options",JSON.stringify(transJson)); 
        } else {
            var transJson[mark] = "yes";
            localStorage.setItem("options",JSON.stringify(transJson)); 
        }
    }

    if($(".ca-options-screen").length > 0) {
        var transOptions = localStorage.getItem("options");
        var nodeOption1 = document.querySelector(".ca_option1");
        var nodeOption2 = document.querySelector(".ca_option2");
        var nodeOption3 = document.querySelector(".ca_option3");

        if (transOptions != null && transOptions != "") {
            var transJson = JSON.parse(transOptions);
            if(transJson.hasOwnProperty("ca_option1") && transJson.ca_option1 == "yes") {
            if(nodeOption1) { nodeOption1.classList.add("completed");}
            }
            if(transJson.hasOwnProperty("ca_option2") && transJson.ca_option2 == "yes") {
            if(nodeOption2) { nodeOption2.classList.add("completed");}
            }
            if(transJson.hasOwnProperty("ca_option3") && transJson.ca_option3 == "yes") {
            if(nodeOption3) { nodeOption3.classList.add("completed");}
            }
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
        sortableList = document.querySelector('.sortable-list');
        buttonS = document.querySelector('.drag-drop-submit'); 
        buttonR = document.querySelector('.retry-sort-button');
        feedback = document.querySelector('.feedback');

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
    if (document.querySelector('.drag-drop-submit')) {
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
    }

    // Retry EventListener
    if (document.querySelector('.retry-sort-button')) {
        document.querySelector('.retry-sort-button').addEventListener('click', function () {
            buttonR.disabled = true;
            sortable(".sortable-list", "enable");
            feedback.classList.toggle('hid');
            buttonS.classList.toggle('hid');
            buttonR.classList.toggle('hid');
            randomizeList();
        });
    }

    


    
});