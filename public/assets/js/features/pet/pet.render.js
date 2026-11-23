function displayPet (pet) {
  const profile = document.getElementById('pet-profile-section')
  profile.innerHTML = ''

  profile.append(
    createProfileSummary(pet),
    createProfileActions(pet),
    createProfileFacts(pet)
  )

  displayRecords(pet.records ?? [])
  displayPetAppointments(pet.appointments ?? [])
}

function createProfileSummary (pet) {
  const avatar = createEl('div', 'pet-profile__avatar', '🐾')
  avatar.setAttribute('aria-hidden', 'true')

  const breed = createEl('span', 'pet-profile__breed', pet.breed ?? '')
  const name = createEl('h1', 'pet-profile__name', pet.name, ' · ', breed)
  const pid = createEl('p', 'pet-profile__pid', `PID: ${pet.pet_id}`)

  const info = createEl('div', 'pet-profile__info', name, pid)
  return createEl('div', 'pet-profile__summary', avatar, info)
}

function createProfileFacts (pet) {
  const latest = pet.records?.[0] ?? pet
  const booster = latest.next_booster
    ? [createEl('span', 'status-pill', formatLabel(latest.booster_status)), ' ', formatDate(latest.next_booster)]
    : ['—']

  return createEl('dl', 'pet-profile__facts',
    createFact('Species', pet.species),
    createFact('Owner', pet.owner_name),
    createFact('Age', getAge(pet.birth_date)),
    createFact('Birthdate', formatDate(pet.birth_date)),
    createFact('Last visit', formatDate(latest.administered_at)),
    createFact('Next booster', ...booster)
  )
}

function createProfileActions (pet) {
  const logButton = createEl('button', 'button--primary', 'Log a record')
  logButton.type = 'button'
  logButton.dataset.action = 'log-record'

  const editButton = createEl('button', 'button--secondary', 'Edit pet info')
  editButton.type = 'button'
  editButton.dataset.action = 'edit-pet'

  return createEl('div', 'pet-profile__actions', logButton, editButton)
}

function displayRecords (records) {
  const container = document.getElementById('records-list')
  container.innerHTML = ''

  if (!records.length) {
    container.append(createEl('p', '', 'No records yet.'))
    return
  }

  const list = createEl('ul', 'records-list')
  for (const record of records) {
    list.append(createEl('li', '', createRecordCard(record)))
  }
  container.append(list)
}

function createRecordCard (record) {
  const title = createEl('h3', 'record-item__title', record.medication_name ?? formatLabel(record.record_type))
  const lastVisit = createEl('p', '', `Last: ${formatDate(record.administered_at)}`)

  const tags = createEl('ul', 'record-item__tags', createEl('li', 'tag', formatLabel(record.record_type)))
  if (record.booster_status) {
    tags.append(createEl('li', 'tag', formatLabel(record.booster_status)))
  }

  const info = createEl('div', 'record-item__info', title, lastVisit, tags)
  const card = createEl('article', 'card record-item', info)

  if (record.next_booster) {
    card.append(createEl('div', 'record-item__booster',
      createEl('p', '', 'Next booster'),
      createEl('strong', '', formatDate(record.next_booster))
    ))
  }

  card.dataset.recordId = record.record_id
  return card
}

function displayPetAppointments (appointments) {
  const container = document.getElementById('appointments-list')
  container.innerHTML = ''

  if (!appointments.length) {
    container.append(createEl('p', '', 'No appointments yet.'))
    return
  }

  const now = new Date()
  const isUpcoming = (appointment) => new Date(appointment.scheduled_at.replace(' ', 'T')) >= now
  const upcoming = appointments.filter(isUpcoming).reverse()
  const past = appointments.filter((appointment) => !isUpcoming(appointment))

  if (upcoming.length) container.append(createAppointmentGroup('Upcoming', upcoming))
  if (past.length) container.append(createAppointmentGroup('Past', past))
}

function createAppointmentGroup (label, appointments) {
  const list = createEl('ul', 'appt-list')
  for (const appointment of appointments) {
    list.append(createEl('li', '', createPetAppointmentCard(appointment)))
  }

  return createEl('div', 'appt-group', createEl('h2', 'appt-group__label', label), list)
}

function createPetAppointmentCard (appointment) {
  const date = new Date(appointment.scheduled_at.replace(' ', 'T'))
  const month = createEl('span', '', date.toLocaleDateString('en-US', { month: 'short' }).toUpperCase())
  const day = createEl('strong', '', String(date.getDate()))
  const dateTile = createEl('div', 'pet-appt-card__date', month, day)

  const title = createEl('h3', 'pet-appt-card__title', appointment.reason ?? 'Appointment')
  const status = createEl('span', 'status-pill', formatLabel(appointment.status))
  const topRow = createEl('div', 'pet-appt-card__top-row', title, status)

  const details = createEl('p', '', `${formatTime(appointment.scheduled_at)} · ${appointment.vet_name ?? 'No vet assigned yet'}`)
  const info = createEl('div', 'pet-appt-card__info', topRow, details)
  if (appointment.description) {
    info.append(createEl('p', 'pet-appt-card__description', appointment.description))
  }

  const card = createEl('article', 'card pet-appt-card', dateTile, info)
  card.dataset.apptId = appointment.appt_id
  return card
}
