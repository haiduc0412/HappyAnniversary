function getLocalTime(callback) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://worldtimeapi.org/api/timezone/Asia/Ho_Chi_Minh');
    xhr.onload = function() {
        if (xhr.status === 200) {
            const responseData = JSON.parse(xhr.responseText);
            const localTime = new Date(responseData.utc_datetime);
            const offset = responseData.utc_offset.split(':')[0];
            localTime.setHours(localTime.getHours() + parseInt(offset));
            callback(localTime);
        } else {
            console.error('Failed to fetch local time');
            // Nếu không lấy được thời gian từ API, sử dụng thời gian hiện tại của máy tính
            callback(new Date());
        }
    };
    xhr.onerror = function() {
        console.error('Failed to fetch local time');
        // Nếu không lấy được thời gian từ API, sử dụng thời gian hiện tại của máy tính
        callback(new Date());
    };
    xhr.send();
}

function heartfly(){
    const hearts = document.querySelectorAll('.heart');
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    const duration = 5000; // Thời gian di chuyển (ms)
    const amplitudeX = 100; // Biên độ di chuyển theo trục X
    const amplitudeY = 50; // Biên độ di chuyển theo trục Y

    function animateHeart(heart) {
        // Tạo vị trí ngẫu nhiên ban đầu
        let startX = Math.random() * screenWidth;
        let startY = Math.random() * screenHeight;

        // Tạo vị trí kết thúc di chuyển
        let endX = startX + (Math.random() * amplitudeX * 2) - amplitudeX;
        let endY = startY + (Math.random() * amplitudeY * 2) - amplitudeY;

        // Tính toán các thông số cho animation
        let start = null;

        function step(timestamp) {
            if (!start) start = timestamp;
            let progress = timestamp - start;
            let percent = Math.min(progress / duration, 1);

            // Tính toán vị trí hiện tại của trái tim
            let currentX = startX + (endX - startX) * percent;
            let currentY = startY + (endY - startY) * percent;

            // Đặt vị trí mới cho trái tim
            heart.style.left = currentX + 'px';
            heart.style.top = currentY + 'px';

            if (percent < 1) {
                // Nếu chưa hoàn thành, tiếp tục animation
                window.requestAnimationFrame(step);
            } else {
                // Nếu hoàn thành, tạo animation mới
                animateHeart(heart);
            }
        }

        // Bắt đầu animation
        window.requestAnimationFrame(step);
    }

    // Bắt đầu animation cho mỗi trái tim
    hearts.forEach(function(heart) {
        animateHeart(heart);
    });
}

document.addEventListener('DOMContentLoaded', function() {
    heartfly();
    const loveButton = document.getElementById('loveButton');
    const pages = document.querySelectorAll('.page');
    loveButton.addEventListener('click', function() {
        flipbook.classList.toggle('hidden'); // Ẩn/hiện cuốn sổ khi click vào nút
    });
    pages.forEach(function(page) {
        page.addEventListener('click', function() {
            page.parentElement.classList.toggle('flip');
        });
    });
    const anniversaryDate = new Date('2024-04-17');
    let timer; // Định nghĩa biến timer ở phạm vi toàn cục

    function countdown() {
        getLocalTime(function(localTime) {
            if (localTime instanceof Date && !isNaN(localTime.getTime())) {
                const now = localTime.getTime();
                const distance = anniversaryDate - now;
                
                const days = Math.floor(distance / (1000 * 60 * 60 * 24));
                const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((distance % (1000 * 60)) / 1000);

                document.getElementById('days').textContent = days;
                document.getElementById('hours').textContent = hours;
                document.getElementById('minutes').textContent = minutes;
                document.getElementById('seconds').textContent = seconds;
                if (distance < 0) {
                    clearInterval(timer);
                    document.getElementById('countdown').innerHTML = '<p>Chúc mừng kỷ niệm 1 năm yêu nhau!</p>';
                    
                }
            } else {
                console.error('Invalid local time');
            }
        });
    }

    countdown();
    timer = setInterval(countdown, 1000); // Gán giá trị cho biến timer ở đây
    //createFirework();
});
