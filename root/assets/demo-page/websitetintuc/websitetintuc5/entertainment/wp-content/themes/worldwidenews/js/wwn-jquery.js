"use strict";
(function($){
		var wwn_page = {
		init : function(){
			$(document).delegate('.wwn-menu-overlay-icon a', 'click', function (e) {
				e.preventDefault();
				$('.menu-overlay-wrapper').toggleClass('menu-overlay-top menu-overlay-open menu-overlay-complete menu-overlay-bottom');
				$('.c-hamburger.c-hamburger--htx').toggleClass('is-active');
				$('body').toggleClass('scroll-disable');
			});

			$('.wwn-align-middle-wrapper').each(function(){
				$(this).find('.wwn-align-middle').height(($(this).innerHeight()))
			});
			var line_height = parseInt($('.wwn-logo').outerHeight()) - 3;
			$('.header-middle #menu-main-menu > li > a').css("line-height", line_height+'px');
			wwn_page.wwn_popup();
			wwn_page.wwn_masonary();
			wwn_page.wwntabs();
			wwn_page.wwntabswidget();
			wwn_page.wwn_animations();
			wwn_page.wwn_search();
			wwn_page.wwn_blog_page();
			wwn_page.wwn_author_slider();
			wwn_page.wwn_counter();
			wwn_page.wwn_stack();
			wwn_page.wwn_health();
			wwn_page.wwn_insta_slider();
			wwn_page.wwn_job_slider();
			wwn_page.wwn_woocommerce_button();
			wwn_page.wwn_contact_map();
			$('.slimmenu').slimmenu({
				resizeWidth: '992',
				collapserTitle: 'Menu',
				animSpeed: 'medium',
				indentChildren: true,
				childrenIndenter: '<i class="fa fa-angle-right" aria-hidden="true"></i>',
				expandIcon: '<i class="fa fa-plus" aria-hidden="true"></i>',
				collapseIcon: '<i class="fa fa-minus" aria-hidden="true"></i>'
		  	});
			$(window).on('load',function(){
				$('.wwn-vertical-tabs').each(function(index, element) {
					$(this).height($(this).parent('.wwn-tab-wrapper').find('.wwn-tab-content-wrap').outerHeight());
				});
				if( $('.primary-menu').length > 0 ){
					$(".primary-menu .wwn-menu > li.menu-item-has-children").each(function(){
						var $obj = $(this).offset();
						if( ($(window).width())-($obj.left) < 301){
							$(this).addClass("overflow-left-menu");
						}
					});
				}
				$(".page-loader-wrap").fadeOut("slow");	
				wwn_page.wwn_incsliders('post-gallery-slider', 1, 1, true, true, false, true, false);
				wwn_page.wwn_incsliders('wwn-insp-quote-slider', 1, 1, true, true, false, $('.wwn-insp-quote-slider').data('dots'), false);
				wwn_page.wwn_incsliders('new_marque_slider', 1, 1, true, false, false, false, true,3000);
				//wwn_page.wwn_incsliders('wwn-health-slider', 1, 1, true, false, false, true, false);
				wwn_page.wwn_incsliders('wwn-post-slider-wrap', 1, 1, true, false, false, $('.wwn-post-slider-wrap').data('dots'), true);
				
				
				/*-------- single page slider -------*/
				$('.single-page-slider').slick({
					slidesToShow: 1,
					slidesToScroll: 1,
					arrows: true,
					asNavFor: '.single-page-slider-thumb',
					prevArrow: '<a class="slick-prev slick-arrow"><i class="fa fa-angle-left" aria-hidden="true"></i></a>',
					nextArrow: '<a class="slick-next slick-arrow"><i class="fa fa-angle-right" aria-hidden="true"></i></a>',
				});
				$('.wwn-tip-slider').slick({
					slidesToShow: 1,
					slidesToScroll: 1,
					arrows: $('.wwn-tip-wrapper').data('arrows'),
					dots: $('.wwn-tip-wrapper').data('dots'),
					autoplaySpeed:$('.wwn-tip-wrapper').data('speed'),
					prevArrow: '<a class="slick-prev slick-arrow"><i class="fa fa-angle-left" aria-hidden="true"></i></a>',
					nextArrow: '<a class="slick-next slick-arrow"><i class="fa fa-angle-right" aria-hidden="true"></i></a>',
					fade:true,
					autoplay:true,
				});
				$('.single-page-slider-thumb').slick({
					slidesToShow: 5,
					slidesToScroll: 1,
					asNavFor: '.single-page-slider',
					dots: false,
					arrows: false,
					focusOnSelect: true,
					infinite:true,
					responsive:[
						{
							breakpoint: 992,
							settings: {
								slidesToShow: 3,
								slidesToScroll: 1,
							}
						}
					]
				});
				var vertical = false;
				if($(window).width()>993){
					var vertical = true;	
				}
				$('.wwn-vertical-tab-slider').slick({
				  dots:false,
				  slidesToShow:1,
				  slidesToScroll:1,
				  infinite: false,
				  vertical: vertical,
				  verticalSwiping: vertical,
				  arrows: false,
				  responsive: [
				  		{
							breakpoint: 992,
							settings: {
								slidesToShow: 1,
								slidesToScroll: 1,
								infinite: false,
								arrows: false,
							}
						},
						{
							breakpoint: 768,
							settings: {
								slidesToShow: 2,
								slidesToScroll: 1,
								arrows: true,
								prevArrow: '<a class="slick-prev slick-arrow"><i class="fa fa-angle-left" aria-hidden="true"></i></a>',
								nextArrow: '<a class="slick-next slick-arrow"><i class="fa fa-angle-right" aria-hidden="true"></i></a>'
							}
						},
						{
							breakpoint: 414,
							settings: {
								slidesToShow: 1,
								slidesToScroll: 1,
								arrows: true,
								prevArrow: '<a class="slick-prev slick-arrow"><i class="fa fa-angle-left" aria-hidden="true"></i></a>',
								nextArrow: '<a class="slick-next slick-arrow"><i class="fa fa-angle-right" aria-hidden="true"></i></a>'
							}
						}
					]
				});

				$('.wwn-featured-slider-post').slick({
				  dots: $('.wwn-featured-slider-post').data('dots'),
				  slidesToShow: $('.wwn-featured-slider-post').data('slide-show'),
				  slidesToScroll:1,
				  autoplaySpeed: $('.wwn-featured-slider-post').data('speed'),
				  infinite: true,
				  prevArrow: '<a class="slick-prev slick-arrow"><i class="fa fa-angle-left" aria-hidden="true"></i></a>',
				  nextArrow: '<a class="slick-next slick-arrow"><i class="fa fa-angle-right" aria-hidden="true"></i></a>',
				  autoplay: true,
				  arrows: true,
				  responsive: [
				  		{
							breakpoint: 992,
							settings: {
								slidesToShow: 3,
								slidesToScroll: 1,
								infinite: false,
								arrows: true,
							}
						},
						{
							breakpoint: 736,
							settings: {
								slidesToShow: 2,
								slidesToScroll: 1,
								infinite: false,
								arrows: true,
							}
						},
						{
							breakpoint: 479,
							settings: {
								slidesToShow: 1,
								slidesToScroll: 1,
								infinite: false,
								arrows: true,
							}
						}
					]
				});

				$('.wwn-horizontal-tab-slider').on('afterChange', function(event, slick, currentSlide, nextSlide){
					$('.wwn-horizontal-tab-slider .slick-active').trigger('click');
					$('.wwn-horizontal-tab-slider .slick-prev').show();
					$('.wwn-horizontal-tab-slider .slick-next').show();
					if((parseInt($(this).find('.tab-link').length) - 1)  == currentSlide){
						$('.wwn-horizontal-tab-slider .slick-next').hide();
					}
					if(0 == currentSlide){						
						$('.wwn-horizontal-tab-slider .slick-prev').hide();
					}
				});	    
				$('.wwn-horizontal-tab-slider').slick({
				  dots:false,
				  autoplay:false,	
				  slidesToShow:3,
				  slidesToScroll:1,
				  infinite: false,
				  arrows: false,
				  responsive: [
						 {
							breakpoint: 768,
							settings: {
							  slidesToShow: 1,
							  slidesToScroll: 1,
							  infinite: false,
							  arrows: true,
							  prevArrow: '<a class="slick-prev slick-arrow"><i class="fa fa-angle-left" aria-hidden="true"></i></a>',
							  nextArrow: '<a class="slick-next slick-arrow"><i class="fa fa-angle-right" aria-hidden="true"></i></a>'
							}
						 }
					]
				});
				/*-----Menu Extend Fashion----*/
				$(".menu-overlay-wrapper #menu-main-menu .menu-item-has-children").on("click",function () {
				   var $submenu = $(this).find(".sub-menu");
				   $submenu.slideToggle(300);
				   $('.sub-menu').not($submenu).slideUp(300);
				});
			});
		},
		wwn_woocommerce_button : function(){
			jQuery(function($){$("div.quantity:not(.buttons_added), td.quantity:not(.buttons_added)").addClass("buttons_added").append('<span class="plus add">+</span>').prepend('<span class="minus sub">-</span>'),$(document).on("click",".plus, .minus",function(){var t=$(this).closest(".quantity").find(".qty"),a=parseFloat(t.val()),n=parseFloat(t.attr("max")),s=parseFloat(t.attr("min")),e=t.attr("step");a&&""!==a&&"NaN"!==a||(a=0),(""===n||"NaN"===n)&&(n=""),(""===s||"NaN"===s)&&(s=0),("any"===e||""===e||void 0===e||"NaN"===parseFloat(e))&&(e=1),$(this).is(".plus")?t.val(n&&(n==a||a>n)?n:a+parseFloat(e)):s&&(s==a||s>a)?t.val(s):a>0&&t.val(a-parseFloat(e)),t.trigger("change")})});
    	},
    	wwn_contact_map : function(){
    		if($('#contact-map').length>0){
    			var geocoder;
				var map;
				var address = $('#contact-map').data('address');
    			var address_content = $('#contact-map').data('content');
				var wwn_initialize = function() {
					 geocoder = new google.maps.Geocoder();
					 var latlng = new google.maps.LatLng(-34.397, 150.644);
					 var myOptions = {
						zoom: 8,
						center: latlng,
						scrollwheel: false,
					 	mapTypeControl: true,
					 	mapTypeControlOptions: {style: google.maps.MapTypeControlStyle.DROPDOWN_MENU},
					 	navigationControl: true,
						mapTypeId: google.maps.MapTypeId.ROADMAP
					 };
					 map = new google.maps.Map(document.getElementById("contact-map"), myOptions);
					 if (geocoder) {
						geocoder.geocode( { 'address': address_content}, function(results, status) {
						  if (status == google.maps.GeocoderStatus.OK) {
							 if (status != google.maps.GeocoderStatus.ZERO_RESULTS) {
							 map.setCenter(results[0].geometry.location);

								var infowindow = new google.maps.InfoWindow(
									 { content: '<b>'+address+'</b>',
										size: new google.maps.Size(150,50)
									 });

								var marker = new google.maps.Marker({
									 position: results[0].geometry.location,
									 map: map, 
									 title:address
								}); 
								google.maps.event.addListener(marker, 'click', function() {
									 infowindow.open(map,marker);
								});

							 } else {
								alert("No results found");
							 }
						  } else {
							 alert("Geocode was not successful for the following reason: " + status);
						  }
						});
					 }
				  }
    			window.onload = wwn_initialize;
    		}
    	},
		wwn_animations : function(){
			$("#back-top").hide();
			$(window).scroll(function () {
				if ($(this).scrollTop() > 700) {
					$('#back-top').fadeIn(0);
				} else {
					$('#back-top').fadeOut(0);
				}
			});	
			$('#back-top').on("click",function (e) {
				e.preventDefault();
				$('body,html').animate({ scrollTop: 0 }, 2000);
				return false;
			});
			$(".popup-content").fancybox({
				fitToView	: false,
				width			: '100%',
				height		: '100%',
				autoSize		: false,
				closeClick	: false,
				openSpeed   : 2000,
				closeSpeed  : 300,
				openEffect	: 'fade',
	    		closeEffect	: 'fade',
				scrolling	: 'no',
				helpers : {
					title : {
						type : 'inside'
					},
				}
			});
			
			$('.fancybox').fancybox({
				arrows : false
			});
		},
		wwn_incsliders : function(ele, slide_show, slide_scroll, autoplay, isfade, isVertical, isdots, isarrow, scrollspeed){
			if (typeof isVertical == 'undefined'){ isVertical = false;}
			if (typeof isfade  == 'undefined'){ isfade = false;}
			if (typeof isfade  == 'undefined'){ isdots = false;}
			if (typeof isarrow == 'undefined'){ isarrow = true;}
			if (typeof scrollspeed == 'undefined'){ scrollspeed = 300;}
			//var autoplaySpeed = $(this).data('speed') ? $(this).data('speed') : 7000;
			if( ele == 'wwn-post-slider-wrap'){
				$('.'+ele).each(function(){
					$(this).slick({
						slidesToShow: $(this).data('slide-show'),
						slidesToScroll: slide_scroll,
						autoplay: true,
						speed:scrollspeed,
						autoplaySpeed: $(this).data('speed') ? $(this).data('speed') : 7000,
						prevArrow: '<a class="slick-prev slick-arrow"><i class="fa fa-angle-left" aria-hidden="true"></i></a>',
						nextArrow: '<a class="slick-next slick-arrow"><i class="fa fa-angle-right" aria-hidden="true"></i></a>',
						fade : isfade,
						vertical : isVertical,
						dots: isdots,
						arrows: isarrow,
						responsive: [
						    {
						      breakpoint: 992,
						      settings: {
						        slidesToShow: 1,
						        slidesToScroll: 1,
						        infinite: true,
						        arrows: true
						      }
						    },
						    {
						      breakpoint: 414,
						      settings: {
						        slidesToShow: 1,
						        slidesToScroll: 1,
						        infinite: true,
						        arrows: false,
						        speed: 500
						      }
						    }
						]
					});
				});
			}else{
				$('.'+ele).slick({
					slidesToShow: slide_show,
					slidesToScroll: slide_scroll,
					autoplay: true,
					speed:scrollspeed,
					autoplaySpeed: $(this).data('speed'),
					prevArrow: '<a class="slick-prev slick-arrow"><i class="fa fa-angle-left" aria-hidden="true"></i></a>',
					nextArrow: '<a class="slick-next slick-arrow"><i class="fa fa-angle-right" aria-hidden="true"></i></a>',
					fade : isfade,
					vertical : isVertical,
					dots: isdots,
					arrows: isarrow
				});
			}
		},
		wwn_health : function(){
			$('.wwn-health-slider').slick({
			  dots: true,
			  infinite: true,
			  speed: 500,
			  autoplaySpeed: $('.wwn-health-slider').data('speed'),
			  autoplay: true,
			  slidesToShow: 1,
			  slidesToScroll: 1,
			  centerMode: true,
			  centerPadding: '220px',
			  arrows: false,
			  appendDots : '.wwn-health-slider .slick-list',
			  responsive: [
			      {
			        breakpoint: 1300,
			        settings: {
			          centerMode: false,
						 centerPadding: '80px',
			        }
			      }
			  ]
			});
				
		},
		wwn_job_slider : function(){
			$('.wwn-jobs-slider-wrap').slick({
			  dots: $('.wwn-jobs-slider-wrap').data('dots'),
			  infinite: true,
			  speed: 500,
			  autoplaySpeed: $(this).data('speed') ? $(this).data('speed') : 7000,
			  autoplay: true,
			  slidesToShow: $('.wwn-jobs-slider-wrap').data('slide-show'),
			  slidesToScroll: 1,
			  arrows: false,
			  responsive: [
			      {
			        breakpoint: 769,
			        settings: {
			          slidesToShow: 3,
			          slidesToScroll: 1,
			          infinite: true,
			          arrows: false
			        }
			      },
			      {
			        breakpoint: 569,
			        settings: {
			          slidesToShow: 2,
			          slidesToScroll: 1,
			          infinite: true,
			          arrows: false
			        }
			      },
			      {
			        breakpoint: 415,
			        settings: {
			          slidesToShow: 1,
			          slidesToScroll: 1,
			          infinite: true,
			          arrows: false
			        }
			      }
			  ]
			});
				
		},
		wwn_insta_slider : function(){
			$('.wwn-instagram-slider').slick({
			  dots: true,
			  infinite: true,
			  speed: 500,
			  autoplaySpeed: $(this).data('speed') ? $(this).data('speed') : 7000,
			  autoplay: true,
			  slidesToShow: 1,
			  slidesToScroll: 1,
			  centerMode: true,
			  arrows: false,
			  responsive: [
			  		{
			  		  breakpoint: 2251,
			  		  settings: {
			  		    slidesToShow: 10,
			  		    slidesToScroll: 1,
			  		    infinite: true,
			  		    arrows: false,
			  		    dots: false,
			  		    speed: 500,
			  		  }
			  		},
			      {
			        breakpoint: 1921,
			        settings: {
			          slidesToShow: 10,
			          slidesToScroll: 1,
			          infinite: true,
			          arrows: false,
			          dots: false,
			          speed: 500,
			        }
			      },
			      {
			        breakpoint: 1367,
			        settings: {
			          slidesToShow: 7,
			          slidesToScroll: 1,
			          infinite: true,
			          arrows: false,
			          speed: 500,
			          dots: false,
			        }
			      },
			      {
			        breakpoint: 769,
			        settings: {
			          slidesToShow: 4,
			          slidesToScroll: 1,
			          infinite: true,
			          arrows: false,
			          speed: 500,
			          dots: false,
			        }
			      },
			      {
			        breakpoint: 361,
			        settings: {
			          slidesToShow: 2,
			          slidesToScroll: 1,
			          infinite: true,
			          arrows: false,
			          speed: 500,
			          dots: false,
			        }
			      },
			  ]
			});
				
		},
		wwntabs : function(){
		    $('.tabs .tab-link').on("click",function(e){
				e.preventDefault();
		    	var idx = $(this).index();
		    	var main_div = $(this).parent().closest('.wwn-tab-wrapper');
		    	main_div.find('.wwn-tab-content-wrap .tab-content').hide();
		    	main_div.find('.wwn-tab-content-wrap .tab-content').eq(idx).show();
		    	main_div.find('.tabs .tab-link').removeClass('current');
		    	$(this).addClass('current');
		    })
		},
		wwntabswidget :function(){
			$('.tabs .tab-link').on("click",function(){
		    	var idx = $(this).index();
		    	var par_div = $(this).parent().closest('.wwn-tab-widget-wrapper');
		    	par_div.find('.wwn-tab-content-wrap .tab-content').hide();
		        par_div.find('.wwn-tab-content-wrap .tab-content').eq(idx).show();
		        par_div.find('.tabs .tab-link').removeClass('current');
		        $(this).addClass('current');
			})
		},
		wwn_stack : function(){
			$(function() {
				var $grid   = $('#tp-grid'),
				$name   = $('#name'),
				$close  = $('#close'),
				$loader = $('<div class="loader"><i></i><i></i><i></i><i></i><i></i><i></i><span>Loading...</span></div>' ).insertBefore( $grid ),
				stapel   = $grid.stapel( {
					onLoad : function() {
						$loader.remove();
					},
					onBeforeOpen : function( pileName ) {
						$name.html( pileName );
						$('.popup-video').magnificPopup({
							type: 'iframe',
							removalDelay: 160,
							preloader: false,
							mainClass: 'mfp-no-margins mfp-with-zoom',
							fixedContentPos: false,
							zoom: {
								enabled: true,
								duration: 300 // don't foget to change the duration also in CSS
							}
						});
						var $content = $('#content').offset();
						$('body,html').animate({ scrollTop: $content.top-100 }, 600);
					},
					onAfterOpen : function( pileName ) {
						$close.show();
						$('.wwn-gallery-stack-title').hide();
					}
				});

				$close.on( 'click', function() {
					$close.hide();
					$('.wwn-gallery-stack-title').show();
					$name.empty();
					stapel.closePile();
				});

			});
		},
		wwn_popup : function(){
			$('.popup-video').magnificPopup({
				type: 'iframe',
				removalDelay: 160,
				preloader: false,
				mainClass: 'mfp-no-margins mfp-with-zoom',
				fixedContentPos: false,
				zoom: {
					enabled: true,
					duration: 300 // don't foget to change the duration also in CSS
				}
			});	
			$('.popup-img').magnificPopup({
				type: 'image',
				gallery:{
					enabled:true
				},
				zoom: {
					enabled: true,
					duration: 300 // don't foget to change the duration also in CSS
				}
			});		
		},
		wwn_masonary : function(){
			$(window).on('load', function(){
				if($('.masonary-wrapper').length > 0){
					$('.masonary-wrapper').isotope({
							itemSelector: '.masonary-item',
					});
					$(".masonary-item").each(function() {
						$(this).css("height", $(this).outerHeight());
					});
				}
			});		
		},
		wwn_search  : function(){
			$(".wwn-search-icon").on("click",function () {
            $(".wwn-search-icon .wwn-navbar-search").addClass("active");  });
            $(document).delegate('.wwn-close-button', 'click', function () {
                $('.wwn-navbar-search').removeClass('active');
            });
         },
		wwn_blog_page : function(){
		$('.content-slider').slick({
          slidesToShow: 1,
          slidesToScroll: 1,
          fade: true,
          dots: false,
          autoplay: true,
          infinite: true,
          speed: 300,
          asNavFor: '.wwn-blog-list',
          arrows:false,
			 autoplaySpeed: $(this).data('speed') ? $(this).data('speed') : 7000,
        });
         
		},
		wwn_author_slider : function(){
			$('.team-slider-sec').slick({
          slidesToShow: 1,
          slidesToScroll: 1,
          fade: true,
          dots: false,
          autoplay: true,
          infinite: true,
          speed: 300,
          arrows:false,
			 autoplaySpeed: $(this).data('speed') ? $(this).data('speed') : 7000,
        });
		},
		wwn_counter : function(){ 
			if($('.count-down-timer').length > 0){
			    $('.count-down-timer').countdown({
			        target :$('.count-down-timer').data('date'),
			        format : '4',
			        timezone : '0'
			    });
			}
		 },
		wwn_grid_sync : function(){
			$('.gridwrap li').each(function(index, element) {
				$(this).outerHeight($('.gridwrap li:eq(0)').css('width'));
			});
		},
		wwn_css_block : function(){
		   var css = '';
		   $('.wwn-css-block').each(function() {
		   	css = $(this).data('css');
			   var styleNode = document.createElement('style');
			   styleNode.type = "text/css";
			   // browser detection (based on prototype.js)
			   if(!!(window.attachEvent && !window.opera)) {
			        styleNode.styleSheet.cssText = css;
			   } else {
			        var styleText = document.createTextNode(css);
			        styleNode.appendChild(styleText);
			   }
			   document.getElementsByTagName('head')[0].appendChild(styleNode);
			});
		}
	},
	/*-------- On Ready Method --------*/
	wwn_OnReady = {
		init : function(){
			wwn_page.init();
		},
		wwnScrollEvent : function(){
			var hHeight = $('#wwn-header .wwn-header-wrapper').outerHeight();
			jQuery(window).scroll(function () {
				if(jQuery(window).scrollTop() > hHeight) {
					jQuery('.header-wrapper .wwn-header-sticky').addClass('wwn-header-collapse');
				}
				else{
					jQuery('.header-wrapper .wwn-header-sticky').removeClass('wwn-header-collapse');
				}
			});
		},		
	},
	/*------- On Window Resize Method ---------*/
	wwn_OnResize = {
		htmlTopPOs : function (){
			var hHeight = (jQuery('.header-wrapper .wwn-header-sticky:visible,#wwn-header .wwn-header-fixed:visible').not('.wwn-header-transparent').outerHeight());
					if(!hHeight){hHeight = 0;}
					jQuery('html').css({'padding-top': hHeight});
					return true;
		},
		wwnFitHeight : function () {
			if($(window).width() > 767){
				$('.fitheight').css("min-height", 'auto');
				jQuery('.fitheight-wrapper').each(function() {
					 var height = [];
					 jQuery(this).find(".fitheight").each(function() {
						  height.push(jQuery(this).outerHeight(true));
					 });
					 jQuery(this).find('.fitheight').css("min-height", Math.max.apply(Math, height)+2);
				});
			}
			$('.right-side-line .wwn-title-heading').each( function() {
				var random_number = $(this).data('random');
				var f =  $(this).parent().width();
				var k = parseInt(f)-(parseInt($(this).width())+50);
				$( "<style>.right-side-line .wwn-title-wrapper h3.wwn-title-heading.aa"+random_number+"::after { width: " + k + "px; }</style>" ).appendTo( "head" );
			});
		},
	};
	$(document).ready(function(){
		wwn_OnReady.init();
		wwn_OnReady.wwnScrollEvent();
		wwn_OnResize.wwnFitHeight();
		wwn_page.wwn_css_block();
		wwn_OnResize.htmlTopPOs();
	});
	$(window).resize(function() {
		wwn_OnResize.htmlTopPOs();
		wwn_OnResize.wwnFitHeight();
	});

})(jQuery);