import { displaySearchResults } from "./Cards.js";
import { recipes } from "../../data/recipes.js";
import { capitalizeFirstLetter } from "../tagSearch.js";
import { normalizeName } from "../tagSearch.js";
import { updateListBox } from "../tagSearch.js";

const tagContainer = document.getElementById("tagContainer");
// let tagElements = [];

export const displayTagsSelected = (tagselected, key) => {
  tagContainer.innerHTML = "";

  tagselected.forEach((tags) => {
    console.log("Création Tag :", tags);

    const tagCapitalize = capitalizeFirstLetter(tags);
    const idTag = `${tags.toLowerCase()}`;

    const tag = document.createElement("div");
    tag.setAttribute("data-unique-id", idTag);

    tag.innerHTML = `<div class="bg-jaune items-center justify-between flex w-40 h-14 px-4 py-4 text-sm font-normal rounded-lg tag" data-type="${key}" data-value="${tags.toLowerCase()}">${tagCapitalize} <svg xmlns="http://www.w3.org/2000/svg" class="tagClearsCross cursor-pointer" width="14" height="13" viewBox="0 0 14 13" fill="none">
        <path d="M12 11.5L7 6.5M7 6.5L2 1.5M7 6.5L12 1.5M7 6.5L2 11.5" stroke="#1B1B1B" stroke-width="2.16667" stroke-linecap="round" stroke-linejoin="round"/>
      </svg></div>`;
    // tagElements.push({ idTag, element: tag });
    tagContainer.appendChild(tag);

    const tagClearsCross = tag.querySelector(".tagClearsCross");
    tagClearsCross.addEventListener("click", () => {
      deleteTags(tagselected, tags, tag);
      updateResultsAfterTagRemoval(tagselected);
    });
  });
};

export const displayTagListbox = (
  listContainer,
  key,

  tagselected,

  selectedTag
) => {
  selectedTag.classList.add("bg-jaune");
  selectedTag.classList.add("flex");
  selectedTag.classList.add("justify-between");

  const tagClearsCross = document.createElement("img");
  tagClearsCross.classList.add("tagListclearsCross");
  tagClearsCross.setAttribute("src", "../../images/cross.svg");
  tagClearsCross.setAttribute("alt", "deletetag");
  selectedTag.appendChild(tagClearsCross);

  // // Ajoute le tag en haut de la liste

  // // tagClearsCross.addEventListener("click", (e) => {
  // //   e.stopPropagation();
  // //   console.log("clic");
  // //   selectedTag.classList.remove("bg-jaune");
  // //   selectedTag.classList.remove("flex");
  // //   selectedTag.classList.remove("justify-between");
  // //   tagClearsCross.remove(); // Supprime l'élément img du DOM

  // // const indexArray = selectedArray.indexOf(tags);
  // // selectedArray.splice(indexArray, 1);
  // // const index = tagselected.indexOf(tags);
  // // tagselected.splice(index, 1);
  // // deleteTags(idTag, tagselected, selectedArray, tags, uniqueArray);
  // // uniqueArray.push(capitalizeFirstLetter(normalizeName(tags)));
  // // updateResultsAfterTagRemoval(tagselected, idTag);
  // // });

  // selectedArray.forEach((tags) => {
  //   const tagDiv = document.createElement("div");
  //   const idTag = `${tags.toLowerCase()}`;
  //   tagDiv.setAttribute("data-unique-id", idTag);
  //   tagDiv.innerHTML = `<div class="tagDiv bg-jaune justify-between flex p-3.5" data-type="${key}" data-value="${tags.toLowerCase()}">${capitalizeFirstLetter(
  //     normalizeName(tags)
  //   )} <img class="tagListclearsCross" src="../../images/cross.svg" alt="deletetag"/>
  //         </div>`;
  //   tagElements.push({ idTag, element: tagDiv });
  //   listContainer.insertBefore(tagDiv, listContainer.firstChild);

  //   tagDiv.addEventListener("click", (e) => {
  //     e.stopPropagation();

  //     // const indexArray = selectedArray.indexOf(tags);
  //     // selectedArray.splice(indexArray, 1);
  //     // const index = tagselected.indexOf(tags);
  //     // tagselected.splice(index, 1);
  //     deleteTags(idTag, tagselected, selectedArray, tags, uniqueArray);
  //     uniqueArray.push(capitalizeFirstLetter(normalizeName(tags)));
  //     updateResultsAfterTagRemoval(tagselected, idTag);
  //   });
  // });
};

export const deleteTags = (tagselected, tagToRemove, element) => {
  // const tagIndex = selectedArray.indexOf(tagToRemove);
  // console.log(" tagToRemove :", tagToRemove);

  // if (tagIndex !== -1) {
  //   selectedArray.splice(tagIndex, 1);
  // }

  const index = tagselected.indexOf(tagToRemove);

  tagselected.splice(index, 1);
  element.parentNode.removeChild(element);

  // Supprimer tous les éléments correspondant à idTag
  // tagElements = tagElements.filter(({ idTag: elementIdTag, element }) => {
  //   if (elementIdTag === idTag && element && element.parentNode) {
  //     element.parentNode.removeChild(element);
  //     return false;
  //   }
  //   return true;
  // });

  updateResultsAfterTagRemoval(tagselected);
};

// Fonction pour mettre à jour les résultats après la suppression d'un tag
export const updateResultsAfterTagRemoval = (tagselected) => {
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
  // updateListBox(searchResults);
};
