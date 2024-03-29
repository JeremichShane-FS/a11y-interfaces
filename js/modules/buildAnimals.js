import animals from "../data/animals.js";
import { createEl, on, queryAll } from "../utils/domHelpers.js";

// Function to play animal sounds when animal buttons are clicked in the DOM
const buildAnimalButtons = () => {
  const sounds = animals.reduce((acc, animal) => {
    acc[animal.name.toLowerCase()] = new Audio(animal.sound);
    return acc;
  }, {});

  const animalList = Array.from(queryAll("#wild, #domestic"));
  const animalButtons = animalList.flatMap(section =>
    Array.from(section.querySelectorAll("button"))
  );

  animalButtons.forEach(button => {
    on(button, "click", () => {
      const animal = button.dataset.animal;
      sounds[animal].cloneNode().play();
      button.focus();
    });
  });
  return { animalButtons, sounds };
};

// Function to build animal buttons for wild and domestic animals in the DOM
const buildAnimalDomButtons = () => {
  const wildSection = document.getElementById("wild");
  const domesticSection = document.getElementById("domestic");
  const domesticButtonRow = createEl("div", "button-row");
  const wildButtonRow = createEl("div", "button-row");

  animals.forEach(animal => {
    const button = createEl("button");
    button.setAttribute("aria-label", `${animal.name} sound`);
    button.dataset.animal = animal.name.toLowerCase();
    button.tabIndex = -1;

    const buttonContainer = createEl("span", "button-container");
    buttonContainer.append(
      createEl("span", "title", animal.name),
      createEl("span", "icon", animal.icon),
      createEl("span", null, animal.key.toUpperCase())
    );

    wildSection.append(wildButtonRow);
    domesticSection.append(domesticButtonRow);

    button.append(buttonContainer);
    if (animal.class === "domestic") {
      domesticButtonRow.append(button);
    } else {
      wildButtonRow.append(button);
    }
  });
};

export { buildAnimalButtons, buildAnimalDomButtons };
