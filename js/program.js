document.addEventListener("DOMContentLoaded", () => {

    // FAQ
    const programMenu = document.querySelectorAll('.program_ul .tit_box button');
    programMenu.forEach(el => {
        el.addEventListener('click', (e) => {
            console.log(1);
            let liEl = e.target.closest('li');
            liEl.classList.toggle('on')
        });
    });



});