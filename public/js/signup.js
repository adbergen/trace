$(document).ready(() => {
  // Getting references to our form and input
  const signUpForm = $("form.signup");
  const emailInput = $("input#email-input");
  const passwordInput = $("input#password-input");

  

  // When the signup button is clicked, we validate the email and password are not blank
  signUpForm.on("submit", (event) => {
    event.preventDefault();
    const userData = {
      email: emailInput.val().trim(),
      password: passwordInput.val().trim(),
    };

    if (!userData.email || !userData.password) {
      return;
    }
    // If we have an email and password, run the signUpUser function
    signUpUser(userData.email, userData.password);
    emailInput.val("");
    passwordInput.val("");
  });

  // Does a post to the signup route. If successful, we are redirected to the members page
  // Otherwise we log any errors
  function signUpUser(email, password) {
    $.post("/api/signup", {
      email: email,
      password: password,
    })
      .then(() => {
        window.location.replace("/tracking");
        // If there's an error, handle it by throwing up a bootstrap alert
      })
      .catch(handleLoginErr);
  }

  function handleLoginErr(err) {
    $("#alert .msg").text(err.responseJSON);
    $("#alert").fadeIn(500);
  }
});


// test

// const signInBtn = document.getElementById("signIn");
// const signUpBtn = document.getElementById("signUp");
// const fistForm = document.getElementById("form1");
// const secondForm = document.getElementById("form2");
// const container = document.querySelector(".container");

// signInBtn.addEventListener("click", () => {
// 	container.classList.remove("right-panel-active");
// });

// signUpBtn.addEventListener("click", () => {
// 	container.classList.add("right-panel-active");
// });

// // fistForm.addEventListener("submit", (e) => e.preventDefault());
// secondForm.addEventListener("submit", (e) => e.preventDefault());
