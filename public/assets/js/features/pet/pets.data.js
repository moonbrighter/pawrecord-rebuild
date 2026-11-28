async function fetchPets () {
  try {
    const response = await fetch(`${API_BASE}/pets/read.php`)
    const result = await response.json()

    if (!result.success) {
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
