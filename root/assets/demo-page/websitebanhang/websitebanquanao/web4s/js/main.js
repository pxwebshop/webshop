var nh_config = {
    url_current: window.location.pathname
}

nh_functions = {
    init: function() {
        var self = this;
        // load item block by ajax
        self.getItemBlock();

        // set type view list when document already
        // self.setDisplayViewOnLoad();

        // active class on main menu
        self.activeMainMenu();

        // add param url in url pagination
        /*$(document).on('click', '.pagination li:not(.disabled , .active) a', function() {
            if (typeof window.location.search != 'undefined') {
                $(this).attr('href', $(this).attr('href') + window.location.search);
            }
        });*/

    },
    chosenRegion: function(wrap_id) {
        // chosen select city change
        $(wrap_id + " select[name='city_id']").on("change", function() {
            var city_id = $(this).val();
            // check element exist
            if ($(wrap_id + " select[name='district_id']").length) {
                nh_member.getLocationRegister(city_id, 'district', function(json_respon) {
                    // empty option of  district select
                    $(wrap_id + " select[name='district_id']").empty();
                    // append new option to ward select
                    if (!$.isEmptyObject(json_respon)) {
                        nh_member.appendOptionSelect(wrap_id + " select[name='district_id']", json_respon);
                    }
                    // add option default
                    var default_option = "<option value=''>" + global_lang.select_district_option + "</option>";
                    $(wrap_id + " select[name='district_id']").prepend(default_option);
                    $(wrap_id + " select[name='district_id'] option[value='']").attr('selected', 'selected');
                    // update select by chosen
                    $(wrap_id + " select[name='district_id']").trigger('chosen:updated');
                });
            }

        });

        // chosen select district change
        $(wrap_id + " select[name='district_id']").on("change", function() {
            var district_id = $(this).val();
            // check element exist
            if ($(wrap_id + " select[name='ward_id']").length) {
                nh_member.getLocationRegister(district_id, 'ward', function(json_respon) {
                    // empty option of  ward select
                    $(wrap_id + " select[name='ward_id']").empty();
                    // append new option to ward select
                    if (!$.isEmptyObject(json_respon)) {
                        nh_member.appendOptionSelect(wrap_id + " select[name='ward_id']", json_respon);
                    }
                    // add option default
                    var default_option = "<option value=''>" + global_lang.select_ward_option + "</option>";
                    $(wrap_id + " select[name='ward_id']").prepend(default_option);
                    $(wrap_id + " select[name='ward_id'] option[value='']").attr('selected', 'selected');
                    // update select by chosen
                    $(wrap_id + " select[name='ward_id']").trigger('chosen:updated');
                });
            }

        });
    },
    routeUrl: function(url) {
        var regexp = /^(http|https)/;

        if (!regexp.test(String(url).toLowerCase())) {
            url = window.location.protocol + '//' + window.location.hostname + '/' + url;
        }

        return url;
    },
    redirect: function(url) {
        window.location.href = url;
    },
    formatMoney: function(str_convert) {
        return str_convert.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
    },
    activeMainMenu: function(coupon_code) {

        // get current url
        var page_url = window.location.href;
        // check current url has '/'
        var has_mark = false;
        if (page_url.substr(page_url.length - 1) == '/') {
            has_mark = true;
        }

        $(".main-menu .sub-menu").each(function() {
            var menu_url = $(this).find('> a').attr("href");
            if (!has_mark) {
                menu_url = menu_url.substring(0, menu_url.length - 1)
            }
            if (page_url == menu_url) {
                $(this).addClass('active');
            }
        })
    },
    goBack: function() {
        window.history.back();
    },
    removeTooltipError: function(obj_id) {

        //add class has-success
        $(obj_id).closest('.form-group').removeClass('has-error has-success');

        // remove old message
        $(obj_id).closest('.form-group').find('.result-validate').remove();

    },
    showTooltipSuccess: function(obj_id) {
        //add class has-error
        $(obj_id).closest('.form-group').addClass('has-success').removeClass('has-error');

        // hidden icon icon-required
        $(obj_id).closest('.form-group').find('.icon-required').remove();

        // remove old message error
        $(obj_id).closest('.form-group').find('.result-validate').remove();

    },
    showTooltipError: function(obj_id, message) {
        //add class has-error
        $(obj_id).closest('.form-group').addClass('has-error').removeClass('has-success');

        // hidden icon icon-required
        $(obj_id).closest('.form-group').find('.icon-required').remove();

        // remove old message error
        $(obj_id).closest('.form-group').find('.result-validate').remove();

        // append new message error
        var html_error = '<div class="result-validate"> ' +
            '<span class="help-block">' + message + '</span>' +
            '</div>';
        $(obj_id).closest('.form-group').append(html_error);

    },
    showAlert: function(data, form_obj, type) {
        if (!$.isEmptyObject(data)) {
            var class_alert = 'alert-danger';
            if (type == 'success') {
                class_alert = 'alert-success';
            }
            var html = '<div class="alert ' + class_alert + ' nh-alert">';
            html += '<a href="#" class="close" data-dismiss="alert" aria-label="close" title="close">×</a>';
            html += data.messages;
            html += '</div>';
            if (form_obj.find('div').hasClass('nh-alert')) {
                form_obj.find('.nh-alert').remove();
            }
            form_obj.prepend(html);
        }
    },
    showAlertGritter: function(type, message = null, time = null) {
        if(time == null || !time > 0 ){
            time = 6000;
        }
        return toastr[type](message, null, { timeOut: time});
    },
    getItemBlock: function() {
        $('.item_block').each(function() {
            var $this = $(this);
            var action = $this.data('action');
            var method = $this.data('method');
            if (action) {
                action = action.toString();
                if (action.indexOf('/') != 0) {
                    action = '/' + action
                }
                $.ajax({
                    url: action,
                    method: method ? method : 'get',
                    data: nh_config,
                    success: function(res) {
                        $this.html(res);
                        $this.fadeIn('slow');
                    }
                })
            }

        })
    },
    setDisplayView: function(display_view) {
        // add class active in button btn-view
        $('.btn-view').removeClass('active');
        $('.btn-view[data-type="' + display_view + '"]').addClass('active');
        //add class view-list in to div list-item
        if (display_view == 'list') {
            $(".list-item").addClass('view-list');
        } else {
            $(".list-item").removeClass('view-list');
        }
    },
    setDisplayViewOnLoad: function() {
        if ($('.btn-view').length) {
            var self = this
            var key = $('.btn-view').attr('data-key-view');
            var display_view = $.session.get(key);
            if (typeof key !== 'undefined' && typeof display_view !== 'undefined') {
                self.setDisplayView(display_view);
            }
        }
    },
    getOtherSort: function(item) {
        var url = window.location.hostname;
        var pathname = window.location.pathname;
        var param = pathname + '?other_sort=' + item;
        history.pushState({}, '', param);
        location.reload();
    },
    loadContentBlockTabs: function(url, data, id_load) {
        // show loading icon
        $(id_load).closest('.tabs-block').find('.warp-loading-block').removeClass('hidden');
        $.ajax({
            url: url,
            type: 'POST',
            async: true,
            data: data,
            dataType: 'html',
            success: function(response) {
                // render html of tabs
                $(id_load + ' .display-data').html(response)
                // hidden loading icon
                setTimeout(function() {
                    $(id_load).closest('.tabs-block').find('.warp-loading-block').addClass('hidden');
                }, 500);

            },
            error: function(response, json, errorThrown) {}
        });
    },
    setCookie: function(name, value, days) {
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            var expires = "; expires=" + date.toGMTString();
        } else var expires = "";
        document.cookie = name + "=" + value + expires + "; path=/";
    },
    getCookie: function(cname) {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1, c.length);
            if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
        }
        return '';
    },
    deleteCookie: function(cname) {
        var self = this
        self.setCookie(cname, "", -1);
    },
    getUrlVars: function() {
        var vars = {},
            hash;
        var url_decode = decodeURIComponent(window.location.href);
        if (url_decode.indexOf('?') > 0) {
            var hashes = url_decode.slice(url_decode.indexOf('?') + 1).split('&');
            for (var i = 0; i < hashes.length; i++) {
                hash = hashes[i].split('=');
                vars[hash[0]] = hash[1];
            }
        }
        return vars;
    },
    showLoadingPage: function() {
        $('.warp-loading-all').removeClass('hidden');
    },
    hiddenLoadingPage: function() {
        $('.warp-loading-all').addClass('hidden');
    },
    reloadCaptcha: function(obj) {
        var mySrc = obj.prev().attr('src');
        var glue = '?';
        if (mySrc.indexOf('?') != -1) {
            glue = '&';
        }
        obj.prev().attr('src', mySrc + glue + new Date().getTime());
        return false;
    }
}

