'use strict'

$(document).ready(function() {
  let formState = {
    owns_home: null,
    mortgage_up_to_date: null,
    restOfFormVisible: false,
  }

  $('[name=owns_home]').on('click', checkBothSelected)
  $('[name=mortgage_up_to_date]').on('click', checkBothSelected)

  function checkBothSelected(e) {
    // Handle the event and update the state
    formState[e.target.name] = e.target.value

    if (formState.owns_home === "true" &&
        formState.mortgage_up_to_date === "true" &&
        formState.restOfFormVisible === false
    ) {
      // Make the form visible
      formState.restOfFormVisible = true
      toggleFormSectionVisibility()


    } else if ((formState.owns_home === "false" ||
               formState.mortgage_up_to_date === "false") &&
               formState.restOfFormVisible === true
    ) {
      // Make form not visible
      formState.restOfFormVisible = false
      toggleFormSectionVisibility()

    }
  }

  function toggleFormSectionVisibility() {
    $('.formSection').each(function(i) {
      // Skip the first, since that's the initial question being asked
      // Those should always stay visible
      if (i > 0) {
        let currentState = $(this).css('display')
        $(this).css('display', (formState.restOfFormVisible ? 'inherit' : 'none'))
      }
    })
  }
})
