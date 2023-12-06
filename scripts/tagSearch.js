import { recipes } from "../data/recipes.js";
import { displaySearchResults } from "./Templates/Cards.js";
import {
  deleteTags,
  displayTagsSelected,
  updateResultsAfterTagRemoval,
} from "./Templates/TagsSelected.js";

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
  element.addEventListener("click", (event) => {
    // Empêcher la propagation de l'événement pour éviter la fermeture immédiate
    event.stopPropagation();

    // Afficher ou masquer la liste
    list.classList.toggle("hidden");
    searchBg.classList.toggle("hidden");
  });

  // Ajouter un gestionnaire d'événements sur le document pour fermer la liste lors d'un clic à l'extérieur
  document.addEventListener("click", (event) => {
    // Vérifier si le clic a eu lieu à l'intérieur de la liste ou sur l'élément qui a déclenché l'ouverture de la liste
    if (!list.contains(event.target) && event.target !== element) {
      // Masquer la liste
      list.classList.add("hidden");
      searchBg.classList.add("hidden");
    }
  });
}

export function fillListBox(uniqueSet, listBox) {
  // Efface le contenu actuel de la liste
  listBox.innerHTML = "";

  uniqueSet.forEach((item) => {
    const listItem = document.createElement("li");
    listItem.textContent = item;
    listItem.classList.add("item");
    listItem.classList.add("p-3.5");
    listItem.classList.add("hover:bg-jaune");

    // Ajout l'élément de liste à la liste container
    listBox.appendChild(listItem);
  });
}

// Parcourir toutes les recettes pour extraire les données

export function extractUniqueTags(recipes) {
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

    const normalizedAppliance = capitalizeFirstLetter(
      normalizeName(recipe.appliance)
    );
    uniqueAppliances.add(normalizedAppliance);

    recipe.ustensils.forEach((ustensil) => {
      const normalizedUstensil = capitalizeFirstLetter(normalizeName(ustensil));
      uniqueUstensils.add(normalizedUstensil);
    });
  });

  return {
    uniqueIngredients,
    uniqueAppliances,
    uniqueUstensils,
  };
}
const { uniqueIngredients, uniqueAppliances, uniqueUstensils } =
  extractUniqueTags(recipes);
// Remplir les listboxes avec les éléments uniques
fillListBox(uniqueIngredients, ingredientsList);
fillListBox(uniqueAppliances, appliancesList);
fillListBox(uniqueUstensils, ustensilsList);

// barre de recherche Tag
function getDisplayedTags(listBox) {
  const displayedTags = Array.from(listBox.querySelectorAll(".item")).map(
    (tag) => tag.textContent
  );
  return displayedTags;
}
let currentSelection = [];
function handleTagSearch(inputElement, listBox, clearSearchButton) {
  inputElement.addEventListener("click", (e) => {
    e.stopPropagation();
  });

  inputElement.addEventListener("input", () => {
    const searchValue = inputElement.value.trim().toLowerCase();
    const displayedTags = getDisplayedTags(listBox);

    const searchResults = displayedTags.filter((item) =>
      item.toLowerCase().includes(searchValue)
    );
    if (searchValue.length >= 3) {
      fillListBox(searchResults, listBox);
    }

    // Affichage ou masquage du bouton Clear en fonction de la longueur du texte
    clearSearchButton.classList.toggle(
      "hidden",
      inputElement.value.length === 0
    );
  });

  // Gestionnaire d'événements pour la sélection d'un élément de la liste
  listBox.addEventListener("click", (e) => {
    console.log(currentSelection);
    const selectedTag = e.target.textContent.toLowerCase();
    // Ajouter ou retirer le tag de la sélection actuelle
    if (currentSelection.includes(selectedTag)) {
      currentSelection = currentSelection.filter((tag) => tag !== selectedTag);
    } else {
      currentSelection.push(selectedTag);
    }
  }); // Ajout d'un gestionnaire d'événements pour effacer le champ de recherche
  clearSearchButton.addEventListener("click", (e) => {
    console.log(currentSelection);
    e.stopPropagation();
    inputElement.value = "";
    // Masquage du bouton Clear après l'effacement
    clearSearchButton.classList.add("hidden");
    // Réinitialisation de la liste avec la sélection actuelle
    updateResultsAfterTagRemoval(currentSelection);
  });
}

