import { displaySearchResults } from "./Cards.js";
import { recipes } from "../../data/recipes.js";
import { capitalizeFirstLetter } from "../tagSearch.js";
import { normalizeName } from "../tagSearch.js";

const tagContainer = document.getElementById("tagContainer");
let tagElements = [];
export const displayTagsSelected = (tagselected, key, selectedArray) => {
  tagContainer.innerHTML = "";

  // Utilise un objet pour stocker les idTag et les éléments correspondants
  const idTagElements = {};

  tagselected.forEach((tags) => {
    const tagCapitalize = capitalizeFirstLetter(tags);
    const idTag = `${tags.toLowerCase()}`;

    // Vérifie si le tag a déjà été ajouté pour éviter les répétitions
    if (!idTagElements[idTag]) {
      const tag = document.createElement("div");
      tag.setAttribute("data-unique-id", idTag);

      tag.innerHTML = `<div class="bg-jaune items-center justify-between flex w-40 h-14 px-4 py-4 text-sm font-normal rounded-lg tag" data-type="${key}" data-value="${tags.toLowerCase()}">${tagCapitalize} <svg xmlns="http://www.w3.org/2000/svg" class="tagClearsCross cursor-pointer" width="14" height="13" viewBox="0 0 14 13" fill="none">
        <path d="M12 11.5L7 6.5M7 6.5L2 1.5M7 6.5L12 1.5M7 6.5L2 11.5" stroke="#1B1B1B" stroke-width="2.16667" stroke-linecap="round" stroke-linejoin="round"/>
      </svg></div>`;

      tagElements.push({ element: tag, idTag });
      tagContainer.appendChild(tag);

      const tagClearsCross = tag.querySelector(".tagClearsCross");
      tagClearsCross.addEventListener("click", () => {
        deleteTags(idTag, tagselected, selectedArray, tags);
        updateResultsAfterTagRemoval(tagselected, idTag, tagElements);
      });

      // Ajoute le idTag et l'élément à l'objet idTagElements
      idTagElements[idTag] = tag;
    }
  });
};

export const displayTagListbox = (
  listContainer,
  key,
  selectedArray,
  tagselected,

  uniqueArray
) => {
  selectedArray.forEach((tags) => {
    const tagDiv = document.createElement("div");
    const idTag = `${tags.toLowerCase()}`;
    tagDiv.setAttribute("data-unique-id", idTag);
    tagDiv.innerHTML = `<div class="tagDiv bg-jaune justify-between flex p-3.5" data-type="${key}" data-value="${tags.toLowerCase()}">${capitalizeFirstLetter(
      normalizeName(tags)
    )} <img class="tagListclearsCross" src="../../images/cross.svg" alt="deletetag"/>
          </div>`;
    tagElements.push({ element: tagDiv, idTag });
    listContainer.insertBefore(tagDiv, listContainer.firstChild);

    tagDiv.addEventListener("click", (e) => {
      e.stopPropagation();

      // const indexArray = selectedArray.indexOf(tags);
      // selectedArray.splice(indexArray, 1);
      // const index = tagselected.indexOf(tags);
      // tagselected.splice(index, 1);
      deleteTags(idTag, tagselected, selectedArray, tags);
      uniqueArray.push(capitalizeFirstLetter(normalizeName(tags)));
      updateResultsAfterTagRemoval(tagselected, idTag, tagElements);
    });
  });
};

export const deleteTags = (idTag, tagselected, selectedArray, tagToRemove) => {
  const tagIndex = selectedArray.indexOf(tagToRemove);
  if (tagIndex !== -1) {
    selectedArray.splice(tagIndex, 1);
  }
  const index = tagselected.indexOf(tagToRemove);
  tagselected.splice(index, 1);

  const indexSelectedArray = selectedArray.indexOf(tagToRemove);
  selectedArray.splice(indexSelectedArray, 1);

  tagElements = tagElements.filter(({ element, idTag: elementIdTag }) => {
    if (element && element.parentNode && elementIdTag === idTag) {
      element.parentNode.removeChild(element);

      return false;
    }
    return true;
  });

  updateResultsAfterTagRemoval(tagselected, idTag, tagElements);
};

// Fonction pour mettre à jour les résultats après la suppression d'un tag
export const updateResultsAfterTagRemoval = (
  tagselected,
  idTag,
  tagElements
) => {
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
  // console.log(tagElements, tagselected);
  displaySearchResults(searchResults);
};
