//Methode filter
import { recipes } from "../data/recipes.js";
import { displaySearchResults } from "./Templates/Cards.js";
import { updateListBox, selectedTags } from "./tagSearch.js";
// Récupère la référence du champ de recherche
const recipeSearch = document.getElementById("search");
const clearSearch = document.getElementById("clearSearch");
// Ajout d'un gestionnaire d'événements pour gérer la recherche
let initialSearchResults = [...recipes];
export let currentSearchResults = initialSearchResults;

recipeSearch.addEventListener("input", () => {
  const searchQuery = recipeSearch.value.trim().toLowerCase();

  if (searchQuery.length >= 3) {
    // Mise à jour de search results
    currentSearchResults = initialSearchResults.filter((recipe) => {
      const recipeContent = `${recipe.name} ${
        recipe.description
      } ${recipe.ingredients
        .map((ingredient) => ingredient.ingredient)
        .join(" ")}`.toLowerCase();

      const matchesSearchQuery =
        searchQuery.length === 0 || recipeContent.includes(searchQuery);
      const matchesTags = selectedTags.every((tag) =>
        recipeContent.includes(tag)
      );

      return matchesSearchQuery && matchesTags;
    });
  } else {
    currentSearchResults = initialSearchResults;
  }
  if (searchQuery.length >= 3) {
    updateListBox(currentSearchResults);
    displaySearchResults(currentSearchResults, searchQuery);
  }

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
