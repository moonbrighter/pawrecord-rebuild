function formatDate (value) {
  if (!value) return '—'
  return new Date(value.replace(' ', 'T'))
    .toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

function formatTime (value) {
  if (!value) return '—'
  return new Date(value.replace(' ', 'T'))
    .toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
}

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

function formatLabel (value) {
  if (!value) return '—'
  const text = value.replaceAll('_', ' ')
  return text.charAt(0).toUpperCase() + text.slice(1)
}
