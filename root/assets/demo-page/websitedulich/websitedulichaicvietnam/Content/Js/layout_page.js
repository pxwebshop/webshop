$(document).ready(function () {
    var pathname = window.location.pathname;
    $('.nav > li > a[href="' + pathname + '"]').parent().addClass('active');
    $(window).scroll(function () {
        if ($(window).scrollTop() >= 300) {
            $(".navbar").css("margin-bottom", "0px")
            $("#style-navbar").addClass('bar-menu-header');
            $(".header-top").css("display", "none");
            $(".header-area").css("margin-top", "0");
        } else {
            //$(".navbar").css("margin-bottom", "20px")
            $("#style-navbar").removeClass('bar-menu-header');
            $(".header-top").css("display", "block");
            //$(".header-area").css("margin-top", "20px");
        }
    });
    //tab activities
    $(function () {
        $("#accordion").accordion({
            header: "> div > h3"
        }).sortable({
            axis: "y",
            handle: "h3",
            stop: function (event, ui) {
                // IE doesn't register the blur when sorting
                // so trigger focusout handlers to remove .ui-state-focus
                ui.item.children("h3").triggerHandler("focusout");

                // Refresh accordion to handle new order
                $(this).accordion("refresh");
            }
        });
    });

    $(function () {
        $(".datepicker-12").datepicker();
        $(".datepicker-12").datepicker("setDate", "10w+1");
    });

    //tab
    //$(function () {
    //    $("#tabs").tabs({
    //        collapsible: true
    //    });
    //});

    $("#owl-demo1").owlCarousel({
        loop: false,
        margin: 10,
        responsiveClass: true,
        autoplay: true,
        items: 1,
        dots: false,
        nav: true,
        navText: ['<span class="fa fa-angle-left"></span>', '<span class="fa fa-angle-right"></span>']
    });
    $("#slider-why").owlCarousel({
        loop: true,
        margin: 0,
        responsiveClass: true,
        autoplay: true,
        items: 1,
        dots: true,
        nav: true,
        navText: ['<span class="fa fa-angle-left"></span>', '<span class="fa fa-angle-right"></span>'],
        top: 50
    });

    $("#owl-blog").owlCarousel({
        loop: false,
        margin: 30,
        responsiveClass: true,
        autoplay: true,
        items: 3, //10 items above 1000px browser width
        dots: false,
        nav: true,
        navText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 2
            },
            1000: {
                items: 3
            }
        }
    });

    $("#owl-demo").owlCarousel({
        loop: false,
        margin: 10,
        responsiveClass: true,
        autoplay: true,
        items: 4, //10 items above 1000px browser width
        dots: false,
        nav: true,
        navText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 2
            },
            1000: {
                items: 4
            }
        }
    });
    //owl - activities
    $("#owl-activities").owlCarousel({
        loop: false,
        margin: 10,
        responsiveClass: true,
        autoplay: true,
        items: 1,
        dots: true,
        nav: true,
        navText: ['<span class="fa fa-long-arrow-left"></span>', '<span class="fa fa-long-arrow-right"></span>']
    });
    // Custom Navigation Events
    //$(".customNavigation li #next1").click(function () {
    //    owl.trigger('#next1');
    //});
    //$(".customNavigation li #prev1").click(function () {
    //    owl.trigger('#prev1');
    //});

    //$(".disabled .owl-prev").text("").addClass("glyphicon-menu-left");
    //$(".disabled .owl-next").text("").addClass("glyphicon-menu-right");
    $(".tour-detail").owlCarousel({
        loop: true,
        margin: 30,
        responsiveClass: true,
        autoplay: true,
        items: 3,
        dots: false,
        nav: true,
        navText: ['<span class="fa fa-angle-left"></span>', '<span class="fa fa-angle-right"></span>'],
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 2
            },
            1000: {
                items: 3
            }
        }
    });

    $(document).on('click', '[data-toggle="lightbox"]', function (event) {
        event.preventDefault();
        $(this).ekkoLightbox();
    });

    ///slider room detail
    $(window).load(function () {
        // The slider being synced must be initialized first
        $('#carousel').flexslider({
            animation: "slide",
            controlNav: false,
            animationLoop: false,
            slideshow: false,
            itemWidth: 133,
            itemMargin: 5,
            item: 4,
            asNavFor: '#slider'
        });

        $('#slider').flexslider({
            animation: "slide",
            controlNav: false,
            animationLoop: false,
            slideshow: false,
            sync: "#carousel",
        });
    });

    $(".ui-datepicker .ui-datepicker-header .ui-datepicker-prev").addClass("glyphicon glyphicon-arrow-left");
    $(".ui-datepicker .ui-datepicker-header .ui-datepicker-next").addClass("glyphicon glyphicon-arrow-right");

    $('.carousel').carousel({
        interval: false
    });
    var d = new Date();

    $(".check-datetime").on("change", function () {
        if (d.getMonth(3)) {
            $(".show-price").text("$300");
        }
        else if (d.getMonth(5)) {
            $(".show-price").text("$100");
        }
    });

    //booking
    // Contact form
    var form = $('#main-contact-form');
    form.submit(function (event) {
        event.preventDefault();
        var form_status = $('<div class="form_status"></div>');
        $.ajax({
            url: $(this).attr('action'),

            beforeSend: function () {
                form.prepend(form_status.html('<p><i class="fa fa-spinner fa-spin"></i> Email is sending...</p>').fadeIn());
            }
        }).done(function (data) {
            form_status.html('<p class="text-success">' + data.message + '</p>').delay(3000).fadeOut();
        });
    });
    //val= $("input").val();
    //if($("p").click(function(){
    //    val = $("p").text();
    //}))
    $("a#btnbook").click(function () {
        $(".bookingForm").fadeToggle();
    });
    $("#tabbed-nav2").zozoTabs({
        position: "top-left",
        theme: "white",
        rounded: false,
        shadows: true,
        size: "large",
        orientation: "horizontal",
        responsive: true,
        minWindowWidth: 480,
        maxRows: 3,
        style: "clean",
        animation: {
            easing: "easeInOutExpo",
            duration: 400,
            effects: "slideH"
        },
        orientation: "vertical"
    });
    $("#tabbed-nav1").zozoTabs({
        position: "top-left",
        theme: "white",
        rounded: false,
        shadows: true,
        size: "large",
        orientation: "horizontal",
        responsive: true,
        minWindowWidth: 480,
        maxRows: 3,
        style: "clean",
        animation: {
            easing: "easeInOutExpo",
            duration: 400,
            effects: "slideH"
        },
        rememberState: true
    });
    $("#tabbed-nav3").zozoTabs({
        position: "top-left",
        theme: "white",
        rounded: false,
        shadows: true,
        size: "large",
        orientation: "horizontal",
        responsive: true,
        minWindowWidth: 480,
        maxRows: 3,
        style: "clean",
        animation: {
            easing: "easeInOutExpo",
            duration: 400,
            effects: "slideH"
        },
        rememberState: true,
        orientation: "vertical"
    });
    $("#tabbed-nav4").zozoTabs({
        position: "top-left",
        theme: "white",
        rounded: false,
        shadows: true,
        size: "large",
        orientation: "horizontal",
        responsive: true,
        minWindowWidth: 480,
        maxRows: 3,
        style: "clean",
        animation: {
            easing: "easeInOutExpo",
            duration: 400,
            effects: "slideH"
        },
        rememberState: true
    });
    $(".my-gallery-container").mpmansory(
        {
            childrenClass: 'item', // default is a div
            columnClasses: 'padding', //add classes to items
            breakpoints: {
                lg: 4,
                md: 4,
                sm: 6,
                xs: 12
            },
            distributeBy: { order: false, height: false, attr: 'data-order', attrOrder: 'asc' }, //default distribute by order, options => order: true/false, height: true/false, attr => 'data-order', attrOrder=> 'asc'/'desc'
            onload: function (items) {
                //make somthing with items
            }
        }
    );
});

//Ontop

$(window).scroll(function () {
    if ($(this).scrollTop() >= 50) {        // If page is scrolled more than 50px
        $('#return-to-top').fadeIn(200);    // Fade in the arrow
    } else {
        $('#return-to-top').fadeOut(200);   // Else fade out the arrow
    }
});
$('#return-to-top').click(function () {      // When arrow is clicked
    $('body,html').animate({
        scrollTop: 0                       // Scroll to top of body
    }, 500);
});
$(".my-gallery-container").mpmansory(
        {
            childrenClass: 'item', // default is a div
            columnClasses: 'padding', //add classes to items
            breakpoints: {
                lg: 6,
                md: 6,
                sm: 6,
                xs: 12
            },
            distributeBy: { order: false, height: false, attr: 'data-order', attrOrder: 'asc' }, //default distribute by order, options => order: true/false, height: true/false, attr => 'data-order', attrOrder=> 'asc'/'desc'
            onload: function (items) {
                //make somthing with items
            }
        }
    );