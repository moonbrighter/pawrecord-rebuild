function displayAppointments(appointments) {
  const apptList = document.getElementById("appt-list");
  apptList.innerHTML = "";

  for (const appointment of appointments) {
    const listItem = document.createElement("li");
    listItem.append(createAppointmentCard(appointment));
    apptList.append(listItem);
  }
}

function createAppointmentCard(appointment) {
  const card = document.createElement("article");
  card.classList.add("card");
  card.dataset.apptId = appointment.appt_id;
  
  const details = document.createElement("div");
  
  const title = document.createElement("h3");
  title.classList.add("appt-card__name");
  title.textContent = appointment.pet_name;

  const species = document.createElement("span");
  species.classList.add("appt-card__species");
  species.textContent = appointment.species;

  const owner = document.createElement("span");
  owner.classList.add("appt-card__species");
  owner.textContent = appointment.owner_name; 

  const p = document.createElement("p");
  p.append(species, " · Owner: ", owner);
  
  details.append(title, p);
  card.append(details);
  return card;
}
