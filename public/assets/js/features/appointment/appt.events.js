const apptList = document.getElementById('appt-list')

apptList.addEventListener('click', (event) => {
  const card = event.target.closest('.appt-card')
  if (!card) return

  const selectedApptId = card.dataset.apptId
  const appointments = JSON.parse(localStorage.getItem('appointments'))
  const appointment = appointments.find((a) => a.appt_id === Number(selectedApptId))
  renderAppointmentInfo(appointment)
})
