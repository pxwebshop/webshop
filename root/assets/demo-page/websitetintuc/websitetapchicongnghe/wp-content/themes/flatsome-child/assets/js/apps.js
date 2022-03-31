(function ($) {
  "use strict";
	//Trending Posts
	$(document).ready(function(){
		$('.tredding-posts').slick({
			dots: false,
			infinite: true,
			speed: 500,			
			slidesToShow: 1,
			slidesToScroll: 1,
			autoplay: true,
			autoplaySpeed: 8000,
			draggable: false,
			arrows: false,
		});
	});

}(jQuery));