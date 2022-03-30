(function($) {

    'use strict';

    var portfolioCube = function() {
        if ( $().cubeportfolio ) {
            $('.agrikole-project-grid').each(function() {
                var
                $this = $(this),
                item = $this.data("column"),
                item2 = $this.data("column2"),
                item3 = $this.data("column3"),
                item4 = $this.data("column4"),
                gapH = Number($this.data("gaph")),
                gapV = Number($this.data("gapv")),
                filter = $this.data("filter"),
                layout = $this.data("layout");

                if ( !filter ) { filter = '*'; }
                else { filter = '.' + filter; }

                $this.find('#portfolio').cubeportfolio({
                    filters: '#project-filter',
                    layoutMode: layout,
                    defaultFilter: filter,
                    animationType: 'quicksand',
                    gapHorizontal: gapH,
                    gapVertical: gapV,
                    showNavigation: true,
                    showPagination: true,
                    gridAdjustment: 'responsive',
                    rewindNav: false,
                    auto: false,
                    mediaQueries: [{
                        width: 1500,
                        cols: item
                    }, {
                        width: 1100,
                        cols: item
                    }, {
                        width: 800,
                        cols: item2
                    }, {
                        width: 550,
                        cols: item3
                    }, {
                        width: 320,
                        cols: item4
                    }],
                    caption: 'overlayBottomAlong',
                    displayType: 'bottomToTop',
                    displayTypeSpeed: 100
                });
            });
        }
    };

    var imagesCube = function() {
        $('.agrikole-images-grid').each(function() {
            var
            $this = $(this),
            layout = $this.data("layout"),
            item = $this.data("column"),
            item2 = $this.data("column2"),
            item3 = $this.data("column3"),
            item4 = $this.data("column4"),
            layout = $this.data("layout"),
            gapH = Number($this.data("gaph")),
            gapV = Number($this.data("gapv"));

            $this.find('#images-wrap').cubeportfolio({
                layoutMode: layout,
                defaultFilter: '*',
                animationType: 'quicksand',
                gapHorizontal: gapH,
                gapVertical: gapV,
                showNavigation: true,
                showPagination: true,
                gridAdjustment: 'responsive',
                rewindNav: false,
                auto: false,
                mediaQueries: [{
                    width: 1500,
                    cols: item
                }, {
                    width: 1100,
                    cols: item
                }, {
                    width: 800,
                    cols: item2
                }, {
                    width: 550,
                    cols: item3
                }, {
                    width: 320,
                    cols: item4
                }],
                caption: ' ',
                displayType: 'bottomToTop',
                displayTypeSpeed: 100
            });
        });
    };

    var projectRelatedOwl = function() {
        if ( $().owlCarousel ) {
            $('.project-related').each(function(){
                var
                $this = $(this),
                gap = Number($this.data("gap")),
                column = $this.data("column");

                $this.find('.owl-carousel').owlCarousel({
                    loop: false,
                    margin: gap,
                    nav: true,
                    navigation : true,
                    pagination: true,
                    autoplay: false,
                    autoplayTimeout: 5000,
                    responsive: {
                        0:{
                            items:1
                        },
                        600:{
                            items:2
                        },
                        1000:{
                            items:column
                        }
                    }
                });
            });
        }
    };

    var carouselBoxOwl = function() {
        if ( $().owlCarousel ) {
            $('.agrikole-carousel-box').each(function(){
                var
                $this = $(this),
                auto = $this.data("auto"),
                loop = $this.data("loop"),
                item = $this.data("column"),
                item2 = $this.data("column2"),
                item3 = $this.data("column3"),
                gap = Number($this.data("gap"));

                $this.find('.owl-carousel').owlCarousel({
                    loop: loop,
                    margin: gap,
                    nav: true,
                    navigation : true,
                    pagination: true,
                    autoplay: auto,
                    autoplayTimeout: 5000,
                    responsive: {
                        0:{
                            items:item3
                        },
                        600:{
                            items:item2
                        },
                        1000:{
                            items:item
                        }
                    }
                });
            });
        }
    };

    var imagesCarouselOwl = function() {
        if ( $().owlCarousel ) {
            $('.agrikole-images-carousel').each(function(){
                var
                $this = $(this),
                auto = $this.data("auto"),
                loop = $this.data("loop"),
                item = $this.data("column"),
                item2 = $this.data("column2"),
                item3 = $this.data("column3"),
                gap = Number($this.data("gap"));

                $this.find('.owl-carousel').owlCarousel({
                    loop: loop,
                    margin: gap,
                    nav: true,
                    navigation : true,
                    pagination: true,
                    autoplay: auto,
                    autoplayTimeout: 5000,
                    responsive: {
                        0:{
                            items:item3
                        },
                        600:{
                            items:item2
                        },
                        1000:{
                            items:item
                        }
                    }
                });
            });
        }
    };

    var portfolioOwl = function() {
        if ( $().owlCarousel ) {
            $('.agrikole-project').each(function(){
                var
                $this = $(this),
                auto = $this.data("auto"),
                item = $this.data("column"),
                item2 = $this.data("column2"),
                item3 = $this.data("column3"),
                gap = Number($this.data("gap")),
                center = Number($this.data("center")),
                loop = Number($this.data("loop"));

                $this.find('.owl-carousel').owlCarousel({
                    loop: loop,
                    center: center,
                    margin: gap,
                    nav: true,
                    navigation : true,
                    pagination: true,
                    autoplay: auto,
                    autoplayTimeout: 5000,
                    responsive: {
                        0:{
                            items:item3
                        },
                        600:{
                            items:item2
                        },
                        1000:{
                            items:item
                        }
                    }
                });
            });
        }
    };

    var newsOwl = function() {
        if ( $().owlCarousel ) {
            $('.agrikole-news').each(function(){
                var
                $this = $(this),
                auto = $this.data("auto"),
                item = $this.data("column"),
                item2 = $this.data("column2"),
                item3 = $this.data("column3"),
                gap = Number($this.data("gap"));

                $this.find('.owl-carousel').owlCarousel({
                    loop: false,
                    margin: gap,
                    nav: true,
                    navigation : true,
                    pagination: true,
                    autoplay: auto,
                    autoplayTimeout: 5000,
                    responsive: {
                        0:{
                            items:item3
                        },
                        600:{
                            items:item2
                        },
                        1000:{
                            items:item
                        }
                    }
                });
            });
        }
    };

    var teamOwl = function() {
        if ( $().owlCarousel ) {
            $('.agrikole-team').each(function(){
                var
                $this = $(this),
                auto = $this.data("auto"),
                loop = $this.data("loop"),
                item = $this.data("column"),
                item2 = $this.data("column2"),
                item3 = $this.data("column3"),
                gap = Number($this.data("gap"));

                $this.find('.owl-carousel').owlCarousel({
                    loop: loop,
                    margin: gap,
                    nav: true,
                    navigation : true,
                    pagination: true,
                    autoplay: auto,
                    autoplayTimeout: 5000,
                    responsive: {
                        0:{
                            items:item3
                        },
                        600:{
                            items:item2
                        },
                        1000:{
                            items:item
                        }
                    }
                });
            });
        }
    };

    var partnerOwl = function() {
        if ( $().owlCarousel ) {
            $('.agrikole-partner').each(function(){
                var
                $this = $(this),
                auto = $this.data("auto"),
                loop = $this.data("loop"),
                item = $this.data("column"),
                item2 = $this.data("column2"),
                item3 = $this.data("column3"),
                gap = Number($this.data("gap"));

                $this.find('.owl-carousel').owlCarousel({
                    loop: loop,
                    margin: gap,
                    nav: true,
                    navigation : true,
                    pagination: true,
                    autoplay: auto,
                    autoplayTimeout: 5000,
                    responsive: {
                        0:{
                            items:item3
                        },
                        600:{
                            items:item2
                        },
                        1000:{
                            items:item
                        }
                    }
                });
            });
        }
    };

    var wooOwl = function() {
        if ( $().owlCarousel ) {
            $('.agrikole-products').each(function(){
                var
                $this = $(this),
                auto = $this.data("auto"),
                item = $this.data("column"),
                item2 = $this.data("column2"),
                item3 = $this.data("column3"),
                gap = Number($this.data("gap"));

                $this.find('.owl-carousel').owlCarousel({
                    loop: false,
                    margin: gap,
                    nav: true,
                    navigation : true,
                    pagination: true,
                    autoplay: auto,
                    autoplayTimeout: 5000,
                    responsive: {
                        0:{
                            items:item3
                        },
                        600:{
                            items:item2
                        },
                        1000:{
                            items:item
                        }
                    }
                });
            });
        }
    };

    var accordions = function() {
        $('.agrikole-accordions').each(function() {

            var args = {easing:'easeOutExpo', duration:300};

            $(this).find('.accordion-content').hide()
                .parent().filter('.active')
                    .find('.accordion-content').show();

            if ( $(this).is('.toggles') ) {
                $(this).find('.accordion-heading').on('click', function () {
                    if ( !$(this).parent().is('.active') ) {
                        $(this).parent().toggleClass('active')
                            .children('.accordion-content').slideDown(args);
                    } else {
                        $(this).parent().removeClass('active')
                            .children('.accordion-content').slideUp(args);
                    }
                });
            } else if ( $(this).is('.accordions') ) {
                $(this).find('.accordion-heading').on('click', function () {
                    if ( !$(this).parent().is('.active') ) {
                        $(this).parent().toggleClass('active')
                            .children('.accordion-content').slideToggle(args)
                        .parent().siblings('.active').removeClass('active')
                            .children('.accordion-content').slideToggle(args);
                    } else {
                        $(this).parent().toggleClass('active');
                        $(this).next().slideToggle(args);
                    }
                });
            }
        });
    };

    var popupImages = function() {
        if ( $().magnificPopup ) {
            $('.popup-image').magnificPopup({
                disableOn: 700,
                type: 'image',
                gallery:{
                    enabled: true
                },
                mainClass: 'mfp-fade',
                removalDelay: 160,
                preloader: false,
                fixedContentPos: true
            });
        };
    };

    var popupVideo = function() {
        if ( $().magnificPopup ) {
            $('.popup-video').magnificPopup({
                disableOn: 700,
                type: 'iframe',
                mainClass: 'mfp-fade',
                removalDelay: 160,
                preloader: false,
                fixedContentPos: true
            });
        };
    };

    var spacer = function() {
        $(window).on('load resize', function() {
            var mode = 'desktop';

            if ( matchMedia( 'only screen and (max-width: 991px)' ).matches )
                mode = 'mobile';

            if ( matchMedia( 'only screen and (max-width: 767px)' ).matches )
                mode = 'smobile';

            $('.agrikole-spacer').each(function(){
                if ( mode == 'desktop' ) {
                    $(this).attr('style', 'height:' + $(this).data('desktop') + 'px')
                } else if ( mode == 'mobile' ) {
                    $(this).attr('style', 'height:' + $(this).data('mobi') + 'px')
                } else {
                    $(this).attr('style', 'height:' + $(this).data('smobi') + 'px')
                }
            })

        });
    };

    var counter = function(){
        function agrikoleInview(ele) {
            var window_top = $(window).scrollTop(),
                offset_top = $(ele).offset().top;
            if ( $(ele).length > 0 ) {
                if (    offset_top + $(ele).height() - 100 >= window_top &&
                        offset_top <= ( window_top + 0.85 * $(window).height() ) ) {
                        return true;
                } else {
                    return false;
                }
            }
        }

        function run_animations() {
            var did_scroll = false;
            $(window).on('scroll', function(){
                did_scroll = true;
            });
            setInterval(function () {
                if (did_scroll) {
                    did_scroll = false;

                    $('.agrikole-counter').each(function() {
                        var $this = $(this);

                        if ( agrikoleInview($this) && !$this.data('complete') ) {
                            $this.data('complete',true);
                            var delay = parseInt($this.data('delay'));
                            setTimeout(function(){
                                $this.find('.number').countTo();
                            }, delay );
                        }
                    });
                }
            }, 200);
        }
        run_animations();
    };

    var progressBar = function() {
        if ( $().appear ) {
            var $section = $('.agrikole-progress').appear(function() {
            
            function runBars() {
                var bar = $('.progress-animate');
                var bar_width = $(this);
                $(function(){
                  $(bar).each(function(){
                    bar_width = $(this).attr('data-valuenow');
                    $(this).width(bar_width + '%');

                    $(this).parents('.agrikole-progress').find('.perc').addClass('show').width(bar_width + '%');
                  });
                });
            }

            runBars();
            });
        }
    };

    var elmentHover = function() {
        $(".agrikole-image-video .icon").hover(
        function(){
            $(this).css({
                "color": $(this).data('chover'),
                "background-color": $(this).data('ghover'),
                "border-color": $(this).data('bhover'),
                "transition": "all 0.3s"
            });
        }, function(){
            $(this).css({
                "color": $(this).data('c'),
                "background-color": $(this).data('g'),
                "border-color": $(this).data('b'),
            });
        });
    };

    var resizeHeading = function() {
        $(window).on('load resize', function() {
            $('.agrikole-headings, .agrikole-counter').each(function() {
                var
                $this = $(this),
                font = $this.data("font"),
                fontMobi = $this.data("mfont");

                if ( fontMobi ) {
                    if ( $(window).width() < 960 ) {
                        $this.find('.heading').css('font-size', fontMobi + 'px');
                    } else { 
                        $this.find('.heading').css('font-size', font + 'px');
                    }
                }
            });
        });
    };

    var mobiFont = function() {
        $(window).on('load resize', function() {
            $('[data-font-resize]').each(function() {
                var
                $this = $(this),
                font = $this.data("font"),
                fontMobi = $this.data("mfont");

                if ( fontMobi ) {
                    if ( $(window).width() < 960 ) {
                        $this.css('font-size', fontMobi + 'px');
                    } else { 
                        $this.css('font-size', font + 'px');
                    }
                }
            });
        });
    };

    var hereSection =  function() {
        $(window).on('load resize', function(){
            var
            adminBarHeight = 0,
            topBarHeight = 0,
            contentTopMargin = 0,
            heroHeight = 0,
            customHeight = 0,
            adminBar = $('#wpadminbar'),
            topBar = $('#top-bar'),
            hero = $('.hero-section'),
            windowHeight = $(window).height(),
            headerHeight = $('#site-header').height(),
            heroContent = hero.find('.hero-content'),
            contentHeight = heroContent.height(),
            spacing = hero.data('content');
            customHeight = hero.data('height');

            if (topBar.length) topBarHeight = topBar.height();
            if (adminBar.length) adminBarHeight = adminBar.height();

            heroHeight = windowHeight;
            if ( customHeight )
                heroHeight = customHeight;

            if ( $('body').hasClass('header-style-4') ) {
                hero.css({ height: (heroHeight - adminBarHeight) + "px" });
                contentTopMargin = ((heroHeight - contentHeight) / 2) + topBarHeight + spacing;

                heroContent.css("padding-top", (contentTopMargin) + "px");
            } else {
                if ( ! customHeight )
                    heroHeight = heroHeight - headerHeight - topBarHeight - adminBarHeight;
                hero.css({ height: heroHeight + "px" });
                contentTopMargin = ((heroHeight - contentHeight) / 2) + spacing;
                heroContent.css("padding-top", (contentTopMargin) + "px");
            }
        })

        if ( $().vegas ) {
            $(".hero-section.slideshow").each(function() {
                var
                $this = $(this),
                count = $this.data('count'),
                count = parseInt(count,10),
                effect = $this.data('effect'),
                images = $this.data('image'),
                cOverlay = $this.data('overlay'),
                pOverlay = $this.data('poverlay'),
                i = 0,
                slides = [],
                imgs = images.split('|');

                while ( i < count ) {
                    slides.push( {src:imgs[i]} );
                    i++;
                }

                $this.vegas({
                    slides: slides,
                    overlay: true,
                    transition: effect
                });

                var overlay = $('<div />', {
                    class: 'overlay',
                    style: 'background:' + cOverlay
                });

                $(this).append(overlay)
                    .find('.vegas-overlay')
                    .addClass(pOverlay);
            });
        }

        $('.scroll-target, .scroll-btn').on('click',function() {
            var anchor = $(this).attr('href').split('#')[1];

            if ( anchor ) {
                if ( $('#'+anchor).length > 0 ) {
                    var headerHeight = 0;

                    if ( $('body').hasClass('header-fixed') )
                        headerHeight = $('#site-header').height();

                    var target = $('#' + anchor).offset().top - headerHeight;

                    $('html,body').animate({scrollTop: target}, 1000, 'easeInOutExpo');
               }
            }
            return false;
        })

        if ( $('.agrikole-fancy-text').is('.scroll') ) {
            $('.agrikole-fancy-text.scroll').each(function() {
                var
                $this = $(this),
                current = 1,
                height = $this.height(),
                numberDivs = $this.children().length,
                first = $this.children('.heading:nth-child(1)');

                setInterval(function() {
                    var number = current * -height;
                    
                    first.css('margin-top', number + 'px');
                    if ( current === numberDivs ) {
                        first.css('margin-top', '0px');
                        current = 1;
                    } else current++;
                }, 2500);
            });
        }

        if ( $('.agrikole-fancy-text').is('.typed') ) {
            if ( $().typed ) {
                $('.agrikole-fancy-text.typed').each(function() {
                    var
                    $this = $(this),
                    texts = $this.data('fancy').split(',');

                    $this.find('.text').typed({
                        strings: texts,
                        typeSpeed: 30,
                        loop: true,
                        backDelay: 4000
                    });
                });
            }
        }
    };

    var fitText =  function() {
        if ( $().fitText ) {
            $('.agrikole-fancy-text').each(function(){
                var min = $(this).data("min");
                var max = $(this).data("max");

                $(this).children('.heading').fitText(1.8, {
                    minFontSize: min,
                    maxFontSize: max
                });
            });
        }
    };

    var bgVideo =  function() {
        if ( $().YTPlayer ) {
            $(".hero-section.video").each(function() {
                var
                $this = $(this),
                cOverlay = $this.data('overlay'),
                overlay = $('<div />', {
                    class: 'overlay',
                    style: 'background:' + cOverlay
                });

                $this.YTPlayer().append(overlay);
            });
        }
    };

    var tabs =  function() {
        $('.agrikole-tabs').each(function(){
            var 
            list ="",
            title = $(this).find('.item-title').remove(),
            titleWrap = $(this).children('.tab-title') ;

            title.each(function() {
                list = list + "<li class= 'item-title'>" + $(this).html() + "</li>";
            });

            titleWrap.append(list);

            $(this).find('.tab-title li').filter(':first').addClass('active');
            $(this).find('.tab-content-wrap').children().hide().filter(':first').show();

            $(this).find('.tab-title li').on('click', function(e) {
                var
                idx = $(this).index(),
                content = $(this).closest('.agrikole-tabs').find('.tab-content-wrap').children().eq(idx);

                $(this).addClass('active').siblings().removeClass('active');
                content.fadeIn('slow').siblings().hide();

                e.preventDefault();
            });
        });
    };

    var advtabs =  function() {
        $('.agrikole-adv-tabs').each(function(){
            var 
            list = '',
            title = $(this).find('.item-title').remove(),
            titleWrap = $(this).children('.tab-title') ;

            title.each(function() {
                list += "<div class= 'item-title'>" + $(this).html() + "</div>";
            });

            titleWrap.append(list);

            var first = $(this).find('.tab-title > div').filter(':first').addClass('active').find('.image-icon');
                first.attr('src', first.data('hover-src') );

            $(this).find('.tab-content-wrap').children().hide().filter(':first').show();

            $(this).find('.tab-title > div').on('click', function(e) {
                var
                idx = $(this).index(),
                content = $(this).closest('.agrikole-adv-tabs').find('.tab-content-wrap').children().eq(idx),
                imgSibs = $(this).siblings('.item-title').find('.image-icon');

                $(this).addClass('active').siblings().removeClass('active');
                content.fadeIn('slow').siblings().hide();

                $.each(imgSibs, function() {
                    $(this).attr('src', $(this).data('origin-src') );
                });

                e.preventDefault();
            });
        });

        $(document).on('mouseover', '.anchor-link', function() {
            if ( ! $(this).parent('div').hasClass('active') ) {
                var hover_src = $(this).find('.image-icon').data( 'hover-src' );
                if ( '' !== hover_src ) {
                    $(this).find('.image-icon').attr( 'src', hover_src );
                }
            }
        })

        $(document).on('mouseleave', '.anchor-link', function() {
            if ( ! $(this).parent('div').hasClass('active') ) {
                var origin_src = $(this).find('.image-icon').data( 'origin-src' );
                $(this).find('.image-icon').attr( 'src', origin_src );
            }
        })
    };

    var srollTarget = function() {
        $('.agrikole-scroll-target').on('click',function() {
            var anchor = $(this).children().attr('href').split('#')[1];

            if ( anchor ) {
                if ( $('#'+anchor).length > 0 ) {
                    var headerHeight = 0;

                    if ( $('body').hasClass('header-fixed') ) {
                        headerHeight = $('#site-header').height();

                        if ( $('body').hasClass('header-style-5') )
                            headerHeight = $('#site-header .site-navigation-wrap').height();
                    }

                    var target = $('#' + anchor).offset().top - headerHeight;

                    $('html,body').animate({scrollTop: target}, 1000, 'easeInOutExpo');
               }
            }
            return false;
        })
    };

    var countDown = function() {
        var style = function(data) {
         $(this.el).html(
            "<div class='column days'>" +
                "<div class='numb'>" + this.leadingZeros(data.days, 2) + "</div>" +
                "<div class='text'>Days</div>" +
            "</div>" +
            "<div class='column hours'>" +
                "<div class='numb'>" + this.leadingZeros(data.hours, 2) + "</div>" +
                "<div class='text'>Hours</div>" +
            "</div>" +
            "<div class='column mins'>" +
                "<div class='numb'>" + this.leadingZeros(data.min, 2) + "</div>" +
                "<div class='text'>Minutes</div>" +
            "</div>" +
            "<div class='column secs'>" +
                "<div class='numb'>" + this.leadingZeros(data.sec, 2) + "</div>" +
                "<div class='text'>Seconds</div>" +
            "</div>");
        }

        $('.agrikole-countdown').each(function() {
            $(this).countdown({
                date: $(this).attr('data-date'),
                render: style
            });
        });
    };

    var equalizeHeight = function() {
        $(window).on('load resize', function () {
            setTimeout(function () {
                $(document).imagesLoaded(function () {
                    if ( matchMedia( 'only screen and (max-width: 767px)' ).matches ) {
                        $('.equalize').equalize({equalize: 'outerHeight', reset: true});
                        $('.equalize.sm-equalize-auto').children().css("height", "");
                        return false;
                    } else if ( matchMedia( 'only screen and (max-width: 991px)' ).matches ) {
                        $('.equalize').equalize({equalize: 'outerHeight', reset: true});
                        return false;
                    } else if ( matchMedia( 'only screen and (max-width: 1199px)' ).matches ) {
                        $('.equalize').equalize({equalize: 'outerHeight', reset: true});
                        return false;
                    } else {
                        $('.equalize').equalize({equalize: 'outerHeight', reset: true});
                    }
                });
            }, 500);
        });
    };

    var dynamicStyle = function() {
        var
        css = '',
        bg = '', text = '', icon = '', border = '', bg_h = '', text_h = '', icon_h = '', border_h = '', rd = '',
        rd_h = '', brc = '', brw = '', brs = '', brc_h = '', brw_h = '', brs_h = '', sdw = '', sdw_h = '', tx = '', ty = '',
        d1 = '', d2 = '';

        $('.agrikole-icon').each( function() {
            var
            cn = $(this).attr('class').split(' '),
            cl = '';

            $(cn).each(function(i,v){
                cl += '.'+v;
            });

            icon = $(cl).data("icon");
            bg = $(cl).data("background");
            border = $(cl).data("border");

            icon_h = $(cl).data("icon-hover");
            bg_h = $(cl).data("background-hover");
            border_h = $(cl).data("border-hover");

            icon = ( 'undefined' !== typeof icon ) ? 'color:'+icon+' !important;' : '';
            bg = ( 'undefined' !== typeof bg ) ? 'background-color:'+bg+' !important;' : '';
            border = ( 'undefined' !== typeof border ) ? 'border-color:'+border+' !important;' : '';

            icon_h = ( 'undefined' !== typeof icon_h ) ? 'color:'+icon_h+' !important;' : '';
            bg_h = ( 'undefined' !== typeof bg_h ) ? 'background-color:'+bg_h+' !important;' : '';
            border_h = ( 'undefined' !== typeof border_h ) ? 'border-color:'+border_h+' !important;' : '';

            if ( icon || bg || border ) css += cl+' .icon {'+bg+icon+border+'}\n';
            if ( icon_h || bg_h || border_h ) css += cl+':hover .icon {'+bg_h+icon_h+border_h+'}\n';
        });

        $('.agrikole-button.custom').each( function() {
            var
            cn = $(this).attr('class').split(' '),
            cl = '';

            $(cn).each(function(i,v){
                cl += '.'+v;
            });

            bg = $(cl).data("background");
            text = $(cl).data("text");
            icon = $(cl).data("icon");
            border = $(cl).data("border");

            bg_h = $(cl).data("background-hover");
            text_h = $(cl).data("text-hover");
            icon_h = $(cl).data("icon-hover");
            border_h = $(cl).data("border-hover");

            bg = ( 'undefined' !== typeof bg ) ? 'background-color:'+bg+' !important;' : '';
            text = ( 'undefined' !== typeof text ) ? 'color:'+text+' !important;' : '';
            icon = ( 'undefined' !== typeof icon ) ? 'color:'+icon+' !important;' : '';
            border = ( 'undefined' !== typeof border ) ? 'border-color:'+border+' !important;' : '';

            bg_h = ( 'undefined' !== typeof bg_h ) ? 'background-color:'+bg_h+' !important;' : '';
            text_h = ( 'undefined' !== typeof text_h ) ? 'color:'+text_h+' !important;' : '';
            icon_h = ( 'undefined' !== typeof icon_h ) ? 'color:'+icon_h+' !important;' : '';
            border_h = ( 'undefined' !== typeof border_h ) ? 'border-color:'+border_h+' !important;' : '';

            if ( bg || text || border ) css += cl+' {'+bg+text+border+'}\n';
            if ( bg_h || text_h || border_h ) css += cl+':hover {'+bg_h+text_h+border_h+'}\n';
            if ( icon ) css += cl+' .icon {'+icon+'}\n';
            if ( icon_h ) css += cl+':hover .icon {'+icon_h+'}\n';

        });

        $('.agrikole-content-box > .inner').each( function() {
            var
            cn = $(this).attr('class').split(' '),
            cl = '';

            $(cn).each(function( i,v ) {
                cl += '.'+v;
            });

            bg = $(cl).data("background");
            rd = $(cl).data("rounded");
            brc = $(cl).data("border-color");
            brw = $(cl).data("border-width");
            brs = $(cl).data("border-style");
            sdw = $(cl).data("shadow");

            bg_h = $(cl).data("background-hover");
            rd_h = $(cl).data("rounded-hover");
            brc_h = $(cl).data("border-color-hover");
            brw_h = $(cl).data("border-width-hover");
            brs_h = $(cl).data("border-style-hover");
            sdw_h = $(cl).data("shadow-hover");
            tx = $(cl).data("translatex");
            ty = $(cl).data("translatey");

            cl = '.agrikole-content-box '+cl;

            bg = ( 'undefined' !== typeof bg ) ? 'background-color:'+bg+' !important;' : '';
            rd = ( 'undefined' !== typeof rd ) ? 'border-radius:'+rd+' !important;' : '';
            brc = ( 'undefined' !== typeof brc ) ? 'border-color:'+brc+' !important;' : '';
            brw = ( 'undefined' !== typeof brw ) ? 'border-width:'+brw+' !important;' : '';
            brs = ( 'undefined' !== typeof brs ) ? 'border-style:'+brs+' !important;' : '';
            sdw = ( 'undefined' !== typeof sdw ) ? 'box-shadow:'+sdw+' !important;' : '';

            bg_h = ( 'undefined' !== typeof bg_h ) ? 'background-color:'+bg_h+' !important;' : '';
            rd_h = ( 'undefined' !== typeof rd_h ) ? 'border-radius:'+rd_h+' !important;' : '';
            brc_h = ( 'undefined' !== typeof brc_h ) ? 'border-color:'+brc_h+' !important;' : '';
            brw_h = ( 'undefined' !== typeof brw_h ) ? 'border-width:'+brw_h+' !important;' : '';
            brs_h = ( 'undefined' !== typeof brs_h ) ? 'border-style:'+brs_h+' !important;' : '';
            sdw_h = ( 'undefined' !== typeof sdw_h ) ? 'box-shadow:'+sdw_h+' !important;' : '';
            tx = ( 'undefined' !== typeof tx ) ? 'transform:translateX('+tx+'px) !important;' : '';
            ty = ( 'undefined' !== typeof ty ) ? 'transform:translateY('+ty+'px) !important;' : '';

            if ( bg || rd || brc || brw || brs || sdw )
                css += cl+' {'+bg+rd+brc+brw+brs+sdw+'}\n';

            if ( bg_h || rd_h || brc_h || brw_h || brs_h || sdw_h || tx || ty )
                css += cl+':hover {'+bg_h+rd_h+brc_h+brw_h+brs_h+sdw_h+tx+ty+'}\n';
        });

        $('.agrikole-simple-image.stretch').each( function() {
            var
            cn = $(this).attr('class').split(' '),
            cl = '';

            $(cn).each(function( i,v ) {
                cl += '.'+v;
            });

            d1 = $(cl).data("stretch-left");
            d2 = $(cl).data("stretch-right");

            d1 = ( 'undefined' !== typeof d1 ) ? 'margin-left:'+d1+' !important;' : '';
            d2 = ( 'undefined' !== typeof d2 ) ? 'margin-right:'+d2+' !important;' : '';

            if ( d1 || d2 )
                css += '@media (min-width: 1200px) {'+ cl+' {'+d1+d2+'}}\n';
        });

        if ( css ) $("head").append('<style type="text/css" id="agrikole-dynamic-css">' + css + '</style>');
    };

    var contentBox = function() {
        $(window).on('load resize', function() {
            var mode = 'desktop';

            if ( matchMedia( 'only screen and (max-width: 991px)' ).matches )
                mode = 'mobile';

            $('.agrikole-content-box').each(function(){
                if ( mode == 'desktop' ) {
                    $(this).css({'margin' : $(this).data('margin')})
                        .children('.inner').css({'padding' : $(this).data('padding')});
                } else if ( mode == 'mobile' ) {
                    $(this).css({'margin' : $(this).data('mobimargin')})
                        .children('.inner').css({'padding' : $(this).data('mobipadding')});
                }
            })
        });
    };

    var gridBox = function() {
        $(".agrikole-grid-box").each(function() {
            var g = $(this).data('grid');

            $(this).children('div').wrap('<div class="grid-item">');
            var item = $(this).children('.grid-item');

            for( var i = 0; i < item.length; i+=g ) {
                item.slice(i, i+g).wrapAll("<div class='grid-row clearfix'></div>");
            }
        })
    };

    var animateWOW =  function() {
        var wow = new WOW({
            animateClass: 'animated',
            offset: 50
        });
        wow.init();
    };

    var testimonials = function() {
        if ( $().owlCarousel ) {
            $('.agrikole-testimonials-box').find('.owl-carousel').owlCarousel({
                items    : 1,
                center     : false, 
                nav        : false,
                dots       : true,
                loop       : false,
                margin     : 0,
                autoplayTimeout: 5000
            });
        }
    };

    var testimonialsGroup = function() {
        if ( $().owlCarousel ) {
            var owlGroup = $('.agrikole-testimonials-group').find('.owl-carousel').owlCarousel({
                items    : 1,
                nav        : true,
                dots       : false,
                loop       : false,
                margin     : 0,
                dotsContainer: '.avatar-wrap',
                mouseDrag: false
            });

            $('.avatar-wrap').find( 'li' ).on( 'click', function(e) {
                owlGroup.trigger('to.owl.carousel', [$(this).index()]);
                $(this).addClass('active').siblings().removeClass('active');
            }).first().click();
        }
    };

    var centerCarousel = function() {
        if ( $().slick ) {
            $('.agrikole-center-carousel-box').each(function(){
                var
                $this = $(this),
                auto = $this.data("auto"),
                padding = $this.data("padding"),
                slide = $this.data("slide");

                $this.slick({
                    centerMode: true,
                    centerPadding: padding,
                    slidesToShow: slide,
                    autoplay: auto,
                    dots: true,
                    arrows: false,
                    responsive: [{
                        breakpoint: 991,
                        settings: {
                            slidesToShow: 1,
                        }
                    }, {
                        breakpoint: 767,
                        settings: {
                            slidesToShow: 1
                        }
                    }]
                });
            });
        }
    };

    var priceSwitcher = function() {
        $('.agrikole-pricing-group').each(function(){
            $(this).find('.pricing-content').children(':first').addClass('active');
            $(this).find('.pricing-switcher').children(':first').addClass('active');
            $(this).find('.pricing-switcher-wrap').children(':first').addClass('active');

            $(this).on('click', '.pricing-switcher .switch', function(e) {
                var
                idx = $(this).index(),
                content = $(this).closest('.agrikole-pricing-group').find('.pricing-content').children().eq(idx),
                switchText = $(this).closest('.agrikole-pricing-group').find('.switch-text').eq(idx);

                $(this).addClass('active').siblings().removeClass('active');
                content.addClass('active').siblings().removeClass('active');
                switchText.addClass('active').siblings('.switch-text').removeClass('active');

                e.preventDefault();
            });
        });
    };

    var parallaxImages =  function() {
        var parallaxBox = $('.agrikole-parallax-box');

        if ( parallaxBox.length ) {

            $(window).on('load resize', function() {
                parallaxBox.each(function() {
                    var
                    wrap = $(this).find('.parallax-wrap'),
                    height = [];
  
                    $(this).waitForImages(function() {
                        $(this).find('.agrikole-parallax-item').each(function() {
                            height.push( parseInt($(this).css('marginTop')) + $(this).height() );
                        });

                        wrap.css('height', Math.max.apply(null, height));
                    });
                });
            });
        }
    };

    var appSlider =  function() {
        if ( $().owlCarousel ) {
            if ($('.agrikole-app-carousel').length) {
                $('.agrikole-app-carousel').owlCarousel({
                    loop: true,
                    margin: 70,
                    items: 1,
                    nav: false,
                    dots: false,
                    smartSpeed: 700,
                    autoplay: false
                });
            }
        }
    };

    var inViewport =  function() {
        if ( $().appear ) {
            $('[data-in-viewport="true"]').appear(function() {
                $(this).addClass('is-in-view');
            });
        }
    };

        resizeHeading();
        mobiFont();
        spacer();
        counter();
        parallaxImages();
        contentBox();
        equalizeHeight();


    // Dom Ready
    $(function() {
        testimonials();
        testimonialsGroup();
        portfolioCube();
        accordions();
        popupImages();
        gridBox();
        popupVideo();
        elmentHover();
        tabs();
        advtabs();
        countDown();
        fitText();
        bgVideo();
        progressBar();
        dynamicStyle();
        srollTarget();
        priceSwitcher();
        appSlider();
        inViewport();
        hereSection();
    });

    $( window ).on('load', function() {
        portfolioOwl();
        newsOwl();
        teamOwl();
        partnerOwl();
        projectRelatedOwl();
        wooOwl();
        carouselBoxOwl();
        imagesCarouselOwl();
        animateWOW();
        imagesCube();
        centerCarousel();
    });
})(jQuery);


