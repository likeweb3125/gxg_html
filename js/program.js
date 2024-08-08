document.addEventListener("DOMContentLoaded", () => {

    // program_ul
    const programMenu = document.querySelectorAll('.program_ul .tit_box button');
    programMenu.forEach(el => {
        el.addEventListener('click', (e) => {
            console.log(1);
            let liEl = e.target.closest('li');
            liEl.classList.toggle('on')
        });
    });


    //swipe_box
    var swipeBoxes = document.querySelectorAll('.swipe_box');

    swipeBoxes.forEach(function(swipeBox) {
        // 스크롤 이벤트 리스너 추가
        swipeBox.addEventListener('scroll', function() {
            var swipeImg = swipeBox.querySelector('.swipe_img');
            if (swipeImg) {
                fadeOut(swipeImg, 100);
            }
        });

        // 터치 이동 이벤트 리스너 추가
        swipeBox.addEventListener('touchmove', function() {
            var swipeImg = swipeBox.querySelector('.swipe_img');
            if (swipeImg) {
                fadeOut(swipeImg, 100);
            }
        });
    });


    // fadeOut 함수
    function fadeOut(element, duration) {
        var opacity = 1;
        var interval = 50;
        var gap = interval / duration;

        function fade() {
            opacity -= gap;
            if (opacity <= 0) {
                opacity = 0;
                element.style.display = 'none';
            }
            element.style.opacity = opacity;
            if (opacity > 0) {
                setTimeout(fade, interval);
            }
        }

        fade();
    }
});