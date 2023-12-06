import { recipes } from "../data/recipes.js";
import { displaySearchResults } from "./Templates/Cards.js";
import { updateListBox } from "./tagSearch.js";

const recipeSearch = document.getElementById("search");
const clearSearch = document.getElementById("clearSearch");

export let currentSearchResults = recipes;

recipeSearch.addEventListener("input", () => {
  const searchQuery = recipeSearch.value.trim().toLowerCase();
  let searchResults = [];

  if (searchQuery.length >= 3) {
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
  } else {
    searchResults = recipes;
  }

  currentSearchResults = searchResults;

  updateListBox(currentSearchResults);
  displaySearchResults(currentSearchResults, searchQuery);

  clearSearch.style.display = searchQuery.length > 0 ? "block" : "none";
});

clearSearch.addEventListener("click", () => {
  recipeSearch.value = "";
  displaySearchResults(recipes);
  clearSearch.style.display = "none";

  updateListBox(recipes);
});

document.addEventListener("click", (event) => {
  if (!recipeSearch.contains(event.target) && event.target !== recipeSearch) {
    recipeSearch.value = "";
    clearSearch.style.display = "none";
  }
});
