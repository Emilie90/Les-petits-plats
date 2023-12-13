//Methode filter
import { recipes } from "../data/recipes.js";
import { displaySearchResults } from "./Templates/Cards.js";
import { updateListBox, selectedTags } from "./tagSearch.js";
// Récupère la référence du champ de recherche
const recipeSearch = document.getElementById("search");
const clearSearch = document.getElementById("clearSearch");
// Ajout d'un gestionnaire d'événements pour gérer la recherche
export let currentSearchResults = recipes;

recipeSearch.addEventListener("input", (listBox, key) => {
  const searchQuery = recipeSearch.value.trim().toLowerCase();

  if (searchQuery.length >= 3) {
    // Update current search results
    currentSearchResults = recipes.filter((recipe) => {
      const recipeContent = `${recipe.name} ${
        recipe.description
      } ${recipe.ingredients
        .map((ingredient) => ingredient.ingredient)
        .join(" ")}`.toLowerCase();

      return recipeContent.includes(searchQuery);
    });
  } else {
    // If search query is less than 3 characters, revert to the original recipe list
    currentSearchResults = recipes;
  }

  updateListBox(currentSearchResults);
  displaySearchResults(currentSearchResults, searchQuery);

  // Affichage de l'icône de la croix si du texte est saisi, sinon masquez-la
  clearSearch.style.display = searchQuery.length > 0 ? "block" : "none";
});

// Ajout d'un gestionnaire d'événements pour effacer le champ de recherche
clearSearch.addEventListener("click", () => {
  recipeSearch.value = "";
  displaySearchResults(recipes);
  clearSearch.style.display = "none";

  updateListBox(recipes);
});

document.addEventListener("click", (event) => {
  // Vérifie si le clic a eu lieu à l'intérieur de la liste ou sur l'élément qui a déclenché l'ouverture de la liste
  if (!recipeSearch.contains(event.target) && event.target !== recipeSearch) {
    // Masquer la liste
    recipeSearch.value = "";
    clearSearch.style.display = "none";
    if (selectedTags.length === 0) {
      currentSearchResults = recipes;
    }
  }
});
