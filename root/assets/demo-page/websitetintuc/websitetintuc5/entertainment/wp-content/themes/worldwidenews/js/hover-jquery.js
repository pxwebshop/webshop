/**
 * jquery.hoverdir.js v1.1.0
 * http://www.codrops.com
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 * 
 * Copyright 2012, Codrops
 * http://www.codrops.com
 */
 !function(a,b,c){"use strict";a.HoverDir=function(b,c){this.$el=a(c),this._init(b)},a.HoverDir.defaults={speed:300,easing:"ease",hoverDelay:0,inverse:!1},a.HoverDir.prototype={_init:function(b){this.options=a.extend(!0,{},a.HoverDir.defaults,b),this.transitionProp="all "+this.options.speed+"ms "+this.options.easing,this.support=Modernizr.csstransitions,this._loadEvents()},_loadEvents:function(){var b=this;this.$el.on("mouseenter.hoverdir, mouseleave.hoverdir",function(c){var d=a(this),e=d.find(".ipt-overlay-content"),f=b._getDir(d,{x:c.pageX,y:c.pageY}),g=b._getStyle(f);"mouseenter"===c.type?(e.hide().css(g.from),clearTimeout(b.tmhover),b.tmhover=setTimeout(function(){e.show(0,function(){var c=a(this);b.support&&c.css("transition",b.transitionProp),b._applyAnimation(c,g.to,b.options.speed)})},b.options.hoverDelay)):(b.support&&e.css("transition",b.transitionProp),clearTimeout(b.tmhover),b._applyAnimation(e,g.from,b.options.speed))})},_getDir:function(a,b){var c=a.width(),d=a.height(),e=(b.x-a.offset().left-c/2)*(c>d?d/c:1),f=(b.y-a.offset().top-d/2)*(d>c?c/d:1),g=Math.round((Math.atan2(f,e)*(180/Math.PI)+180)/90+3)%4;return g},_getStyle:function(a){var b,c,d={left:"0px",top:"-100%"},e={left:"0px",top:"100%"},f={left:"-100%",top:"0px"},g={left:"100%",top:"0px"},h={top:"0px"},i={left:"0px"};switch(a){case 0:b=this.options.inverse?e:d,c=h;break;case 1:b=this.options.inverse?f:g,c=i;break;case 2:b=this.options.inverse?d:e,c=h;break;case 3:b=this.options.inverse?g:f,c=i}return{from:b,to:c}},_applyAnimation:function(b,c,d){a.fn.applyStyle=this.support?a.fn.css:a.fn.animate,b.stop().applyStyle(c,a.extend(!0,[],{duration:d+"ms"}))}};var d=function(a){b.console&&b.console.error(a)};a.fn.hoverdir=function(b){var c=a.data(this,"hoverdir");if("string"==typeof b){var e=Array.prototype.slice.call(arguments,1);this.each(function(){return c?a.isFunction(c[b])&&"_"!==b.charAt(0)?void c[b].apply(c,e):void d("no such method '"+b+"' for hoverdir instance"):void d("cannot call methods on hoverdir prior to initialization; attempted to call method '"+b+"'")})}else this.each(function(){c?c._init():c=a.data(this,"hoverdir",new a.HoverDir(b,this))});return c}}(jQuery,window);