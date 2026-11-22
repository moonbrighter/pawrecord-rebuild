async function fetchPet() {
  const params = new URLSearchParams(window.location.search);
  const petId = Number(params.get('id'));
  
  try {
    const response = await fetch(`../../api/pets/pet.php?id=${petId}`)
    const result = await response.json()

    if (!result.success) {
      throw new Error(result.message)
    }

    return result.pet
  } catch (error) {
    const cached = localStorage.getItem('pets')
    if (cached) {
      const pets = JSON.parse(cached);
      const pet = pets.find((p) => p.pet_id === petId) //TODO: doesn't have appointments or records
      if (pet) return pet
    }
    throw error
  }
}

async function init () {
  const pet = await fetchPet()
  displayPet(pet)
}

init()