import { recipes } from "../data/recipes.js";
import { displaySearchResults } from "./Templates/Cards.js";
import { displayTagsSelected } from "./Templates/TagsSelected.js";
import { displayTagListbox } from "./Templates/TagsSelected.js";
import { updateResultsAfterTagRemoval } from "./Templates/TagsSelected.js";

// référence des éléments select dans le HTML
const ingredientsList = document.getElementById("ingredientsList");
const appliancesList = document.getElementById("appliancesList");
const ustensilsList = document.getElementById("ustensilsList");
const ingredientsButton = document.getElementById("ingredientsButton");
const ustensilsButton = document.getElementById("ustensilsButton");
const appliancesButton = document.getElementById("appliancesButton");
const ingredientSearchbg = document.getElementById("ingredientSearchbg");
const ustensilsSearchBg = document.getElementById("ustensilsSearchBg");
const appliancesSearchBg = document.getElementById("appliancesSearchBg");
const ingredientSearch = document.getElementById("ingredientSearch");
const appliancesSearch = document.getElementById("appliancesSearch");
const ustensilsSearch = document.getElementById("ustensilsSearch");
const clearSearchTagUstensils = document.getElementById(
  "clearSearchTagUstensils"
);
const clearSearchTagAppliances = document.getElementById(
  "clearSearchTagAppliances"
);
const clearSearchTagIngredient = document.getElementById(
  "clearSearchTagIngredient"
);

// Fonction pour normaliser les noms
export function normalizeName(name) {
  return name.toLowerCase();
}

// Fonction pour mettre une majuscule à la première lettre d'une chaîne de caractères
export function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// Fonction générique pour gérer l'ajout d'événement au clic
function toggleList(element, list, searchBg) {
  element.addEventListener("click", () => {
    // Afficher ou masquer la liste
    list.classList.toggle("hidden");
    searchBg.classList.toggle("hidden");
  });
}

function fillListBox(uniqueSet, listBox) {
  // Effacez le contenu actuel de la liste
  listBox.innerHTML = "";

  uniqueSet.forEach((item) => {
    const listItem = document.createElement("li");
    listItem.textContent = item;
    listItem.classList.add("p-3.5");
    listItem.classList.add("hover:bg-jaune");

    // Ajoutez l'élément de liste à la liste container
    listBox.appendChild(listItem);
  });
}

// Création des ensembles pour stocker les ingrédients, appareils et ustensiles uniques
const uniqueIngredients = new Set();
const uniqueAppliances = new Set();
const uniqueUstensils = new Set();

// Parcourir toutes les recettes pour extraire les données
recipes.forEach((recipe) => {
  recipe.ingredients.forEach((ingredientObj) => {
    const normalizedIngredient = capitalizeFirstLetter(
      normalizeName(ingredientObj.ingredient)
    );
    uniqueIngredients.add(normalizedIngredient);
  });

  const normalizedAppliances = capitalizeFirstLetter(
    normalizeName(recipe.appliance)
  );
  uniqueAppliances.add(normalizedAppliances);

  recipe.ustensils.forEach((ustensil) => {
    const normalizedUstensils = capitalizeFirstLetter(normalizeName(ustensil));
    uniqueUstensils.add(normalizedUstensils);
  });
});

// Remplir les listboxes avec les éléments uniques
fillListBox(uniqueIngredients, ingredientsList);
fillListBox(uniqueAppliances, appliancesList);
fillListBox(uniqueUstensils, ustensilsList);

// barre de recherche Tag
function handleTagSearch(inputElement, dataArray, listBox, clearSearchButton) {
  inputElement.addEventListener("input", () => {
    const searchValue = inputElement.value.trim().toLowerCase();
    if (searchValue.length >= 3) {
      const searchResults = dataArray.filter((item) =>
        item.toLowerCase().includes(searchValue)
      );

      fillListBox(searchResults, listBox);
    }

    // Affichage ou masquage du bouton Clear en fonction de la longueur du texte
    clearSearchButton.classList.toggle(
      "hidden",
      inputElement.value.length === 0
    );
  });

  // Ajout d'un gestionnaire d'événements pour effacer le champ de recherche
  clearSearchButton.addEventListener("click", () => {
    inputElement.value = "";
    // Masquage du bouton Clear après l'effacement
    clearSearchButton.classList.add("hidden");
    // Réinitialisation de la liste
    fillListBox(dataArray, listBox);
  });
}

