const HOBBIES = {
  woodworking: {
    description: `
  <p>
    I have been working wood since 2021. My objective was to develop the
    required skills to build my own ✨<b>boardgame table</b>✨ (quite a
    challenge). I'm still not there.
  </p>
  
  <p>
    I started as everyone in this world, building my own
    workbench and I've been tackling bigger projects each time but I
    still think I have to learn a thing or two to build production-ready
    furniture, so wish me luck!
  </p>`,
    imagesCount: 22,
  },
  "product-design": {
    description: `
    <p>
      Since the very beginning of my professional carreer, I've always had 
      a growing interest in understanding the process of <b>building great products</b>.
    </p>
    
    <p>
      I have read many books on the topic, talked with awesome professionals and
      I did a 3-month immersive UX course. I have always tried to practice my skills 
      in my personal projects.
    </p>`,
    imagesCount: 7,
  },
  photography: {
    description: "",
  },
  "music-composition": {
    description: `
    <p>
      I had the chance to take a sabbatical month back in 2018 and I 
      decided to spend that time learning <b>music theory</b> and <b>music composition</b>.
    </p>
    
    <p>
      I did't know how to play any instrument so I decided to use 
      <a href="https://musescore.org/">MuseScore</a> to practice. I managed
      to write a bunch of songs that I uploaded to my
      <a href="https://www.youtube.com/@Serchinastico/videos">YouTube channel</a>.
    </p>`,
  },
  "pen-plotting": {
    description: `
    <p>
      I acquired a CNC tool in 2021. It came with a small router
      and I've been adding new pieces to it since then. I bought a laser
      and more recently, I 3d printed a <b>pen holder</b> to draw stuff.
    </p>
    
    <p>
      These days, I mostly use it to draw <b>pet portraits</b> I sell locally and 
      geometric patterns based on islamic art.
    </p>`,
    imagesCount: 6,
  },
};

document.addEventListener("DOMContentLoaded", () => {
  const face = document.querySelector("#face");
  const selectedHobbyContents = document.querySelector("#selected-hobby");
  const woodworking = document.querySelector("#woodworking");
  const threeDPrinting = document.querySelector("#three-d-printing");
  const productDesign = document.querySelector("#product-design");
  const photography = document.querySelector("#photography");
  const musicComposition = document.querySelector("#music-composition");
  const penPlotting = document.querySelector("#pen-plotting");
  const selectedHobbyDescription = document.querySelector(
    "#selected-hobby-description"
  );
  const selectedHobbyImagesContainer = document.querySelector(
    "#selected-hobby-images-container"
  );
  const selectedHobbyImagesCol1 = document.querySelector(
    "#selected-hobby-images-col-1"
  );
  const selectedHobbyImagesCol2 = document.querySelector(
    "#selected-hobby-images-col-2"
  );

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
      const hobbyData = HOBBIES[hobby.id];

      selectedHobbyDescription.innerHTML = hobbyData.description;

      selectedHobbyImagesCol1.innerHTML = "";
      selectedHobbyImagesCol2.innerHTML = "";

      if (!hobbyData.imagesCount) {
        selectedHobbyImagesContainer.classList.add("hidden");
      } else {
        selectedHobbyImagesContainer.classList.remove("hidden");
      }

      for (let i = 0; i < hobbyData.imagesCount; i++) {
        const fileName = String(i).padStart(3, "0");

        const link = document.createElement("a");
        link.href = `/static/img/hobbies/${hobby.id}/${fileName}.jpeg`;
        const image = document.createElement("img");
        image.src = `/static/img/hobbies/${hobby.id}/${fileName}.jpeg`;
        link.appendChild(image);

        if (i % 2 === 0) {
          selectedHobbyImagesCol1.appendChild(link);
        } else {
          selectedHobbyImagesCol2.appendChild(link);
        }
      }

      // Remove the selected state from all other hobbies
      allHobbies
        .filter((h) => h !== hobby)
        .forEach((h) => h.classList.remove("selected"));

      hobby.classList.toggle("selected");

      if (hobby.classList.contains("selected")) {
        // Display contents of selected hobby
        selectedHobbyContents.classList.remove("hidden");
        face.classList.add("hidden");
      } else {
        // Show my "lovely" face
        selectedHobbyContents.classList.add("hidden");
        face.classList.remove("hidden");
      }
    });
  });
});