var nh_registration = {
    theme_id: '',
    sub_domain: '',
    checkDomainExist: function(domain) {
        $.ajax({
            url: '/contact/ContactPlugin/checkDomainExist',
            type: 'POST',
            async: false,
            data: {
                domain: domain
            },
            dataType: 'json',
            success: function(response) {
                if (response.code != 'success') {
                    nh_functions.showTooltipError('#domain', response.messages);
                    $('#check_domain').val('0');
                    $('#error_domain').val(response.messages)
                } else {
                    nh_functions.removeTooltipError('#domain');
                    $('#check_domain').val('1');
                }

            },
            error: function(response, json, errorThrown) {}
        });
    },
    loadInfoTheme: function(theme_id, callback) {
        var self = this;
        if (typeof(callback) != 'function') callback = function() {};

        if (theme_id > 0) {
            $('select[name="template"]').val(theme_id)
            $('select[name="template"]').trigger("chosen:updated");
        };

        $.ajax({
            url: '/contact/ContactPlugin/loadInfoTheme',
            type: 'POST',
            async: false,
            data: {
                theme_id: theme_id
            },
            dataType: 'json',
            success: function(response) {
                if (response.code == 'success') {
                    if (typeof(response.data.url_img) != "undefined" && response.data.url_img.length > 0) {
                        $('#info-theme').find('img.img-fluid').attr('src', '/' + response.data.url_img);
                        $('#info-theme').find('a').attr('href', 'http://' + response.data.code + self.sub_domain);
                        $('#info-theme').find('a').attr('target', '_blank');
                        $('#info-theme').removeClass('hidden');

                        callback(response);
                    }
                } else {
                    $('#info-theme').addClass('hidden');
                }
            },
            error: function(response, json, errorThrown) {}
        });
    }
}


