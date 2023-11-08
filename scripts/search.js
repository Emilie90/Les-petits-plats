// Methode boucle
import { recipes } from "../data/recipes.js";
// Récupérez la référence du champ de recherche
const recipeSearch = document.getElementById("search");
const clearSearch = document.getElementById("clearSearch");

// Ajoutez un gestionnaire d'événements pour gérer la recherche
recipeSearch.addEventListener("input", () => {
  const searchQuery = recipeSearch.value.toLowerCase(); // Convertissez en minuscules

  // Réinitialisez les résultats de la recherche
  const searchResults = [];

  if (searchQuery.length >= 3) {
    // Utilisez une boucle for avec une fonction fléchée pour parcourir le tableau de recettes
    for (let i = 0; i < recipes.length; i++) {
      const recipe = recipes[i];
      const recipeContent =
        recipe.name.toLowerCase() +
        recipe.description.toLowerCase() +
        recipe.ingredients
          .map((ingredient) => ingredient.ingredient.toLowerCase())
          .join("");
      if (recipeContent.includes(searchQuery)) {
        searchResults.push(recipe);
      }
    }
  }

  // Affichez les résultats de la recherche
  if (searchQuery.length >= 3) {
    displaySearchResults(searchResults);
  }
});

// Fonction fléchée pour afficher les résultats de la recherche
export const displaySearchResults = (results) => {
  console.log("Résultats de la recherche :", results);
};

// Ajoutez un gestionnaire d'événements pour la saisie de texte
recipeSearch.addEventListener("input", () => {
  const searchText = recipeSearch.value;

  // Affichez l'icône de la croix si du texte est saisi, sinon masquez-la
  if (searchText.length > 0) {
    clearSearch.style.display = "block";
  } else {
    clearSearch.style.display = "none";
  }
});

// Ajoutez un gestionnaire d'événements pour effacer le champ de recherche
clearSearch.addEventListener("click", () => {
  recipeSearch.value = "";
  clearSearch.style.display = "none";
});
