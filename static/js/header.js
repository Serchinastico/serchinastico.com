document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector("header");
  const work = document.querySelector("#work");

  const intersectionObserver = new IntersectionObserver((entries) => {
    if (entries.some((entry) => entry.intersectionRatio > 0)) {
      header.style.top = "0px";
    } else {
      header.style.top = "-200px";
    }
  });
  intersectionObserver.observe(work);
});
