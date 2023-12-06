import { displaySearchResults } from "./Cards.js";
import { recipes } from "../../data/recipes.js";
import { capitalizeFirstLetter } from "../tagSearch.js";
import { updateListBox } from "../tagSearch.js";

const tagContainer = document.getElementById("tagContainer");

export const displayTagsSelected = (tagselected, key) => {
  tagContainer.innerHTML = "";

  tagselected.forEach((tags) => {
    console.log("Création Tag :", tags);
    const listItem = document.createElement("li");
    const tagCapitalize = capitalizeFirstLetter(tags);
    const idTag = `${tags.toLowerCase()}`;

    const tagDiv = document.createElement("div");
    tagDiv.setAttribute("data-unique-id", idTag);
    tagDiv.innerHTML = `<div class="bg-jaune items-center justify-between flex w-40 h-14 px-4 py-4 text-sm font-normal rounded-lg tag" data-type="${key}" data-value="${tags.toLowerCase()}">${tagCapitalize} <svg xmlns="http://www.w3.org/2000/svg" class="tagClearsCross cursor-pointer" width="14" height="13" viewBox="0 0 14 13" fill="none">
        <path d="M12 11.5L7 6.5M7 6.5L2 1.5M7 6.5L12 1.5M7 6.5L2 11.5" stroke="#1B1B1B" stroke-width="2.16667" stroke-linecap="round" stroke-linejoin="round"/>
      </svg></div>`;
    // tagElements.push({ idTag, element: tagDiv });
    tagContainer.appendChild(tagDiv);

    const tagClearsCross = tagDiv.querySelector(".tagClearsCross");
    tagClearsCross.addEventListener("click", () => {
      deleteTags(tagselected, tags, tagDiv);
    });
  });
};

export const deleteTags = (tagselected, tagToRemove, element) => {
  const index = tagselected.indexOf(tagToRemove);
  console.log(index);
  tagselected.splice(index, 1);
  element.parentNode.removeChild(element);
  updateResultsAfterTagRemoval(tagselected);
  displayTagsSelected(tagselected);
};

export const deleteAllTags = (tagselected) => {
  tagselected = [];
  tagContainer.innerHTML = "";
};

// Fonction pour mettre à jour les résultats après la suppression d'un tag
export const updateResultsAfterTagRemoval = (tagselected) => {
  const searchResults = recipes.filter((recipe) => {
    // Concaténation du contenu de la recette à rechercher
    const recipeContent =
      recipe.name.toLowerCase() +
      recipe.ingredients
        .map((ingredient) => ingredient.ingredient.toLowerCase())
        .join("") +
      recipe.appliance.toLowerCase() +
      recipe.ustensils.map((ustensil) => ustensil.toLowerCase()).join("");

    return tagselected.every((tag) => recipeContent.includes(tag));
  });

  displaySearchResults(searchResults);

  updateListBox(searchResults);
};
