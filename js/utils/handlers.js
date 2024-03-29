import animals from "../data/animals.js";
import { on } from "./domHelpers.js";

// Function to handle keydown event for playing animal sounds and focusing on animal buttons using keyboard keys and arrow keys for navigation between buttons in the DOM
const onHandleKeyDown = (animalButtons, sounds) => {
  on(document, "keydown", e => {
    const key = e.key.toLowerCase();
    const currentRegion = e.target.closest('section[role="region"]');
    const items = [];
    const animal = animals.find(animal => animal.key === key);
    if (animal) {
      const { name } = animal;
      const button = animalButtons.find(
        button => button.dataset.animal === name.toLowerCase()
      );
      if (button) {
        sounds[name.toLowerCase()].cloneNode().play();
        button.focus();
        button.classList.add("active");
      }
    } else if (e.key === "Enter" || e.code === "Space") {
      const focusedButton = document.activeElement;
      if (focusedButton) {
        focusedButton.classList.add("active");
      }
    } else if (
      ["ArrowDown", "ArrowRight", "ArrowUp", "ArrowLeft"].includes(e.code)
    ) {
      handleArrowEvent(e, items, currentRegion);
    }
  });
};

// Function to handle keyup event for removing active class from animal buttons when the key is released after pressing it down using keyboard keys and arrow keys for navigation between buttons in the DOM
const onHandleKeyUp = animalButtons => {
  on(document, "keyup", e => {
    if (e.key === "Enter" || e.code === "Space") {
      const focusedButton = document.activeElement;
      if (focusedButton) {
        focusedButton.classList.remove("active");
      }
    } else {
      const key = e.key.toLowerCase();
      const animal = animals.find(animal => animal.key === key);
      if (animal) {
        const { name } = animal;
        const button = animalButtons.find(
          button => button.dataset.animal === name.toLowerCase()
        );
        if (button) {
          button.classList.remove("active");
        }
      }
    }
  });
};

// Function to handle arrow key events for navigation between buttons in the DOM
const handleArrowEvent = (e, items, currentRegion) => {
  const moveFocus = (region, item) => {
    region[item].focus();
  };
  if (["ArrowDown", "ArrowRight", "ArrowUp", "ArrowLeft"].includes(e.code)) {
    e.preventDefault();
    e.stopPropagation();
    const regionItems = Array.from(currentRegion.children[1].children);
    items.push(...regionItems);
    let currentItem = items.indexOf(e.target);
    const lastItem = items.length - 1;

    if (["ArrowDown", "ArrowRight"].includes(e.code)) {
      currentItem = currentItem === lastItem ? 0 : currentItem + 1;
    } else {
      currentItem = currentItem === 0 ? lastItem : currentItem - 1;
    }

    moveFocus(regionItems, currentItem);
  }
};

export { onHandleKeyDown, onHandleKeyUp };
