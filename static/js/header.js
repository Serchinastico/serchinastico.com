document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector("header");
  const cardSection = document.querySelector("#card-section");

  document.addEventListener("scroll", () => {
    if (cardSection.classList.contains("fixed")) {
      header.style.top = "-200px";
    } else {
      header.style.top = "0px";
    }
  });
});
