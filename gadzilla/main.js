let carts = document.querySelectorAll(".add-cart");

let products = [
  {
    name: "Bose QuietComfort",
    tag: "BoseComfort",
    price: 1489,
    inCart: 0,
  },
  {
    name: "Logitech G502 Hero",
    tag: "G502",
    price: 399,
    inCart: 0,
  },
  {
    name: "Nintendo Switch Pro",
    tag: "nintendo",
    price: 264.0,
    inCart: 0,
  },
  {
    name: "Razer Kitty",
    tag: "Kitty",
    price: 622,
    inCart: 0,
  },
  {
    name: "Thunderbolt 3 Cable",
    tag: "thunderbolt",
    price: 5,
    inCart: 0,
  },
  {
    name: "Logitech C413",
    tag: "G413",
    price: 429,
    inCart: 0,
  },
  {
    name: "Logitech G913 TKL",
    tag: "G913",
    price: 929,
    inCart: 0,
  },
  {
    name: "Razer Wolverine",
    tag: "wolverine",
    price: 663,
    inCart: 0,
  },
  {
    name: "Q7-Pro Powerbank",
    tag: "Q7",
    price: 93,
    inCart: 0,
  },
  {
    name: "Corsair Audio SP250",
    tag: "corsairsp250",
    price: 1045,
    inCart: 0,
  },
  {
    name: "Bose QuietControl 30",
    tag: "BoseControl",
    price: 1419,
    inCart: 0,
  },
  {
    name: "Desk Metal stand",
    tag: "DeskMetal",
    price: 10,
    inCart: 0,
  },
];

for (let i = 0; i < carts.length; i++) {
  carts[i].addEventListener("click", () => {
    cartNumbers(products[i]);
    totalCost(products[i]);
  });
}

function onLoadCartNumbers() {
  let productNumbers = localStorage.getItem("cartNumbers");

  if (productNumbers) {
    document.querySelector(".cart span").textContent = productNumbers;
  }
}

function cartNumbers(product) {
  let productNumbers = localStorage.getItem("cartNumbers");

  productNumbers = parseInt(productNumbers);

  if (productNumbers) {
    localStorage.setItem("cartNumbers", productNumbers + 1);
    document.querySelector(".cart span").textContent = productNumbers + 1;
  } else {
    localStorage.setItem("cartNumbers", 1);
    document.querySelector(".cart span").textContent = 1;
  }
  setItems(product);
}

function setItems(product) {
  let cartItems = localStorage.getItem("productsInCart");

  cartItems = JSON.parse(cartItems);

  if (cartItems != null) {
    if (cartItems[product.tag] == undefined) {
      cartItems = {
        ...cartItems,
        [product.tag]: product,
      };
    }
    cartItems[product.tag].inCart += 1;
  } else {
    product.inCart = 1;
    cartItems = {
      [product.tag]: product,
    };
  }

  localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}

function totalCost(product) {
  let cartCost = localStorage.getItem("totalCost");
  console.log("My cartCost is", cartCost);

  if (cartCost != null) {
    cartCost = parseInt(cartCost);
    localStorage.setItem("totalCost", cartCost + product.price);
  } else {
    localStorage.setItem("totalCost", product.price);
  }
}

