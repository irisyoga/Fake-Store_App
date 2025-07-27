
const registerForm = document.getElementById("register-form");
const messageEl = document.getElementById("message");

registerForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const newUser = {
    name: e.target.name.value,
    email: e.target.email.value,
    password: e.target.password.value,
    avatar: e.target.avatar.value,
  };

  fetchRegister(newUser);
});

async function fetchRegister(newUser) {
  //запрос состоит из
  // - url например: "https://api.escuelajs.co/api/v1/users"
  // - тела body - строка в формате JSON
  // - заголовки headers - вспомогательная информация про сам запрос-
  // чтобы сервер мог лучше нас понять
  //- method - GET POST PUT DELETE
  const res = await fetch("https://api.escuelajs.co/api/v1/users/", {
    method: "POST",
    body: JSON.stringify(newUser),
    headers: { "Content-Type": "application/json" },
  });

  if (res.ok) {
    messageEl.textContent = "Successfully registered";
  } else {
    messageEl.textContent = "Registration error!";
  }
}
