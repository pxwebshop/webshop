"use strict"; //modal

var btnOpenModal1 = document.getElementById("btnOpenModal1");
var btnOpenModal2 = document.getElementById("btnOpenModal2");
var btnOpenModal3 = document.getElementById("btnOpenModal3");
var btnOpenModal4 = document.getElementById("btnOpenModal4");
var btnExitModal = document.getElementById("btnExitModal");
var modal = document.getElementById("modal"); // trong page ko tìm được document.getElementById('btnOpenModal1');
// sẽ dẫn đến bị lỗi. Null ko thể tìm thấy. Em debug để phát triền kĩ năng nha

if (btnOpenModal1 !== null) {
  btnOpenModal1.onclick = function () {
    modal.style.display = "flex";
    document.body.style.overflow = "hidden";
  };
}

if (btnOpenModal2 !== null) {
  btnOpenModal2.onclick = function () {
    modal.style.display = "flex";
    document.body.style.overflow = "hidden";
  };
}

if (btnOpenModal3 !== null) {
  btnOpenModal3.onclick = function () {
    modal.style.display = "flex";
    document.body.style.overflow = "hidden";
  };
}

if (btnOpenModal4 !== null) {
  btnOpenModal4.onclick = function () {
    modal.style.display = "flex";
    document.body.style.overflow = "hidden";
  };
}

if (btnExitModal !== null) {
  btnExitModal.onclick = function () {
    modal.style.display = "none";
    document.body.style.overflow = "scroll";
  };
} //end: modal


$(document).ready(function () {
  $(".c-header__gnav__btn").click(function () {
    if ($(this).hasClass("open")) {
      $(this).removeClass("open");
      $("body").css("overflow", "");
    } else {
      $(this).addClass("open");
      $("body").css("overflow", "hidden");
    }

    $(".c-header__gnav__child").slideToggle();
  });
  $(".c-header__gnav__parent").click(function () {
    if (!$(this).hasClass("is-show")) {
      $(this).children().next().hide();
      $(this).children().next().next().show();
      $(this).addClass("is-show");
    } else {
      $(this).children().next().show();
      $(this).children().next().next().hide();
      $(this).removeClass("is-show");
    }

    $(this).next().slideToggle();
  });

  if ($("main.p-stock").length > 0) {
    $('html, body').animate({
      scrollTop: $(".c-list11").offset().top - 70
    }, 500);
  }

  $(".c-list6").slick({
    slidesToShow: 8,
    dots: true,
    slidesToScroll: 8,
    autoplay: false,
    responsive: [{
      breakpoint: 1024,
      settings: {
        slidesToShow: 6,
        slidesToScroll: 6,
        infinite: true,
        dots: true
      }
    }, {
      breakpoint: 747,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 4
      }
    }, {
      breakpoint: 550,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3
      }
    }, {
      breakpoint: 420,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2
      }
    }]
  });
  $(".c-pageTop").click(function () {
    $("html, body").animate({
      scrollTop: 0
    }, 600).css({
      overflow: 'auto',
      overflowX: 'hidden'
    });
    return false;
  });
  $(document).scroll(function () {
    var scroll = $(window).scrollTop();

    if (scroll < 100) {
      $(".c-pageTop").hide();
    } else {
      $(".c-pageTop").show();
    }
  });
}); // Show/Hide table of contents

var showTableOfContent = document.getElementById("showTableOfContent");
var hideTableOfContent = document.getElementById("hideTableOfContent");
var tableOfContent = document.getElementsByClassName("c-detail__ItemContent");

if (showTableOfContent !== null && hideTableOfContent !== null) {
  if (window.getComputedStyle(showTableOfContent, null).display === "none" || window.getComputedStyle(hideTableOfContent, null).display === "none") {
    hideTableOfContent.onclick = function () {
      showTableOfContent.style.display = "inline";
      hideTableOfContent.style.display = "none";
      tableOfContent[0].style.display = "none";
    };

    showTableOfContent.onclick = function () {
      hideTableOfContent.style.display = "inline";
      showTableOfContent.style.display = "none";
      tableOfContent[0].style.display = "block";
    };
  }
} // end: Show/Hide table of contents
// pop up: img


$(document).ready(function () {
  "use strict";

  $(".c-payment__eWallets img").click(function () {
    var $src = $(this).attr("src");
    $(".c-payment__show").show();
    $(".c-payment__img-show img").attr("src", $src);
    document.body.style.overflow = "hidden";
  });
  $("span").click(function () {
    $(".c-payment__show").hide();
    document.body.style.overflow = "scroll";
  });
}); // end pop up
// hover search
// $(".c-header__itemSeach").hover(function () {
//     console.log("abc");
// 	$(".c-header__search").css("display","block");
// }, function () {
//     // $(".c-header__search").css("display","none");
// 	$(".c-header__itemSeach").blur();
// });

$(".c-header__item").hover(function () {
  $(".c-header__form input").blur();
}); // $(".c-header__form input").on("focus", function(e) {
//     if (e.type === "mouseenter") { console.log("enter"); }
//     else if (e.type === "mouseleave") { console.log("leave"); }
// });
// $('.c-header__itemSeach').on('mouseover', function(){
// 	$('.c-header__search', this).show();
// }).on('mouseout', function(e){
// 	if(!$(e.target).is('input')) {
// 		$('.c-header__search', this).hide();
// 	}
// });
// $('.c-header__itemSeach').on('mouseover', function(){
// 	$('.c-header__search', this).show();
// }).on('mouseout', function(e){
// 	if(!$('input').autocomplete) {
// 		$('.c-header__search', this).hide();
// 	}
// });
// end: hover search
// active link demo web

$(".c-stock__tagItem a").click(function (e) {
  localStorage.setItem("active-item", $(this).attr("href"));
});
$(document).ready(function () {
  var activeItem = $('.c-stock__tagItem a[href="' + localStorage.getItem("active-item") + '"]').first();

  if (activeItem) {
    setActiveLink(activeItem);
  }
});

function setActiveLink($el) {
  $el.addClass("is-active");
  localStorage.clear();
} // end: active link