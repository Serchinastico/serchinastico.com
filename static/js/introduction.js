const MARGIN_IN_PX = 16;
const BASE_MARGIN_BOTTOM_IN_PX = 128;

/**
 * Updates the top and margin-bottom parameters of all section nodes, including the
 * fixed intro. It does so by calculating the total height of all the nodes, and
 * building the values top-to-bottom.
 */
const updateStickyValues = (fixedIntro, sections) => {
  const fixedIntroBB = fixedIntro.getBoundingClientRect();
  const sectionBBs = sections.map((section) => section.getBoundingClientRect());

  const introTotalHeight =
    fixedIntroBB.height +
    sections.reduce((acc, section) => {
      const bb = section.getBoundingClientRect();
      return acc + bb.height + MARGIN_IN_PX;
    }, 0);

  const fixedIntroTop = window.innerHeight / 2 - introTotalHeight / 2;
  fixedIntro.style.top = `${fixedIntroTop}px`;
  fixedIntro.style.marginBottom = `${
    BASE_MARGIN_BOTTOM_IN_PX + introTotalHeight - fixedIntroBB.height
  }px`;

  let nextTop = fixedIntroTop + fixedIntroBB.height + MARGIN_IN_PX;
  sections.forEach((section, index) => {
    section.style.top = `${nextTop}px`;
    nextTop += sectionBBs[index].height + MARGIN_IN_PX;
  });

  let nextMarginBottom = BASE_MARGIN_BOTTOM_IN_PX;
  sections.toReversed().forEach((section, index) => {
    section.style.marginBottom = `${nextMarginBottom}px`;
    nextMarginBottom +=
      sectionBBs[sections.length - 1 - index].height + MARGIN_IN_PX;
  });
};

document.addEventListener("DOMContentLoaded", () => {
  const fixedIntro = document.querySelector("#fixed-intro");
  const sections = Array.from(document.querySelectorAll(".intro-sticky"));
  const cardScene = document.querySelector(".card-scene");
  const isSectionFixed = sections.map((_) => false);

  const fixedIntroBB = fixedIntro.getBoundingClientRect();
  const sectionBBs = sections.map((section) => section.getBoundingClientRect());

  /**
   * Set the initial tops. I calculate this by imagining the new section joins
   * (gets sticky) the introduction node and measuring where it will end when
   * that happens
   */
  sections.forEach((section, index) => {
    const previousSectionBBs = sectionBBs.slice(0, index);
    const previousSectionsHeight = previousSectionBBs.reduce(
      (acc, section) => acc + section.height + MARGIN_IN_PX,
      0
    );

    // Height of the introduction node before this section joins
    const introHeight = fixedIntroBB.height + previousSectionsHeight;

    // Top position of the introduction node once this section joins
    const fixedIntroTop = window.innerHeight / 2 - introHeight / 2;

    section.style.top = `${fixedIntroTop + introHeight}px`;
  });

  const sectionsHeight = sectionBBs.reduce(
    (acc, section) => acc + section.height + MARGIN_IN_PX,
    0
  );
  const cardSceneBB = cardScene.getBoundingClientRect();
  cardScene.style.marginBottom = `${
    BASE_MARGIN_BOTTOM_IN_PX +
    (fixedIntroBB.height + sectionsHeight - cardSceneBB.height) / 2
  }px`;

  const fixedIntroTop = window.innerHeight / 2 - fixedIntroBB.height / 2;
  fixedIntro.style.top = `${fixedIntroTop}px`;
  fixedIntro.style.opacity = "1";

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
          !isSectionFixed[index] && sectionsBBs[index].top < scrollThreshold
        );
      });

      if (stickySectionIndex > -1) {
        updateStickyValues(
          fixedIntro,
          sections.slice(0, stickySectionIndex + 1)
        );
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
        updateStickyValues(fixedIntro, sections.slice(0, stickySectionIndex));

        isSectionFixed[stickySectionIndex] = false;
      }
    }
  });
});
