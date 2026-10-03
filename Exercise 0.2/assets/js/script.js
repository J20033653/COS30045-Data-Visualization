document.addEventListener("DOMContentLoaded", function () {
  var yearSpan = document.getElementById("year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  var questions = document.querySelectorAll(".faq-question");

  questions.forEach(function (button) {
    button.addEventListener("click", function () {
      var answer = document.getElementById(button.getAttribute("aria-controls"));
      var isOpen = button.getAttribute("aria-expanded") === "true";

      button.setAttribute("aria-expanded", String(!isOpen));
      answer.classList.toggle("open", !isOpen);
    });
  });
});
