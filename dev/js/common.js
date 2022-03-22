"use strict";
console.log('abc');

//modal
var btnOpenModal1 = document.getElementById('btnOpenModal1');
var btnOpenModal2 = document.getElementById('btnOpenModal2');
var btnOpenModal3 = document.getElementById('btnOpenModal3');
var btnOpenModal4 = document.getElementById('btnOpenModal4');

var btnExitModal = document.getElementById('btnExitModal');

var modal = document.getElementById('modal');

btnOpenModal1.onclick = function () {
	modal.style.display = "flex";
	document.body.style.overflow = "hidden";
}
btnOpenModal2.onclick = function () {
	modal.style.display = "flex";
	document.body.style.overflow = "hidden";
}
btnOpenModal3.onclick = function () {
	modal.style.display = "flex";
	document.body.style.overflow = "hidden";
}
btnOpenModal4.onclick = function () {
	modal.style.display = "flex";
	document.body.style.overflow = "hidden";
}
btnExitModal.onclick = function () {
	modal.style.display = "none";
	document.body.style.overflow = "scroll";
}
//end: modal

// menu mobile
var menuBtn = document.getElementById('menuMobile');
var exitBtn = document.getElementById('exitMenu');
var menu = document.getElementsByClassName('c-header1__menu');
var menuChild = document.getElementsByClassName('c-header1__item');
console.log(menuChild);
var menuItemChild = document.getElementsByClassName('c-header1__child');
menuBtn.onclick = function () {
	menu[0].style.display = 'block';
	document.body.style.overflow = "hidden";
}
exitBtn.onclick = function () {
	menu[0].style.display = 'none';
	document.body.style.overflow = "scroll";
}
// for (var i = 0; i < menuChild.length; i++) {
// 	menuChild[i].onclick = function() {
// 		console.log(i);
// 		menuItemChild[i].style.display = 'block';
// 	}
//  }

// menuChild[1].addEventListener = function() {
// 	menuItemChild[0].style.display = 'block';
// }
var display = 'none';
menuChild[1].addEventListener('click', function (e) {
	if (display === 'block') {
		menuItemChild[0].style.display = 'none';
		display = 'none';    // set current color

	} else {
		menuItemChild[0].style.display = 'block';
		display = 'block';

	}
}, false);
menuChild[3].addEventListener('click', function (e) {
	if (display === 'block') {
		menuItemChild[1].style.display = 'none';
		display = 'none';    // set current color

	} else {
		menuItemChild[1].style.display = 'block';
		display = 'block';

	}
}, false);

// end: menu mobile

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