function displaycart() {
  let cartItems = localStorage.getItem("productsInCart");
  cartItems = JSON.parse(cartItems);

  let cartNumber = localStorage.getItem("cartNumbers");

  let productContainer = document.querySelector(".products");
  let cartCost = localStorage.getItem("totalCost");

  if (cartItems && productContainer) {
    if (cartNumber > 10) {
      productContainer.innerHTML = "";
      Object.values(cartItems).map((item) => {
        productContainer.innerHTML += `
      <div class="product">
        <ion-icon name="close-circle-outline"></ion-icon>
        <img style="width:40%" src="./product/${item.tag}.png">
        <span>${item.name}</span>
      </div>
      <div class="price">RM${item.price}.00</div>
      <div class="quantity">
      <ion-icon name="remove-circle-outline"></ion-icon>
      <span>${item.inCart}</span>
      <ion-icon name="add-circle-outline"></ion-icon>
      </div>
      <div class="total">
      RM${item.inCart * item.price}.00
      </div>`;
      });

      productContainer.innerHTML += `
      <div class="basketSubtotalContainer">
        <h6 class="font basketTotalTitle">Subtotal:</h6>
        <h6 class="font basketTotal">
        RM${cartCost}
        </h6>
      </div>
      <div class="basketDiscountContainer">
        <h6 class="font basketDiscountTitle">Discount(15%):</h6>
        <h6 class="font basketDiscount">
        (RM${(cartCost * 15) / 100})
        </h6>
      </div>
      <div class="basketTotalContainer">
        <h4 class="font basketTotalTitle">Total Cart:</h4>
        <h4 class="font basketTotal">
        RM${(cartCost * 75) / 100}
        </h4>
      </div>
      <div class=btn-back-checkout>
        <div class=btn-back>
          <button><a href="product.html">Back</a></button>
        </div>
        <div class=btn-checkout>
          <button id="myBtn">Checkout</button>
        </div>
      </div>`;
    } else if (cartNumber >= 5) {
      productContainer.innerHTML = "";
      Object.values(cartItems).map((item) => {
        productContainer.innerHTML += `
      <div class="product">
        <ion-icon name="close-circle-outline"></ion-icon>
        <img style="width:40%" src="./product/${item.tag}.png">
        <span>${item.name}</span>
      </div>
      <div class="price">RM${item.price}.00</div>
      <div class="quantity">
      <ion-icon name="remove-circle-outline"></ion-icon>
      <span>${item.inCart}</span>
      <ion-icon name="add-circle-outline"></ion-icon>
      </div>
      <div class="total">
      RM${item.inCart * item.price}.00
      </div>`;
      });

      productContainer.innerHTML += `
      <div class="basketSubtotalContainer">
        <h6 class="font basketTotalTitle">Subtotal:</h6>
        <h6 class="font basketTotal">
        RM${cartCost}
        </h6>
      </div>
      <div class="basketDiscountContainer">
        <h6 class="font basketDiscountTitle">Discount(5%):</h6>
        <h6 class="font basketDiscount">
        (RM${(cartCost * 5) / 100})
        </h6>
      </div>
      <div class="basketTotalContainer">
          <h4 class="font basketTotalTitle">Total Cart:</h4>
          <h4 class="font basketTotal">
          RM${(cartCost * 95) / 100}
          </h4>
      </div>
      <div class=btn-back-checkout>
        <div class=btn-back>
          <button><a href="product.html">Back</a></button>
        </div>
        <div class=btn-checkout>
          <button id="myBtn">Checkout</button>
        </div>
      </div>`;
    } else if (cartNumber >= 1) {
      productContainer.innerHTML = "";
      Object.values(cartItems).map((item) => {
        productContainer.innerHTML += `
        <div class="product">
          <ion-icon name="close-circle-outline"></ion-icon>
          <img style="width:40%" src="./product/${item.tag}.png">
          <span>${item.name}</span>
        </div>
        <div class="price">RM${item.price}.00</div>
        <div class="quantity">
        <ion-icon name="remove-circle-outline"></ion-icon>
        <span>${item.inCart}</span>
        <ion-icon name="add-circle-outline"></ion-icon>
        </div>
        <div class="total">
        RM${item.inCart * item.price}.00
        </div>`;
      });

      productContainer.innerHTML += `
      <div class="basketSubtotalContainer">
        <h6 class="font basketTotalTitle">Subtotal:</h6>
        <h6 class="font basketTotal">
        RM${cartCost}
        </h6>
      </div>
      <div class="basketTotalContainer">
        <h4 class="font basketTotalTitle">Total Cart:</h4>
        <h4 class="font basketTotal">
        RM${cartCost}.00
        </h4>
      </div>
      <div class=btn-back-checkout>
        <div class=btn-back>
          <button><a href="product.html">Back</a></button>
        </div>
        <div class=btn-checkout>
          <button id="myBtn">Checkout</button>
        </div>
      </div>
      `;
    }
  }
}

