//!---------------------------------------------------------------------------------------------
$(function () {
    function testWebP(callback) {
        var webP = new Image();
        webP.onload = webP.onerror = function () {
            callback(webP.height == 2);
        };
        webP.src =
            'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
    }
    //*---------------------------------------------------------------------------------------------
    testWebP(function (support) {
        if (support == true) {
            document.querySelector('body').classList.add('webp');
        } else {
            document.querySelector('body').classList.add('no-webp');
        }
    });
    //*---------------------------------------------------------------------------------------------
    /* При клике на гамбургер меню, добавляем класс,
     показываем меню, затемняем фон и запрещаем скроллить фон */
    $('.mini-menu').click(function () {
        $(this).toggleClass('mini-menu--active');
        if ($(this).hasClass('mini-menu--active')) {
            $('.nav').css('right', '0');
            $('body').css('overflow', 'hidden');
            $('.mask').fadeIn();
        } else {
            $('.nav').css('right', '');
            $('body').css('overflow', '');
            $('.mask').fadeOut();
        }
    });
    //*---------------------------------------------------------------------------------------------
    /* При клике на ссылки меню навигации
     перемещаемся по странице к якорям */
    $('a.scroll-to').click(function (e) {
        e.preventDefault();
        let anchor = $(this).attr('href');
        let scrollingDistance = $(anchor).offset().top; //  - Math.round($('header').height())
        $('html, body').animate({ scrollTop: scrollingDistance }, 400);
    });
    //*---------------------------------------------------------------------------------------------
    /* При скролле страницы убираем отступ шапки */
    menuHead();
    $(window).scroll(function () {
        menuHead();
    });
    function menuHead() {
        if ($(this).scrollTop() > 70) {
            $('.header').addClass('header__scroll');
            $('.header__logo').css('margin', '0');
        } else {
            $('.header').removeClass('header__scroll');
            $('.header__logo').css('margin', '');
        }
    }
    //*---------------------------------------------------------------------------------------------
    /* При клике на кнопку воспроизведения видео, 
    скрываем кнопку и добавляем к строке источника видео атрибут для воспроизведения */
    $('.video__play').click(function () {
        $('.video__overlay, .video__play').fadeOut();
        $('.video__file')[0].src += '?autoplay=1';
    });
    //*---------------------------------------------------------------------------------------------
    /* Делаем активным первый элемент карточек и при наведении
     на другие меняем цвет у активных и убирая у не активных */
    let pricingCard = $('.pricing__card');
    pricingCard.filter(':first').addClass('card-active');
    pricingCard.hover(function () {
        $(this).addClass('card-active');
        pricingCard.not(this).removeClass('card-active');
    });
    //*---------------------------------------------------------------------------------------------
    /* При размере экрана меньше "800px" показываем раскрытым первый элемент карточек
     и при клике на шапку карточки показываем её содержимое */
    let pricingCardHeader = $('.pricing__card-header');
    if ($(window).width() <= 800) {
        pricingCardHeader
            .filter(':first')
            .addClass('pricing__card-show')
            .next($('.pricing__card-body'))
            .show();
        // Клик по карточке
        pricingCardHeader.click(function (e) {
            e.preventDefault();
            $(this).toggleClass('pricing__card-show');
            $(this).next($('.pricing__card-body')).slideToggle(350);
            pricingCardHeader
                .not(this)
                .removeClass('pricing__card-show')
                .next($('.pricing__card-body'))
                .slideUp(350);
        });
    } else {
        pricingCardHeader.filter(':first').removeClass('pricing__card-show');
    }

    //*---------------------------------------------------------------------------------------------
    /* Показываем раскрытым первый элемент вопросов
     и при клике на шапку вопроса показываем её содержимое */
    let showQuestions = $('.questions__item-header');
    showQuestions.filter(':first').addClass('questions__item-show');
    showQuestions.click(function () {
        $(this).toggleClass('questions__item-show');
        $(this).next($('.questions__item-body')).slideToggle(350);
        $('.questions__item-header')
            .not(this)
            .removeClass('questions__item-show')
            .next($('.questions__item-body'))
            .slideUp(350);
    });
    //*---------------------------------------------------------------------------------------------
    /* Слайдер блока скриншотов */
    let ScreenshotsSlider = new Swiper('.screenshots__slider-container', {
        initialSlide: 2,
        slidesPerView: 2,
        updateOnWindowResize: true,
        loop: false,
        centeredSlides: true,
        autoHeight: true,
        grabCursor: true,
        effect: 'coverflow',
        coverflowEffect: {
            rotate: 0,
            stretch: 88,
            depth: 230,
            slideShadows: false,
        },
        navigation: {
            nextEl: '.screenshots__button-next',
            prevEl: '.screenshots__button-prev',
        },
        pagination: {
            el: '.screenshots__pagination',
            type: 'bullets',
            dynamicBullets: true,
            clickable: true,
        },
        breakpoints: {
            768: {
                slidesPerView: 3,
            },
        },
    });
    //*---------------------------------------------------------------------------------------------
    /* Слайдер блока отзывов */
    let FeedbackSlider = new Swiper('.feedback__slider-container', {
        initialSlide: 1,
        slidesPerView: 'auto',
        updateOnWindowResize: true,
        centeredSlides: true,
        autoHeight: true,
        spaceBetween: 18,
        grabCursor: true,
        pagination: {
            el: '.feedback__pagination',
            type: 'bullets',
            dynamicBullets: true,
            clickable: true,
        },
    });
    //*---------------------------------------------------------------------------------------------
    /* Анимация подсчета чисел при скролле */
    let flag = true,
        testimonialsItem = $('.testimonials__item'),
        testimonialsNumber = $('.testimonials__number');
    if (testimonialsItem.length > 0) {
        $(window).scroll(function () {
            let scrollEvent =
                $(window).scrollTop() >
                testimonialsItem.offset().top - $(window).height();
            if (scrollEvent && flag) {
                flag = false;
                animation();
            }
        });
        function animation() {
            testimonialsNumber.each(function () {
                let $this = $(this);
                $({ Counter: 0 }).animate(
                    { Counter: $this.text() },
                    {
                        duration: 3000,
                        easing: 'swing',
                        step: function () {
                            $this.text(Math.ceil(this.Counter));
                        },
                    }
                );
            });
        }
    }
    //*---------------------------------------------------------------------------------------------
    /* Функция инициализации Google Maps */
    let contactSection = $('#contact');
    if (contactSection.length > 0) {
        function initMap() {
            let coordinates = { lat: 38.871215, lng: -77.400578 },
                CenterMap = document.getElementById('marker'),
                map = new google.maps.Map(document.getElementById('map'), {
                    zoom: 11,
                    center: coordinates,
                    scrollwheel: false,
                    mapTypeControl: false,
                    streetViewControl: false,
                    fullscreenControl: false,
                    mapTypeId: google.maps.MapTypeId.ROADMAP,
                    zoomControl: true,
                    zoomControlOptions: {
                        position: google.maps.ControlPosition.LEFT_BOTTOM,
                    },
                    styles: [
                        {
                            elementType: 'geometry',
                            stylers: [
                                {
                                    color: '#f5f5f5',
                                },
                            ],
                        },
                        {
                            elementType: 'labels.icon',
                            stylers: [
                                {
                                    visibility: 'off',
                                },
                            ],
                        },
                        {
                            elementType: 'labels.text.fill',
                            stylers: [
                                {
                                    color: '#616161',
                                },
                            ],
                        },
                        {
                            elementType: 'labels.text.stroke',
                            stylers: [
                                {
                                    color: '#f5f5f5',
                                },
                            ],
                        },
                        {
                            featureType: 'administrative.land_parcel',
                            elementType: 'labels.text.fill',
                            stylers: [
                                {
                                    color: '#bdbdbd',
                                },
                            ],
                        },
                        {
                            featureType: 'poi',
                            elementType: 'geometry',
                            stylers: [
                                {
                                    color: '#eeeeee',
                                },
                            ],
                        },
                        {
                            featureType: 'poi',
                            elementType: 'labels.text.fill',
                            stylers: [
                                {
                                    color: '#757575',
                                },
                            ],
                        },
                        {
                            featureType: 'poi.park',
                            elementType: 'geometry',
                            stylers: [
                                {
                                    color: '#e5e5e5',
                                },
                            ],
                        },
                        {
                            featureType: 'poi.park',
                            elementType: 'labels.text.fill',
                            stylers: [
                                {
                                    color: '#9e9e9e',
                                },
                            ],
                        },
                        {
                            featureType: 'road',
                            elementType: 'geometry',
                            stylers: [
                                {
                                    color: '#ffffff',
                                },
                            ],
                        },
                        {
                            featureType: 'road.arterial',
                            elementType: 'labels.text.fill',
                            stylers: [
                                {
                                    color: '#757575',
                                },
                            ],
                        },
                        {
                            featureType: 'road.highway',
                            elementType: 'geometry',
                            stylers: [
                                {
                                    color: '#dadada',
                                },
                            ],
                        },
                        {
                            featureType: 'road.highway',
                            elementType: 'labels.text.fill',
                            stylers: [
                                {
                                    color: '#616161',
                                },
                            ],
                        },
                        {
                            featureType: 'road.local',
                            elementType: 'labels.text.fill',
                            stylers: [
                                {
                                    color: '#9e9e9e',
                                },
                            ],
                        },
                        {
                            featureType: 'transit.line',
                            elementType: 'geometry',
                            stylers: [
                                {
                                    color: '#e5e5e5',
                                },
                            ],
                        },
                        {
                            featureType: 'transit.station',
                            elementType: 'geometry',
                            stylers: [
                                {
                                    color: '#eeeeee',
                                },
                            ],
                        },
                        {
                            featureType: 'water',
                            elementType: 'geometry',
                            stylers: [
                                {
                                    color: '#c9c9c9',
                                },
                            ],
                        },
                        {
                            featureType: 'water',
                            elementType: 'labels.text.fill',
                            stylers: [
                                {
                                    color: '#9e9e9e',
                                },
                            ],
                        },
                    ],
                });
            CenterMap.addEventListener('click', function () {
                map.setCenter(coordinates);
                map.setZoom(11);
            });
        }
        /* Инициализация карты при полной загрузке окна */
        window.onload = function () {
            initMap();
        };
    }

    //*---------------------------------------------------------------------------------------------
    let news = $('.blog-content__news-items .news__item'),
        numNews = news.length,
        perPage = 6;

    news.slice(perPage).hide();

    $('#pagination-container').pagination({
        items: numNews,
        itemsOnPage: perPage,
        displayedPages: 3,
        edges: 1,
        prevText: `<i class="fas fa-chevron-left"></i>`,
        nextText: `<i class="fas fa-chevron-right"></i>`,
        onPageClick: function (pageNumber) {
            let showFrom = perPage * (pageNumber - 1);
            let showTo = showFrom + perPage;
            news.hide().slice(showFrom, showTo).show();
        },
    });
    //*---------------------------------------------------------------------------------------------

    $('.post-description__button.non-active').click(function (e) {
        e.preventDefault();
    });
    //*---------------------------------------------------------------------------------------------
    let popularPosts = $('.posts__popular'),
        latestPosts = $('.posts__latest');
    let postsTitle = $('.posts__title-block .aside__title');
    postsTitle.filter(':first').addClass('posts__active');
    popularPosts.show();
    latestPosts.hide();
    postsTitle.filter(':first').click(function () {
        popularPosts.show();
        latestPosts.hide();
        $(this).addClass('posts__active');
        postsTitle.not(this).removeClass('posts__active');
    });
    postsTitle.filter(':last').click(function () {
        latestPosts.show();
        popularPosts.hide();
        $(this).addClass('posts__active');
        postsTitle.not(this).removeClass('posts__active');
    });
    //*---------------------------------------------------------------------------------------------
    /* Инициализация библиотеки анимации "AOS" */
    AOS.init({
        offset: 130,
        disable: 'mobile',
    });
});
//!---------------------------------------------------------------------------------------------
