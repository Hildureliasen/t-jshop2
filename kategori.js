fetch("https://kea-alt-del.dk/t7/api/categories")
  .then((res) => res.json())
  .then(showCategories);

function showCategories(categories) {
  //looper og kalder showProduct
  categories.forEach(showCategory);
}

function showCategory(oneCategory) {
  console.log(oneCategory);
  //fang template
  const template = document.querySelector("template").content;
  //lav en kopi
  const copy = template.cloneNode(true);

  copy.querySelector(".category").textContent = oneCategory.category;
  copy.querySelector(".category").href = `produktliste.html?category=${oneCategory.category}`;

  //appende
  document.querySelector("main").appendChild(copy);
}
