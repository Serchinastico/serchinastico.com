const ROTATION_X_FACTOR = 0.2;
const SWAP_ROTATION_X = 90;
const MAX_ROTATION_X = 600;

const lerp = (x, y, a) => x * (1 - a) + y * a;

document.addEventListener("DOMContentLoaded", () => {
  const card = document.getElementById("card");
  const cardBoundingRect = card.getBoundingClientRect();
  let scrollRotationX = 0;
  let mouseRotationX = 0;
  let rotationY = 0;

  document.addEventListener("scroll", () => {
    scrollRotationX =
      ROTATION_X_FACTOR * Math.min(MAX_ROTATION_X, Math.max(0, window.scrollY));

    if (scrollRotationX > SWAP_ROTATION_X) {
      console.log("SWAP{");
    }
    card.style.transform = `rotateX(${
      scrollRotationX + mouseRotationX
    }deg) rotateY(${rotationY}deg)`;
  });

  card.addEventListener("mousemove", (event) => {
    mouseRotationX = -lerp(
      -30,
      30,
      (event.pageX - event.currentTarget.offsetLeft) / cardBoundingRect.width
    );
    rotationY = lerp(
      -60,
      180,
      (event.pageY - event.currentTarget.offsetTop) / cardBoundingRect.height
    );

    card.style.transform = `rotateX(${
      scrollRotationX + mouseRotationX
    }deg) rotateY(${rotationY}deg)`;
  });
});
