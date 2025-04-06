document.addEventListener("DOMContentLoaded", () => {
    displayCartItems();
    updateCartBadge();
});

function displayCartItems() {
    let cart = JSON.parse(localStorage.getItem("cart")) || []; // Luôn lấy dữ liệu mới từ localStorage
    const cartItemsContainer = document.getElementById("cart-items");
    const totalPriceContainer = document.getElementById("total-price");

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = "<p>Giỏ hàng của bạn đang trống.</p>";
        totalPriceContainer.textContent = "Tổng tiền: 0 VNĐ";
        return;
    }

    cartItemsContainer.innerHTML = cart.map((product, index) => `
        <div class="cart-item">
            <img src="${product.image}" alt="${product.title}">
            <h5>${product.title}</h5>
            <p>${product.price} VNĐ</p>
            <button class="remove-item" data-index="${index}">Xóa</button>
        </div>
    `).join("");

    const totalPrice = cart.reduce((sum, product) => sum + parseFloat(product.price.replace(/\D/g, '')), 0);
    totalPriceContainer.textContent = `Tổng tiền: ${totalPrice.toLocaleString()} VNĐ`;

    document.querySelectorAll(".remove-item").forEach(button => {
        button.addEventListener("click", (e) => {
            removeFromCart(e.target.dataset.index);
        });
    });
}

function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    displayCartItems();
    updateCartBadge();
}

function updateCartBadge() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    document.querySelector(".badge").textContent = cart.length;
}

// Xóa toàn bộ giỏ hàng
document.getElementById("clear-cart").addEventListener("click", () => {
    localStorage.removeItem("cart"); // Xóa dữ liệu giỏ hàng
    localStorage.setItem("cart", JSON.stringify([])); // Đặt lại giỏ hàng rỗng để tránh lỗi
    displayCartItems();
    updateCartBadge();
});
