const categoryList = document.getElementById("category-list");
const messageEl = document.getElementById("message");

async function fetchCategories() {
  const res = await fetch("https://api.escuelajs.co/api/v1/categories");
  if (!res.ok) {
    throw Error("Failed to fetch categories");
  }
  const categories = await res.json();
  //const{id, image, name, slug} = obj;
  console.log(categories);

  categories.forEach((category) => {
    const { id, image, name } = category; // мы достали все эти вещи с помощью дист.

    //Создаем элемент списка
    const itemCard = document.createElement("li");
    itemCard.id = "category-" + id; //присваиваем id элементу списка
    itemCard.classList.add("category-card");

    //Название
    const nameEl = document.createElement("h2");
    nameEl.textContent = name;

    //Изображение
    const img = document.createElement("img");
    img.src = image;
    img.classList.add("category-image");
    img.referrerPolicy = "no-referrer";

    //Форма редактирования (изначально скрыта)
    const form = document.createElement("form");
    form.style.display = "none";
    form.innerHTML = `
      <input type="text" name="name" placeholder="name" value="${name}">
      <input type="text" name="image" placeholder="image" value="${image}">
      <button type="submit">Save</button>`;

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      //console.log(event.target.name.value);
      //console.log(event.target.image.value);
      fetchUpdateCategory(
        id,
        event.target.name.value,
        event.target.image.value,
        itemCard
      );
    });

    //Кнопка "Edit"
    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.type = "button";
    editBtn.onclick = () => {
      if (form.style.display === "block") {
        form.style.display = "none";
      } else {
        form.style.display = "block";
      }
    };

    //Кнопка "Delete"
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.type = "button";

    deleteBtn.onclick = () => {
      fetchDeleteCategory(id, itemCard);
    };

    //Добавляем все элементы списка
    itemCard.append(nameEl, img, editBtn, deleteBtn, form);
    categoryList.append(itemCard);
  });
}

async function fetchUpdateCategory(id, name, image, itemCard) {
  const res = await fetch(`https://api.escuelajs.co/api/v1/categories/${id}`, {
    method: "PUT",
    body: JSON.stringify({ name, image }),
    headers: { "Content-Type": "application/json" },
  });
  if (res.ok) {
    //item.firstChild.textContent = name;
    itemCard.querySelector("h2").textContent = name;
    itemCard.getElementsByTagName("img")[0].src = image;
  }
}
//Удаление категорий

async function fetchDeleteCategory(id, itemCard) {
  const res = await fetch(`https://api.escuelajs.co/api/v1/categories/${id}`, {
    method: "DELETE",
  });
  if (res.ok) {
    categoryList.removeChild(itemCard);
    //window.location.href = "/";//информация будет обновляться с перезагрузки страницы в браузере
  }
}
/*
function fetchDeleteCategory(id, itemCard) {
  const element = document.getElementById("category-" + id);
  if (itemCard) {
    itemCard.remove();
  } 
} */

fetchCategories();
