import { displaySearchResults } from "./Cards.js";
import { recipes } from "../../data/recipes.js";
import { capitalizeFirstLetter } from "../tagSearch.js";
import { normalizeName } from "../tagSearch.js";

const tagContainer = document.getElementById("tagContainer");
let tagElements = [];
export const displayTagsSelected = (tagselected, key) => {
  tagContainer.innerHTML = "";
  console.log(tagElements);
  tagselected.forEach((tags) => {
    const tagCapitalize = capitalizeFirstLetter(tags);
    const tag = document.createElement("div");
    const uniqueId = `${tags.toLowerCase()}`;
    tag.setAttribute("data-unique-id", uniqueId); // Utilisez setAttribute pour définir l'attribut

    // Utilisez une combinaison unique
    tag.innerHTML = `<div class="bg-jaune items-center justify-between flex w-40 h-14 px-4 py-4 text-sm font-normal rounded-lg tag" data-type="${key}" data-value="${tags.toLowerCase()}" >${tagCapitalize} <svg xmlns="http://www.w3.org/2000/svg" class="tagClearsCross cursor-pointer" width="14" height="13" viewBox="0 0 14 13" fill="none">
  <path d="M12 11.5L7 6.5M7 6.5L2 1.5M7 6.5L12 1.5M7 6.5L2 11.5" stroke="#1B1B1B" stroke-width="2.16667" stroke-linecap="round" stroke-linejoin="round"/>
  </svg></div>`;

    tagElements.push({ element: tag, uniqueId });
    tagContainer.appendChild(tag);
    const tagClearsCross = tag.querySelector(".tagClearsCross");
    tagClearsCross.addEventListener("click", () => {
      const index = tagselected.indexOf(tags);
      tagselected.splice(index, 1);

      // Supprimer le tag de tagContainer
      // tagContainer.removeChild(tag);

      updateResultsAfterTagRemoval(tagselected, uniqueId);
    });
  });
};

export const displayTagListbox = (
  listContainer,
  key,
  SelectedArray,
  tagselected,
  uniqueArray
) => {
  SelectedArray.forEach((tags) => {
    const tagDiv = document.createElement("div");
    const uniqueId = `${tags.toLowerCase()}`;
    tagDiv.setAttribute("data-unique-id", uniqueId);
    tagDiv.innerHTML = `<div class="tagDiv bg-jaune justify-between flex p-3.5" data-type="${key}" data-value="${tags.toLowerCase()}">${capitalizeFirstLetter(
      normalizeName(tags)
    )} <img class="tagListclearsCross" src="../../images/cross.svg" alt="deletetag"/>
          </div>`;
    tagElements.push({ element: tagDiv, uniqueId });
    listContainer.insertBefore(tagDiv, listContainer.firstChild);

    tagDiv.addEventListener("click", (e) => {
      e.stopPropagation();

      const indexArray = SelectedArray.indexOf(tags);
      SelectedArray.splice(indexArray, 1);
      const index = tagselected.indexOf(tags);
      tagselected.splice(index, 1);

      // Supprimer le tag de tagDiv
      // listContainer.removeChild(tagDiv);

      uniqueArray.push(capitalizeFirstLetter(normalizeName(tags)));
      updateResultsAfterTagRemoval(tagselected, uniqueId, tagElements);
    });
  });
};
export const deleteTags = (uniqueId) => {
  tagElements = tagElements.filter(({ element, uniqueId: elementUniqueId }) => {
    if (element && element.parentNode && elementUniqueId === uniqueId) {
      element.parentNode.removeChild(element);
      return false;
    }
    return true;
  });
};

// Fonction pour mettre à jour les résultats après la suppression d'un tag
export const updateResultsAfterTagRemoval = (tagselected, uniqueId) => {
  const searchResults = recipes.filter((recipe) => {
    // Concaténation du contenu de la recette à rechercher
    const recipeContent =
      recipe.name.toLowerCase() +
      recipe.description.toLowerCase() +
      recipe.ingredients
        .map((ingredient) => ingredient.ingredient.toLowerCase())
        .join("") +
      recipe.appliance.toLowerCase() +
      recipe.ustensils.map((ustensil) => ustensil.toLowerCase()).join("");

    return tagselected.every((tag) => recipeContent.includes(tag));
  });
  displaySearchResults(searchResults);
  deleteTags(uniqueId);
  console.log(tagElements);
};
