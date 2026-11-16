const user = JSON.parse(localStorage.getItem("user"));

const greeting = document.getElementById("greeting-name");
console.log(user.name);
greeting.textContent = user.name;