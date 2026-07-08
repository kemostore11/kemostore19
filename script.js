/* ===========================
Kemo Store FIXED SCRIPT
=========================== */

let cart = JSON.parse(localStorage.getItem("kemoCart")) || [];

function saveCart() {
    localStorage.setItem("kemoCart", JSON.stringify(cart));
}

function updateCartCounter() {
    const cartBtn = document.querySelector(".header-icons button[onclick='openCart()']");
    if (cartBtn) {
        cartBtn.innerText = "🛒 (" + cart.length + ")";
    }
}

function addToCart(name, price) {
    cart.push({ name, price, qty: 1 });
    saveCart();
    updateCartCounter();
    alert(name + " تمت إضافته إلى السلة");
}

/* ================= SEARCH ================= */

const routes = {
    "شنط": "bags.html",
    "bags": "bags.html",

    "محافظ": "wallets.html",
    "wallets": "wallets.html",

    "ساعات": "watches.html",
    "watch": "watches.html",

    "حقائب سفر": "luggages.html",
    "luggages": "luggages.html",
    "سفر": "luggages.html"
};

function searchProducts() {

    let input = document.getElementById("search").value.trim().toLowerCase();

    for (let key in routes) {
        if (input.includes(key)) {
            window.location.href = routes[key];
            return;
        }
    }

    let products = document.querySelectorAll(".product");

    products.forEach(product => {
        let text = product.innerText.toLowerCase();
        product.style.display = text.includes(input) ? "block" : "none";
    });
}

/* ================= CART ================= */

function openCart() {
    if (cart.length === 0) {
        alert("السلة فارغة");
        return;
    }

    let text = "🛒 سلة المشتريات\n\n";

    cart.forEach((item, index) => {
        text += (index + 1) + ") " + item.name + "\nالسعر: " + item.price + " $" + "\n\n";
    });

    text += "-----------------\nالإجمالي: " + cart.reduce((a, b) => a + b.price, 0)+" $";

    alert(text);
}

/* ================= CATEGORY FILTER ================= */

function loadPageProducts() {

    const pageCategory = document.body.dataset.category;
    const products = document.querySelectorAll(".product");

    if (!products.length) return;

    products.forEach(product => {

        const productCategory = product.dataset.category;

        if (!pageCategory) {
            product.style.display = "block";
            return;
        }

        product.style.display =
            (productCategory === pageCategory) ? "block" : "none";
    });
}
/* ================= INIT ================= */

window.addEventListener("load", () => {
    updateCartCounter();
    loadPageProducts();
});

/* ================= CATEGORY CLICK ================= */

document.querySelectorAll(".cat").forEach((cat, index) => {

    const pages = [
        "watches.html",
        "bags.html",
        "wallets.html",
        "luggages.html"
    ];

    cat.addEventListener("click", () => {
        window.location.href = pages[index];
    });

});

/* ================= ADD PRODUCT ================= */

function addNewProduct() {

    let name = document.getElementById("productName").value;
    let price = document.getElementById("productPrice").value;

const category = document.getElementById("productCategory").value;

    let productDiv = document.createElement("div");
    productDiv.classList.add("product");
    productDiv.setAttribute("data-category", category);

    productDiv.innerHTML = `
        <img src="images/product.jpg">
        <h3>${name}</h3>
        <p>منتج جديد</p>
        <div class="price">
            <span class="new-price">${price}$</span>
        </div>
        <div class="product-category">${category}</div>
        <button onclick="addToCart('${name}',${price})">اضغط هنا لشراء المنتج</button>
    `;

    document.querySelector(".products").appendChild(productDiv);
}
window.addEventListener("scroll", function () {
  let header = document.querySelector(".header");

  if (window.scrollY > 80) {
    header.classList.add("shrink");
  } else {
    header.classList.remove("shrink");
  }
});