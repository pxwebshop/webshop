(function ($) {
    "use strict";
/*--
Commons Variables
-----------------------------------*/
var windows = $(window);
    
/*--
    Menu Sticky
-----------------------------------*/
var sticky = $('.header-sticky');

windows.on('scroll', function() {
    var scroll = windows.scrollTop();
    if (scroll < 300) {
        sticky.removeClass('is-sticky');
    }else{
        sticky.addClass('is-sticky');
    }
});
    
/*--
    Header Search 
-----------------------------------*/
var $headerSearchToggle = $('.header-search-toggle');
var $headerSearchForm = $('.header-search-form');
    
$headerSearchToggle.on('click', function() {
    var $this = $(this);
    if(!$this.hasClass('open')) {
        $this.addClass('open').find('i').removeClass('fa fa-search').addClass('fa fa-times');
        $headerSearchForm.slideDown();
    } else {
        $this.removeClass('open').find('i').removeClass('fa fa-times').addClass('fa fa-search');
        $headerSearchForm.slideUp();
    }
});
    
/*--
    - Background Image
------------------------------------------*/
var $backgroundImage = $('.bg-image');
$backgroundImage.each(function() {
    var $this = $(this),
        $bgImage = $this.data('bg');
    $this.css('background-image', 'url('+$bgImage+')');
});

/*--
    Mobile Menu
-----------------------------------*/
var mainMenuNav = $('.main-menu');
mainMenuNav.meanmenu({
    meanScreenWidth: '991',
    meanMenuContainer: '.mobile-menu',
    meanMenuClose: '<span class="menu-close"></span>',
    meanMenuOpen: '<span class="menu-bar"></span>',
    meanRevealPosition: 'right',
    meanMenuCloseSize: '0',
});

/*--
    Sliders
-----------------------------------*/
var $elementCarousel = $('.tf-element-carousel');
var $html = $('html');
var $body = $('body');
    
var slickInstances = [];

/*For RTL*/
if ($html.attr("dir") == "rtl" || $body.attr("dir") == "rtl") {
    $elementCarousel.attr("dir", "rtl");
}

$elementCarousel.each(function (index, element) {
    var $this = $(this);

    // Carousel Options


    var $options = typeof $this.data('slick-options') !== 'undefined' ? $this.data('slick-options') : '';

    var $spaceBetween = $options.spaceBetween ? parseInt($options.spaceBetween, 10) : 0,
        $spaceBetween_xl = $options.spaceBetween_xl ? parseInt($options.spaceBetween_xl, 10) : 0,
        $rowSpace = $options.rowSpace ? parseInt($options.rowSpace, 10) : 0,
        $isCustomArrow = $options.isCustomArrow ? $options.isCustomArrow : false,
        $customPrev = $isCustomArrow === true ? ($options.customPrev ? $options.customPrev : '') : '',
        $customNext = $isCustomArrow === true ? ($options.customNext ? $options.customNext : '') : '',
        $vertical = $options.vertical ? $options.vertical : false,
        $focusOnSelect = $options.focusOnSelect ? $options.focusOnSelect : false,
        $asNavFor = $options.asNavFor ? $options.asNavFor : '',
        $fade = $options.fade ? $options.fade : false,
        $autoplay = $options.autoplay ? $options.autoplay : false,
        $autoplaySpeed = $options.autoplaySpeed ? $options.autoplaySpeed : 5000,
        $swipe = $options.swipe ? $options.swipe : true,
        $swipeToSlide = $options.swipeToSlide ? $options.swipeToSlide : true,
        $verticalSwiping = $options.verticalSwiping ? $options.verticalSwiping : false,
        $arrows = $options.arrows ? $options.arrows : false,
        $dots = $options.dots ? $options.dots : false,
        $infinite = $options.infinite ? $options.infinite : false,
        $centerMode = $options.centerMode ? $options.centerMode : false,
        $centerPadding = $options.centerPadding ? $options.centerPadding : '',
        $speed = $options.speed ? parseInt($options.speed, 10) : 1000,
        $appendArrows = $options.appendArrows ? $options.appendArrows : $this,
        $prevArrow = $arrows === true ? ($options.prevArrow ? '<span class="' + $options.prevArrow.buttonClass + '"><i class="' + $options.prevArrow.iconClass + '"></i></span>' : '<button class="slick-prev">prev</span>') : '',
        $nextArrow = $arrows === true ? ($options.nextArrow ? '<span class="' + $options.nextArrow.buttonClass + '"><i class="' + $options.nextArrow.iconClass + '"></i></span>' : '<button class="slick-next">next</span>') : '',
        $rows = $options.rows ? parseInt($options.rows, 10) : 1,
        $rtl = $options.rtl || $html.attr('dir="rtl"') || $body.attr('dir="rtl"') ? true : false,
        $slidesToShow = $options.slidesToShow ? parseInt($options.slidesToShow, 10) : 1,
        $slidesToScroll = $options.slidesToScroll ? parseInt($options.slidesToScroll, 10) : 1;

    /*Responsive Variable, Array & Loops*/
    var $responsiveSetting = typeof $this.data('slick-responsive') !== 'undefined' ? $this.data('slick-responsive') : '',
        $responsiveSettingLength = $responsiveSetting.length,
        $responsiveArray = [];
    for (var i = 0; i < $responsiveSettingLength; i++) {
        $responsiveArray[i] = $responsiveSetting[i];

    }

    // Adding Class to instances
    $this.addClass('slick-carousel-' + index);
    $this.parent().find('.slick-dots').addClass('dots-' + index);
    $this.parent().find('.slick-btn').addClass('btn-' + index);

    if ($spaceBetween != 0) {
        $this.addClass('slick-gutter-' + $spaceBetween);
    }
    if ($spaceBetween_xl != 0) {
        $this.addClass('slick-gutter-xl-' + $spaceBetween_xl);
    }
    var $slideCount = null;
    $this.on('init', function (event, slick) {
        $slideCount = slick.slideCount;
        if ($slideCount <= $slidesToShow) {
            $this.children('.slick-dots').hide();
        }
    });
    $this.slick({
        slidesToShow: $slidesToShow,
        slidesToScroll: $slidesToScroll,
        asNavFor: $asNavFor,
        autoplay: $autoplay,
        autoplaySpeed: $autoplaySpeed,
        speed: $speed,
        infinite: $infinite,
        rows: $rows,
        arrows: $arrows,
        dots: $dots,
        vertical: $vertical,
        focusOnSelect: $focusOnSelect,
        centerMode: $centerMode,
        centerPadding: $centerPadding,
        swipe: $swipe,
        swipeToSlide: $swipeToSlide,
        fade: $fade,
        appendArrows: $appendArrows,
        prevArrow: $prevArrow,
        nextArrow: $nextArrow,
        rtl: $rtl,
        responsive: $responsiveArray,
    });

    // Updating the sliders in tab
    $('body').on('shown.bs.tab', 'a[data-toggle="tab"], a[data-toggle="pill"]', function (e) {
        $this.slick('setPosition');
    });
    $('body').on('shown.bs.modal', function (e) {
        $this.slick('setPosition');
    });
});
    
/*----------------------------------- 
    Count Down Active 
----------------------------------*/ 
/*----------------------------------- 
    Count Down Active 
----------------------------------*/ 
$('[data-countdown]').each(function() {
	var $this = $(this), finalDate = $(this).data('countdown');
	$this.countdown(finalDate, function(event) {
		$this.html(event.strftime('<div class="countdown-wrap"><div class="day"><span class="number">%D</span><span class="text">days</span></div><div class="hour"><span class="number">%H</span><span class="text">hours</span></div><div class="minute"><span class="number">%M</span><span class="text">min</span></div><div class="second"><span class="number">%S</span><span class="text">sec</span></div></div>'));
	});
});

$('[data-countdown2]').each(function() {
	var $this = $(this), finalDate = $(this).data('countdown2');
	$this.countdown(finalDate, function(event) {
		$this.html(event.strftime('<div class="single-count"><span>%D</span>D</div><div class="single-count"><span>%H</span>h</div><div class="single-count"><span>%M</span>m</div><div class="single-count"><span>%S</span>s</div>'));
	});
});

/*----------------------------------- 
    Newsletter Popup Active 
----------------------------------*/ 
$("#close-newsletter-popup").on("click", function(){
    $("#newsletter-popup-area").addClass("d-none");
});
/*------------------------------ 
    Nice Select Active
---------------------------------*/
$('select').niceSelect();

/* -------------------------
    Venobox Active
* --------------------------*/  
$('.venobox').venobox({
    border: '10px',
    titleattr: 'data-title',
    numeratio: true,
    infinigall: true
}); 
/*------------------------
	Sticky Sidebar Active
-------------------------*/
$('#sticky-sidebar').theiaStickySidebar({
    // Settings
    additionalMarginTop: 120
  })

/*----- 
	Quantity
--------------------------------*/
$('.pro-qty').prepend('<button class="dec qtybtn">-</button>');
$('.pro-qty').append('<button class="inc qtybtn">+</button>');
$('.qtybtn').on('click', function() {
	var $button = $(this);
	var oldValue = $button.parent().find('input').val();
	if ($button.hasClass('inc')) {
	  var newVal = parseFloat(oldValue) + 1;
	} else {
	   // Don't allow decrementing below zero
	  if (oldValue > 0) {
		var newVal = parseFloat(oldValue) - 1;
		} else {
		newVal = 0;
	  }
	  }
	$button.parent().find('input').val(newVal);
}); 

/*----- 
	Shipping Form Toggle
--------------------------------*/ 
$('[data-shipping]').on('click', function(){
    if( $('[data-shipping]:checked').length > 0 ) {
        $('#shipping-form').slideDown();
    } else {
        $('#shipping-form').slideUp();
    }
})
/* ----------------------
    FAQ Accordion 
* -----------------------*/ 
$('.card-header a').on('click', function() {
    $('.card').removeClass('actives');
    $(this).parents('.card').addClass('actives');
  }); 
/*----- 
	Payment Method Select
--------------------------------*/
$('[name="payment-method"]').on('click', function(){
    
    var $value = $(this).attr('value');

    $('.single-method p').slideUp();
    $('[data-method="'+$value+'"]').slideDown();
    
})
/*----------------------------------
    ScrollUp Active
-----------------------------------*/
$.scrollUp({
    scrollText: '<i class="fa fa-angle-up"></i>',
    easingType: 'linear',
    scrollSpeed: 900,
    animation: 'fade'
});
    
/*--
	MailChimp
-----------------------------------*/
$('#mc-form').ajaxChimp({
	language: 'en',
	callback: mailChimpResponse,
	// ADD YOUR MAILCHIMP URL BELOW HERE!
	url: 'http://devitems.us11.list-manage.com/subscribe/post?u=6bbb9b6f5827bd842d9640c82&amp;id=05d85f18ef'

});
function mailChimpResponse(resp) {
	
	if (resp.result === 'success') {
		$('.mailchimp-success').html('' + resp.msg).fadeIn(900);
		$('.mailchimp-error').fadeOut(400);
		
	} else if(resp.result === 'error') {
		$('.mailchimp-error').html('' + resp.msg).fadeIn(900);
	}  
}
    
/*--
    Conatact Map
-----------------------------------*/
if($('.contact-map').length){
    function initialize() {
        var mapOptions = {
            zoom: 14,
            scrollwheel: false,
            center: new google.maps.LatLng(40.730610, -73.935242)
        };
        var map = new google.maps.Map(document.getElementById('contact-map'), mapOptions);
        var marker = new google.maps.Marker({
            position: map.getCenter(),
            map: map,
            animation: google.maps.Animation.BOUNCE
        });

    }
    google.maps.event.addDomListener(window, 'load', initialize);
}
    
})(jQuery);	