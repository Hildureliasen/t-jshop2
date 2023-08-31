const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");
const productDetailTemplate = document.querySelector("#ProductDetailTemplate").content;

fetch("https://kea-alt-del.dk/t7/api/products/" + id)
  .then((response) => response.json())
  .then((data) => showProduct(data));

function showProduct(product) {
  const productImg = document.querySelector(".product_img img");
  const productText = document.querySelector(".product_text");
  productImg.src = `https://kea-alt-del.dk/t7/images/webp/640/${product.id}.webp`;
  const productDetailCopy = productDetailTemplate.cloneNode(true);

  //Price
  const priceText = productDetailCopy.querySelector("h3");
  priceText.textContent = `Price: DKK ${product.price}`;

  // Discount
  const discount = product.discount || 0;
  const total = Math.round(product.price - (product.price / 100) * product.discount);

  if (discount > 0) {
    const discountSection = productDetailCopy.querySelector(".discounted");
    discountSection.style.display = "block";
    discountSection.querySelector("p:nth-child(2)").textContent = `-${discount}%`;
    productDetailCopy.querySelector(".finalprice").textContent = `Now DKK ${total},-`;
  } else {
    productDetailCopy.querySelector(".discounted").style.display = "none";
    productDetailCopy.querySelector(".finalprice").textContent = `Now DKK ${product.price},-`;
  }

  //Brand
  const brandText = productDetailCopy.querySelector(".brand");
  brandText.textContent = `Brand: ${product.brandname}`;

  //Category
  const categoryText = productDetailCopy.querySelector(".category");
  categoryText.textContent = `Category: ${product.articletype}`;

  //Udsolgt produkt
  if (product.soldout) {
    productDetailCopy.querySelector(".soldOut2").classList.add("soldOut");
  }

  // Set the final cloned content
  productText.appendChild(productDetailCopy);
}
