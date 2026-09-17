// COS30045 Exercise 0.2 — Energy Website
// FAQ accordion interactivity + footer year

document.addEventListener("DOMContentLoaded", function () {
  // Set current year in footer
  var yearSpan = document.getElementById("year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // FAQ accordion behaviour
  var questions = document.querySelectorAll(".faq-question");

  questions.forEach(function (button) {
    button.addEventListener("click", function () {
      var answer = document.getElementById(button.getAttribute("aria-controls"));
      var isOpen = button.getAttribute("aria-expanded") === "true";

      // Toggle the clicked item
      button.setAttribute("aria-expanded", String(!isOpen));
      answer.classList.toggle("open", !isOpen);
    });
  });
});
