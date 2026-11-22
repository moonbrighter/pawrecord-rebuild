function displayPet (pet) {
  const profile = document.getElementById('pet-profile-section')
  profile.innerHTML = ''

  profile.append(
    createProfileSummary(pet),
    createProfileActions(pet),
    createProfileFacts(pet)
  )
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

function createFact (label, ...value) {
  return createEl('div', 'fact',
    createEl('dt', '', label),
    createEl('dd', '', ...value.map((v) => v ?? '—'))
  )
}
