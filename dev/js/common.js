"use strict";

//modal
var btnOpenModal1 = document.getElementById('btnOpenModal1');
var btnOpenModal2 = document.getElementById('btnOpenModal2');
var btnOpenModal3 = document.getElementById('btnOpenModal3');
var btnOpenModal4 = document.getElementById('btnOpenModal4');

var btnExitModal = document.getElementById('btnExitModal');

var modal = document.getElementById('modal');

// trong page ko tìm được document.getElementById('btnOpenModal1');
// sẽ dẫn đến bị lỗi. Null ko thể tìm thấy. Em debug để phát triền kĩ năng nha
if(btnOpenModal1 !== null) {
	btnOpenModal1.onclick = function () {
		modal.style.display = "flex";
		document.body.style.overflow = "hidden";
	}
}
if(btnOpenModal2 !== null){
	btnOpenModal2.onclick = function () {
		modal.style.display = "flex";
		document.body.style.overflow = "hidden";
	}
}

if(btnOpenModal3 !== null){
	btnOpenModal3.onclick = function () {
		modal.style.display = "flex";
		document.body.style.overflow = "hidden";
	}
}
if(btnOpenModal4 !== null){
	btnOpenModal4.onclick = function () {
		modal.style.display = "flex";
		document.body.style.overflow = "hidden";
	}
}
if(btnExitModal !== null) {
	btnExitModal.onclick = function () {
		modal.style.display = "none";
		document.body.style.overflow = "scroll";
	}
}

//end: modal


$(document).ready(function () {
	// menu
	$(".c-header__item").click(function() {
		if($(".is-searchMenu").hasClass("is-search")) {
			$(".is-searchMenu").removeClass("is-search");
			$(".c-header__search").hide();
		}

		if($(this).hasClass("is-click")) {
			$(this).children().next().slideToggle();
			$(this).removeClass("is-click");
		} else {
			$(".c-header__item").each(function() {
				if($(this).hasClass("is-click")) {
					$(this).children().next().hide();
					$(this).removeClass("is-click");	
				}
			});

			$(this).children().next().slideToggle();
			$(this).addClass("is-click");
		}
	});

	$(".is-searchMenu").click(function() {
		$(".c-header__item").each(function() {
			$(this).children().next().hide();
			$(this).removeClass("is-click");
		});

		$(this).next().slideToggle();
		if ($(this).hasClass("is-search")) {
			$(this).removeClass("is-search");
		} else {
			$(this).addClass("is-search");
		}
	});

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

