document.addEventListener("DOMContentLoaded", () => {
    const headerEl = document.getElementById("header");

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

    const gnbLinks = headerEl.querySelectorAll('.gnb > li');

    gnbLinks.forEach(link => {
        link.addEventListener('mouseenter', () => {
            headerEl.classList.add('on');
        });
    
        link.addEventListener('mouseleave', () => {
            headerEl.classList.remove('on'); // Add 'on' class back on mouse leave (if needed)
        });
    });



    // const video = document.querySelector('.video video');
    // if(video) {
    //     const playButton = document.querySelector('.video .btn_video_play');
    
    //     let videoFlag = false;
    //     playButton.addEventListener('click', () => {
    //         if(videoFlag) {
    //             video.parentNode.classList.add('video_playing');
    //             video.play();
    //             videoFlag = false;
    //         } else {
    //             video.parentNode.classList.remove('video_playing');
    //             video.pause();
    //             videoFlag = true;
    //         }
    //     });
    
    //     video.addEventListener('ended', () => {
    //         video.currentTime = 0;
    //         video.play();
    //     });
    // }

    // FAQ
    const faqLink = document.querySelectorAll('.list_faq .q_con a');
    faqLink.forEach(el => {
        el.addEventListener('click', (e) => {
            let liEl = e.target.closest('li');
            liEl.classList.toggle('on')
        });
    });

    // section class on
    const section = document.querySelectorAll('.section');
    const sectionOn = () => {
        const windowHeight = document.documentElement.clientHeight;
        section.forEach((element, index) => {
            const currentTop = element.getBoundingClientRect().top;
            if (currentTop < windowHeight * 0.5) {
                section[index].classList.add('on');
            }
        });
    }


    // loop할 시 버그생김
    // section2 슬라이더1
    if(document.querySelector('.main_content')) {
        let main2Slider1, main2Slider2;
        let isUpdating = false;

        const main2InitializeSliders = () => {
            main2Slider2 = new Swiper(".section2_slider2", {
                observer: true,
                observeParents: true,
                simulateTouch: false,
                speed: 600,
                autoplay: {
                    delay: 2000,
                },
                pagination: {
                    el: '.section2_slider2 .swiper-pagination',
                    type: 'bullets',
                },
            });

            main2Slider1 = new Swiper(".section2_slider1", {
                navigation: {
                    nextEl: ".slider2 .swiper-button-next",
                    prevEl: ".slider2 .swiper-button-prev",
                },
                observer: true, 
                observeParents: true,
                simulateTouch: false,
                speed: 600,
                autoplay: {
                    delay: 2000,
                },
            });

            addEventListeners();
        };

        const addEventListeners = () => {
            main2Slider1.on('slideChange', () => {
                if (!isUpdating) {
                    isUpdating = true;
                    main2Slider2.slideTo(main2Slider1.realIndex);
                    updateRollingText(main2Slider1.realIndex);
                    isUpdating = false;
                }
            });

            main2Slider2.on('slideChange', () => {
                if (!isUpdating) {
                    isUpdating = true;
                    main2Slider1.slideTo(main2Slider2.realIndex);
                    updateRollingText(main2Slider2.realIndex);
                    isUpdating = false;
                }
            });
        };

        document.querySelectorAll('.rolling_txt .item_txt')[0].classList.add('on');
        const updateRollingText = (activeIndex) => {
            document.querySelectorAll('.rolling_txt .item_txt').forEach((el) => {
                el.classList.remove('on');
            });
            document.querySelector(`.rolling_txt .item_txt:nth-child(${activeIndex + 1})`).classList.add('on');
        };
        main2InitializeSliders();

        let main2Slider1Mobile, main2Slider2Mobile, main2Slider3Mobile, main2Slider4Mobile;
        const main2InitializeSlidersMobile = () => {
            const swiperOption = {
                spaceBetween: 8,
                observer: true,
                observeParents: true,
                slidesPerView: 1.5,
                scrollbar: {
                    el: '.swiper-scrollbar',
                },
            }
            main2Slider1Mobile = new Swiper(".m_section2_slider1", swiperOption);
            main2Slider2Mobile = new Swiper(".m_section2_slider2", swiperOption);
            main2Slider3Mobile = new Swiper(".m_section2_slider3", swiperOption);
            main2Slider4Mobile = new Swiper(".m_section2_slider4", swiperOption);
        }
        // main2InitializeSlidersMobile();
    }

    const btnTop = document.querySelector('.btn_top');
    if(btnTop) {
        btnTop.addEventListener('click', () => {
            document.body.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    }

    // 헤더 on
    const toggleActiveClass = () => {
        window.scrollY >= 50 ? headerEl.classList.add('active') : headerEl.classList.remove('active');
    };

    // 모바일 메뉴 버튼
    document.querySelector('.btn_m').addEventListener('click', () => {
        const menuWrapper = document.querySelector('.m_gnb_wrap');
        if (menuWrapper) {
            if (menuWrapper.style.display === 'block') {
                document.querySelector('.btn_m').classList.remove('on');
                animateElement(menuWrapper, 'fadeOut', () => {
                    menuWrapper.style.display = 'none';
                    menuWrapper.classList.remove('on');
                }, 400);
            } else {
                menuWrapper.style.display = 'block';
                document.querySelector('.btn_m').classList.add('on');
                animateElement(menuWrapper, 'fadeIn', () => {
                    menuWrapper.classList.add('on');
                }, 400);
            }
        }
    });

    document.querySelectorAll('.m_gnb > li > a').forEach(link => {
        link.addEventListener('click', function(e) {
            const parent = this.parentElement;
            const depth2 = parent.querySelector('.depth2');
            
            if (depth2) {
                e.preventDefault(); 
                
                document.querySelectorAll('.depth2').forEach(el => {
                    const siblingParent = el.parentElement;
                    if (el === depth2) {
                        if (!siblingParent.classList.contains('active')) {
                            siblingParent.classList.add('active');
                            slideDown(el, 'block');
                        }
                    } else {
                        siblingParent.classList.remove('active');
                        slideUp(el, 'none');
                    }
                });
            }
        });
    });
    
    const slideDown = (element, display) => {
        element.style.display = display;
        const height = element.scrollHeight;
        element.style.height = '0px';
        element.style.overflow = 'hidden';
        element.style.transition = 'none';
    
        let start;
        function animate(timestamp) {
            if (!start) start = timestamp;
            const progress = timestamp - start;
            const fraction = Math.min(progress / 200, 1);
            element.style.height = `${height * fraction}px`;
    
            if (fraction < 1) {
                requestAnimationFrame(animate);
            } else {
                element.style.height = '';
                element.style.overflow = '';
            }
        }
        requestAnimationFrame(animate);
    }
    
    const slideUp = (element, display) => {
        const height = element.scrollHeight;
        element.style.height = `${height}px`;
        element.style.overflow = 'hidden';
        element.style.transition = display;
    
        let start;
        const animate = (timestamp) => {
            if (!start) start = timestamp;
            const progress = timestamp - start;
            const fraction = Math.min(progress / 200, 1);
            element.style.height = `${height * (1 - fraction)}px`;
    
            if (fraction < 1) {
                requestAnimationFrame(animate);
            } else {
                element.style.display = display;
                element.style.height = '';
                element.style.overflow = '';
            }
        }
        requestAnimationFrame(animate);
    }

    document.querySelectorAll('.list_program > li > a').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();

            let parentLi = link.parentElement;
            let innerCon = parentLi.querySelector('.inner_con');

            if (!parentLi.classList.contains('on')) {
                document.querySelectorAll('.list_program > li').forEach(li => {
                    if (li !== parentLi && li.classList.contains('on')) {
                        slideUp(li.querySelector('.inner_con'), 'none');
                        li.classList.remove('on');
                    }
                });

                slideDown(innerCon, 'block');
                parentLi.classList.add('on');
            } else {
                slideUp(innerCon, 'none');
                parentLi.classList.remove('on');
            }
        });
    });

    // 사진팝업
    const popPic = document.querySelector('.pop_pic');
    const popFn = () => {
        document.querySelectorAll('.page_info1 .list_pic > li > a').forEach(link => {
            link.addEventListener('click', (e) => {
                const parentLi = link.querySelector('img').closest('li');
                const text = parentLi.querySelector('span').textContent;
                
                popPic.style.display = 'block';
                popPic.querySelector('h3').textContent = text;
                popPic.querySelector('.pop_pic .pop_con img').src = link.querySelector('img').src;
                animateElement(popPic, 'fadeIn', () => {
                    popPic.classList.add('on');
                }, 200);
            });
        });
        popPic.querySelector('.btn_pop_close').addEventListener('click', () => {
            animateElement(popPic, 'fadeOut', () => {
                popPic.style.display = 'none';
                popPic.classList.remove('on');
            }, 200);
        });
    }
    if(popPic) {
        popFn();
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

    


    // 스크롤이벤트
    window.addEventListener('scroll', () => {
        sectionOn();
        toggleActiveClass();
    });

    window.dispatchEvent(new Event('scroll'));

    // 리사이즈 계산 class
    const sizeClass = (width) => {
        let className;
        if (width > 1417) {
            className = 'p_size';
        } else if (width >= 768) {
            className = 't_size';
        } else {
            className = 'm_size';
        }
        if (!document.body.classList.contains(className)) {
            document.body.classList.remove('p_size', 't_size', 'm_size');
            document.body.classList.add(className);
        }
    }
    sizeClass(window.innerWidth);
    
    // 리사이즈 이벤트
    window.addEventListener('resize', () => {
        const windowWidth = window.innerWidth;

        sizeClass(windowWidth);
    });

    window.dispatchEvent(new Event('resize'));







    









});



