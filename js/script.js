document.addEventListener("DOMContentLoaded", () => {
  let map = document.querySelector("svg");
  let cities = document.querySelectorAll(".city");
  let byuWindow = document.querySelector("#buy_tickets");
  let cityName = document.querySelector("#cityName");

  cities.forEach(city =>
    city.addEventListener("mouseenter", e => {
    //   console.log(e.clientY, e.target.cy.baseVal.value);
      byuWindow.style.top = e.clientY - map.height.baseVal.value - 50 + "px";
      byuWindow.style.left = e.clientX + "px";
      cityName.innerHTML = e.target.id.capitalize();
      byuWindow.style.animation = "disclosure .5s forwards";
      byuWindow.style.display = "inline-block";
    })
  );

  cities.forEach(city =>
    city.addEventListener("mouseout", (e) => {
      byuWindow.style.animation = "closure .5s forwards";
      setTimeout(() => {
        byuWindow.style.display = "none";
      }, 500);
    })
  );
});

String.prototype.capitalize = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
};
