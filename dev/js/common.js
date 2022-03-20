"use strict";


//modal
var btnOpenModal1 = document.getElementById('btnOpenModal1');
var btnOpenModal2 = document.getElementById('btnOpenModal2');
var btnOpenModal3 = document.getElementById('btnOpenModal3');
var btnOpenModal4 = document.getElementById('btnOpenModal4');

var btnExitModal = document.getElementById('btnExitModal');

var modal = document.getElementById('modal');

btnOpenModal1.onclick = function() {
	modal.style.display = "flex";
}
btnOpenModal2.onclick = function() {
	modal.style.display = "flex";
}
btnOpenModal3.onclick = function() {
	modal.style.display = "flex";
}
btnOpenModal4.onclick = function() {
	modal.style.display = "flex";
}
btnExitModal.onclick = function() {
	modal.style.display = "none";
}
//end: modal


$(document).ready(function () {
	//console.log( "document loaded" );
});

$(document).ready(function () {
	$(".c-list6").slick({
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
					dots: true,
				},
			},
			{
				breakpoint: 747,
				settings: {
					slidesToShow: 4,
					slidesToScroll: 4,
				},
			},
			{
				breakpoint: 480,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 2,
				},
			},
		],
	});
});

