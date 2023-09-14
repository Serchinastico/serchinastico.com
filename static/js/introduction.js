const MARGIN_IN_PX = 16;
const BASE_MARGIN_BOTTOM_IN_PX = 128;

document.addEventListener("DOMContentLoaded", () => {
  const fixedIntro = document.querySelector("#fixed-intro");
  const sections = Array.from(document.querySelectorAll(".intro-sticky"));
  const introContainer = document.querySelector("#intro-container");

  const fixedIntroBB = fixedIntro.getBoundingClientRect();
  const sectionBBs = sections.map((section) => section.getBoundingClientRect());

  let currentIntroTranslation = 0;
  const isSectionFixed = sections.map((_) => false);

  /**
   * We calculate all the margin-bottoms by traversing items bottom-to-top
   * and adding the heights of all elements. Bottom margins are important
   * when the scroll pass by the whole section and it starts being pulled up.
   * They are responsible for the whole element to go up preserving the
   * relative space between items.
   */
  let nextMarginBottom = BASE_MARGIN_BOTTOM_IN_PX;
  sections.toReversed().forEach((section, index) => {
    section.style.marginBottom = `${nextMarginBottom}px`;

    const nonReversedIndex = sections.length - 1 - index;
    nextMarginBottom += sectionBBs[nonReversedIndex].height + MARGIN_IN_PX;
  });

  const sectionsHeight = sectionBBs.reduce(
    (acc, bb) => acc + bb.height + MARGIN_IN_PX,
    0
  );
  const introFinalHeight = fixedIntroBB.height + sectionsHeight;
  fixedIntro.style.marginBottom = `${
    BASE_MARGIN_BOTTOM_IN_PX + introFinalHeight - fixedIntroBB.height
  }px`;

  /**
   * Now that we have the intro sizes right, we send an event to the card
   * component to leave the sticky position at the same time than the intro
   */
  document.dispatchEvent(
    new CustomEvent("intro-in-position", {
      detail: {
        baseMargin: BASE_MARGIN_BOTTOM_IN_PX,
        translationOffset: sectionsHeight / 2,
        introFinalHeight,
      },
    })
  );

  /**
   * We calculate the top property of all sections so that they stick
   * at the right scroll value. We are calculating their top value as if
   * they were all already visible on screen so building top-to-bottom
   * calculating heights and margins between elements
   */
  const fixedIntroTop = window.innerHeight / 2 - fixedIntroBB.height / 2;
  fixedIntro.style.top = `${fixedIntroTop}px`;
  fixedIntro.style.opacity = "1";

  let nextTop = fixedIntroTop + fixedIntroBB.height + MARGIN_IN_PX;
  sections.forEach((section, index) => {
    section.style.top = `${nextTop}px`;

    nextTop += sectionBBs[index].height + MARGIN_IN_PX;
  });

  let lastScroll = window.scrollY;
  document.addEventListener("scroll", () => {
    let isScrollingDown = window.scrollY - lastScroll > 0;
    lastScroll = window.scrollY;

    const sectionsBBs = sections.map((section) =>
      section.getBoundingClientRect()
    );

    if (isScrollingDown) {
      const stickySectionIndex = sections.findIndex((_, index) => {
        const scrollThreshold =
          index === 0
            ? // The first item has a threshold that depends on the fixed intro
              fixedIntroTop + fixedIntroBB.height + MARGIN_IN_PX
            : // The others can be calculated based on the previous sticky element
              sectionsBBs[index - 1].bottom + MARGIN_IN_PX;

        return (
          !isSectionFixed[index] && sectionsBBs[index].top <= scrollThreshold
        );
      });

      if (stickySectionIndex > -1) {
        const newSectionsHeight = sectionBBs
          .slice(0, stickySectionIndex + 1)
          .reduce((acc, bb) => acc + bb.height + MARGIN_IN_PX, 0);
        currentIntroTranslation = newSectionsHeight / 2;

        introContainer.style.transform = `translateY(-${currentIntroTranslation}px)`;

        isSectionFixed[stickySectionIndex] = true;
      }
    } else {
      const stickySectionIndex = sections.findIndex((_, index) => {
        const scrollThreshold =
          index === 0
            ? // The first item has a threshold that depends on the fixed intro
              fixedIntroTop + fixedIntroBB.height + MARGIN_IN_PX
            : // The others can be calculated based on the previous sticky element
              sectionsBBs[index - 1].bottom + MARGIN_IN_PX;

        return (
          isSectionFixed[index] && sectionsBBs[index].top > scrollThreshold
        );
      });

      if (stickySectionIndex > -1) {
        const newSectionsHeight = sectionBBs
          .slice(0, stickySectionIndex)
          .reduce((acc, bb) => acc + bb.height + MARGIN_IN_PX, 0);
        currentIntroTranslation = newSectionsHeight / 2;

        introContainer.style.transform = `translateY(-${currentIntroTranslation}px)`;

        isSectionFixed[stickySectionIndex] = false;
      }
    }
  });
});
