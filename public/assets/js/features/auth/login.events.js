const form = document.getElementById("login-form");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const formData = new FormData(form);
  const username = formData.get("username");
  const password = formData.get("password");

  const pages = {
    vet: "vet/index.html",
    owner: "owner.html",
    admin: "admin.html",
  };
  
  try {
    const user = await login(formData);
    window.location.replace(pages[user.role]);
  } catch (error) {
    alert(error.message);
  }
});
