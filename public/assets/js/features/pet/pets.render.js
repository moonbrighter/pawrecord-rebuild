function displayPets(pets) {
  const petsList = document.getElementById("pets-list");
  petsList.innerHTML = "";

  for (const pet of pets) {
    const listItem = document.createElement("li");
    listItem.append(createPetCard(pet));
    petsList.append(listItem);
  }
}

function createPetCard(pet) {
  const card = document.createElement("article");
  card.classList.add("card");
  card.dataset.petId = pet.pet_id;

  const details = document.createElement("div");

  const title = document.createElement("h3");
  title.classList.add("pet-card__name");

  const species = document.createElement("span");
  species.classList.add("pet-card__species");
  species.textContent = pet.species;
  
  title.append(pet.name, " · ", species);

  const owner = document.createElement("p");
  owner.classList.add("pet-card__owner");
  owner.textContent = `Owner: ${pet.owner_name ?? "—"}`;

  details.append(title, owner);
  card.append(details);
  return card;
}
