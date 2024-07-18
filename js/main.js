document.addEventListener("DOMContentLoaded", () => {
    const headerEl = document.getElementById("header");

    const video = document.querySelector('.video video');
    if(video) {
        const playButton = document.querySelector('.video .btn_video_play');
    
        let videoFlag = false;
        playButton.addEventListener('click', () => {
            if(videoFlag) {
                video.parentNode.classList.add('video_playing');
                video.play();
                videoFlag = false;
            } else {
                video.parentNode.classList.remove('video_playing');
                video.pause();
                videoFlag = true;
            }
        });
    
        video.addEventListener('ended', () => {
            video.currentTime = 0;
            video.play();
        });
    }

    // FAQ
    const faqLink = document.querySelectorAll('.list_faq .q_con a');
    faqLink.forEach(el => {
        el.addEventListener('click', (e) => {
            let liEl = e.target.closest('li');
            liEl.classList.toggle('on')
        });
    });
    
    
    // fade애니메이션 함수
    const animateElement = (element, type, callback, duration) => {
        const startOpacity = type === 'fadeIn' ? 0 : 1;
        const endOpacity = type === 'fadeIn' ? 1 : 0;
        let startTime = null;

        const animationStep = (timestamp) => {
            if (!startTime) {
                startTime = timestamp;
            }

            const progress = timestamp - startTime;
            let opacity = startOpacity + (progress / duration) * (endOpacity - startOpacity);

            opacity = Math.min(Math.max(opacity, 0), 1);
            element.style.opacity = opacity.toFixed(2);

            if (progress < duration) {
                requestAnimationFrame(animationStep);
            } else {
                if (typeof callback === 'function') {
                    callback();
                }
            }
        }

        requestAnimationFrame(animationStep);
    }

    // 메인 팝업 닫기
    const mainPop = document.querySelector('.pop_main');
    const mainPopFn = () => {
        mainPop.querySelector('.main_pop_close').addEventListener('click', (e) => {
            animateElement(mainPop, 'fadeOut', () => {
                mainPop.style.display = 'none';
            }, 200);
        });

        mainPop.querySelector('.dimm').addEventListener('click', (e) => {
            animateElement(mainPop, 'fadeOut', () => {
                mainPop.style.display = 'none';
            }, 200);
        });
    }
    // 메인 팝업 1일 안보기
    const oneDayPopup = () => {
        const checkPopupVisibility = () => {
            const hideUntil = localStorage.getItem('oneDayPopup');
            if (hideUntil) {
                const now = new Date();
                if (now >= new Date(hideUntil)) {
                    mainPop.style.display = 'block';
                    localStorage.removeItem('oneDayPopup');
                }
            } else {
                mainPop.style.display = 'block';
            }
        }
        checkPopupVisibility();
        document.getElementById('oneDayPopup').addEventListener('click', (e) => {
            e.preventDefault();
            hideForOneDay();
        });
        const hideForOneDay = () => {
            const now = new Date();
            const hideUntil = new Date(now.getTime() + 24 * 60 * 60 * 1000); // 현재 시간에서 24시간 후
            localStorage.setItem('oneDayPopup', hideUntil.toISOString());
            animateElement(mainPop, 'fadeOut', () => {
                mainPop.style.display = 'none';
            }, 200);
        }
    }
    if(mainPop) {
        mainPopFn();
        oneDayPopup();
    }




    









});



