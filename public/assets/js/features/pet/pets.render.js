function displayPets (pets) {
  const petsList = document.getElementById('pets-list')
  petsList.innerHTML = ''
  
  for (const pet of pets) {
    petsList.append(createEl('li', '', createPetCard(pet)))
  }
}

function createPetCard (pet) {
  const species = createEl('span', 'pet-card__species', pet.species)
  const title = createEl('h3', 'pet-card__name', pet.name, ' · ', species)
  const owner = createEl('p', 'pet-card__owner', `Owner: ${pet.owner_name ?? '—'}`)
  const details = createEl('div', 'pet-card__details', title, owner)

  const card = createEl('article', 'pet-card card', details)
  card.dataset.petId = pet.pet_id
  return card
}

function renderPetPreview (pet) {
  const preview = document.getElementById('pet-preview-section')
  preview.innerHTML = ''

  preview.append(
    createPreviewSummary(pet),
    createPreviewFacts(pet),
    createLatestRecord(pet),
    createPreviewActions(pet)
  )
  preview.hidden = false
}

function createPreviewSummary (pet) {
  const avatar = createEl('div', 'pet-preview__avatar', '🐾')
  avatar.setAttribute('aria-hidden', 'true')

  const breed = createEl('span', 'pet-preview__breed', pet.breed ?? '')
  const name = createEl('h2', 'pet-preview__name', pet.name, ' · ', breed)
  name.id = 'pet-preview-name'

  const pid = createEl('p', 'pet-preview__pid', `PID: ${pet.pet_id}`)

  const info = createEl('div', 'pet-preview__info', name, pid)
  return createEl('div', 'pet-preview__summary', avatar, info)
}

function createPreviewFacts (pet) {
  const booster = pet.next_booster
    ? [createEl('span', 'status-pill', formatLabel(pet.booster_status)), ' ', formatDate(pet.next_booster)]
    : ['—']

  return createEl('dl', 'pet-preview__facts',
    createFact('Species', pet.species),
    createFact('Owner', pet.owner_name),
    createFact('Age', getAge(pet.birth_date)),
    createFact('Birthdate', formatDate(pet.birth_date)),
    createFact('Last visit', formatDate(pet.administered_at)),
    createFact('Next booster', ...booster)
  )
}

function createLatestRecord (pet) {
  const heading = createEl('h3', 'pet-preview__section-title', 'Latest record')

  if (pet.record_id === null) {
    return createEl('div', 'pet-preview__latest', heading, createEl('p', '', 'No records yet.'))
  }

  const title = createEl('h4', 'record-card__title', pet.medication_name ?? formatLabel(pet.record_type))
  const lastVisit = createEl('p', '', `Last visit: ${formatDate(pet.administered_at)}`)

  const tags = createEl('ul', 'record-card__tags', createEl('li', 'tag', formatLabel(pet.record_type)))
  if (pet.booster_status) {
    tags.append(createEl('li', 'tag', formatLabel(pet.booster_status)))
  }

  const card = createEl('article', 'record-card', title, lastVisit)
  if (pet.next_booster) {
    card.append(createEl('p', '', 'Next booster: ', createEl('strong', '', formatDate(pet.next_booster))))
  }
  card.append(tags)
  card.dataset.recordId = pet.record_id

  return createEl('div', 'pet-preview__latest', heading, card)
}

function createPreviewActions (pet) {
  const logButton = createEl('button', 'button--primary', 'Log a record')
  logButton.type = 'button'
  logButton.dataset.action = 'log-record'

  const profileLink = createEl('a', 'button--secondary', 'View full profile')
  profileLink.href = `pet.html?id=${pet.pet_id}`

  return createEl('div', 'pet-preview__actions', logButton, profileLink)
}

function createFact (label, ...value) {
  return createEl('div', 'fact',
    createEl('dt', '', label),
    createEl('dd', '', ...value.map((v) => v ?? '—'))
  )
}
