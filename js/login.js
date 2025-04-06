document.querySelector(".login-form").addEventListener("submit", function (event) {
    event.preventDefault(); // Ngăn chặn form submit mặc định

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    fetch("js/login.json")
        .then(response => response.json())
        .then(data => {
            const users = data.users;
            const user = users.find(user => user.username === email && user.password === password);

            if (user) {
                localStorage.setItem("loggedInUser", JSON.stringify(user)); // Lưu thông tin user
                alert(`Đăng nhập thành công! Xin chào, ${user.username}`);
                if (user.type === "admin") {
                    window.location.href = "admin.html";
                } else {
                    window.location.href = "index.html";
                }
            } else {
                alert("Sai tên đăng nhập hoặc mật khẩu!");
            }
        })
        .catch(error => console.error("Lỗi tải dữ liệu:", error));
});
