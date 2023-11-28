// Methode boucle
import { recipes } from "../data/recipes.js";
import { displaySearchResults } from "./Templates/Cards.js";
import { extractUniqueTags } from "./tagSearch.js";
import { fillListBox } from "./tagSearch.js";

// import { updateListBox } from "./tagSearch.js";
// Récupérer la référence du champ de recherche
const recipeSearch = document.getElementById("search");
const clearSearch = document.getElementById("clearSearch");
const ingredientsList = document.getElementById("ingredientsList");
const appliancesList = document.getElementById("appliancesList");
const ustensilsList = document.getElementById("ustensilsList");
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
    const { uniqueIngredients, uniqueAppliances, uniqueUstensils } =
      extractUniqueTags(searchResults);
    // Affichage des résultats de la recherche
    displaySearchResults(searchResults, searchQuery);

    fillListBox(uniqueIngredients, ingredientsList);
    fillListBox(uniqueAppliances, appliancesList);
    fillListBox(uniqueUstensils, ustensilsList);
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
