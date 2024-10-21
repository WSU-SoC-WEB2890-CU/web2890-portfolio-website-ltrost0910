//TODO - Your ES6 JavaScript code (if any) goes here
import "bootstrap"

//filter for portfolio grid
document.addEventListener("DOMContentLoaded", function () {
    const buttons = document.querySelectorAll("[data-filter]");
    const items = document.querySelectorAll("[data-category]");
  
    buttons.forEach((button) => {
      button.addEventListener("click", function () {
        const filter = this.getAttribute("data-filter");
  
        items.forEach((item) => {
          const category = item.getAttribute("data-category");
  
          if (filter === "all" || filter === category) {
            item.style.display = "block";
          } else {
            item.style.display = "none";
          }
        });
      });
    });
  });
  
  //alert for contact form submit button
  document.getElementById("submitButton").addEventListener("click", function () {
    var alertElement = document.getElementById("successAlert");
    alertElement.classList.remove("d-none"); // Remove the d-none class to show the alert
  });