// Ajout d'événements au clic pour chaque bouton
toggleList(ingredientsButton, ingredientsList, ingredientSearchbg);
toggleList(appliancesButton, appliancesList, appliancesSearchBg);
toggleList(ustensilsButton, ustensilsList, ustensilsSearchBg);

// barre de recherche Tag
handleTagSearch(ingredientSearch, ingredientsList, clearSearchTagIngredient);
handleTagSearch(appliancesSearch, appliancesList, clearSearchTagAppliances);
handleTagSearch(ustensilsSearch, ustensilsList, clearSearchTagUstensils);

export function updateListBoxAndResultsAfterTagRemoval(
  newUniqueSet,
  listBox,
  selectedTags
) {
  // Récupère les éléments existants dans la liste
  const existingItems = Array.from(listBox.children);

  // Supprime les éléments existants de la liste
  existingItems.forEach((existingItem) => {
    listBox.removeChild(existingItem);
  });

  // Ajout des nouveaux éléments uniques à la liste
  newUniqueSet.forEach((item) => {
    let isAlreadySelected = selectedTags.includes(item.toLowerCase());

    const listItem = document.createElement("li");
    listItem.textContent = item;
    listItem.classList.add("item");
    listItem.classList.add("p-3.5");
    listItem.classList.add("hover:bg-jaune");

    if (isAlreadySelected) {
      listItem.classList.add("bg-jaune");
      listItem.classList.add("flex");
      listItem.classList.add("justify-between");

      const tagClearsCross = document.createElement("img");
      tagClearsCross.classList.add("tagListclearsCross");
      tagClearsCross.setAttribute("src", "../../images/cross.svg");
      tagClearsCross.setAttribute("alt", "deletetag");
      listItem.appendChild(tagClearsCross);
      listItem.classList.add("selected");

      listItem.addEventListener("click", (e) => {
        e.stopPropagation();
        listItem.classList.remove("selected");
        listItem.classList.remove("bg-jaune");
        listItem.removeChild(tagClearsCross);

        // Mise à jour isAlreadySelected après la désélection
        isAlreadySelected = false;
        // Appel de la fonction pour mettre à jour les résultats après la désélection du tag
        deleteTags(selectedTags, item.toLowerCase(), listItem);
      });
    }

    listBox.appendChild(listItem);
  });
}

// Fonction générique pour mettre à jour la liste d'options
export function updateListBox(results) {
  const { uniqueIngredients, uniqueAppliances, uniqueUstensils } =
    extractUniqueTags(results);

  // Met à jour la liste des ingrédients en ajoutant les nouveaux éléments uniques
  updateListBoxAndResultsAfterTagRemoval(
    uniqueIngredients,
    ingredientsList,
    selectedTags
  );

  // Met à jour la liste des appareils en ajoutant les nouveaux éléments uniques
  updateListBoxAndResultsAfterTagRemoval(
    uniqueAppliances,
    appliancesList,
    selectedTags
  );

  // Met à jour la liste des ustensiles en ajoutant les nouveaux éléments uniques
  updateListBoxAndResultsAfterTagRemoval(
    uniqueUstensils,
    ustensilsList,
    selectedTags
  );
}
// Variable globale pour stocker les tags sélectionnés

// gestionnaire d'événements au clic sur les options de la liste
let selectedTags = [];

export function handleTagClick(listContainer, key) {
  listContainer.addEventListener("click", (e) => {
    const selectedTag = e.target.textContent.toLowerCase();
    e.target.classList.add("selected");

    selectedTags.push(selectedTag);
    const searchResults = recipes.filter((recipe) => {
      const recipeContent =
        recipe.name.toLowerCase() +
        recipe.ingredients
          .map((ingredient) => ingredient.ingredient.toLowerCase())
          .join("") +
        recipe.appliance.toLowerCase() +
        recipe.ustensils.map((ustensil) => ustensil.toLowerCase()).join("");

      return selectedTags.every((tag) => recipeContent.includes(tag));
    });
    console.log(searchResults);
    displaySearchResults(searchResults);
    updateListBox(searchResults);
    displayTagsSelected(selectedTags, key);
  });
}

handleTagClick(ingredientsList, "ingredients");
handleTagClick(appliancesList, "appliance");
handleTagClick(ustensilsList, "ustensils");