function displayCheckoutCart() {
  let cartItems = localStorage.getItem("productsInCart");
  cartItems = JSON.parse(cartItems);

  let cartNumber = localStorage.getItem("cartNumbers");

  let productContainer = document.querySelector(".checkout-products");
  let cartCost = localStorage.getItem("totalCost");

  if (cartItems && productContainer) {
    if (cartNumber > 10) {
      productContainer.innerHTML = "";
      Object.values(cartItems).map((item) => {
        productContainer.innerHTML += `
      <div class="product background-product">
        <span>${item.name}</span>
      </div>
      <div class="price">RM${item.price}.00</div>
      <div class="quantity">
      <span>${item.inCart}</span>
      </div>
      <div class="total">
      RM${item.inCart * item.price}.00
      </div>`;
      });
      if (cartCost > 10) {
        productContainer.innerHTML += `
        <div class="basketSubtotalContainer">
          <h6 class="font basketTotalTitle">Subtotal:</h6>
          <h6 class="font basketTotal">
          RM${cartCost}
          </h6>
        </div>
        <div class="basketPostageContainer">
          <h6 class="font basketTotalTitle">Postage Fee:</h6>
          <h6 class="font basketTotal">
          RM 0.00
          </h6>
        </div>
        <div class="basketDiscountContainer">
          <h6 class="font basketDiscountTitle">Discount:</h6>
          <h6 class="font basketDiscount">
          ((RM${(cartCost * 15) / 100})
          </h6>
        </div>
        <div class="basketTotalContainer">
            <h4 class="font basketTotalTitle">Total Cart:</h4>
            <h4 class="font basketTotal">
            RM${(cartCost * 75) / 100}
            </h4>
        </div>
        <div class=btn-back-checkout>
          <div class=btn-checkout>
            <button id="">Payment</button>
          </div>
        </div>`;
      } else {
        productContainer.innerHTML += `
        <div class="basketSubtotalContainer">
          <h6 class="font basketTotalTitle">Subtotal:</h6>
          <h6 class="font basketTotal">
          RM${cartCost}
          </h6>
        </div>
        <div class="basketPostageContainer">
          <h6 class="font basketTotalTitle">Postage Fee:</h6>
          <h6 class="font basketTotal">
          RM 10.00
          </h6>
        </div>
        <div class="basketDiscountContainer">
          <h6 class="font basketDiscountTitle">Discount:</h6>
          <h6 class="font basketDiscount">
          ((RM${(cartCost * 15) / 100})
          </h6>
        </div>
        <div class="basketTotalContainer">
            <h4 class="font basketTotalTitle">Total Cart:</h4>
            <h4 class="font basketTotal">
            RM${(cartCost * 75) / 100 + 10}
            </h4>
        </div>
        <div class=btn-back-checkout>
          <div class=btn-checkout>
            <button id="">Payment</button>
          </div>
        </div>`;
      }
    } else if (cartNumber >= 5) {
      productContainer.innerHTML = "";
      Object.values(cartItems).map((item) => {
        productContainer.innerHTML += `
      <div class="product background-product">
        <span>${item.name}</span>
      </div>
      <div class="price">RM${item.price}.00</div>
      <div class="quantity">
      <span>${item.inCart}</span>
      </div>
      <div class="total">
      RM${item.inCart * item.price}.00
      </div>`;
      });

      if (cartCost > 10) {
        productContainer.innerHTML += `
        <div class="basketSubtotalContainer">
          <h6 class="font basketTotalTitle">Subtotal:</h6>
          <h6 class="font basketTotal">
          RM${cartCost}
          </h6>
        </div>
        <div class="basketPostageContainer">
          <h6 class="font basketTotalTitle">Postage Fee:</h6>
          <h6 class="font basketTotal">
          RM 0.00
          </h6>
        </div>
        <div class="basketDiscountContainer">
          <h6 class="font basketDiscountTitle">Discount:</h6>
          <h6 class="font basketDiscount">
          (RM${(cartCost * 5) / 100})
          </h6>
        </div>
        <div class="basketTotalContainer">
            <h4 class="font basketTotalTitle">Total Cart:</h4>
            <h4 class="font basketTotal">
            RM${(cartCost * 95) / 100}
            </h4>
        </div>
        <div class=btn-back-checkout>
          <div class=btn-checkout>
            <button id="">Payment</button>
          </div>
        </div>`;
      } else {
        productContainer.innerHTML += `
        <div class="basketSubtotalContainer">
          <h6 class="font basketTotalTitle">Subtotal:</h6>
          <h6 class="font basketTotal">
          RM${cartCost}
          </h6>
        </div>
        <div class="basketPostageContainer">
          <h6 class="font basketTotalTitle">Postage Fee:</h6>
          <h6 class="font basketTotal">
          RM 10.00
          </h6>
        </div>
        <div class="basketDiscountContainer">
          <h6 class="font basketDiscountTitle">Discount:</h6>
          <h6 class="font basketDiscount">
          (RM${(cartCost * 5) / 100})
          </h6>
        </div>
        <div class="basketTotalContainer">
            <h4 class="font basketTotalTitle">Total Cart:</h4>
            <h4 class="font basketTotal">
            RM${(cartCost * 95) / 100 + 10}
            </h4>
        </div>
        <div class=btn-back-checkout>
          <div class=btn-checkout>
            <button id="">Payment</button>
          </div>
        </div>`;
      }
    } else if (cartNumber >= 1) {
      productContainer.innerHTML = "";
      Object.values(cartItems).map((item) => {
        productContainer.innerHTML += `
        <div class="product background-product">
          <span>${item.name}</span>
        </div>
        <div class="price">RM${item.price}.00</div>
        <div class="quantity">
        <span>${item.inCart}</span>
        </div>
        <div class="total">
        RM${item.inCart * item.price}.00
        </div>`;
      });

      if (cartCost > 10) {
        productContainer.innerHTML += `
      <div class="basketSubtotalContainer">
        <h6 class="font basketTotalTitle">Subtotal:</h6>
        <h6 class="font basketTotal">
        RM${cartCost}
        </h6>
      </div>
      <div class="basketPostageContainer">
          <h6 class="font basketTotalTitle">Postage Fee:</h6>
          <h6 class="font basketTotal">
          RM 0.00
          </h6>
        </div>
      <div class="basketTotalContainer">
        <h4 class="font basketTotalTitle">Total Cart:</h4>
        <h4 class="font basketTotal">
        RM${cartCost}.00
        </h4>
      </div>
      <div class=btn-back-checkout>
        <div class=btn-checkout>
          <button id="">Payment</button>
        </div>
      </div>
      `;
      } else {
        productContainer.innerHTML += `
        <div class="basketSubtotalContainer">
          <h6 class="font basketTotalTitle">Subtotal:</h6>
          <h6 class="font basketTotal">
          RM${cartCost}
          </h6>
        </div>
        <div class="basketPostageContainer">
          <h6 class="font basketTotalTitle">Postage Fee:</h6>
          <h6 class="font basketTotal">
          RM 10.00
          </h6>
        </div>
        <div class="basketTotalContainer">
          <h4 class="font basketTotalTitle">Total Cart:</h4>
          <h4 class="font basketTotal">
          RM${cartCost}.00
          </h4>
        </div>
        <div class=btn-back-checkout>
          <div class=btn-checkout>
            <button id="">Payment</button>
          </div>
        </div>
        `;
      }
    }
  }
}

function displayCheckout() {
  // Get the modal
  var modal = document.getElementById("myModal");

  // Get the button that opens the modal
  var btn = document.getElementById("myBtn");

  // Get the <span> element that closes the modal
  var span = document.getElementsByClassName("close")[0];

  // When the user clicks the button, open the modal
  btn.onclick = function () {
    modal.style.display = "block";
  };

  // When the user clicks on <span> (x), close the modal
  span.onclick = function () {
    modal.style.display = "none";
  };

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };
}

onLoadCartNumbers();
displaycart();
displayCheckoutCart();
displayCheckout();
