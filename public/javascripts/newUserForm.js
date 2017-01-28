$(document).ready(init)

function init() {
	$('#userRegistration').submit(function (event) {
		event.preventDefault();
		var jsonToSend = getFormData($('#userRegistration'));  //stringified in that function
    debugger
    console.log(jsonToSend);

		//POST the data to the database
		// var posting = $.ajax({
		// 	type : 'POST',
		// 	url: "/application/add",
		// 	dataType: 'json',
		// 	contentType: 'application/json; charset=UTF-8',
		// 	data: jsonToSend
		// });
		//
		//upon return, check for 200, then redirect so success page
		// posting.done(function (xhr) {
		// 	if(xhr.status == 200) {
		// 		window.location.replace("/application/success");
		// 	}
		// 	else{
		// 		console.log("Whoops, something went wrong");
		// 	}
		// 	// If code is not 200 forward below to .fail()
		// });
		//
		// posting.fail(function (data)
		// {
		// 	console.log("Whoops, something went wrong");
		// 	// The save failed, just do nothing and leave the form without losing their typed data
		// });
	});

  function getFormData(form) {
    let formData = {}
    let inputFields = $('input', form)
    inputFields.each(function(idx) {
			let objectType = this.type
      let objectPath = this.name
      let objectPieces = objectPath.split('.')
      let currentObjectPlace = formData
      objectPieces.forEach((p, i) => {
        if (i < (objectPieces.length-1)) {
          if (!currentObjectPlace[p]) currentObjectPlace[p] = {}
          currentObjectPlace = currentObjectPlace[p]
        } else {
					if (this.type === 'date') {
						currentObjectPlace[p] = new Date(this.value)
					} else if (this.type === 'checkbox') {
						currentObjectPlace[p] = this.checked
					} else {
						currentObjectPlace[p] = this.value
					}
        }
      })
    })

    return formData
  }

}
