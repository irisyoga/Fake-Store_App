
const select = document.getElementById("categoryId");
const form = document.getElementById("add-product-form");

async function fetchCategories() {
  const res = await fetch("https://api.escuelajs.co/api/v1/categories");//делаем гет запрос на сервер  чтобы получить список доступный нам категорий (массив), нам из этого списка понадобятся только id и названия
  const categories = await res.json();// получаем сам массив
  console.log(categories);
  //  пример  <option value="1">Electronics</option>
  //Для каждой категории создаем:
  categories.forEach((category) => {
    const option = document.createElement("option"); // <option></option>
    option.value = category.id; // <option value="44"></option>
    option.textContent = category.name; // <option value="44">Furniture 670</option>
    select.appendChild(option);// добавляем все в select
  });
}

fetchCategories();

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const newProduct = { //создаем для того чтобы поместить в него всю информацию из формы
    title: event.target.title.value,
    price: Number(event.target.price.value),//преобразование в число с помощью конструктора
    description: event.target.description.value,
    categoryId: Number(event.target.categoryId.value),
    images: [event.target.image.value],
  };
  //console.log(newProduct);//пробуем вывести в консоль , чтобы посмотреть из чего он состоит
  fetchCreateProduct(newProduct);
});
//делаем запрос
async function fetchCreateProduct(product) {
  const res = await fetch("https://api.escuelajs.co/api/v1/products/", { //отправлять феч запрос на этот адрес
    method: "POST",
    body: JSON.stringify(product),
    headers: { "Content-Type": "application/json" },
  });

  if (res.ok) {  //если все хорошо перевести нас на  главную страницу
    window.location.href = "/";
  }
}