jQuery(document).ready(function($){

	$( '.fagsfacf-slider' ).each(function( index ) {

		var sconf       = {};
		var slider_id   = $(this).attr('id');
		var slider_conf = $.parseJSON( $(this).parent('.fagsfacf-slider-wrap').find('.fagsfacf-slider-conf').text());
		
		jQuery('#'+slider_id+' .fagsfacf-gallery-slider').slick({
			dots			: (slider_conf.dots) == "true" ? true : false,
			infinite		: true,
			arrows			: (slider_conf.arrows) == "true" ? true : false,
			speed			: parseInt(slider_conf.speed),
			autoplay		: (slider_conf.autoplay) == "true" ? true : false,
			autoplaySpeed	: parseInt(slider_conf.autoplay_speed),			
			rtl             : (slider_conf.rtl) == "true" ? true : false,
			adaptiveHeight  : true,					
		});
	});
	
	$( '.fagsfacf-carousel' ).each(function( index ) {

		var sconf       = {};
		var slider_id   = $(this).attr('id');
		var slider_conf = $.parseJSON( $(this).parent('.fagsfacf-carousel-wrap').find('.fagsfacf-carousel-conf').text());
		
		jQuery('#'+slider_id+' .fagsfacf-gallery-carousel').slick({
			dots			: (slider_conf.dots) == "true" ? true : false,
			infinite		: true,
			arrows			: (slider_conf.arrows) == "true" ? true : false,
			speed			: parseInt(slider_conf.speed),
			autoplay		: (slider_conf.autoplay) == "true" ? true : false,
			autoplaySpeed	: parseInt(slider_conf.autoplay_speed),
			slidesToShow	: parseInt(slider_conf.slide_to_show),
			slidesToScroll	: parseInt(slider_conf.slide_to_scroll),
			rtl             : (slider_conf.rtl) == "true" ? true : false,
			adaptiveHeight  : true,
			mobileFirst    	: (Fagsfacf.is_mobile == 1) ? true : false,
			responsive: [{
				breakpoint: 1023,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 1,
					infinite: true,
					dots: false
				}
			},{

				breakpoint: 767,	  			
				settings: {
					slidesToShow: 2,
					slidesToScroll: 1
				}
			},
			{
				breakpoint: 479,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
					dots: false
				}
			},
			{
				breakpoint: 319,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
					dots: false
				}	    		
			}]
		});
	});
	
});	
	
