
.portfolio_nav { display:none; }
.top_bar.fixed
{
	position: fixed;
	animation-name: slideDown;
	-webkit-animation-name: slideDown;	
	animation-duration: 0.5s;	
	-webkit-animation-duration: 0.5s;
	z-index: 999;
	visibility: visible !important;
	top: 0px;
}

.top_bar.fixed #menu_wrapper div .nav
{
	margin-top: 16px;
}

.top_bar.fixed #searchform
{
	margin-top: 8px;
}

.top_bar.fixed .header_cart_wrapper
{
	margin-top: 21px;
}

.top_bar.fixed #menu_wrapper div .nav > li > a
{
	padding-bottom: 24px;
}

.top_bar.fixed .logo_wrapper img
{
	max-height: 40px;
	width: auto;
}
#wrapper
{
	overflow-x: hidden;
}
.mobile_menu_wrapper
{
    display: none;
}
body.js_nav .mobile_menu_wrapper 
{
    display: block;
}
.gallery_type, .portfolio_type
{
	opacity: 1;
}
#searchform input[type=text]
{
	width: 75%;
}
.woocommerce .logo_wrapper img
{
	max-width: 50%;
}

#mobile_nav_icon
{
    display: none;
}




#option_btn
{
	position: fixed;
	top: 120px;
	right: -2px;
	cursor:pointer;
	z-index: 9;
	background: #fff;
	border-right: 0;
	width: 45px;
	height: 140px;
	text-align: center;
	border-radius: 5px 0px 0px 5px;
	box-shadow: 0 3px 15px rgba(0, 0, 0, 0.1);
	border: 1px solid #e1e1e1;
	padding: 10px 0 10px 0;
	box-sizing: border-box;
}

#option_btn i
{
	font-size: 18px;
	line-height: 40px;
	color: #000;
}

#option_wrapper
{
	position: fixed;
	top: 0;
	right:-290px;
	width: 280px;
	height: 100%;
	background: #fff;
	border: 1px solid #e1e1e1;
	border-left: 0;
	z-index: 99999;
	color: #222;
	font-size: 13px;
	box-shadow: 0px -4px 30px rgba(0, 0, 0, 0.1);
	overflow: auto;
}

#option_wrapper:hover
{
	overflow-y: auto;
}

#option_wrapper .button.buy
{
	width: 100%;
	box-sizing: border-box;
}

#option_wrapper select
{
	width: 100%;
	margin-top: 5px;
}

#option_wrapper .note_icon
{
	color: #ff3e36;
	margin-right: 5px;
}

strong.label, div.label
{
	font-weight: normal;
	margin-bottom: 5px;
	color: #000;
	display: block;
}

.demo_list
{
	list-style: none;
	display: block;
	margin: 30px 0 0 0;
}

.demo_list li
{
	display: block;
	position: relative;
	margin-bottom: 15px;
	width: 100%;
	overflow: hidden;
	line-height: 0;
}

.demo_list li .new_item
{
	position: absolute;
    top: 0;
    right: 0;
    left: auto;
    width: 110px;
    text-align: center;
    color: #fff;
    display: block;
    margin: -40px -48px 0 0;
    padding: 60px 0 4px;
    font-weight: 700;
    text-transform: uppercase;
    z-index: 2;
    -webkit-transform: rotate(45deg);
    -moz-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    -o-transform: rotate(45deg);
    transform: rotate(45deg);
    border-radius: 0;
    min-height: 0;
    line-height: 30px;
    background: #ff0000;
}

.demo_list li img
{
	max-width: 260px;
	height: auto;
	line-height: 0;
}

.demo_list li:hover img
{
	-webkit-transition: all 0.2s ease-in-out;
	-moz-transition: all 0.2s ease-in-out;
	-o-transition: all 0.2s ease-in-out;
	-ms-transition: all 0.2s ease-in-out;
	transition: all 0.2s ease-in-out;
	-webkit-filter: blur(2px);
	filter: blur(2px);
	-moz-filter: blur(2px);
}

