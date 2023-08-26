/**
 * Controls how fast the card rotates when scrolling through the page.
 * Higher is faster.
 */
const ROTATION_X_FACTOR = 0.2;

const CARD_THICKNESS_IN_PX = parseInt(
  getComputedStyle(document.documentElement).getPropertyValue(
    "--card-thickness"
  ),
  10
);

/**
 * This operation is somewhat complex. There are 3 components involved:
 *   1. The introduction section
 *   2. The card-padding element that simply adds empty space until we
 *      finish the initial scrolling card effect
 *   3. The screen height
 *
 * We want the card to continue its regular scrolling once the padding finishes.
 * However, if the screen is really tall, we can let the next element continue
 * for a bit until we let the card scroll. On the other hand, if the screen is
 * short, there is a limited distance between the introduction and the end of the screen
 * so we have almost no margin. This function just calculates the right amount
 * of margin we can allow for the effect to feel natural.
 */
const calculateScrollingUntilCardMovesUpwards = () => {
  const cardPadding = document.querySelector(".card-padding");
  const cardPaddingBoundingBox = cardPadding.getBoundingClientRect();
  /**
   * We can't take the initial component height as its elements appear and disappear.
   * This should be updated if I ever change its height.
   */
  const introductionMaxHeightInPx = 568;
  /**
   * The extra padding is a value between 0 and 200 that grows when we have
   * taller screens.
   */
  const extraPadding = clamp(
    0,
    200,
    window.innerHeight - introductionMaxHeightInPx
  );

  return cardPaddingBoundingBox.top + extraPadding;
};

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
  const card = document.querySelector(".card");

  const paddingUntilCardStopsMovingInPx =
    calculateScrollingUntilCardMovesUpwards();

  recalculateCardFacesPosition();

  let scrollRotationX = 0;
  let mouseRotationX = 0;
  let rotationY = 0;

  document.addEventListener("scroll", () => {
    scrollRotationX = clamp(0, 180, ROTATION_X_FACTOR * window.scrollY);

    if (window.scrollY <= paddingUntilCardStopsMovingInPx) {
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
