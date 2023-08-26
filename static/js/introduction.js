const SCROLL_KEYPOINTS_IN_PX = [100, 400, 700, 900];

document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll(".collapsable");

  document.addEventListener("scroll", () => {
    if (window.scrollY <= SCROLL_KEYPOINTS_IN_PX[0]) {
      sections[0].classList.add("collapsed");
    } else if (window.scrollY <= SCROLL_KEYPOINTS_IN_PX[1]) {
      sections[0].classList.remove("collapsed");
      sections[1].classList.add("collapsed");
    } else if (window.scrollY <= SCROLL_KEYPOINTS_IN_PX[2]) {
      sections[0].classList.remove("collapsed");
      sections[1].classList.remove("collapsed");
      sections[2].classList.add("collapsed");
    } else if (window.scrollY <= SCROLL_KEYPOINTS_IN_PX[3]) {
      sections[0].classList.remove("collapsed");
      sections[1].classList.remove("collapsed");
      sections[2].classList.remove("collapsed");
      sections[3].classList.add("collapsed");
    } else {
      sections[0].classList.remove("collapsed");
      sections[1].classList.remove("collapsed");
      sections[2].classList.remove("collapsed");
      sections[3].classList.remove("collapsed");
    }
  });
});
