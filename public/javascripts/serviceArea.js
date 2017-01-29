//handles service area radio buttons
//$(document).ready(init);
$('#inline_content input[name="service_area"]').click(function() {
	console.log("In service area js");
	var payload = {};
	payload.name = "service_area";
	payload.appId = $('#appId').val();
	console.log(payload.appId);
	if($('input:radio[name=service_area]:checked').val() == "true") {
		console.log("true");
		payload.value = true;
		
	}
	else {
		payload.value = false;
	}
	
	//post to database
	
	 var posting = $.ajax({
        type : 'POST',
        url: "/vettingworksheet/servicearea",
        dataType: 'json',
        contentType: 'application/json; charset=UTF-8',
        data: JSON.stringify(payload)
    });
    posting.done(function (xhr) {
        if(xhr.status == 200) {
            //revert form into just text after success
           // note[0].innerHTML = notedDescrip;
            //revert buttonsby changing button value and class
           // updateButton.val("Update Note");
           // updateButton.attr("class", "update-button btn btn-info");
           // cancelButton.val("Delete Note");
           // cancelButton.attr("class", "delete-button btn btn-danger");
        }
        else{
            console.log("API did not return 200 status for service area");
        }
        // If code is not 200 forward below to .fail()
	
	});
	 posting.fail(function (data)
    {
        console.log("Ajax POST failed");
    });
});

/*function init() {
	$('service_buttons').on('click', serviceArea);
}*/


//when service area button is clicked, call function

/*function serviceArea(e) {
	//e.preventDefault();
	console.log("in service area function");
}
	/*var payload = {};
	payload.name = "service_area";
	if($("input:radio[name=service_area]:checked").val() == "true") {
		payload.value = true;
	}
	else {
		payload.value = false;
	}
	
	payload.applicationID = $('#appId').val();
	
	//post to database
	 var posting = $.ajax({
        type : 'POST',
        url: "/edit/:id",
        dataType: 'json',
        contentType: 'application/json; charset=UTF-8',
        data: JSON.stringify(payload)
    });
    posting.done(function (xhr) {
        if(xhr.status == 200) {
            //revert form into just text after success
           // note[0].innerHTML = notedDescrip;
            //revert buttonsby changing button value and class
           // updateButton.val("Update Note");
           // updateButton.attr("class", "update-button btn btn-info");
           // cancelButton.val("Delete Note");
           // cancelButton.attr("class", "delete-button btn btn-danger");
        }
        else{
            console.log("API did not return 200 status for service area");
        }
        // If code is not 200 forward below to .fail()
    });

    posting.fail(function (data)
    {
        console.log("Ajax POST failed");
    });
}*/