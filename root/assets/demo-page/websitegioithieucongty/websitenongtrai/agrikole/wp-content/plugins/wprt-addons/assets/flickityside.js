"use strict";

function _defineProperty(e, t, n) {
    return t in e ? Object.defineProperty(e, t, {
        value: n,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[t] = n, e
}

! function($, e, t, n) {
    function i(e, t) {
        this.element = e,
        this.$element = $(e),
        this.options = $.extend({}, s, t),
        this.flickityData = null,
        this._defaults = s,
        this._name = a,
        this.initIO()
    }
    var a = "deeperCarousel",
        s = {
            contain: !1,
            imagesLoaded: !0,
            percentPosition: !0,
            prevNextButtons: !1,
            arrowShape: 'M2.403,23.59l19.317,19.297c0.98,0.981,2.555,0.981,3.536,0c0.981-0.981,0.981-2.555,0-3.537L10.212,24.305H95.82 c1.391,0,2.515-1.124,2.515-2.514s-1.124-2.514-2.515-2.514H10.212L25.257,4.272c0.981-0.981,0.981-2.555,0-3.536 C24.766,0.246,24.133,0,23.479,0s-1.288,0.245-1.779,0.736L2.383,20.053C1.422,21.014,1.422,22.609,2.403,23.59z',
            pageDots: !1,
            adaptiveHeight: !1,
            cellAlign: "left",
            groupCells: !0,
            dragThreshold: 20,
            wrapAround: !1,
            autoPlay: !1,
            fullwidthSide: !1,
            navArrow: 1,
            filters: !1,
            equalHeightCells: !1,
            randomVerOffset: !1,
            buttonsAppendTo: null
        };
    i.prototype = {
        initIO: function e() {
            var t = this,
                n = function e(n, i) {
                    n.forEach(function(e) {
                        e.isIntersecting && (t.initFlicky(), i.unobserve(e.target))
                    })
                };
            new IntersectionObserver(n, {
                rootMargin: "50%"
            }).observe(this.element)
        },
        initFlicky: function e() {
            var t = this,
                n = $.extend({}, this.options);
            this.$element.imagesLoaded(function() {
                t.$element.flickity(n), 
                t.flickityData = $(t.element).data("flickity"), 
                n.adaptiveHeight && $(".flickity-viewport", 
                t.element).css("transition", "height 0.3s"),
                t.onImagesLoaded()
            })
        },
        onImagesLoaded: function e() {
            this.flickityData && (
                this.fullwidthSide(),
                this.windowResize()
            )
        },
        windowResize: function t() {
            var n = this;
            $(e).on("resize", function() {
                n.doOnWindowResize()
            })
        },
        doOnWindowResize: function e() {
            this.fullwidthSide()
        },
        fullwidthSide: function e() {
            var t, n;
            if (this.options.fullwidthSide) {
                var i = this,
                    a = $(i.element),
                    s = $(this.flickityData.viewport),
                    o = this.flickityData.size.width,
                    l = s.offset(),
                    r = window.innerWidth - (o + l.left),
                    u = this.isRTL ? "marginLeft" : "marginRight",
                    c = this.isRTL ? "paddingLeft" : "paddingRight",
                    d = $('<div class="flickity-viewport-wrap" />');
                s.parent(".flickity-viewport-wrap").length || s.wrap(d), d = s.parent(), d.css((t = {}, _defineProperty(t, u, ""), _defineProperty(t, c, ""), t)), d.css((n = {}, _defineProperty(n, u, r >= 0 ? -1 * (r - 1) : r - 1), _defineProperty(n, c, Math.abs(r - 1)), _defineProperty(n, "overflow", "hidden"), n)), s.css("overflow", "visible"), a.flickity("resize")
            }
        },
    };
    $.fn[a] = function(e) {
        return this.each(function() {
            var t = this.options = $.extend({}, $(this).data("deeper-flickity"), e);
            $.data(this, a) || $.data(this, a, new i(this, t))
        })
    };
}(jQuery), jQuery(document).ready(function($) {
    $("[data-deeper-flickity]").deeperCarousel()
});
