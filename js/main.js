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




    // 스크롤이벤트
    window.addEventListener("scroll", () => {
        // const winScroll = this.scrollY;
        // winScroll > 0 ? headerEl.classList.add("active") : headerEl.classList.remove("active");

    });
    window.dispatchEvent(new Event("scroll"));

    // 리사이즈 이벤트
    window.addEventListener("resize", () => {
        // const headerHeight = headerEl.clientHeight;
        // const conWrap = document.querySelector(".content_wrap");
        // conWrap.style.paddingTop = `${headerHeight}px`;
    });
    window.dispatchEvent(new Event("resize"));











});



