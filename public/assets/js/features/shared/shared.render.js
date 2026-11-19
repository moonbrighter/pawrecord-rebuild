const user = JSON.parse(localStorage.getItem("user"));

const greeting = document.getElementById("greeting-name");
greeting.textContent = user.name;
