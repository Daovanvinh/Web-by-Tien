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

  // Biểu đồ doanh số
const dailySalesChart = new Chart(document.getElementById('dailySalesChart'), {
    type: 'bar',
    data: {
        labels: ['s', 'm', 't', 'w', 't', 'f', 's'],
        datasets: [{
            data: [45, 50, 55, 48, 52, 60, 58],
            backgroundColor: '#007bff',
            barThickness: 15, // Đặt độ dày cột
        }]
    },
    options: {
        legend: { display: false },
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true,
                    max: 80, // Đặt giá trị tối đa cho trục y
                    stepSize: 20, // Bước nhảy cho trục y
                }
            }],
            xAxes: [{
                gridLines: { display: false } // Ẩn đường lưới trục x
            }]
        },
        tooltips: { enabled: false } // Ẩn tooltip
    }
});

// Biểu đồ phiên hiện tại
const sessionChart = new Chart(document.getElementById('sessionChart'), {
    type: 'line',
    data: {
        labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
        datasets: [{
            data: [10, 15, 12, 18, 16, 20, 18, 22, 25, 23],
            borderColor: '#20c997',
            fill: false
        }]
    },
    options: {
        legend: { display: false },
        scales: {
            yAxes: [{
                ticks: {
                    display: false
                }
            }],
            xAxes: [{
                ticks: {
                    display: false
                }
            }],
        },
        tooltips: { enabled: false }, // Ẩn tooltip
        elements: {
            point: { radius: 0 } // Ẩn điểm dữ liệu
        }
    }
});

fetch('js/data_admin.json')
  .then(response => response.json())
  .then(data => {
    const tableBody = document.querySelector('tbody');
    data.forEach(item => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${item.khachHang}</td>
        <td>${item.ngay}</td>
        <td>${item.hoaDon}</td>
        <td>${item.soTien}</td>
        <td><span class="status ${item.tinhTrang === 'Đã Thanh Toán' ? 'status-paid' : 'status-pending'}">${item.tinhTrang}</span></td>
        <td>${item.hoatDong}</td>
      `;
      tableBody.appendChild(row);
    });
  });