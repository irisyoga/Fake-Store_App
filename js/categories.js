const categoryList = document.getElementById("category-list");
const messageEl = document.getElementById("message");

async function fetchCategories() {
  const res = await fetch("https://api.escuelajs.co/api/v1/categories");
  const categories = await res.json();
  console.log(categories);

  categories.forEach((category) => {
    const { name, image } = category;

    const item = document.createElement("li");
    item.classList.add("category-card");

    const nameEl = document.createElement("h2");
    nameEl.textContent = name;

    const img = document.createElement("img");
    img.classList.add("category-image");
    img.src = image;
    img.referrerPolicy = "no-referrer";

    item.appendChild(nameEl);
    item.appendChild(img);
    categoryList.appendChild(item);
  });

   if (res.ok) {
    messageEl.textContent = "Successfully category loading";
  } else {
    messageEl.textContent = "Error loading category!";
  }
 
} 
fetchCategories();






