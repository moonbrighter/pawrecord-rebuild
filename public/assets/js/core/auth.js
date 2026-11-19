async function login(data) {
  const response = await fetch("../api/auth/login.php", {
    method: "POST",
    body: data,
  });
  const result = await response.json();

  if (!result.success) {
    throw new Error(result.message);
  }
  localStorage.setItem("user", JSON.stringify(result.user));

  return result.user;
}

async function logout() {
  const response = await fetch("../../api/auth/logout.php", { method: "POST" });
  const result = await response.json();

  if (!result.success) {
    throw new Error(result.message);
  }
  localStorage.removeItem("user");
}

// Returns the logged-in user ({ user_id, role }) or null if there is no session.
async function getSession() {
  const response = await fetch("../../api/auth/session.php");

  if (response.status === 401) {
    localStorage.removeItem("user");
    return null;
  }

  const result = await response.json();
  return result.user;
}