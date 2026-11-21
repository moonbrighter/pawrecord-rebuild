function displayPets (pets) {
  const petsList = document.getElementById('pets-list')
  petsList.innerHTML = ''

  for (const pet of pets) {
    petsList.append(createEl('li', '', createPetCard(pet)))
  }
}

function createPetCard (pet) {
  const species = createEl('span', 'pet-card__species', pet.species)
  const title = createEl('h3', 'pet-card__name', pet.name, ' · ', species)
  const owner = createEl('p', 'pet-card__owner', `Owner: ${pet.owner_name}`)
  const details = createEl('div', '', title, owner)
  const card = createEl('article', 'card', details)
  card.dataset.petId = pet.pet_id
  return card
}
