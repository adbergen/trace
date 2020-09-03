$(document).ready(() => {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  // $.get("/api/user_data").then((data) => {
  //   $(".member-name").text(data.email);
  // });

  // Getting references to our form and input
  const trackingForm = $("form.tracking");
  const trackingInput = $("input#tracking-input");
  const carrierInput = $("select#carrier-input");

  // When the signup button is clicked, we validate the email and password are not blank
  trackingForm.on("submit", (event) => {
    event.preventDefault();
    const trackingData = {
      tracking: trackingInput.val().trim(),
      carrier: carrierInput.val().trim(),
    };

    if (!trackingData.tracking || !trackingData.carrier) {
      return;
    }
    // If we have an tracking and carrier, run the userTracking function
    userTracking(trackingData.tracking, trackingData.carrier);
    trackingInput.val("");
    carrierInput.val("");
  });

  // Does a post to the signup route. If successful, we are redirected to the members page
  // Otherwise we log any errors
  function userTracking(tracking, carrier) {
    console.log(tracking, carrier);
    $.post("/api/tracking", {
      tracking: tracking,
      carrier: carrier,
    })
      .then((data) => {
        if (!data) {
          window.location.replace("/login");
        }
        console.log(data);
        // paste to html placeholder
        // If there's an error, handle it by throwing up a bootstrap alert
        $("#trackingresults .list-group").empty();
        $("#trackingresults .card-header").empty();
        $("#trackingresults").css("visibility", "visible");
        $("#trackingresults .card-header").text(data.status);

        $.each(data.tracking_details, (i, value) => {
          var li = $(`<li class="list-group-item">${value.description}</li>`);
          $("#trackingresults .list-group").append(li);
        });
      })
      .catch(handleLoginErr);
  }

  function handleLoginErr(err) {
    $("#alert .msg").text(JSON.stringify(err.responseJSON));
    $("#alert").fadeIn(500);
  }
});
