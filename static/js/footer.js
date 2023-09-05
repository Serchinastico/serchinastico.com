document.addEventListener("DOMContentLoaded", () => {
  const footer = document.querySelector("footer");
  const content = document.querySelector("footer #footer-content");

  document.addEventListener("scroll", () => {
    const footerBB = footer.getBoundingClientRect();

    const footerIsVisible = footerBB.top <= window.innerHeight;
    if (footerIsVisible) {
      const pixelsOfFooterVisible = window.innerHeight - footerBB.top;

      const bottom = lerp(-400, 0, pixelsOfFooterVisible / footerBB.height);

      content.style.bottom = `${bottom * 1.4}px`;
    }
  });
});
