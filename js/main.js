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
    
    







    









});



