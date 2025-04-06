document.querySelector(".login-form").addEventListener("submit", function (event) {
    event.preventDefault(); // Ngăn chặn reload trang

    const username = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const repassword = document.getElementById("repassword").value;

    // Kiểm tra mật khẩu nhập lại có khớp không
    if (password !== repassword) {
        alert("Mật khẩu nhập lại không khớp!");
        return;
    }

    // Kiểm tra mật khẩu có đủ mạnh không (ít nhất 6 ký tự)
    if (password.length < 6) {
        alert("Mật khẩu phải có ít nhất 6 ký tự!");
        return;
    }

    // Kiểm tra email có hợp lệ không (chứa '@' và '.')
    if (!username.includes("@") || !username.includes(".")) {
        alert("Vui lòng nhập email hợp lệ!");
        return;
    }

    alert("Đăng ký thành công! Bạn có thể đăng nhập.");
    window.location.href = "login.html";
});
