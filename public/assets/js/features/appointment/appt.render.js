function displayAppointments (appointments) {
  const apptList = document.getElementById('appt-list')
  apptList.innerHTML = ''

  for (const appointment of appointments) {
    apptList.append(createEl('li', '', createAppointmentCard(appointment)))
  }
}

function createAppointmentCard (appointment) {
  const time = parseTime(appointment.scheduled_at)
  const topRow = createEl('div', 'appt-card__top-row', time)
  const title = createEl('h3', 'appt-card__name', appointment.pet_name)
  const species = createEl('span', '', appointment.species)
  const owner = createEl('span', '', appointment.owner_name)
  const details = createEl('p', '', species, ' · Owner: ', owner)
  const info = createEl('div', '', topRow, title, details)
  const card = createEl('article', 'card', info)
  card.dataset.apptId = appointment.appt_id
  return card
}

function parseTime (dateTime) {
  const time = dateTime.split(' ').pop()
  const parts = time.split(':')
  parts.pop();
  return parts.join(':');
}
