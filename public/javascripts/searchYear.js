$('#year_select select[name="year"]').change(function() {
	console.log("In search year js");
	var payload = {};
	
	console.log($('#displayYear').val());
	
	
	payload.year = $('#displayYear').val();
	
	var posting = $.ajax({
        type : 'POST',
        url: "/vettingworksheet/displayYear",
        dataType: 'json',
        contentType: 'application/json; charset=UTF-8',
        data: JSON.stringify(payload)
    });
    posting.done(function (xhr) {
        if(xhr.status == 200) {
           //success!
		   console.log("get success");
		   var getYear;
		   var getDay;
		   var getMon;
		   console.log(xhr.results.project);
		   $('#project_table tbody > tr').remove();
		   var content = "<tbody>"
		   for(x=0; x<xhr.results.project.length; x++){
			/* getYear = xhr.results.project[x].updated.getFullYear();
			//get month and day with padding since they are 0 indexed
			 getDay = ( "00" + xhr.results.project[x].updated.getDate()).slice(-2);
			 getMon = ("00" + (xhr.results.project[x].updated.getMonth()+1)).slice(-2);

            xhr.results.project[x].updated = getYear + "-" + getMon + "-" + getDay;*/
		   content += '<tr class="clickable-row" data-href="/view/' + xhr.results.project[x]._id +'">';
		   
		   content += '<td class="col-md-2"><a href="/view/' + xhr.results.project[x]._id + '">' + xhr.results.project[x].application.name.first + " " +
		   xhr.results.project[x].application.name.last + '</a></td><td class="col-md-2">' + xhr.results.project[x].updated + '</td><td class="col-md-2"><span class="text-danger">' 
		   + xhr.results.project[x].status + '</span></td><td class="col-md-2">' + xhr.results.project[x].signature.client_date + '</td><td class="col-md-2">' +
		   xhr.results.project[x].app_name + '</td></tr>';
		   }
		   content += '</tbody>';
		   $('#project_table').append(content);
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
	
/*	
	
	
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
           //success!
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
*/