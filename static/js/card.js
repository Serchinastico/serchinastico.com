const CARD_THICKNESS_IN_PX = parseInt(
  getComputedStyle(document.documentElement).getPropertyValue(
    "--card-thickness"
  ),
  10
);

const recalculateCardFacesPosition = () => {
  const card = document.querySelector(".card");
  const cardFrontFace = document.querySelector(".card-face-front");
  const cardTopFace = document.querySelector(".card-face-top");
  const cardBottomFace = document.querySelector(".card-face-bottom");
  const cardLeftFace = document.querySelector(".card-face-left");
  const cardRightFace = document.querySelector(".card-face-right");

  const frontFaceBoundingBox = cardFrontFace.getBoundingClientRect();
  const cardWidth = frontFaceBoundingBox.width;
  const cardHeight = frontFaceBoundingBox.height;

  // Recalculate the center of the transforms so the card rotates from its center
  card.style.transformOrigin = `${cardWidth / 2}px ${cardHeight / 2}px`;

  /**
   * Calculate the position of all faces once we know how big the
   * card finally is
   */

  // Right face
  cardRightFace.style.height = `${cardHeight}px`;
  cardRightFace.style.left = `${(cardWidth - CARD_THICKNESS_IN_PX) / 2}px`;
  cardRightFace.style.transform = `rotateY(90deg) translateZ(${
    cardWidth / 2
  }px)`;

  // Left face
  cardLeftFace.style.height = `${cardHeight}px`;
  cardLeftFace.style.left = `${(cardWidth - CARD_THICKNESS_IN_PX) / 2}px`;
  cardLeftFace.style.transform = `rotateY(-90deg) translateZ(${
    cardWidth / 2
  }px)`;

  // Top face
  cardTopFace.style.width = `${cardWidth}px`;
  cardTopFace.style.top = `${(cardHeight - CARD_THICKNESS_IN_PX) / 2}px`;
  cardTopFace.style.transform = `rotateX(90deg) translateZ(${
    cardHeight / 2
  }px)`;

  // Bottom face
  cardBottomFace.style.width = `${cardWidth}px`;
  cardBottomFace.style.top = `${(cardHeight - CARD_THICKNESS_IN_PX) / 2}px`;
  cardBottomFace.style.transform = `rotateX(-90deg) translateZ(${
    cardHeight / 2
  }px)`;
};

document.addEventListener("DOMContentLoaded", () => {
  const cardSection = document.querySelector("#card-section");
  const cardPadding = document.querySelector(".card-padding");
  const card = document.querySelector(".card");

  recalculateCardFacesPosition();

  let scrollRotationX = 0;
  let mouseRotationX = 0;
  let rotationY = 0;
  let isCardFixed = true;

  const cardPaddingBoundingBox = cardPadding.getBoundingClientRect();
  /** Some magic numbers here and there to account for small screen */
  const extraPaddingToAccountForMargins = clamp(
    0,
    300,
    0.1 * (window.innerHeight - 500)
  );
  const maxScrollToFixIntroduction =
    cardPaddingBoundingBox.bottom -
    window.innerHeight +
    extraPaddingToAccountForMargins;

  const scrollRequiredToFinishCardRotationInPx =
    cardPaddingBoundingBox.bottom - 200;

  document.addEventListener("scroll", () => {
    scrollRotationX = clamp(
      0,
      180,
      lerp(0, 180, window.scrollY / scrollRequiredToFinishCardRotationInPx)
    );

    if (isCardFixed && scrollY > maxScrollToFixIntroduction) {
      cardSection.classList.remove("fixed");
      cardSection.classList.add("absolute");
      cardSection.style.top = `${window.scrollY}px`;
      isCardFixed = false;
    } else if (!isCardFixed && scrollY <= maxScrollToFixIntroduction) {
      cardSection.classList.add("fixed");
      cardSection.classList.remove("absolute");
      cardSection.style.top = 0;
      isCardFixed = true;
    }

    card.style.transform = `rotateX(${
      scrollRotationX + mouseRotationX
    }deg) rotateY(${rotationY}deg)`;
  });

  document.addEventListener("resize", () => {
    recalculateCardFacesPosition();
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
