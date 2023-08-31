fetch("https://kea-alt-del.dk/t7/api/products")
  .then((res) => res.json())
  .then(showProducts);

function showProducts(products) {
  //looper og kalder showProduct
  products.forEach(showProduct);
}

function showProduct(product) {
  console.log(product);
  //fang template
  const template = document.querySelector("#ProductTemplate").content;
  //lav en kopi
  const copy = template.cloneNode(true);

  // DISCOUNT
  const price = product.price;
  const discount = product.discount;
  let finalPrice = price;

  if (discount && discount !== 0) {
    finalPrice = price - (price * discount) / 100;
    // Change the HTML to display discount and final price
    copy.querySelector(".discounted").style.display = "block";
    copy.querySelector(".discounted p:nth-child(2)").textContent = `${discount}% off`;
    copy.querySelector(".finalprice").textContent = `Now DKK ${finalPrice.toFixed(0)},-`;
  } else {
    // Hide the discount section when there's no discount
    copy.querySelector(".discounted").style.display = "none";
  }

  // Round the total to a whole number
  const total = Math.round(product.price - (product.price / 100) * product.discount);

  //ændre indhold
  copy.querySelector("h3").textContent = product.productdisplayname;
  copy.querySelector(".articletype").textContent = product.articletype;
  copy.querySelector(".brandname").textContent = product.brandname;
  copy.querySelector(".price span").textContent = product.price;
  copy.querySelector(".finalprice").textContent = total;
  copy.querySelector("img").src = `https://kea-alt-del.dk/t7/images/webp/640/${product.id}.webp`;
  //Udsolgt produkt
  if (product.soldout) {
    copy.querySelector("article").classList.add("soldOut");
  }

  copy.querySelector(".read-more").setAttribute("href", `product.html?id=${product.id}`);

  //copy.querySelector(".soldOut").textContent = souldout;
  //appende
  document.querySelector("main").appendChild(copy);
}

/*  <template id="ProductTemplate">
    <article class="Product">
      <img
        src="https://kea-alt-del.dk/t7/images/webp/640/1573.webp"
        alt="Sahara Team India Fanwear Round Neck Jersey"
      >
      <h3>Sahara Team India Fanwear Round Neck Jersey</h3>
      <p class="subtle">Tshirts | Nike</p>
      <p class="price">DKK 1595.-</p>
      <a href="produkt.html">Read more</a>
    </article>
    </template>  */

/* Object {
        id: 1526,
        gender: "Unisex",
        category: "Accessories",
        subcategory: "Bags",
articletype: "Backpacks", season: "Fall", productionyear: 2010, usagetype: "Sports",
productdisplayname: "Big Cat Backpack Black", price: 1299, … } */
