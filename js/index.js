
const productsList = document.getElementById("products-list");

// объявим асинхронную функцию
async function fetchProducts() {
  // await - это синтаксический сахар
  const res = await fetch("https://api.escuelajs.co/api/v1/products");
  const products = await res.json();
  console.log(products);

  products.forEach((product) => {
    
    const { title, description, images } = product;

    const productCard = document.createElement("li");
    productCard.classList.add("product-card"); //добавили класс через js, чтобы было удобно стилизовать

    const titleEl = document.createElement("h2");
    const descriptionEl = document.createElement("p");
    const img = document.createElement("img");

    titleEl.textContent = title;
    descriptionEl.textContent = description;
    img.src = images[0];
    img.referrerPolicy = "no-referrer";

    productCard.append(titleEl, img, descriptionEl);
    productsList.appendChild(productCard);
  });
}

// не забудем вызвать функцию
fetchProducts();

// CRUD = Create Read Update Delete
