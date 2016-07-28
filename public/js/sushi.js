$(document).ready(function(){

    var page_height = 1217;

    // Grab all list elements
    var list_elements = $("div.sushi-content > ol > li");

    // Start a count of how many elements we've rendered on this page
	var rendered_elements = 0;

    // Start a count of how many pages we've rendered
	var page_number = 1;

    // Get the header
	var header = $("div.master > div.sushi-card-title");

    // Get the height of the header
	var header_height = $(header).outerHeight();

    // While there are still list items to add to the page, do so
    while(list_elements.length > 0){

        // Log that we've started
        console.log("Creating Sushi Card page "+page_number);

        // Create a new page to work on

        // If it's not the first page
        if(page_number > 1){
            // Append the new page div after the previous page div
            $("#page-"+(page_number-1)).after("<div class='page' id='page-"+page_number+"'></div>");
        }

        // If it is the first page
        else{
            // Append a new page div immediately after the master
			$(".master").after("<div class='page' id='page-"+page_number+"'></div>");
        }

        // Get the page we're working on
		var new_page = $("#page-"+page_number);

        // Add the header
        $(new_page).append($(header).clone());

        console.log("Header added");

        // Track how much space have left on this page
		var remaining_page_space = page_height - header_height;

        var can_fit_next_element = true;

        var elements_on_page = 0;

        var oversize_element = false;

        // Add a list
		$(new_page).append("<div class='sushi-card-body'><ol id='page-"+page_number+"-list'></ol></div>");

        console.log("OL Created");

        // Select the list
        var new_list  = $("#page-"+page_number+"-list");
        // Reset the list counter
        $(new_list).css("counter-reset","step-num-counter "+rendered_elements);

        // Add list elements
		while(can_fit_next_element === true){
			console.log("Trying to add Element to page");
			var element_height = $(list_elements[0]).outerHeight();
			console.log("Element is "+element_height+" px high");



			if(element_height <= remaining_page_space && element_height != null){
				console.log("Adding element to page");
				$(new_list).append(list_elements[0]);
				elements_on_page += 1;
				rendered_elements += 1;
				remaining_page_space -= element_height;
				console.log("Remaining page space: "+remaining_page_space);
				list_elements = $("div.sushi-content > ol > li");
			}
            else if(elements_on_page === 0){
                //Yeah, yeah DRY
                console.log("Adding element to page");
                $(new_list).append(list_elements[0]);
                elements_on_page += 1;
                rendered_elements += 1;
                remaining_page_space -= element_height;
                console.log("Remaining page space: "+remaining_page_space);
                list_elements = $("div.sushi-content > ol > li");
                oversize_element = true;
            }
			else{
				can_fit_next_element = false;
				console.log("Element will not fit");
			}
		}

        console.log("Incrementing page number");
		page_number += 1;

        // Get us out if something just won't fit
		if(page_number > 10) break;

    }

	$("div.master").remove();

    if(page_number  > 3){
        alert("You have too many pages in your sushi card! Try shortening it, or splitting it into two cards.");
    }


    if(oversize_element === true){
        alert("Some of your list items are too long!");
    }

});

$(window).load(function(){
    console.log("Starting highlights");
    $('pre code').each(function(i, block) {
      hljs.highlightBlock(block);
    });
});
