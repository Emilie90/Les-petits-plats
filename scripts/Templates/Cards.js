const nbRecipesElement = document.getElementById("nbRecipes");
const recipesContainer = document.getElementById("recipesContainer");

// Fonction fléchée pour afficher les résultats de la recherche
export const displaySearchResults = (results, searchQuery) => {
  // Effacez le contenu actuel du conteneur
  recipesContainer.innerHTML = "";
  // MAJ de l'affichage du nombre de recettes
  if (results.length > 1) {
    nbRecipesElement.textContent = `${results.length} recettes`;
  } else if (results.length === 1) {
    nbRecipesElement.textContent = `${results.length} recette`;
  } else if (results.length === 0) {
    nbRecipesElement.textContent = `${results.length} recette`;
    if (searchQuery) {
      recipesContainer.innerHTML = `<p class="text-jaune text-center font-normal text-5xl">Aucune recette ne contient "${searchQuery}" vous pouvez chercher «
    tarte aux pommes », « poisson », etc</p>`;
    } else {
      recipesContainer.innerHTML =
        // eslint-disable-next-line quotes
        '<p class="text-jaune text-center font-normal text-5xl">Aucune recette</p>';
    }
  }

  // Parcourez les résultats et créez une carte pour chaque recette
  results.forEach((recipe) => {
    const card = document.createElement("div");
    // card.classList.add("flex");

    // Ajoutez le contenu de la carte (image, nom, description, etc.)
    card.innerHTML = `<div class="bg-white w-96 h-[731px] rounded-3xl shadow relative"><div class="absolute top-5 right-5 z-10 w-[70px] h-6 px-3.5 py-1 bg-jaune rounded-2xl justify-center items-center gap-2.5 inline-flex"><p class="font-manrope text-center text-zinc text-xs font-normal">${
      recipe.time
    } min</p></div>
    <img class="w-96 h-64 object-cover rounded-t-3xl" src="../images/recettes-images/${
      recipe.image
    }" alt="${recipe.name}"><div class="p-4">
      <h3 class="name font-normal py-1 text-zinc font-anton text-lg">${
        recipe.name
      }</h3>
      <h4 class="text-gris-dark text-xs py-4 font-bold font-manrope uppercase tracking-wide">Recette</h4>
      <p class="description w-[350px] overflow-auto h-32 text-zinc text-justify text-sm font-normal font-manrope">${
        recipe.description
      }</p>
      <h4 class="text-gris-dark text-xs py-5 font-bold font-manrope uppercase tracking-wide">Ingrédients</h4>
      <ul class=" grid grid-cols-2 gap-4">
        ${recipe.ingredients
          .map(
            (ingredient) => `
          <li class="text-sm"><p class="ingredients">${
            ingredient.ingredient
          }</p><p class="text-gris-dark">${ingredient.quantity || "-"} ${
              ingredient.unit || ""
            }</p> </li>
        `
          )
          .join("")}
      </ul></div></div>
    
  `;

    // Ajoutez la carte au conteneur
    recipesContainer.appendChild(card);
  });
};
