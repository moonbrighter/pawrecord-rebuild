const signOutButton = document.getElementById("sign-out");

signOutButton.addEventListener("click", async (event) => {
  try {
    await logout();
    window.location.replace("../login.html");
  } catch (error){
    alert(error.message);
  }
});
