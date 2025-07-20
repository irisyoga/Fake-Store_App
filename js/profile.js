

const heading = document.getElementById("heading");
const img = document.getElementById("avatar");
const emailEl = document.getElementById("email");

async function fetchProfile() {
  const token = localStorage.getItem("accessToken");
  const res = await fetch("https://api.escuelajs.co/api/v1/auth/profile", {
    headers: { Authorization: `Bearer ${token}` },//заголовки в get нужны
  });

  const user = await res.json();
  console.log(user);
  const { avatar, email, name } = user;//достали свойства из юзера и сохранили их в переменные
  heading.textContent = name;
  img.src = avatar;
  emailEl.textContent = email;
}

fetchProfile();

//Authentication with JWT
//Request
//GET https://api.escuelajs.co/api/v1/auth/profile
//Authorization: Bearer {your_access_token}
//{your_access_token} эту часть нужно заменить на мой токен, его я смогу взять из localStorage
// смотрим в браузере Application страницы, смотрим название  ключа (у меня это accessToken) , под которым  положили свой токен, копируем и вставляем в localStorage.getItem("accessToken");

//я его беру с этой строки  const token = localStorage.getItem("accessToken"); и вставляю в headers: {Authorization: Bearer {your_access_token}} использую шаблонное выражение обратные кавычки  `Bearer ${token}`