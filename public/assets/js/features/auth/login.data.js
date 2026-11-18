async function login(data) {
  const response = await fetch("../api/login.php", {
    method: "POST",
    body: data,
  });
  const result = await response.json();

  if (!result.success) {
    alert(result.message);
  }
  localStorage.setItem("user", JSON.stringify(result.user));

  return result.user;
}
