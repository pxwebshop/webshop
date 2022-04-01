( function( $ ) {
	"use strict";
	$('.tooltipped').tooltip();
	/* ========================================== 
	scrollTop() >= 2150
	Should be equal the the height of the header
	========================================== */

	$(window).scroll(function(){
		if ($(window).scrollTop() >= 2150) {
			$('.section_sticky').addClass('sticky');			
		}
		else {
			$('.section_sticky').removeClass('sticky');			
		}
	});
	$(".support-accordion").click(function() {
		var Tab_1 = $('.support-accordion .tab-1 a');
		var Tab_2 = $('.support-accordion .tab-2 a');
		var Tab_3 = $('.support-accordion .tab-3 a');
		var Tab_4 = $('.support-accordion .tab-4 a');
		if(Tab_1.hasClass('active')){
			$('img.data-1').addClass('active');
			$('img.data-2').removeClass('active');
			$('img.data-3').removeClass('active');
			$('img.data-4').removeClass('active');
		}
		if(Tab_2.hasClass('active')){
			$('img.data-1').removeClass('active');
			$('img.data-2').addClass('active');
			$('img.data-3').removeClass('active');
			$('img.data-4').removeClass('active');
		}
		if(Tab_3.hasClass('active')){
			$('img.data-1').removeClass('active');
			$('img.data-2').removeClass('active');
			$('img.data-3').addClass('active');
			$('img.data-4').removeClass('active');
		}
		if(Tab_4.hasClass('active')){
			$('img.data-1').removeClass('active');
			$('img.data-2').removeClass('active');
			$('img.data-3').removeClass('active');
			$('img.data-4').addClass('active');
		}		
		return false;
	});
	//Button Trial
	function shostvn_bind_product_title_to_cf7(e) {		
		var $this = $(this).parents('.product-box');
		var id =$this.attr('data-product-id');
		var title =$this.attr('data-product-title');
		$('#popmake-877').popmake('open');
		$('input[name="ten-mau"]').attr('readonly', true);
		$('input[name="ten-mau"]').val('#' + id + ' - '+ title);
		e.preventDefault();
	} 
	window.addEventListener('load',function(){		 
		$(document).on('click','.btn-trial',shostvn_bind_product_title_to_cf7);
	});	
	//Bảng giá Dịch vụ website
	$('.shostvn-dich-vu-website').slick({
		lazyLoad: 'ondemand',
		dots: false,
		infinite: false,
		speed: 300,
		arrows: true,
		prevArrow: "<button type='button' class='slick-prev pull-left btn-effect'><i class='fal fa-chevron-left'></i></button>",		
		nextArrow: "<button type='button' class='slick-next pull-right btn-effect'><i class='fal fa-chevron-right'></i></button>",		
		
		slidesToShow: 4,
		slidesToScroll: 1,
		variableWidth: false,
		responsive: [
		  {
			breakpoint: 1224,
			settings: {
			  slidesToShow: 4,
			  slidesToScroll: 1
			}
		  },
		  {
			breakpoint: 1080,
			settings: {
			  slidesToShow: 2,
			  slidesToScroll: 1
			}
		  },
		  {
			breakpoint: 768,
			settings: {
			  slidesToShow: 2,
			  slidesToScroll: 1,
			}
		  },
		  {
			breakpoint: 480,
			settings: {
			  slidesToShow: 1,
			  slidesToScroll: 1,
			  centerMode: true,
			}
		  }
		]
	  });
	  $('.sp-tieu-bieu').slick({
		lazyLoad: 'ondemand',
		dots: false,
		infinite: true,
		autoplay: true,
		speed: 300,
		arrows: true,
		prevArrow: "<button type='button' class='slick-prev pull-left btn-effect'><i class='fal fa-chevron-left'></i></button>",		
		nextArrow: "<button type='button' class='slick-next pull-right btn-effect'><i class='fal fa-chevron-right'></i></button>",		

		slidesToShow: 4,
		slidesToScroll: 1,
		responsive: [
			{
			breakpoint: 1224,
			settings: {
			  slidesToShow: 4,
			  slidesToScroll: 1
			}
		  },
		  {
			breakpoint: 1080,
			settings: {
			  slidesToShow: 3,
			  slidesToScroll: 1
			}
		  },
		  {
			breakpoint: 768,
			settings: {
			  slidesToShow: 2,
			  slidesToScroll: 1,
			}
		  },
		  {
			breakpoint: 480,
			settings: {
			  slidesToShow: 1,
			  slidesToScroll: 1,
			  centerMode: true,
			}
		  }
		]
	});	

} )( jQuery );