.demo_list li:hover .demo_thumb_hover_wrapper 
{
	opacity: 1;
}

.demo_thumb_hover_wrapper 
{
	background-color: rgba(0, 0, 0, 0.5);
	height: 100%;
	left: 0;
	opacity: 0;
	overflow: hidden;
	position: absolute;
	top: 0;
	transition: opacity 0.4s ease-in-out;
	-o-transition: opacity 0.4s ease-in-out;
	-ms-transition: opacity 0.4s ease-in-out;
	-moz-transition: opacity 0.4s ease-in-out;
	-webkit-transition: opacity 0.4s ease-in-out;
	visibility: visible;
	width: 100%;
	line-height: normal;
}

.demo_thumb_hover_inner
{
	display: table;
	height: 100%;
	width: 100%;
	text-align: center;
	vertical-align: middle;
}

.demo_thumb_desc
{
	display: table-cell;
	height: 100%;
	text-align: center;
	vertical-align: middle;
	width: 100%;
	padding: 0 10% 0 10%;
	box-sizing: border-box;
}

#option_wrapper .inner h6
{
	margin: 10px 0 0 0;
}

.demo_thumb_hover_inner h6
{
	color: #fff !important;
	line-height: 24px;
	font-size: 20px;
}

.demo_thumb_desc .button.white
{
	margin-top: 10px;
	font-size: 12px !important;
}

.demo_thumb_desc .button.white:hover
{
	background: #fff !important;
	color: #000 !important;
	border-color: #fff !important;
}

#option_wrapper .inner
{
	padding: 25px 15px 0 15px;
	box-sizing: border-box;
}

.demotip
{
	display: block;
}


#menu_wrapper .nav li.arrow > a:after, #menu_wrapper div .nav li.arrow > a:after, #menu_wrapper .nav li.catmenu > a:after, #menu_wrapper div .nav li.catmenu > a:after, #menu_wrapper .nav li.catmenu2 > a:after, #menu_wrapper div .nav li.catmenu2 > a:after
{
	margin-top: 5px;
}

@media only screen and (max-width: 768px) {
	html[data-menu=leftmenu] .mobile_menu_wrapper
	{
		right: 0;
		left: initial;
		
		-webkit-transform: translate(360px, 0px);
		-ms-transform: translate(360px, 0px);
		transform: translate(360px, 0px);
		-o-transform: translate(360px, 0px);
	}
}

.ppb_blog_random .one_fifth_bg .content_link
{
	background: rgba(255,60,54,0.8);
}


@media only screen and (min-width: 960px) and (max-width: 1099px) 
{
.logo_wrapper img
{
  max-width: 240px !important;
  height: auto;
}
}

#wrapper
{
  padding-top: 106px;
}

#add_payment_method #payment div.payment_box:before, .woocommerce-cart #payment div.payment_box:before, .woocommerce-checkout #payment div.payment_box:before
{
       border: 1em solid #fff;
    border-right-color: transparent;
    border-left-color: transparent;
    border-top-color: transparent;
}

input[type=tel]
{
 padding: 11px 10px 11px 10px;
    font-size: 100%;
    font-family: &#039;Roboto&#039;,&#039;Helvetica Neue&#039;,Arial,Verdana,sans-serif;
    margin: 0;
    background: #fcfcfc;
    border: 1px solid #e1e1e1;
    outline: none;
    -webkit-transition: border-color linear .3s;
    -moz-transition: border-color linear .3s;
    -o-transition: border-color linear .3s;
    transition: border-color linear .3s;
    box-sizing: border-box;
    -webkit-appearance: none;
    border-radius: 0;
}
@media only screen and (min-width: 768px) and (max-width: 959px) {
#wrapper
{
  padding-top: 110px;
}}

@media only screen and (max-width: 767px) {
.logo_wrapper img
{
  max-width: 220px;
  height: auto;
}

#wrapper
{
  padding-top: 109px;
}}

@media only screen and (min-width: 480px) and (max-width: 767px) {
}

