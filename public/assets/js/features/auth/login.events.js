const form = document.getElementById("login-form");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const data = new FormData(form);
  const username = data.get("username");
  const password = data.get("password");

  const response = await fetch("../api/login.php", {
    method: "POST",
    body: data,
  });
  const result = await response.json();

  if (!result.success) {
    alert(result.message);
  }
  localStorage.setItem("user", JSON.stringify(result.user));

  const pages = { vet: "vet.html", owner: "owner.html", admin: "admin.html" };
  window.location.replace(pages[result.user.role])
});
