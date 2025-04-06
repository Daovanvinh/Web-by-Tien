document.querySelector('.dropdown-btn').addEventListener('click', function () {
    let parent = this.parentElement;
    parent.classList.toggle('active');
});
document.addEventListener("DOMContentLoaded", function () {
  const user = JSON.parse(localStorage.getItem("loggedInUser"));

  if (user) {
      document.getElementById("username").textContent = user.username;
  } else {
      document.getElementById("welcomeMessage").textContent = "Bạn chưa đăng nhập!";
  }

  // Đăng xuất
  document.getElementById("logout").addEventListener("click", function () {
      localStorage.removeItem("loggedInUser"); // Xóa user khỏi localStorage
      window.location.href = "login.html"; // Quay lại trang đăng nhập
  });
});
document.addEventListener("DOMContentLoaded", () => {
  loadProducts();
  updateCartBadge();
});

async function loadProducts() {
  const response = await fetch("js/product.json");
  const products = await response.json();
  const productList = document.getElementById("product-list");

  productList.innerHTML = products.map((product, index) => `
    <div class="product-card">
      <img src="${product.image}" class="product-img" alt="${product.title}">
      <div class="product-info">
        <a href = "${product.url}" style = "text-decoration:none;"><h5 class="product-title">${product.title}</h5></a>
        <p class="product-author">${product.author}</p>
        <p class="product-price">${product.price} VNĐ</p>
        <div class="product-stars">${"⭐".repeat(product.rating)}</div>
        <button class="add-to-cart" data-index="${index}"><i class="fas fa-shopping-cart"></i></button>
      </div>
    </div>
  `).join("");

  document.querySelectorAll(".add-to-cart").forEach(button => {
      button.addEventListener("click", (e) => {
          addToCart(products[e.target.dataset.index]);
      });
  });
}

function addToCart(product) {
  let cart = JSON.parse(localStorage.getItem("cart")) || []; // Kiểm tra giỏ hàng có tồn tại không
  cart.push(product);
  localStorage.setItem("cart", JSON.stringify(cart)); // Lưu lại vào localStorage
  updateCartBadge();
}

function updateCartBadge() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  document.querySelector(".badge").textContent = cart.length;
}

