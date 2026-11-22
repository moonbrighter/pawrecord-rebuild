const petsList = document.getElementById('pets-list')

petsList.addEventListener('click', (event) => {
  const card = event.target.closest('.pet-card')
  if (!card) return

  const selectedPetId = card.dataset.petId
  const pets = JSON.parse(localStorage.getItem('pets'))
  const pet = pets.find((p) => p.pet_id === Number(selectedPetId))
  renderPetPreview(pet)
})
