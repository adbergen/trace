$(document).ready(() => {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  // $.get("/api/user_data").then((data) => {
  //   $(".member-name").text(data.email);
  // });

  // Getting references to our form and input
  const trackingForm = $("form.tracking");
  const trackingInput = $("input#tracking-input");
  const carrierInput = $("input#carrier-input");

  // When the signup button is clicked, we validate the email and password are not blank
  trackingForm.on("submit", (event) => {
    event.preventDefault();
    const userData = {
      tracking: trackingInput.val().trim(),
      carrier: carrierInput.val().trim(),
    };

    if (!userData.tracking || !userData.carrier) {
      return;
    }
    // If we have an tracking and carrier, run the userTracking function
    userTracking(userData.tracking, userData.carrier);
    trackingInput.val("");
    carrierInput.val("");
  });

  // Does a post to the signup route. If successful, we are redirected to the members page
  // Otherwise we log any errors
  function userTracking(tracking, carrier) {
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
      })
      .catch(handleLoginErr);
  }

  function handleLoginErr(err) {
    $("#alert .msg").text(err.responseJSON);
    $("#alert").fadeIn(500);
  }
});
