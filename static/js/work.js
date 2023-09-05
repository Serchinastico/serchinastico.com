document.addEventListener("DOMContentLoaded", () => {
  const scenes = document.querySelectorAll(".logo-scene");

  scenes.forEach((scene) => {
    const logo = scene.querySelector(".logo");

    scene.addEventListener("mousemove", (event) => {
      const logoFront = scene.querySelector(".logo-face-front");

      const logoFrontBoundingBox = logoFront.getBoundingClientRect();
      const center = {
        x: logoFrontBoundingBox.left + logoFrontBoundingBox.width / 2,
        y: logoFrontBoundingBox.top + logoFrontBoundingBox.height / 2,
      };

      const vector = {
        x: event.pageX - center.x,
        y: event.pageY - window.scrollY - center.y,
      };

      logo.style.transform = `rotateX(${-vector.y * 0.4}deg) rotateY(${
        vector.x * 0.4
      }deg)`;
    });

    scene.addEventListener("mouseout", () => {
      logo.style.transform = `rotateX(0deg) rotateY(0deg)`;
    });
  });
});