$(window).scroll(function() {
    var sticky = $('.title-so-sanh'),
        scroll = $(window).scrollTop();

    if (scroll >= 2200) sticky.addClass('fixed');
    else sticky.removeClass('fixed');


    var menu = $('.title-main_header_area-sanh');

    if (scroll >= 200) menu.addClass('sticky slideInDown');
    else menu.removeClass('sticky slideInDown');
});

// $(document).ready(function ()
// {
//     $('nav a').pageNav({'scroll_shift': $('nav').outerHeight() + 20});
// });

(function($) {

    function storeTabs($tabs, $destination) {
        // measure width
        $tabs.each(function() {
            var width = $(this).outerWidth(true);
            $(this).data('width', width);
        });
        $tabs.prependTo($destination);
    }

    function makeTabsResponsive($element) {

        var $tabs = $element.find('li');
        var $firstTab = $tabs.first();

        var individualTabHeight = $firstTab.outerHeight();
        var tabsHeight = $element.outerHeight();

        if (tabsHeight > individualTabHeight) {

            // get y pos of first tab
            var firstTabPos = $firstTab.offset();

            var thisTabPos;
            $tabs.each(function() {

                var $thisTab = $(this);

                thisTabPos = $thisTab.offset();

                if (thisTabPos.top > firstTabPos.top) {

                    var $dropdown = $element.find('.responsivetabs-more');

                    if (!$dropdown.length) {
                        var dropdownMarkup = '<li class="dropdown responsivetabs-more">' +
                            '<a href="#" class="dropdown-toggle" data-toggle="dropdown"><i class="fa fa-bars"></i></a>' +
                            '<ul class="dropdown-menu">' +
                            '</ul>';
                        $dropdown = $(dropdownMarkup);
                        $element.append($dropdown);

                    }

                    var $previousTab = $thisTab.prev();
                    var $followingTabs = $thisTab.nextAll().not('.dropdown');

                    var $destination = $('.dropdown-menu', $dropdown);

                    if (!$thisTab.hasClass('dropdown')) {
                        storeTabs($followingTabs, $destination);
                        storeTabs($thisTab, $destination);
                    }
                    storeTabs($previousTab, $destination);

                    return;

                }

            });

        } else {



            // check if enough space to move a menu item back out of "..."


            // get parent width
            var parentWidth = $element.parent().width();
            var tabSetWidth = 0;
            var xPxAvailable;

            // calculate total width of tab set (can't just use width of ul because it is 100% by default)
            $element.children('li').each(function() {
                tabSetWidth += $(this).outerWidth(true);
            });

            // calculate available horizontal space
            xPxAvailable = parentWidth - tabSetWidth;



            $element.find('.dropdown-menu li').each(function() {
                if ($(this).data('width') <= xPxAvailable) {
                    $(this).insertBefore($element.find('.responsivetabs-more'));
                    xPxAvailable -= $(this).data('width');
                } else {
                    return false;
                }
            });

            // if no menu items left, remove "..."
            if (!$element.find('.dropdown-menu li').length) {
                $element.find('.responsivetabs-more').remove();
            }
        }


    }

    $.fn.responsiveTabs = function() {

        this.each(function() {
            var tabs = $(this);
            makeTabsResponsive(tabs);
            $(window).resize(function() {
                makeTabsResponsive(tabs);
            });
        });

        return this;

    };

    addLoadEvent(function () {
        $('.nav_title').responsiveTabs();
        nh_functions.init();
    })

    // activejs
    var $window = $(window);
    if ($.fn.navigation) {
        $("#navigation1").navigation();
        $("#always-hidden-nav").navigation({
            hidden: true
        });
    }
    if ($.fn.scrollUp) {
        $.scrollUp({
            scrollSpeed: 1000,
            easingType: 'easeInOutQuart',
            scrollText: '<i class="ion-ios-arrow-thin-up" aria-hidden="true"></i>'
        });
    }

    // $window.on('scroll', function() {
    //     // $(".business_startup_wc_text").css("opacity", 1 - $window.scrollTop() / $('.business_startup_wc_text').height());
    //     if ($window.scrollTop() > 100) {
    //         $('.main_header_area').addClass('sticky slideInDown');
    //     } else {
    //         $('.main_header_area').removeClass('sticky slideInDown');
    //     }
    // });

    if ($window.width() > 767) {
        new WOW().init();
    }

    // Preloader active code
    $window.on('load', function() {
        $('.main_header_area').removeClass('sticky slideInDown');
        $('#preloader').fadeOut('slow', function() {
            $(this).remove();
        });
    });

    $(".btn-a").click(function() {
        $('.ss-three>.content').toggleClass('transform-active');
        if(!$('.ss-three>.content').hasClass('transform-active')){
            $('html, body').animate({
                scrollTop: $('#content-block').offset().top - 85
            }, 'slow');
        }
    });
})(jQuery);


