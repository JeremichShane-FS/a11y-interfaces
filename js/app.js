import {
  buildAnimalButtons,
  buildAnimalDomButtons,
} from "./modules/buildAnimals.js";
import setCopyright from "./utils/copyright.js";
import { onHandleKeyDown, onHandleKeyUp } from "./utils/handlers.js";

// IIIFE to handle keydown and keyup events for playing animal sounds and focusing on animal buttons using keyboard keys and arrow keys for navigation between buttons in the DOM
(() => {
  buildAnimalDomButtons();
  const { animalButtons, sounds } = buildAnimalButtons();
  onHandleKeyDown(animalButtons, sounds);
  onHandleKeyUp(animalButtons);
  setCopyright("Animal Sounds");
})();
