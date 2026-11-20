async function fetchAppointments() {
  try {
    const response = await fetch(`${API_BASE}/appointments/appointments.php`, {
      method: "GET",
    });
    const result = await response.json();

    if (!result.success) {
      throw new Error(result.message);
    }

    localStorage.setItem("appointments", JSON.stringify(result.appointments));
    return result.appointments;
  } catch (error) {
    const cached = localStorage.getItem("appointments");
    if (cached) return JSON.parse(cached);
    throw error;
  }
}


async function init() {
  const appointments = await fetchAppointments();
  displayAppointments(appointments);
}

init();