//Check Mobile
!function(a){var b=/iPhone/i,c=/iPod/i,d=/iPad/i,e=/(?=.*\bAndroid\b)(?=.*\bMobile\b)/i,f=/Android/i,g=/(?=.*\bAndroid\b)(?=.*\bSD4930UR\b)/i,h=/(?=.*\bAndroid\b)(?=.*\b(?:KFOT|KFTT|KFJWI|KFJWA|KFSOWI|KFTHWI|KFTHWA|KFAPWI|KFAPWA|KFARWI|KFASWI|KFSAWI|KFSAWA)\b)/i,i=/IEMobile/i,j=/(?=.*\bWindows\b)(?=.*\bARM\b)/i,k=/BlackBerry/i,l=/BB10/i,m=/Opera Mini/i,n=/(CriOS|Chrome)(?=.*\bMobile\b)/i,o=/(?=.*\bFirefox\b)(?=.*\bMobile\b)/i,p=new RegExp("(?:Nexus 7|BNTV250|Kindle Fire|Silk|GT-P1000)","i"),q=function(a,b){return a.test(b)},r=function(a){var r=a||navigator.userAgent,s=r.split("[FBAN");return"undefined"!=typeof s[1]&&(r=s[0]),s=r.split("Twitter"),"undefined"!=typeof s[1]&&(r=s[0]),this.apple={phone:q(b,r),ipod:q(c,r),tablet:!q(b,r)&&q(d,r),device:q(b,r)||q(c,r)||q(d,r)},this.amazon={phone:q(g,r),tablet:!q(g,r)&&q(h,r),device:q(g,r)||q(h,r)},this.android={phone:q(g,r)||q(e,r),tablet:!q(g,r)&&!q(e,r)&&(q(h,r)||q(f,r)),device:q(g,r)||q(h,r)||q(e,r)||q(f,r)},this.windows={phone:q(i,r),tablet:q(j,r),device:q(i,r)||q(j,r)},this.other={blackberry:q(k,r),blackberry10:q(l,r),opera:q(m,r),firefox:q(o,r),chrome:q(n,r),device:q(k,r)||q(l,r)||q(m,r)||q(o,r)||q(n,r)},this.seven_inch=q(p,r),this.any=this.apple.device||this.android.device||this.windows.device||this.other.device||this.seven_inch,this.phone=this.apple.phone||this.android.phone||this.windows.phone,this.tablet=this.apple.tablet||this.android.tablet||this.windows.tablet,"undefined"==typeof window?this:void 0},s=function(){var a=new r;return a.Class=r,a};"undefined"!=typeof module&&module.exports&&"undefined"==typeof window?module.exports=r:"undefined"!=typeof module&&module.exports&&"undefined"!=typeof window?module.exports=s():"function"==typeof define&&define.amd?define("isMobile",[],a.isMobile=s()):a.isMobile=s()}(this);

var checkMobile = (isMobile.any ? 'Mobile' : 'Not mobile');
if(checkMobile == 'Mobile'){
	jQuery("div.sub-menu").hide();
	jQuery("h5").click(function () {		
		jQuery(this).toggleClass("current-active");
		jQuery(this).next("div.sub-menu").slideToggle("slow");
	});
}