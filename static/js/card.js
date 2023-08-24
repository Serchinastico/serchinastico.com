const ROTATION_X_FACTOR = 0.2;
const SWAP_ROTATION_X = 90;
const FIXED_THRESHOLD = 900;

document.addEventListener("DOMContentLoaded", () => {
  const cardSection = document.querySelector("#card");
  const card = document.querySelector(".card");
  let scrollRotationX = 0;
  let mouseRotationX = 0;
  let rotationY = 0;

  document.addEventListener("scroll", () => {
    scrollRotationX = clamp(0, 180, ROTATION_X_FACTOR * window.scrollY);

    if (window.scrollY <= FIXED_THRESHOLD) {
      cardSection.style.top = `${window.scrollY}px`;
    }

    card.style.transform = `rotateX(${
      scrollRotationX + mouseRotationX
    }deg) rotateY(${rotationY}deg)`;
  });

  card.addEventListener("mousemove", (event) => {
    // mouseRotationX = -lerp(
    //   -30,
    //   30,
    //   (event.pageX - event.currentTarget.offsetLeft) / cardBoundingRect.width
    // );
    // rotationY = lerp(
    //   -60,
    //   180,
    //   (event.pageY - event.currentTarget.offsetTop) / cardBoundingRect.height
    // );
    // card.style.transform = `rotateX(${
    //   scrollRotationX + mouseRotationX
    // }deg) rotateY(${rotationY}deg)`;
  });
});
