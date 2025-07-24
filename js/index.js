const productsList = document.getElementById("products-list");

// объявим асинхронную функцию
async function fetchProducts() {
  // await - это синтаксический сахар
  const res = await fetch("https://api.escuelajs.co/api/v1/products");
  const products = await res.json();
  console.log(products);

  products.forEach((product) => {
    const { title, description, images, id, price } = product;

    const productCard = document.createElement("li");
    productCard.id = "product-" + id;
    productCard.classList.add("product-card"); //добавили класс через js, чтобы было удобно стилизовать

    const titleEl = document.createElement("h2");
    const descriptionEl = document.createElement("p");
    const img = document.createElement("img");

    titleEl.textContent = title;
    descriptionEl.textContent = description;
    img.src = images[0];
    img.referrerPolicy = "no-referrer";

    const priceElement = document.createElement("p");
    priceElement.textContent = "Price: " + price;

    //Кнопка удаления 
    const deleteBtn = document.createElement("button");
    deleteBtn.type = "button";
    deleteBtn.textContent = "Delete";
    deleteBtn.onclick = () => {
      //можно повесить при клике на этот элемент отработает какая-то функция
      //console.log(id);
      fetchDeleteProduct(id);
    };

    const editBtn = document.createElement("button");
    editBtn.type = "button";
    editBtn.textContent = "Edit";
    editBtn.onclick = () => {
      const form = document.createElement("form");
      form.id = "edit-product-" + id;

      form.innerHTML = `
      <input type="text" name="title" placeholder="title" value="${title}">
      <input type="text" name="price" placeholder="price" value="${price}">
      <button type="submit">Save</button>`;

      Card.appendChild(form);

      form.addEventListener("submit", (event) => {
        event.preventDefault();

        fetchUpdateProduct(
          id,
          event.target.title.value,
          Number(event.target.price.value)
        );
      });
    };

    productCard.append(
      titleEl,
      img,
      descriptionEl,
      priceElement,
      deleteBtn,
      editBtn
    );
    productsList.appendChild(productCard);
  });
}

// не забудем вызвать функцию
fetchProducts();

// CRUD = Create Read Update Delete

//Удаление продукта
async function fetchDeleteProduct(productId) {
  const productCard = document.getElementById("product-" + productId);
  const res = await fetch(
    `https://api.escuelajs.co/api/v1/products/${productId}`,
    { method: "DELETE" }
  );

  if (res.ok) {
    productsList.removeChild(productCard);
    //window.location.href = "/";//информация будет обновляться с перезагрузки страницы в браузере
  }
}

async function fetchUpdateProduct(id, title, price) {
  const res = await fetch(`https://api.escuelajs.co/api/v1/products/${id}`, {
    method: "PUT",
    body: JSON.stringify({ title, price }),
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) {
    console.error("Category update error:", await res.json());
  }
}
fetchCategories();
