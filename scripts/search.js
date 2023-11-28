// Methode boucle
import { recipes } from "../data/recipes.js";
import { displaySearchResults } from "./Templates/Cards.js";
// import { updateListBox } from "./tagSearch.js";
// Récupérer la référence du champ de recherche
const recipeSearch = document.getElementById("search");
const clearSearch = document.getElementById("clearSearch");

// Ajout d'un gestionnaire d'événements pour gérer la recherche et la saisie de texte
recipeSearch.addEventListener("input", (listBox, key) => {
  const searchQuery = recipeSearch.value.trim().toLowerCase();

  if (searchQuery.length >= 3) {
    // Réinitialisation des résultats de la recherche
    const searchResults = [];

    // Boucle for pour parcourir le tableau de recettes
    for (let i = 0; i < recipes.length; i++) {
      const recipe = recipes[i];
      const recipeContent = `${recipe.name} ${
        recipe.description
      } ${recipe.ingredients
        .map((ingredient) => ingredient.ingredient)
        .join(" ")}`.toLowerCase();

      if (recipeContent.includes(searchQuery)) {
        searchResults.push(recipe);
      }
    }

    // Affichage des résultats de la recherche
    displaySearchResults(searchResults);
  } else {
    displaySearchResults(recipes);
  }

  // Affichage de l'icône de la croix si du texte est saisi, sinon masquez-la
  clearSearch.style.display = searchQuery.length > 0 ? "block" : "none";
});

// Ajout d'un gestionnaire d'événements pour effacer le champ de recherche
clearSearch.addEventListener("click", () => {
  recipeSearch.value = "";
  displaySearchResults(recipes);
  clearSearch.style.display = "none";
});