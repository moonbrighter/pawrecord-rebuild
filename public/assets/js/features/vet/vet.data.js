async function fetchPets() {
  const response = await fetch("../api/pets.php", {
    method: "GET",
  });
  const result = await response.json();

  if (!result) {
    alert(result.message);
  }
  localStorage.setItem("pets", result.pets)
  return result.pets;
}

async function init() {
  const pets = await fetchPets();
  displayPets(pets);
}

init();