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

document.addEventListener("readystatechange", () => {
  if (document.readyState !== "complete") return;

  const cardPadding = document.querySelector("#intro-container");
  const cardScene = document.querySelector(".card-scene");
  const card = document.querySelector(".card");

  recalculateCardFacesPosition();

  let scrollRotationX = 0;
  let mouseRotationX = 0;
  let rotationY = 0;

  // card.style.transform = `rotateX(${
  //   scrollRotationX + mouseRotationX
  // }deg) rotateY(${rotationY}deg)`;

  // setTimeout(() => {
  //   setTimeout(() => {
  //     card.style.transform = `rotateX(${180}deg) rotateY(0deg)`;
  //   }, 3000);

  //   card.style.transform = `rotateX(${0}deg) rotateY(0deg)`;
  // }, 3000);

  card.classList.toggle("o-0");

  const cardPaddingBoundingBox = cardPadding.getBoundingClientRect();
  const cardSceneBB = cardScene.getBoundingClientRect();

  const scrollRequiredToFinishCardRotationInPx =
    cardPaddingBoundingBox.bottom * 0.8;

  cardScene.style.top = `${window.innerHeight / 2 - cardSceneBB.height / 2}px`;

  document.addEventListener("intro-in-position", (event) => {
    const { translationOffset, introFinalHeight } = event.detail;
    cardScene.style.marginBottom = `${
      translationOffset + (introFinalHeight - cardSceneBB.height) / 2
    }px`;
  });

  document.addEventListener("scroll", () => {
    scrollRotationX = lerp(
      0,
      180,
      window.scrollY / scrollRequiredToFinishCardRotationInPx
    );

    card.style.transform = `rotateX(${
      scrollRotationX + mouseRotationX
    }deg) rotateY(${rotationY}deg)`;
  });

  document.addEventListener("resize", () => {
    recalculateCardFacesPosition();
  });

  cardScene.addEventListener("mousemove", (event) => {
    const cardSceneBoundingBox = cardScene.getBoundingClientRect();

    const vector = {
      x:
        event.pageX -
        (cardSceneBoundingBox.left + cardSceneBoundingBox.width / 2),
      y:
        event.pageY -
        window.scrollY -
        (cardSceneBoundingBox.top + cardSceneBoundingBox.height / 2),
    };

    rotationY = vector.x * 0.1;
    mouseRotationX = vector.y * -0.1;

    card.style.transform = `rotateX(${
      scrollRotationX + mouseRotationX
    }deg) rotateY(${rotationY}deg)`;
  });

  cardScene.addEventListener("mouseout", (event) => {
    rotationY = 0;
    mouseRotationX = 0;

    card.style.transform = `rotateX(${
      scrollRotationX + mouseRotationX
    }deg) rotateY(${rotationY}deg)`;
  });
});
