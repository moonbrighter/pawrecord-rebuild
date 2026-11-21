async function fetchPets () {
  try {
    const response = await fetch('../../api/pets/pets.php', { method: 'GET' })
    const result = await response.json()

    if (!result) {
      throw new Error(result.message)
    }

    localStorage.setItem('pets', JSON.stringify(result.pets))
    return result.pets
  } catch (error) {
    const cached = localStorage.getItem('pets')
    if (cached) return JSON.parse(cached)
    throw error
  }
}

async function init () {
  const pets = await fetchPets()
  displayPets(pets)
}

init()