const uniqueIngredientsArray = Array.from(uniqueIngredients);
const uniqueAppliancesArray = Array.from(uniqueAppliances);
const uniqueUstensilsArray = Array.from(uniqueUstensils);

// Ajout d'événements au clic pour chaque bouton
toggleList(ingredientsButton, ingredientsList, ingredientSearchbg);
toggleList(appliancesButton, appliancesList, appliancesSearchBg);
toggleList(ustensilsButton, ustensilsList, ustensilsSearchBg);

// barre de recherche Tag
handleTagSearch(
  ingredientSearch,
  uniqueIngredientsArray,
  ingredientsList,
  clearSearchTagIngredient
);
handleTagSearch(
  appliancesSearch,
  uniqueAppliancesArray,
  appliancesList,
  clearSearchTagAppliances
);
handleTagSearch(
  ustensilsSearch,
  uniqueUstensilsArray,
  ustensilsList,
  clearSearchTagUstensils
);

// // Fonction générique pour mettre à jour la liste d'options
// export function updateListBox(results, listBox, key) {
//   const uniqueValues = new Set();

//   results.forEach((result) => {
//     if (Array.isArray(result[key])) {
//       // Si c'est un tableau, ajouter chaque élément
//       result[key].forEach((item) => {
//         if (item && item.ingredient && typeof item.ingredient === "string") {
//           uniqueValues.add(item.ingredient.toLowerCase());
//         } else if (item && typeof item === "string") {
//           uniqueValues.add(item.toLowerCase());
//         }
//       });
//     } else if (result[key] && typeof result[key] === "string") {
//       // Si c'est une chaîne de caractères, ajouter la valeur
//       uniqueValues.add(result[key].toLowerCase());
//     }
//   });
//   fillListBox(uniqueValues, listBox);
// }
//Variable globale pour stocker les tags sélectionnés

let selectedIngredients = [];
let selectedAppliance = [];
let selectedUstensils = [];

// gestionnaire d'événements au clic sur les options de la liste
let tagElements = [];
export function handleTagClick(uniqueArray, listContainer, key, SelectedArray) {
  listContainer.addEventListener("click", (e) => {
    const selectedTag = e.target.textContent.toLowerCase();
    SelectedArray.push(selectedTag);
    const TagUniqueArray = capitalizeFirstLetter(normalizeName(selectedTag));
    const index = uniqueArray.indexOf(TagUniqueArray);
    uniqueArray.splice(index, 1);

    // Concaténer les trois tableaux
    let selectedTags = selectedIngredients.concat(
      selectedAppliance,
      selectedUstensils
    );

    const searchResults = recipes.filter((recipe) => {
      const recipeContent =
        recipe.name.toLowerCase() +
        recipe.description.toLowerCase() +
        recipe.ingredients
          .map((ingredient) => ingredient.ingredient.toLowerCase())
          .join("") +
        recipe.appliance.toLowerCase() +
        recipe.ustensils.map((ustensil) => ustensil.toLowerCase()).join("");

      return selectedTags.every((tag) => recipeContent.includes(tag));
    });
    fillListBox(uniqueArray, listContainer);
    displaySearchResults(searchResults);
    // updateListBox(searchResults, listContainer, key);
    displayTagsSelected(selectedTags, key, listContainer, tagElements);
    displayTagListbox(
      listContainer,
      key,
      SelectedArray,
      selectedTags,
      uniqueArray,
      tagElements
    );
  });
}

handleTagClick(
  uniqueIngredientsArray,
  ingredientsList,
  "ingredients",
  selectedIngredients
);
handleTagClick(
  uniqueAppliancesArray,
  appliancesList,
  "appliance",
  selectedAppliance
);
handleTagClick(
  uniqueUstensilsArray,
  ustensilsList,
  "ustensils",
  selectedUstensils
);
