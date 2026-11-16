async function fetchPets() {
  const response = await fetch("../api/pets.php", {
    method: "GET",
  });
  const result = await response.json();
  return result;
}

async function init() {
  fetchPets();
}

init();