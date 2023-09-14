const MARGIN_IN_PX = 16;

/**
 * @param {DOMRect[]} bbs Array of bounding boxes of the nodes that are going to be measured
 * @returns The height in pixels of all components if there were to be stacked vertically
 */
const getSectionsHeight = (bbs) =>
  bbs.reduce((acc, bb) => acc + bb.height + MARGIN_IN_PX, 0);

/**
 * Here I'm using readystatechange instead of DOMContentLoaded because
 * the former fires after a layout change causing the #fixed-intro element
 * to move slightly up and messing with the top property of sticky nodes
 */
document.addEventListener("readystatechange", () => {
  if (document.readyState !== "complete") return;

  const fixedIntro = document.querySelector("#fixed-intro");
  const sections = Array.from(document.querySelectorAll(".intro-sticky"));
  const introContainer = document.querySelector("#intro-container");

  const fixedIntroBB = fixedIntro.getBoundingClientRect();
  const sectionBBs = sections.map((section) => section.getBoundingClientRect());

  const isSectionFixed = sections.map((_) => false);
  let currentIntroTranslation = 0;

  /**
   * We calculate all the margin-bottoms by traversing items bottom-to-top
   * and adding the heights of all elements. Bottom margins are important
   * when the scroll pass by the whole section and it starts being pulled up.
   * They are responsible for the whole element to go up preserving the
   * relative space between items.
   */
  let nextMarginBottom = 0;
  sections.toReversed().forEach((section, index) => {
    section.style.marginBottom = `${nextMarginBottom}px`;

    const nonReversedIndex = sections.length - 1 - index;
    nextMarginBottom += sectionBBs[nonReversedIndex].height + MARGIN_IN_PX;
  });

  const sectionsHeight = getSectionsHeight(sectionBBs);
  const introFinalHeight = fixedIntroBB.height + sectionsHeight;
  fixedIntro.style.marginBottom = `${introFinalHeight - fixedIntroBB.height}px`;

  /**
   * Now that we have the intro heights right, we send an event to the card
   * component so that it leaves the screen at the same time than the intro
   * by settings its bottom margin
   */
  document.dispatchEvent(
    new CustomEvent("intro-in-position", {
      detail: {
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
  introContainer.classList.toggle("o-0");

  let nextTop = fixedIntroTop + fixedIntroBB.height + MARGIN_IN_PX;
  sections.forEach((section, index) => {
    section.style.top = `${nextTop}px`;

    nextTop += sectionBBs[index].height + MARGIN_IN_PX;
  });

  /**
   * We subscribe to the scroll event to translate the whole container
   * when an item enters/exits the sticky state and keep everything centered in
   * the screen
   */
  let lastScroll = window.scrollY;
  document.addEventListener("scroll", () => {
    let isScrollingDown = window.scrollY - lastScroll > 0;
    lastScroll = window.scrollY;

    const sectionsBBs = sections.map((section) =>
      section.getBoundingClientRect()
    );

    const stickySectionIndex = sections.findIndex((_, index) => {
      const scrollThreshold =
        index === 0
          ? // The first item has a threshold that depends on the fixed intro
            fixedIntroTop + fixedIntroBB.height + MARGIN_IN_PX
          : // The others can be calculated based on the previous sticky element
            sectionsBBs[index - 1].bottom + MARGIN_IN_PX;

      return isScrollingDown
        ? !isSectionFixed[index] && sectionsBBs[index].top <= scrollThreshold
        : isSectionFixed[index] && sectionsBBs[index].top > scrollThreshold;
    });

    if (stickySectionIndex > -1) {
      const newSectionsHeight = getSectionsHeight(
        sectionBBs.slice(
          0,
          isScrollingDown ? stickySectionIndex + 1 : stickySectionIndex
        )
      );
      currentIntroTranslation = newSectionsHeight / 2;
      introContainer.style.transform = `translateY(-${currentIntroTranslation}px)`;
      isSectionFixed[stickySectionIndex] = isScrollingDown;
    }
  });
});
