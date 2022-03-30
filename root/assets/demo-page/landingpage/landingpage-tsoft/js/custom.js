(function ($) {
    "use strict";
    jQuery(document).ready(function ($) {
        var reviewslider = $('.client-group');
        /*==========  Review Slider  ==========*/
        reviewslider.owlCarousel({
            items: 3,
            margin: 30,
            nav: true,
            dots: false,
            autoplay: true,
            loop: true,
            navText: ["<i class='fas fa-angle-left'></i>", "<i class='fas fa-angle-right'></i>"],
            responsive: {
                0: {
                    items: 1
                },
                600: {
                    items: 1
                },
                700: {
                    items: 2
                },
                1000: {
                    items: 3
                }
            }
        });
        var screenshot = $('.screenshot-all');
        /*==========  Review Slider  ==========*/
        screenshot.owlCarousel({
            items: 5,
            margin: 15,
            nav: true,
            dots: false,
            autoplay: true,
            loop: true,
            navText: ["<i class='fas fa-angle-left'></i>", "<i class='fas fa-angle-right'></i>"],
            responsive: {
                0: {
                    items: 1
                },
                600: {
                    items: 1
                },
                700: {
                    items: 2
                },
                1000: {
                    items: 5
                }
            }
        });
        /*========== Responsive Menu  ==========*/
        $("#mobilemenu").slicknav({
            prependTo: '#mobilemenu-responsive'
        });
        // /*==========  wow  ==========*/
        new WOW().init();
        /*========== scroll to top  ==========*/
        $(window).on('scroll', function () {
            if ($(this).scrollTop() > 200) {
                $('.scroll-top').fadeIn(200);
            } else {
                $('.scroll-top').fadeOut(200);
            }
        });
        $('.scroll-top').on('click', function (event) {
            event.preventDefault();
            $('html, body').animate({
                scrollTop: 0
            }, 1000);
        });
        /*==========  menu scroll  ==========*/
        $('.main-menu li a').on('click', function (event) {
            $('.main-menu li a').parent().removeClass('active');
            var $anchor = $($(this).attr('href')).offset().top - 70;
            $(this).parent().addClass('active');
            $('body, html').animate({
                scrollTop: $anchor
            }, 800);
            event.preventDefault();
            return false;
        });
        /*==========  menu sticky  ==========*/
        $('.onepage-head').sticky({
            topSpacing: 0,
            zIndex: 999
        });
        /*==========  counterUp  ==========*/
        $('.countera').counterUp({
            delay: 100,
            time: 3000
        });
        /*==========  isotop  ==========*/
        jQuery(window).on('load', function () {
            jQuery(".tsoft-loader").fadeOut(500);
        });
    });
})(jQuery);