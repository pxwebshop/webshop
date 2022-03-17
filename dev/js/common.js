'use strict';

$(document).ready(function () {
	//console.log( "document loaded" );
});

$(document).ready(function(){
    $('.c-list6').slick({
    slidesToShow: 8,
    dots: true,
    slidesToScroll: 8,
	responsive: [
		{
		  breakpoint: 1024,
		  settings: {
			slidesToShow: 6,
			slidesToScroll: 6,
			infinite: true,
			dots: true
		  }
		},
		{
		  breakpoint: 747,
		  settings: {
			slidesToShow: 4,
			slidesToScroll: 4
		  }
		},
		{
		  breakpoint: 480,
		  settings: {
			slidesToShow: 2,
			slidesToScroll: 2
		  }
		}
	]
    });
  });