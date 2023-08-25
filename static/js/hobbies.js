document.addEventListener("DOMContentLoaded", () => {
  const hobbies = document.querySelector("#hobbies");
  const face = document.querySelector("#face");
  const selectedHobbyContents = document.querySelector("#selected-hobby");
  const woodworking = document.querySelector("#woodworking");
  const threeDPrinting = document.querySelector("#three-d-printing");
  const productDesign = document.querySelector("#product-design");
  const photography = document.querySelector("#photography");
  const musicComposition = document.querySelector("#music-composition");
  const penPlotting = document.querySelector("#pen-plotting");

  const allHobbies = [
    woodworking,
    threeDPrinting,
    productDesign,
    photography,
    musicComposition,
    penPlotting,
  ];

  allHobbies.forEach((hobby) => {
    hobby.addEventListener("click", () => {
      // Remove the selected state from all other hobbies
      allHobbies
        .filter((h) => h !== hobby)
        .forEach((h) => h.classList.remove("selected"));

      hobby.classList.toggle("selected");

      if (hobby.classList.contains("selected")) {
        // Display contents of selected hobby
        selectedHobbyContents.classList.remove("dn");
        face.classList.add("dn");
      } else {
        // Show my lovely face
        selectedHobbyContents.classList.add("dn");
        face.classList.remove("dn");
      }
    });
  });
});
