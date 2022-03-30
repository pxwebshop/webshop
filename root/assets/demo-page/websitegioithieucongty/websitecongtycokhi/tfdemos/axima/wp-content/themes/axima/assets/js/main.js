;(function ($) {

    "use strict";

    /* ===================
     Page reload
     ===================== */
    var scroll_top;
    var window_height;
    var window_width;
    var scroll_status = '';
    var lastScrollTop = 0;
    $(window).on('load', function () {
        $(".cms-loader").fadeOut("slow");
        window_width = $(window).width();
        axima_col_offset();
        axima_header_sticky();
        axima_rtl();
        axima_scroll_to_top();
        setTimeout(function () { $('.cms-grid-menu-layout5 .grid-filter-wrap .filter-item:nth-child(1)').trigger('click'); }, 100);
    });
    $(window).on('resize', function () {
        window_width = $(window).width();
        axima_col_offset();
    });

    $(window).on('scroll', function () {
        scroll_top = $(window).scrollTop();
        window_height = $(window).height();
        window_width = $(window).width();
        if (scroll_top < lastScrollTop) {
            scroll_status = 'up';
        } else {
            scroll_status = 'down';
        }
        lastScrollTop = scroll_top;
        axima_header_sticky();
        axima_scroll_to_top();
    });

    $.sep_grid_refresh = function (){
        $('.cms-grid-masonry').each(function () {
            var iso = new Isotope(this, {
                itemSelector: '.grid-item',
                percentPosition: true,
                masonry: {
                    columnWidth: '.grid-sizer',
                },
                containerStyle: null,
                stagger: 30,
                sortBy : 'name',
            });

            var filtersElem = $(this).parent().find('.grid-filter-wrap');
            filtersElem.on('click', function (event) {
                var filterValue = event.target.getAttribute('data-filter');
                iso.arrange({filter: filterValue});
            });

            var filterItem = $(this).parent().find('.filter-item');
            filterItem.on('click', function (e) {
                filterItem.removeClass('active');
                $(this).addClass('active');
            });

            var filtersSelect = $(this).parent().find('.select-filter-wrap');
            filtersSelect.change(function() {
                var filters = $(this).val();
                iso.arrange({filter: filters});
            });

            var orderSelect = $(this).parent().find('.select-order-wrap');
            orderSelect.change(function() {
                var e_order = $(this).val();
                if(e_order == 'asc') {
                    iso.arrange({sortAscending: false});
                }
                if(e_order == 'des') {
                    iso.arrange({sortAscending: true});
                }
            });

        });
    }

    $(document).on('click', '.h-btn-search', function () {
        $('.cms-modal-search').addClass('open');
        setTimeout(function(){
            $('.cms-modal-search input[name="s"]').focus();
        },1000);
    });

    // load more
    $('.cms-grid').each(function () {
        var _this_wrap = $(this);
        var html_id = _this_wrap.attr('id');

        $(document).on('click', '.cms-load-more', function(){
            var loadmore = $(this).data('loadmore');
            var _this = $(this).parents(".cms-grid");
            var layout_type = _this.data('layout');
            loadmore.paged = parseInt(_this.data('start-page')) +1;
            var _this_click = $(this);
            _this_click.find('i').attr('class', 'fa fa-refresh fa-spin');
            $.ajax({
                url: main_data.ajax_url,
                type: 'POST',
                data: {
                    action: 'axima_load_more_post_grid',
                    settings: loadmore
                }
            })
            .done(function (res) {
                if(res.status == true) {
                    var html = $("<div></div>").html(res.data.html);
                    html.find(".grid-item").addClass("cms-animated");
                    html = html.html();
                    _this.find('.cms-grid-inner').append(html);
                    _this.data('start-page', res.data.paged);
                    if(layout_type == 'masonry'){
                        _this.imagesLoaded(function() {
                            $.sep_grid_refresh();
                        });
                    }
                    if(res.data.paged >= res.data.max){
                        _this_click.hide();
                    }
                }
            })
            .fail(function (res) {
                return false;
            })
            .always(function () {
                _this_click.find('i').attr('class', 'i-hidden');
                return false;
            });
        });

        // pagination
        $(document).on('click', '.cms-grid-pagination .ajax a.page-numbers', function(){
            var _this = $(this).parents(".cms-grid");
            var loadmore = _this.find(".cms-grid-pagination").data('loadmore');
            var query_vars = _this.find(".cms-grid-pagination").data('query');
            var layout_type = _this.data('layout');
            var paged = $(this).attr('href');
            paged = paged.replace('#', '');
            loadmore.paged = parseInt(paged);
            query_vars.paged = parseInt(paged);
            // reload pagination
            $.ajax({
                url: main_data.ajax_url,
                type: 'POST',
                data: {
                    action: 'axima_get_pagination_html',
                    query_vars: query_vars
                }
            }).done(function (res) {
                if(res.status == true){
                    _this.find(".cms-grid-pagination").html(res.data.html);
                }
            }).fail(function (res) {
                return false;
            }).always(function () {
                return false;
            });
            // load post
            $.ajax({
                url: main_data.ajax_url,
                type: 'POST',
                data: {
                    action: 'axima_load_more_post_grid',
                    settings: loadmore
                }
            }).done(function (res) {
                if(res.status == true){
                    _this.find('.cms-grid-inner .grid-item').remove();
                    _this.find('.cms-grid-inner').append(res.data.html);
                    _this.data('start-page', res.data.paged);
                    if(layout_type == 'masonry'){
                        _this.imagesLoaded(function() {
                            $.sep_grid_refresh();
                        });
                    }
                }
            }).fail(function (res) {
                return false;
            }).always(function () {
                return false;
            });
            return false;
        });
        
    });

    $(document).ready(function () {

        /* =================
         Menu Dropdown
         =================== */
        var $menu = $('.main-navigation');
        $menu.find('.primary-menu li').each(function () {
            var $submenu = $(this).find('> ul.sub-menu');
            if ($submenu.length == 1) {
                $(this).hover(function () {
                    if ($submenu.offset().left + $submenu.width() > $(window).width()) {
                        $submenu.addClass('back');
                    } else if ($submenu.offset().left < 0) {
                        $submenu.addClass('back');
                    }
                }, function () {
                    $submenu.removeClass('back');
                });
            }
        });

        $('.sub-menu .current-menu-item').parents('.menu-item-has-children').addClass('current-menu-ancestor');
        $('.mega-auto-width').parents('.megamenu').addClass('remove-pos');
        /* =================
         Menu Mobile
         =================== */
        $("#main-menu-mobile .open-menu").on('click', function () {
            $(this).toggleClass('opened');
            $('.site-navigation').toggleClass('navigation-open');
        });

        /* ===================
         Search Toggle
         ===================== */
        $('.h-btn-form').click(function (e) {
            e.preventDefault();
            $('.cms-modal-contact-form').removeClass('remove').toggleClass('open');
        });
        $('.cms-close').click(function (e) {
            e.preventDefault();
            $(this).parent().addClass('remove').removeClass('open');
            $(this).parents('.cms-modal').addClass('remove').removeClass('open');
            $(this).parents('#page').find('.site-overlay').removeClass('open');
        });

        /* Video 16:9 */
        $('.entry-video iframe').each(function () {
            var v_width = $(this).width();

            v_width = v_width / (16 / 9);
            $(this).attr('height', v_width + 35);
        });
        /* Images Light Box - Gallery:True */
        $('.images-light-box').each(function () {
            $(this).magnificPopup({
                delegate: 'a.light-box',
                type: 'image',
                gallery: {
                    enabled: true
                },
                mainClass: 'mfp-fade',
            });
        });

        $('.image-light-box').each(function () {
            $(this).magnificPopup({
                delegate: 'a.light-box',
                type: 'image',
                gallery: {
                    enabled: false
                },
                mainClass: 'mfp-fade',
            });
        });

        /* Video Light Box */
        $('.cms-video-button, .btn-video').magnificPopup({
            type: 'iframe',
            mainClass: 'mfp-fade',
            removalDelay: 160,
            preloader: false,
            fixedContentPos: false
        });
        
        /* ====================
         Scroll To Top
         ====================== */
        $('.scroll-top').click(function () {
            $('html, body').animate({scrollTop: 0}, 800);
            return false;
        });

        /* =================
        Add Class
        =================== */
        $('.wpcf7-select').parent().addClass('wpcf7-menu');
        /* =================
         Row & VC Column Animation
         =================== */
        $('.vc_row.wpb_row.vc_row-fluid').each(function () {
            var vctime = 100;
            var vc_inner = $(this).children().length;
            var _vci = vc_inner - 1;
            $(this).find('> .wpb_animate_when_almost_visible').each(function (index, obj) {
                $(this).css('animation-delay', vctime + 'ms');
                if (_vci === index) {
                    vctime = 100;
                    _vci = _vci + vc_inner;
                } else {
                    vctime = vctime + 100;
                }
            });
        });
        $('.animation-time').each(function () {
            var vctime = 100;
            var vc_inner = $(this).children().length;
            var _vci = vc_inner - 1;
            $(this).find('> .grid-item > .wpb_animate_when_almost_visible').each(function (index, obj) {
                $(this).css('animation-delay', vctime + 'ms');
                if (_vci === index) {
                    vctime = 100;
                    _vci = _vci + vc_inner;
                } else {
                    vctime = vctime + 40;
                }
            });
        });

        /* =================
         The clicked item should be in center in owl carousel
         =================== */
        var $owl_item = $('.owl-active-click');
        $owl_item.children().each(function (index) {
            $(this).attr('data-position', index);
        });
        $(document).on('click', '.owl-active-click .owl-item > div', function () {
            $owl_item.trigger('to.owl.carousel', $(this).data('position'));
        });

        /* Select */
        $('select').each(function () {
            $(this).niceSelect();
        });

        /* Newsletter */
        var email_text = $('.tnp-field-email label').text();
        $('.tnp-field-email label').remove();
        $('.tnp-field-email').find(".tnp-email").each(function (ev) {
            if (!$(this).val()) {
                $(this).attr("placeholder", email_text);
            }
        });
        var firstname_text = $('.tnp-field-firstname label').text();
        $('.tnp-field-firstname label').remove();
        $('.tnp-field-firstname').find(".tnp-firstname").each(function (ev) {
            if (!$(this).val()) {
                $(this).attr("placeholder", firstname_text);
            }
        });
        var lastname_text = $('.tnp-field-lastname label').text();
        $('.tnp-field-lastname label').remove();
        $('.tnp-field-lastname').find(".tnp-lastname").each(function (ev) {
            if (!$(this).val()) {
                $(this).attr("placeholder", lastname_text);
            }
        });

        /* Same Height */
        $('.vc_row-o-equal-height .col-equal-height').matchHeight();

        /* Mobile Menu */
        $('.main-navigation li.menu-item-has-children').append('<span class="main-menu-toggle"></span>');
        $('.main-menu-toggle').on('click', function () {
            $(this).parent().find('> .sub-menu').toggleClass('submenu-open');
            $(this).parent().find('> .sub-menu').slideToggle();
        });

        $(".h-btn-sidebar").on('click', function (e) {
            e.preventDefault();
            $('.cms-hidden-sidebar').toggleClass('open');
        });
        $(".cms-hidden-close").on('click', function (e) {
            e.preventDefault();
            $(this).parent().removeClass('open');
        });
        $(document).on('click', function (e) {
            if (e.target.className == 'cms-modal cms-modal-search open')
                $('.cms-modal-search').removeClass('open');
            if (e.target.className == 'cms-modal-close'){
                $(e.target).parents(".cms-modal-search").removeClass('open');
            }
            if (e.target.className == 'cms-hidden-sidebar open')
                $('.cms-hidden-sidebar').removeClass('open');
        });

        /* =================
         Move Divider, Angled & Overlay for Row VC
         =================== */
        $('.entry-content > .vc_row').each(function () {
            var _el_overlay = $(this).find(".cms-row-overlay"),
                _row_overlay = _el_overlay.parents(".wpb_column");
            _row_overlay.before(_el_overlay.clone());
            _el_overlay.remove();
            $(this).find(".cms-row-overlay").parent().addClass('vc-row-overlay');

            var _el_divider = $(this).find(".row-divider"),
                _row_divider = _el_divider.parents(".wpb_column");
            _row_divider.before(_el_divider.clone());
            _el_divider.remove();
        });

    });

    /* =================
     Column Absolute
     =================== */
    function axima_col_offset() {
        var w_vc_row_lg = ($('#content').width() - 1230) / 2;
        if (window_width > 1200) {
            $('.col-offset-right > .vc_column-inner').css('padding-right', w_vc_row_lg + 'px');
            $('.col-offset-left > .vc_column-inner').css('padding-left', w_vc_row_lg + 'px');
            $('.col-offset-right > .col-offset-inner').css('padding-right', w_vc_row_lg + 'px');
            $('.col-offset-left > .col-offset-inner').css('padding-left', w_vc_row_lg + 'px');
        }
    }

    function axima_header_sticky() {
        var offsetTop = $('#site-header-wrap').outerHeight();
        var h_header = $('.fixed-height').outerHeight();
        var offsetTopAnimation = offsetTop + 200;
        if($('#site-header-wrap').hasClass('is-sticky')) {
            if (scroll_top > offsetTopAnimation) {
                $('#site-header').addClass('h-fixed');
            } else {
                $('#site-header').removeClass('h-fixed');   
            }
        }
        if (window_width > 992) {
            $('.fixed-height').css({
                'height': h_header
            });
        }
    }

    function axima_rtl() {
        /* =================
        RTL
        =================== */
        if ($('html').attr('dir') == 'rtl') {
            $('[data-vc-full-width="true"]').each(function (i, v) {
                $(this).css('right', $(this).css('left')).css('left', 'auto');
            });
        }
    }

    /* ====================
     Scroll To Top
     ====================== */
    function axima_scroll_to_top() {
        if (scroll_top < window_height) {
            $('.scroll-top').addClass('off').removeClass('on');
        }
        if (scroll_top > window_height) {
            $('.scroll-top').addClass('on').removeClass('off');
        }
    }

})(jQuery);
