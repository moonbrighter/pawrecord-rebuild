// ---------- Pets list ----------

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

// ---------- Pet preview ----------

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

// Summary: avatar + name · breed + PID
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

// Facts: label → value rows
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

function createFact (label, ...value) {
  return createEl('div', 'pet-preview__fact',
    createEl('dt', '', label),
    createEl('dd', '', ...value.map((v) => v ?? '—'))
  )
}

// Latest record (the record fields come flattened on the pet object)
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

// Actions: buttons do things, links go places
function createPreviewActions (pet) {
  const logButton = createEl('button', 'button button--primary', 'Log a record')
  logButton.type = 'button'
  logButton.dataset.action = 'log-record'

  const profileLink = createEl('a', 'button button--secondary', 'View full profile')
  profileLink.href = `pet.html?id=${pet.pet_id}`

  return createEl('div', 'pet-preview__actions', logButton, profileLink)
}

// ---------- Formatting helpers (move to core/format.js later) ----------

// "2026-10-25 15:12:00" or "2026-10-27" → "Oct 25, 2026"
function formatDate (value) {
  if (!value) return '—'
  return new Date(value.replace(' ', 'T'))
    .toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

// "2021-03-15" → "5 years old"
function getAge (birthDate) {
  if (!birthDate) return '—'
  const born = new Date(birthDate)
  const today = new Date()
  let years = today.getFullYear() - born.getFullYear()
  const hadBirthday = today.getMonth() > born.getMonth() ||
    (today.getMonth() === born.getMonth() && today.getDate() >= born.getDate())
  if (!hadBirthday) years--
  return years === 1 ? '1 year old' : `${years} years old`
}

// "overdue" → "Overdue", "due_soon" → "Due soon"
function formatLabel (value) {
  if (!value) return '—'
  const text = value.replaceAll('_', ' ')
  return text.charAt(0).toUpperCase() + text.slice(1)
}
