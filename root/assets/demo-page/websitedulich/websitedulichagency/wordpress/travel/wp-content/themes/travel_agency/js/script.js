;(function ($) {
$(document).on('ready', function() {

  "use strict";
  /*----------------------------------------------------*/
  /* MOBILE DETECT FUNCTION
   /*----------------------------------------------------*/
  var isMobile = {
    Android: function() {
      return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
      return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
      return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
      return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
      return navigator.userAgent.match(/IEMobile/i);
    },
    any: function() {
      return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
  };

  /*----------------------------------------------------*/
  // PARALLAX CALLING
  /*----------------------------------------------------*/
  $(window).bind('load', function () {
    parallaxInit();
  });
  function parallaxInit() {
    var testMobile;
    testMobile = isMobile.any();

    if (testMobile == null)
    {
      $('.parallax .bg1').addClass("bg-fixed").parallax("50%", 0.5);
      $('.parallax .bg2').addClass("bg-fixed").parallax("50%", 0.5);
    }
  }
  parallaxInit();

  /*----------------------------------------------------*/
  // Appear
  /*----------------------------------------------------*/
  var $animated = $('.animated');
  $animated.appear(function() {
    // console.log("111111111111");
    var elem = $(this);
    var animation = elem.data('animation');
    if ( !elem.hasClass('visible') ) {
      var animationDelay = elem.data('animation-delay');
      if ( animationDelay ) {
        setTimeout(function(){
          elem.addClass( animation + " visible" );
        }, animationDelay);
      } else {
        elem.addClass( animation + " visible" );
      }
    }
  });

  /*----------------------------------------------------*/
  // carouFredSel.
  /*----------------------------------------------------*/
  var oa = $('#slider').find('.carousel.main ul');
  if (oa.length > 0) {
    oa.carouFredSel({
      auto: {
        timeoutDuration: 8000
      },
      responsive: true,
      // prev: '.slider_prev',
      // next: '.slider_next',
      pagination: '.slider_pagination',
      width: '100%',
      scroll: {
        // fx : "crossfade",
        items: 1,
        duration: 1000,
        easing: "easeOutExpo"
      },
      items: {
        width: '1000',
        height: 'variable', //  optionally resize item-height
        visible: {
          min: 1,
          max: 1
        }
      },
      mousewheel: false,
      swipe: {
        onMouse: true,
        onTouch: true
      }
    });
  }

  var ob = $('#popular').find('.carousel.main ul');
  if (ob.length > 0) {
    ob.carouFredSel({
      auto: {
        timeoutDuration: 8000
      },
      responsive: true,
      // prev: '.popular_prev',
      // next: '.popular_next',
      pagination: '.popular_pagination',
      width: '100%',
      scroll: {
        // fx : "crossfade",
        items: 1,
        duration: 1000,
        easing: "easeOutExpo"
      },
      items: {
        width: '520',
        height: 'variable', //  optionally resize item-height
        visible: {
          min: 1,
          max: 3
        }
      },
      mousewheel: false,
      swipe: {
        onMouse: true,
        onTouch: true
      }
    });
  }


  var oc = $('.sm_slider1 .carousel.main ul');
  if (oc.length > 0) {
    oc.carouFredSel({
      auto: {
        timeoutDuration: 8000
      },
      responsive: true,
      prev: '.sm_slider1 .sm_slider_prev',
      next: '.sm_slider1 .sm_slider_next',
      width: '100%',
      scroll: {
        // fx : "crossfade",
        items: 1,
        duration: 1000,
        easing: "easeOutExpo"
      },
      items: {
        width: '1000',
        height: 'variable', //  optionally resize item-height
        visible: {
          min: 1,
          max: 1
        }
      },
      mousewheel: false,
      swipe: {
        onMouse: true,
        onTouch: true
      }
    });
  }

  var od = $('.sm_slider2 .carousel.main ul');
  if (od.length > 0) {
    od.carouFredSel({
      auto: {
        timeoutDuration: 8000
      },
      responsive: true,
      prev: '.sm_slider2 .sm_slider_prev',
      next: '.sm_slider2 .sm_slider_next',
      width: '100%',
      scroll: {
        // fx : "crossfade",
        items: 1,
        duration: 1000,
        easing: "easeOutExpo"
      },
      items: {
        width: '1000',
        height: 'variable', //  optionally resize item-height
        visible: {
          min: 1,
          max: 1
        }
      },
      mousewheel: false,
      swipe: {
        onMouse: true,
        onTouch: true
      }
    });
  }

  var oe = $('.sm_slider3 .carousel.main ul');
  if (oe.length > 0) {
    oe.carouFredSel({
      auto: {
        timeoutDuration: 8000
      },
      responsive: true,
      prev: '.sm_slider3 .sm_slider_prev',
      next: '.sm_slider3 .sm_slider_next',
      width: '100%',
      scroll: {
        // fx : "crossfade",
        items: 1,
        duration: 1000,
        easing: "easeOutExpo"
      },
      items: {
        width: '1000',
        height: 'variable', //  optionally resize item-height
        visible: {
          min: 1,
          max: 1
        }
      },
      mousewheel: false,
      swipe: {
        onMouse: true,
        onTouch: true
      }
    });
  }

  var of = $('.sm_slider4 .carousel.main ul');
  if (of.length > 0) {
    of.carouFredSel({
      auto: {
        timeoutDuration: 8000
      },
      responsive: true,
      prev: '.sm_slider4 .sm_slider_prev',
      next: '.sm_slider4 .sm_slider_next',
      width: '100%',
      scroll: {
        // fx : "crossfade",
        items: 1,
        duration: 1000,
        easing: "easeOutExpo"
      },
      items: {
        width: '1000',
        height: 'variable', //  optionally resize item-height
        visible: {
          min: 1,
          max: 1
        }
      },
      mousewheel: false,
      swipe: {
        onMouse: true,
        onTouch: true
      }
    });
  }

  var og = $('#sl1').find('.carousel.main ul');
  if (og.length > 0) {
    og.carouFredSel({
      auto: {
        timeoutDuration: 8000
      },
      responsive: true,
      prev: '.sl1_prev',
      next: '.sl1_next',
      pagination: '.sl1_pagination',
      width: '100%',
      scroll: {
        items: 1,
        duration: 1000,
        easing: "easeOutExpo"
      },
      items: {
        width: '2000',
        height: 'variable', //  optionally resize item-height
        visible: {
          min: 1,
          max: 1
        }
      },
      mousewheel: false,
      swipe: {
        onMouse: true,
        onTouch: true
      }
    });
  }


  $(window).bind("resize",updateSizes_vat).bind("load",updateSizes_vat);
  function updateSizes_vat(){
    $('#slider').find('.carousel.main ul').trigger("updateSizes");
    $('#popular').find('.carousel.main ul').trigger("updateSizes");
    $('.sm_slider1').find('.carousel.main ul').trigger("updateSizes");
    $('.sm_slider2').find('.carousel.main ul').trigger("updateSizes");
    $('.sm_slider3').find('.carousel.main ul').trigger("updateSizes");
    $('.sm_slider4').find('.carousel.main ul').trigger("updateSizes");
    $('#sl1').find('.carousel.main ul').trigger("updateSizes");

  }
  updateSizes_vat();

  // touchTouch
  var oh = $('.thumb-isotope .thumbnail a');
  if (oh.length > 0) {
    oh.touchTouch();
  }

  // Select2.
  $('.select2').select2({
    // containerCss: ".eeeeeee",
    minimumResultsForSearch: Infinity
  });

  function addDays(date, days) {
    return new Date(date.setTime( date.getTime() + days * 86400000 ));
  }

  // datapicker

  var datepickerClass = $('.datepicker');

  if(datepickerClass.hasClass('pickUp') || $(this).hasClass('dropOff')) {
    datepickerClass.datepicker({
      onSelect: function(dateText) {
        var dataStamp = moment(this.value, "MM/DD/YYYY").format("YYYYMMDD");
        $(this).attr('data-stamp', dataStamp);
        var curpi = $('.curprice').html();
        var date1 = new Date($('.pickUp').val());
        var date2 = new Date($('.dropOff').val());
        var timeDiff = Math.abs(date2.getTime() - date1.getTime());
        var sxvaoba = Math.ceil(timeDiff / (1000 * 3600 * 24));
        var price = parseInt(sxvaoba)*curpi;
        $('.prsz').html('$'+price);
        $('.prais').val(price);
        $('.nights').find('span').html(sxvaoba);
      },
      orientation: "top"
    });
  }
  else if (datepickerClass.hasClass('startDate')) {
    datepickerClass.datepicker({
      onSelect: function(dateText) {
        var days = $('input[name="number_of_days"]').val();
        var date1 = new Date($('.startDate').val());
        var date2 = addDays(date1, days);
        if(parseInt(date2.getDate()) < 10) {
          var dd = '0'+date2.getDate();
        }
        else {
          var dd = date2.getDate();
        }
        if(parseInt(date2.getMonth() + 1) < 10) {
          var mm = '0'+(parseInt(date2.getMonth()) + 1);
        }
        else {
          var mm = date2.getMonth() + 1;
        }
        var y = date2.getFullYear();
        var someFormattedDate = mm + '/'+ dd + '/'+ y;
        $('.endDate').val(someFormattedDate);
      },
      orientation: "top"
    });
  }
  else {
    datepickerClass.datepicker({
      orientation: "top"
    });
  }



  // Tabs.
  var indexA = $('.tabs1 .tabs_tabs ul').find(".active").index();
  $( ".tabs1" ).tabs({
    active: indexA
  });

  var indexB = $('.tabs2 .tabs_tabs ul').find(".active").index();
  $( ".tabs2" ).tabs({
    active: indexB
  });

  var indexC = $('.tabs3 .tabs3_tabs ul').find(".active").index();
  $( ".tabs3" ).tabs({
    active: indexC
  });





  /*----------------------------------------------------*/
  // Appear
  /*----------------------------------------------------*/
  $animated.appear(function() {
    // console.log("111111111111");
    var elem = $(this);
    var animation = elem.data('animation');
    if ( !elem.hasClass('visible') ) {
      var animationDelay = elem.data('animation-delay');
      if ( animationDelay ) {
        setTimeout(function(){
          elem.addClass( animation + " visible" );
        }, animationDelay);
      } else {
        elem.addClass( animation + " visible" );
      }
    }
  });

  // Animate number
  $('.animated-distance').appear(function() {
    var elem = $(this);
    var b = elem.data('num');
    var d = elem.data('duration');
    var animationDelay = elem.data('animation-delay');
    if ( !animationDelay ) { animationDelay = 0; }
    elem.find('span').text("0" + '%');

    setTimeout(function(){
      elem.animate({ num: b }, {
        duration: d,
        // easing: 'easeOutExpo',
        step: function (num){
          var a;
          a = (num).toFixed(0) + '%';
          elem.find('span').text(a);
          elem.css("width", a);
        }
      });
    }, animationDelay);
  });

  /*----------------------------------------------------*/
  // IZOTOPE
  /*----------------------------------------------------*/
  var o = $('#container');
  if (o.length > 0) {
    var $container = o;

    $container.isotope({
      itemSelector: '.element',
      // layoutMode: 'masonry',
      masonry: {
        columnWidth: '.grid-sizer',
        gutter: '.gutter-sizer'
      },
      percentPosition: true,
      transitionDuration: '0.8s'
    });

    // layout Isotope after each image loads
    $container.imagesLoaded().progress( function() {
      $container.isotope('layout');
    });

    $container.isotope('layout');

    var $optionSets = $('#options').find('.option-set'),
        $optionLinks = $optionSets.find('a');

    $optionLinks.click(function(){
      var $this = $(this);
      // don't proceed if already selected
      if ( $this.hasClass('selected') ) {
        return false;
      }
      var $optionSet = $this.parents('.option-set');
      $optionSet.find('.selected').removeClass('selected');
      $this.addClass('selected');

      // make option object dynamically, i.e. { filter: '.my-filter-class' }
      var options = {},
          key = $optionSet.attr('data-option-key'),
          value = $this.attr('data-option-value');
      // parse 'false' as false boolean
      value = value === 'false' ? false : value;
      options[ key ] = value;
      if ( key === 'layoutMode' && typeof changeLayoutMode === 'function' ) {
        // changes in layout modes need extra logic
        changeLayoutMode( $this, options )
      } else {
        // otherwise, apply new options
        $container.isotope( options );
      }

      return false;
    });
  }

  $(document).on('change', '.liveClass', function () {
    var price = $('input[data-choice="'+$(this).val()+'"]').val();
    $('.red').html('$'+price);
    $('.prais').val(price);
  });



  $(document).on('change', '.autoOnChange', function () {
    $(this).submit();
  });

  $(document).on('click', '.klk', function (e) {
    e.preventDefault();
    e.stopPropagation();
    window.location.href = $(this).attr('data-href');
  });

  var actCur = $('.activeCur');

  var curH = actCur.children().html();

  actCur.html('<a class="page-numbers current">'+curH+'</a>');


}); //
$(window).on('load', function() {
  //



  $('.menu-item-has-children').addClass('sub-menu');
  $('.sub-menu').addClass('sub-menu-1');
  $('a', '.sub-menu').append('<em></em>');



}); //
	})(jQuery);