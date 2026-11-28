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
  const card = createEl('article', 'appt-card card', info)
  card.dataset.apptId = appointment.appt_id
  return card
}

function parseTime (dateTime) {
  const time = dateTime.split(' ').pop()
  const parts = time.split(':')
  parts.pop();
  return parts.join(':');
}

function renderAppointmentInfo (appointment) {
  const info = document.getElementById('appt-info-section')
  info.innerHTML = ''

  info.append(
    createApptInfoSummary(appointment),
    createApptInfoFacts(appointment),
    createOwnerNote(appointment),
    createApptInfoActions(appointment)
  )
}

function createApptInfoSummary (appointment) {
  const avatar = createEl('div', 'appt-info__avatar', '🐾')
  avatar.setAttribute('aria-hidden', 'true')

  const breed = createEl('span', 'appt-info__breed', appointment.breed ?? '')
  const name = createEl('h2', 'appt-info__name', appointment.pet_name, ' · ', breed)
  const pid = createEl('p', 'appt-info__pid', `PID: ${appointment.pet_id}`)

  const details = createEl('div', 'appt-info__details', name, pid)
  return createEl('div', 'appt-info__summary', avatar, details)
}

function createApptInfoFacts (appointment) {
  return createEl('dl', 'appt-info__facts',
    createFact('Date & time', `${formatDate(appointment.scheduled_at)} · ${formatTime(appointment.scheduled_at)}`),
    createFact('Owner', appointment.owner_name),
    createFact('Reason', createEl('span', 'status-pill', formatLabel(appointment.reason))),
    createFact('Status', createEl('span', 'status-pill', formatLabel(appointment.status))),
    createFact('Requested on', formatDate(appointment.requested_at))
  )
}

function createOwnerNote (appointment) {
  const heading = createEl('h3', 'appt-info__section-title', "Owner's note")
  const note = createEl('p', 'appt-info__note', appointment.description ?? 'No note from the owner.')
  return createEl('div', 'appt-info__owner-note', heading, note)
}

function createApptInfoActions (appointment) {
  const logButton = createEl('button', 'button--primary', 'Log a record')
  logButton.type = 'button'
  logButton.dataset.action = 'log-record'

  const profileLink = createEl('a', 'button--secondary', 'View pet profile')
  profileLink.href = `pet.html?id=${appointment.pet_id}`

  return createEl('div', 'appt-info__actions', logButton, profileLink)
}
