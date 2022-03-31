$(document).ready(function () {
    $("#clients").owlCarousel({
        loop: false,
        margin: 0,
        responsiveClass: true,
        autoplay: true,
        items: 1,
        dots: false,
        nav: true,
        navText: ['<span class="fa fa-angle-left"></span>', '<span class="fa fa-angle-right"></span>']
    });
});