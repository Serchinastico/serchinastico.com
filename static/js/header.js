/**
 * Amount of scroll until we show the header
 */
const SCROLL_UNTIL_HEADER_APPEARS_IN_PX = 1600;

document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector("header");

  document.addEventListener("scroll", () => {
    if (window.scrollY > SCROLL_UNTIL_HEADER_APPEARS_IN_PX) {
      header.style.top = "0px";
    } else {
      header.style.top = "-200px";
    }
  });
});