$(function() {
    var hash = window.location.hash;
    if (hash.indexOf("trail-register") != -1) {
        $('#trail-register').modal('show');
    }
});

function view_govOnline() {
    window.location.href = "http://online.gov.vn/Home/WebDetails/69343";
}


// custom ẩn hotline mobile ở bài viết đã có số hotline của đơn vị
$(document).ready(function () {
    var wrap_new = $('.main-detail-news .detail-post');
    if(wrap_new.length > 0 && wrap_new.find('.btn-hide-hotline').length > 0){
        var html = '<a href="#" role="button" data-toggle="modal" data-target="#trail-register"> Dùng thử ngay </a>';
        $('.bottom-nav .call-p').html(html);
    }
});

// copy số điện thoại
$('.innerHotLine a').on('click', function() {
    var phone = $(this).attr('href');
    var list = phone.split('tel:');
    var tell = typeof(phone.split('tel:')[1]) ? phone.split('tel:')[1] : null;
    if(tell.length > 0){
        var tmp_input = $('<input>');
        $('body').append(tmp_input);
        tmp_input.val(tell).select();
        document.execCommand('copy');
        tmp_input.remove();

        nh_functions.showAlertGritter('success', 'Copy số điện thoại thành công', 10000);
    }
    return false;
});

setTimeout(function(){
    $(document).ready(function() {
		$(".submenu-click").click(function() {
			$(this).siblings('.nav-submenu').slideToggle('slow');
			$(this).toggleClass('ws-activearrow').parent().siblings().children().removeClass('ws-activearrow');
		});
    });    
}, 3000);


$(document).ready(function(){
    $(window).scroll(function() {    
       var scroll = $(window).scrollTop();
       if (scroll > 100) {
            $("#header").addClass("fix");
       } else {
        	$("#header").removeClass("fix");
       }
    });
});


