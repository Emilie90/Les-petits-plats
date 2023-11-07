import { recipes } from "../data/recipes.js";

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

// Ajoutez un gestionnaire d'événements au clic sur le bouton
ingredientsButton.addEventListener("click", () => {
  // Afficher ou masquer la liste d'ingrédients
  ingredientsList.classList.toggle("hidden");
  ingredientSearchbg.classList.toggle("hidden");
});

appliancesButton.addEventListener("click", () => {
  // Afficher ou masquer la liste des appareils
  appliancesList.classList.toggle("hidden");
  appliancesSearchBg.classList.toggle("hidden");
});

ustensilsButton.addEventListener("click", () => {
  // Afficher ou masquer la liste des ustensils
  ustensilsList.classList.toggle("hidden");
  ustensilsSearchBg.classList.toggle("hidden");
});

// création des ensembles pour stocker les ingrédients, appareils et ustensiles uniques
const uniqueIngredients = new Set();
const uniqueAppliances = new Set();
const uniqueUstensils = new Set();

// Fonction pour normaliser les noms
function normalizeName(name) {
  return name.toLowerCase();
}

//Fonction pour mettre une majusculte à la première lettre d'une chaine de caractère
function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// Parcourir toutes les recettes pour extraire les données
recipes.forEach((recipe) => {
  recipe.ingredients.forEach((ingredientObj) => {
    const normalizedIngredient = normalizeName(ingredientObj.ingredient);
    uniqueIngredients.add(capitalizeFirstLetter(normalizedIngredient));
  });
  const normalizedAppliances = normalizeName(recipe.appliance);
  uniqueAppliances.add(capitalizeFirstLetter(normalizedAppliances));

  recipe.ustensils.forEach((ustensil) => {
    const normalizedUstensils = normalizeName(ustensil);
    uniqueUstensils.add(capitalizeFirstLetter(normalizedUstensils));
  });
});

// Remplir les listboxes avec les éléments uniques
uniqueIngredients.forEach((ingredient) => {
  const option = document.createElement("option");
  option.text = ingredient;
  option.classList.add("p-3.5");
  option.classList.add("hover:bg-jaune");
  ingredientsList.add(option);
});

uniqueAppliances.forEach((appliance) => {
  const option = document.createElement("option");
  option.text = appliance;
  option.classList.add("p-3.5");
  option.classList.add("hover:bg-jaune");
  appliancesList.add(option);
});

uniqueUstensils.forEach((ustensil) => {
  const option = document.createElement("option");
  option.text = ustensil;
  option.classList.add("p-3.5");
  option.classList.add("hover:bg-jaune");
  ustensilsList.add(option);
});
