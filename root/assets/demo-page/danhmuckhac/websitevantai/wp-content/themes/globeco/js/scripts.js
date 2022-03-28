"use strict";
/**********************************
************ CWS LIBRARY **********
**********************************/
function cws_uniq_id ( prefix ){
	var prefix = prefix != undefined && typeof prefix == 'string' ? prefix : "";
	var d = new Date();
	var t = d.getTime();
	var unique = Math.random() * t;
	var unique_id = prefix + unique;
	return unique_id;
}
function cws_has_class ( el, cls_name ){
	var re = new RegExp( "(^|\\s)" + cls_name + "(\\s|$)", 'g' );
	return re.test( el.className );
}
function cws_add_class ( el, cls_name ){
	if(!el){
		return false;
	}
	el.className =  el.className.length ? el.className + " " + cls_name : cls_name;
}
function cws_remove_class ( el, cls_name ){
	var re = new RegExp( "\\s?" + cls_name, "g" );
	el.className = el.className.replace( re, '' );
}
function cws_is_mobile_device () {
	if ( navigator.userAgent.match( /(Android|iPhone|iPod|iPad)/ ) ) {
		return true;
	} else {
		return false;
	}
}
function cws_is_mobile_viewport () {
	if ( window.innerWidth < 960 ){
		return true;
	} else {
		return false;
	}
}
function cws_is_mobile () {
	var device = cws_is_mobile_device();
	var viewport = cws_is_mobile_viewport();
	return device || viewport;
}

function cws_mobile_controller (){
	var device = cws_is_mobile_device();
	var viewport = cws_is_mobile_viewport();
	var mobile_class 	= cws_has_class( document.body, "cws_mobile" );
	if ( !device ){
		if ( viewport ){
			if ( !mobile_class ){
				cws_add_class( document.body, "cws_mobile" );
			}
		}
		window.addEventListener( "resize", function (){
			var viewport 		= cws_is_mobile_viewport();
			var mobile_class 	= cws_has_class( document.body, "cws_mobile" );
			if ( viewport ){
				if ( !mobile_class ){
					cws_add_class( document.body, "cws_mobile" );
				}
			}
			else{
				if ( mobile_class ){
					cws_remove_class( document.body, "cws_mobile" );
				}
			}
		}, false );
	}
	else{
		cws_add_class( document.body, "cws_mobile" );
	}
}
function cws_merge_trees ( arr1, arr2 ){
	if ( typeof arr1 != 'object' || typeof arr2 != 'object' ){
		return false;
	}
	return cws_merge_trees_walker ( arr1, arr2 );
}
function cws_merge_trees_walker ( arr1, arr2 ){
	if ( typeof arr1 != 'object' || typeof arr2 != 'object' ){
		return false;
	}
	var keys1 = Object.keys( arr1 ); /* ! not working with null value */
	var keys2 = Object.keys( arr2 );
	var r = {};
	var i;
	for ( i = 0; i < keys2.length; i++ ){
		if ( typeof arr2[keys2[i]] == 'object' ){
			if ( Array.isArray( arr2[keys2[i]] ) ){
				if ( keys1.indexOf( keys2[i] ) === -1 ){
					r[keys2[i]] = arr2[keys2[i]];
				}
				else{
					r[keys2[i]] = arr1[keys2[i]];
				}
			}
			else{
				if ( typeof arr1[keys2[i]] == 'object' ){
					r[keys2[i]] = cws_merge_trees_walker( arr1[keys2[i]], arr2[keys2[i]] );
				}
				else{
					r[keys2[i]] = cws_merge_trees_walker( {}, arr2[keys2[i]] );
				}
			}
		}
		else{
			if ( keys1.indexOf( keys2[i] ) === -1 ){
				r[keys2[i]] = arr2[keys2[i]];
			}
			else{
				r[keys2[i]] = arr1[keys2[i]];
			}
		}
	}
	return r;
}

function cws_get_flowed_previous ( el ){
	var prev = el.previousSibling;
	var is_prev_flowed;
	if ( !prev ) return false;
	is_prev_flowed = cws_is_element_flowed( prev );
	if ( !is_prev_flowed ){
		return cws_get_flowed_previous( prev );
	}
	else{
		return prev;
	}
}

function cws_is_element_flowed ( el ){
	var el_styles;
	if ( el.nodeName === "#text" ){
		return false;
	}
	el_styles = getComputedStyle( el );
	if ( el_styles.display === "none" || ["fixed","absolute"].indexOf( el_styles.position ) != -1 ){
		return false;
	}else{
		return true;
	}
}

function cws_empty_p_filter_callback (){
	var el = this;
	if ( el.tagName === "P" && !el.innerHTML.length ){
		return false;
	}
	else{
		return true;
	}
}
function cws_br_filter_callback (){
	var el = this;
	if ( el.tagName === "BR" ){
		return false;
	}
	else{
		return true;
	}
}

function cws_advanced_resize_init (){
	window.cws_adv_resize = {};
	var resize = window.cws_adv_resize;
	resize.hooks = {
		"start"	: [],
		"end"	: []
	};
	resize.opts = {
		timeout: 150
	}
	resize.timeout_instance = null;
	resize.resize_controller = cws_advanced_resize_resize_controller;
	resize.timeout_instance_prototype = cws_advanced_resize_timeout_instance_prototype;
	resize.run_hook = cws_advanced_resize_run_hook;
	window.addEventListener( "resize", resize.resize_controller );
}
function cws_advanced_resize_resize_controller (){
	if ( !window.cws_adv_resize ) return false;
	if ( window.cws_adv_resize.timeout_instance === null ){
		window.cws_adv_resize.run_hook( "start" );
	}
	window.cws_adv_resize.timeout_instance = new window.cws_adv_resize.timeout_instance_prototype();
}
function cws_advanced_resize_timeout_instance_prototype (){
	var that = this;
	that.id = cws_getRandomInt();
	setTimeout( function (){
		if ( window.cws_adv_resize.timeout_instance.id !== that.id ){
			return false;
		}
		else{
			window.cws_adv_resize.run_hook( "end" );
			window.cws_adv_resize.timeout_instance = null;
		}
	}, window.cws_adv_resize.opts.timeout );
}
function cws_advanced_resize_run_hook ( hook ){
	var actions = this.hooks[hook]
	var i;
	for ( i = 0; i < actions.length; i++ ){
		actions[i].call();
	}
}

function cws_attachToResizeStart( func ){
	if ( typeof func !== "function" || window.cws_adv_resize === undefined ){
		return false;
	}
	window.cws_adv_resize.hooks.start.push( func );
}
function cws_attachToResizeEnd( func ){
	if ( typeof func !== "function" || window.cws_adv_resize === undefined ){
		return false;
	}
	window.cws_adv_resize.hooks.end.push( func );
}


function cws_getRandomInt ( min, max ){
	var min = min !== undefined ? min : 0;
	var max = max !== undefined ? max : 1000000;
	return Math.floor( Math.random() * (max - min + 1) ) + min;
}

	// Converts from degrees to radians.
	function cws_math_radians (degrees){
		return degrees * Math.PI / 180;
	};

	// Converts from radians to degrees.
	function cws_math_degrees (radians){
		return radians * 180 / Math.PI;
	};

	/**********
	* CWS HOOKS
	**********/
	function cws_hooks_init (){
		window.cws_hooks = {}
	}
	function cws_add_action ( tag, callback ){
		if ( typeof tag !== "string" || !tag.length ){
			return false;
		}
		if ( typeof callback !== "function" ){
			return false;
		}
		var hooks 	= window.cws_hooks;
		var hook;
		if ( hooks[tag] === 'object' ){
			hook = hooks[tag];
		}
		else{
			hooks[tag] = hook = new cws_hook ( tag );
		}
		hook.addAction( callback );
	}
	function cws_do_action ( tag, args ){
		var args 		= Array.isArray( args ) ? args : new Array ();
		var hooks 		= window.cws_hooks;
		var hook 		= hooks[tag];
		var hook_exists = typeof hook === 'object';
		if ( hook_exists ){
			hook.run( args );
		}
		return false;
	}
	function cws_hook ( tag ){
		this.tag = tag;
		this.actions = {};
		this.genActionID 	= function (){
			return cws_uniq_id( "cws_action_" );
		}
		this.addAction 		= function ( callback ){
			var actionID 			= this.genActionID();
			var action 				= new cws_action( this, actionID, callback )
			this.actions[actionID] 	= action;
		}
		this.run 			= function ( args ){
			var actionID, action;
			for ( actionID in this.actions ){
				action = this.actions[actionID];
				action.do( args );
			}
		}
	}
	function cws_action ( hook, actionID, callback ){
		this.hook 		= hook;
		this.id 		= actionID;
		this.callback 	= callback;
		this.do 		= function ( args ){
			this.callback.apply( this, args );
		}
	}
	/***********
	* \CWS HOOKS
	***********/


/**********************************
************ \CWS LIBRARY *********
**********************************/


/**********************************
************ CWS LOADER *********
**********************************/
(function ($){

	var loader;
	$.fn.start_cws_loader = start_cws_loader;
	$.fn.stop_cws_loader = stop_cws_loader;

	$( document ).ready(function (){
		cws_page_loader_controller ();
	});

	function cws_page_loader_controller (){
		var cws_page_loader, interval, timeLaps ;
		cws_page_loader = $( "#cws_page_loader" );
		timeLaps = 0;
		interval = setInterval( function (){
			var page_loaded = cws_check_if_page_loaded ();
			timeLaps ++;
			if ( page_loaded ||  timeLaps == 12) {
				clearInterval ( interval );
				cws_page_loader.stop_cws_loader ();
			}
		}, 10);
	}

	function cws_check_if_page_loaded (){
		var keys, key, i, r;
		if ( window.cws_modules_state == undefined ) return false;
		r = true;
		keys = Object.keys( window.cws_modules_state );
		for ( i = 0; i < keys.length; i++ ){
			key = keys[i];
			if ( !window.cws_modules_state[key] ){
				r = false;
				break;
			}
		}
		return r;
	}

	function start_cws_loader (){
		var loader_obj, loader_container, indicators;
		loader = jQuery( this );
		if ( !loader.length ) return;
		loader_container = loader[0].parentNode;
		if ( loader_container != null ){
			loader_container.style.opacity = 1;
			setTimeout( function (){
				loader_container.style.display = "block";
			}, 10);
		}
	}

	function stop_cws_loader (){
		var loader_obj, loader_container, indicators;
		loader = jQuery( this );
		if ( !loader.length ) return;
		loader_container = loader[0].parentNode;
		if ( loader_container != null ){
			loader_container.style.opacity = 0;
			setTimeout( function (){
				loader_container.style.display = "none";
				jQuery( ".cws_textmodule_icon_wrapper.add_animation_icon" ).cws_services_icon();
			}, 200);
		}
	}

	function setFilter(filter){
		jQuery("#cws_loader").css({
			webkitFilter:filter,
			mozFilter:filter,
			filter:filter,
		});
	}

	function setGoo(){
		setFilter("url(#goo)");
	}

	function setGooNoComp(){
		setFilter("url(#goo-no-comp)");
	}

	function updateCirclePos(){
		var circle=$obj.data("circle");
		TweenMax.set($obj,{
			x:Math.cos(circle.angle)*circle.radius,
			y:Math.sin(circle.angle)*circle.radius,
		})
		requestAnimationFrame(updateCirclePos);
	}


	function setupCircle($obj){
		if(typeof($obj.data("circle"))=="undefined"){
			$obj.data("circle",{radius:0,angle:0});

			updateCirclePos();
		}
	}

	function startCircleAnim($obj,radius,delay,startDuration,loopDuration){
		setupCircle($obj);
		$obj.data("circle").radius=0;
		$obj.data("circle").angle=0;
		TweenMax.to($obj.data("circle"),startDuration,{
			delay:delay,
			radius:radius,
			ease:Quad.easeInOut
		});
		TweenMax.to($obj.data("circle"),loopDuration,{
			delay:delay,
			angle:Math.PI*2,
			ease:Linear.easeNone,
			repeat:-1
		});
	}
	function stopCircleAnim($obj,duration){
		TweenMax.to($obj.data("circle"),duration,{
			radius:0,
			ease:Quad.easeInOut,
			onComplete:function(){
				TweenMax.killTweensOf($obj.data("circle"));
			}
		});
	}

}(jQuery));

/**********************************
************ \CWS LOADER *********
**********************************/

/**********************************
************ CWS PARALLAX SCROLL PLUGIN *********
**********************************/

(function ( $ ){

	$.fn.cws_prlx = cws_prlx;

	window.addEventListener( 'scroll', function (){
		if ( window.cws_prlx != undefined && !window.cws_prlx.disabled ){
			window.cws_prlx.translate_layers();
		}
	}, false );

	window.addEventListener( 'resize', function (){
		var i, section_id, section_params, layer_id;
		if ( window.cws_prlx != undefined ){
			if ( window.cws_prlx.servant.is_mobile() ){
				if ( !window.cws_prlx.disabled ){
					for ( layer_id in window.cws_prlx.layers ){
						window.cws_prlx.layers[layer_id].el.removeAttribute( 'style' );
					}
					window.cws_prlx.disabled = true;
				}
			}
			else{
				if ( window.cws_prlx.disabled ){
					window.cws_prlx.disabled = false;
				}
				for ( section_id in window.cws_prlx.sections ){
					section_params = window.cws_prlx.sections[section_id];
					if ( section_params.height != section_params.el.offsetHeight ){
						window.cws_prlx.prepare_section_data( section_id );
					}
				}
			}
		}
	}, false );

	function cws_prlx ( args ){
		var factory, sects;
		sects = $( this );
		if ( !sects.length ) return;
		factory = new cws_prlx_factory( args );
		window.cws_prlx = window.cws_prlx != undefined ? window.cws_prlx : new cws_prlx_builder ();
		sects.each( function (){
			var sect = $( this );
			var sect_id = factory.add_section( sect );
			if ( sect_id ) window.cws_prlx.prepare_section_data( sect_id );
		});
	}

	function cws_prlx_factory ( args ){
		var args = args != undefined ? args : {};
		args.def_speed = args.def_speed != undefined && !isNaN( parseInt( args.def_speed ) ) && parseInt( args.def_speed > 0 ) && parseInt( args.def_speed <= 100 ) ? args.def_speed : 50;
		args.layer_sel = args.layer_sel != undefined && typeof args.layer_sel == "string" && args.layer_sel.length ? args.layer_sel : ".cws_prlx_layer";
		this.args = args;
		this.add_section = cws_prlx_add_section;
		this.add_layer = cws_prlx_add_layer;
		this.remove_layer = cws_prlx_remove_layer;
	}

	function cws_prlx_builder (){
		this.servant = new cws_servant ();
		this.sections = {};
		this.layers = {};
		this.calc_layer_speed = cws_prlx_calc_layer_speed;
		this.prepare_section_data = cws_prlx_prepare_section_data;
		this.prepare_layer_data = cws_prlx_prepare_layer_data;
		this.translate_layers = cws_prlx_translate_layers;
		this.translate_layer = cws_prlx_translate_layer;
		this.conditions = {};
		this.conditions.layer_loaded = cws_prlx_layer_loaded_condition;
		this.disabled = false;
	}

	function cws_prlx_add_section ( section_obj ){
		var factory, section, section_id, layers, layer, i;
		factory = this;
		section = section_obj[0];
		layers = $( factory.args.layer_sel, section_obj );
		if ( !layers.length ) return false;
		section_id = window.cws_prlx.servant.uniq_id( 'cws_prlx_section_' );
		section.id = section_id;

		window.cws_prlx.sections[section_id] = {
			'el' : section,
			'height' : null,
			'layer_sel' : factory.args.layer_sel
		}

		if ( /cws_Yt_video_bg/.test( section.className ) ){  /* for youtube video background */
			section.addEventListener( "DOMNodeRemoved", function ( e ){
				var el = e.srcElement ? e.srcElement : e.target;
				if ( $( el ).is( factory.args.layer_sel ) ){
					factory.remove_layer( el.id );
				}
			}, false );
			section.addEventListener( "DOMNodeInserted", function ( e ){
				var el = e.srcElement ? e.srcElement : e.target;
				if ( $( el ).is( factory.args.layer_sel ) ){
					factory.add_layer( el, section_id );
				}
			}, false );
		}

		section.addEventListener( "DOMNodeRemoved", function ( e ){ /* for dynamically removed content */
			window.cws_prlx.prepare_section_data( section_id );
		},false );
		section.addEventListener( "DOMNodeInserted", function ( e ){ /* for dynamically added content */
			window.cws_prlx.prepare_section_data( section_id );
		},false );

		for ( i = 0; i < layers.length; i++ ){
			layer = layers[i];
			factory.add_layer( layer, section_id )
		}

		return section_id;

	}

	function cws_prlx_add_layer ( layer, section_id ){
		var factory, layer_rel_speed, layer_params;
		factory = this;
		layer.id = !layer.id.length ? window.cws_prlx.servant.uniq_id( 'cws_prlx_layer_' ) : layer.id;
		layer_rel_speed = $( layer ).data( 'scroll-speed' );
		layer_rel_speed = layer_rel_speed != undefined ? layer_rel_speed : factory.args.def_speed;
		layer_params = {
			'el' : layer,
			'section_id' : section_id,
			'height' : null,
			'loaded' : false,
			'rel_speed' : layer_rel_speed,
			'speed' : null
		}
		window.cws_prlx.layers[layer.id] = layer_params;
		return layer.id;
	}

	function cws_prlx_remove_layer ( layer_id ){
		var layers;
		layers = window.cws_prlx.layers;
		if ( layers[layer_id] != undefined ){
			delete layers[layer_id];
		}
	}

	function cws_prlx_prepare_section_data ( section_id ){
		var section, section_params, layer_sel, layers, layer, layer_id, i, section_obj;
		if ( !Object.keys( window.cws_prlx.sections ).length || window.cws_prlx.sections[section_id] == undefined ) return false;
		section_params = window.cws_prlx.sections[section_id];
		section = section_params.el;
		section_params.height = section.offsetHeight;
		section_obj = $( section );
		layers = $( section_params.layer_sel, section_obj );
		for ( i=0; i<layers.length; i++ ){
			layer = layers[i];
			layer_id = layer.id;
			if ( layer_id ) window.cws_prlx.prepare_layer_data( layer_id, section_id );
		}
	}

	function cws_prlx_prepare_layer_data ( layer_id, section_id ){
		window.cws_prlx.servant.wait_for( 'layer_loaded', [ layer_id ], function ( layer_id ){
			var layer_params, layer;
			layer_params = window.cws_prlx.layers[layer_id];
			layer = layer_params.el;
			layer_params.height = layer.offsetHeight;
			window.cws_prlx.calc_layer_speed( layer_id );
			window.cws_prlx.translate_layer( layer_id );
			layer_params.loaded = true;
		}, [ layer_id ]);
	}

	function cws_prlx_translate_layers (){
		var layers, layer_ids, layer_id, i;
		if ( window.cws_prlx == undefined ) return;
		layers = window.cws_prlx.layers;
		layer_ids = Object.keys( layers );
		for ( i = 0; i < layer_ids.length; i++ ){
			layer_id = layer_ids[i];
			window.cws_prlx.translate_layer( layer_id );
		}
	}

	function cws_prlx_translate_layer ( layer_id ){
		var layer_params, section, layer, layer_translation, style_adjs;
		if ( window.cws_prlx == undefined || window.cws_prlx.layers[layer_id] == undefined ) return false;
		layer_params = window.cws_prlx.layers[layer_id];
		if ( layer_params.speed == null ) return false;
		if ( layer_params.section_id == undefined || window.cws_prlx.sections[layer_params.section_id] == undefined ) return false;
		section = window.cws_prlx.sections[layer_params.section_id].el;
		if ( window.cws_prlx.servant.is_visible( section ) ) {
			layer = layer_params.el;

			layer_translation = ( section.getBoundingClientRect().top - window.innerHeight ) * layer_params.rel_speed;
			style_adjs = {
				"WebkitTransform" : "translate(0%," + layer_translation + "px)",
				"MozTransform" : "translate(0%," + layer_translation + "px)",
				"msTransform" : "translate(0%," + layer_translation + "px)",
				"OTransform" : "translate(0%," + layer_translation + "px)",
				"transform" : "translate(0%," + layer_translation + "px)"
			}

			for (var key in style_adjs ){
				layer.style[key] = style_adjs[key];
			}
		}
	}

	function cws_servant (){
		this.uniq_id = cws_uniq_id;
		this.wait_for = cws_wait_for;
		this.is_visible = cws_is_visible;
		this.is_mobile = cws_is_mobile;
	}

	function cws_uniq_id ( prefix ){
		var d, t, n, id;
		var prefix = prefix != undefined ? prefix : "";
		d = new Date();
		t = d.getTime();
		n = parseInt( Math.random() * t );
		id = prefix + n;
		return id;
	}

	function cws_wait_for ( condition, condition_args, callback, callback_args ){
		var match = false;
		var condition_args = condition_args != undefined && typeof condition_args == 'object' ? condition_args : new Array();
		var callback_args = callback_args != undefined && typeof callback_args == 'object' ? callback_args : new Array();
		if ( condition == undefined || typeof condition != 'string' || callback == undefined || typeof callback != 'function' ) return match;
		match = window.cws_prlx.conditions[condition].apply( window, condition_args );
		if ( match == true ){
			callback.apply( window, callback_args );
			return true;
		}
		else if ( match == false ){
			setTimeout( function (){
				cws_wait_for ( condition, condition_args, callback, callback_args );
			}, 10);
		}
		else{
			return false;
		}
	}

	function cws_is_visible ( el ){
		var window_top, window_height, window_bottom, el_top, el_height, el_bottom, r;
		window_top = window.pageYOffset;
		window_height = window.innerHeight;
		window_bottom = window_top + window_height;
		el_top = $( el ).offset().top;
		el_height = el.offsetHeight;
		el_bottom = el_top + el_height;
		r = ( el_top > window_top && el_top < window_bottom ) || ( el_top < window_top && el_bottom > window_bottom ) || ( el_bottom > window_top && el_bottom < window_bottom ) ? true : false;
		return r;
	}

	function cws_is_mobile (){
		return window.innerWidth < 760;
	}

	function cws_prlx_layer_loaded_condition ( layer_id ){
		var layer, r;
		r = false;
		if ( layer_id == undefined || typeof layer_id != 'string' ) return r;
		if ( window.cws_prlx.layers[layer_id] == undefined ) return r;
		layer = window.cws_prlx.layers[layer_id].el;
		switch ( layer.tagName ){
			case "IMG":
			if ( layer.complete == undefined ){
			}
			else{
				if ( !layer.complete ){
					return r;
				}
			}
			break;
			case "DIV":  /* for youtube video background */
			if ( /^video-/.test( layer.id ) ){
				return r;
			}
			break;
		}
		return true;
	}

	function cws_prlx_calc_layer_speed ( layer_id ){
		var layer_params, layer, section_id, section_params, window_height;
		layer_params = window.cws_prlx.layers[layer_id];
		layer = layer_params.el;
		section_id = layer_params.section_id;
		section_params = window.cws_prlx.sections[section_id];
		window_height = window.innerHeight;
		layer_params.speed = ( ( layer_params.height - section_params.height ) / ( window_height + section_params.height ) ) * ( layer_params.rel_speed / 100 );
	}

}(jQuery));

/**********************************
************ CWS PARALLAX SCROLL PLUGIN *********
**********************************/

/*********************************************
***************** CWS Toggle *****************
*********************************************/

( function ($){

	window.cws_toggle 	= cws_toggle;

	function cws_toggle ( args, area ){
		var that = this;
		var r = false;
		that.area = typeof area == 'object' ? area : document;
		that.attached = false;
		that.def_args = {
			'parent_sel'	: '.menu-item',
			'opnr_sel'		: '.pointer',
			'sect_sel'		: '.sub-menu',
			'speed'			: 300,
			'active_class'	: 'active',
		};
		that.args = {
		};
		that.sections = [];
		that.init = cws_toggle_init;
		that.set_defaults = cws_toggle_set_defaults;
		that.init_section = cws_toggle_init_section;
		that.attach = cws_toggle_attach;
		that.attach_section = cws_toggle_attach_section;
		that.detach = cws_toggle_detach;
		that.detach_section = cws_toggle_detach_section;
		that.check_attachment = cws_toggle_check_attachment;
		that.opnr_click_handler = function (){
			var section_data 	= this.section_data;
			var tgl 			= this.tgl;
			var args 			= tgl.args;
			if ( section_data.active ){
				$( section_data.section ).slideUp( args.speed );
				cws_remove_class( section_data.parent, args.active_class );
				section_data.active = false;
			}
			else{
				$( section_data.section ).slideDown( args.speed );
				cws_add_class( section_data.parent, args.active_class );
				section_data.active = true;
			}
		}
		r = that.init( args );
		return r;
	}
	function cws_toggle_init ( args ){
		var tgl = this;
		tgl.set_defaults( args );
		var args = tgl.args;
		var sections = tgl.sections;
		var sects = tgl.area.querySelectorAll( args.sect_sel );
		var i, sect;
		for ( i = 0; i < sects.length; i++ ){
			sect = sects[i];
			tgl.init_section( sect );
		}
		return tgl;
	}
	function cws_toggle_set_defaults ( args ){
		var tgl = this;
		var def_args = tgl.def_args;
		var arg_names, arg_name, i;
		if ( typeof args != 'object' || !Object.keys( args ).length ){
			tgl.args = def_args;
		}
		else{
			arg_names = Object.keys( def_args );
			for ( i = 0; i < arg_names.length; i++ ){
				arg_name = arg_names[i];
				if ( args[arg_name] != undefined ){
					tgl.args[arg_name] = args[arg_name];
				}
				else{
					tgl.args[arg_name] = def_args[arg_name];
				}
			}
		}
		return true;
	}
	function cws_toggle_init_section ( section ){
		var tgl = this;
		var args = tgl.args;
		var sections = tgl.sections;
		var parent, opnr;
		if ( !section ) return false;
		parent = $( section ).closest( args.parent_sel );
		if ( !parent.length ) return false;
		parent = parent[0];
		if ( !( typeof args.opnr_sel == 'string' && args.opnr_sel.length ) ) return false;
		opnr = parent.querySelector( args.opnr_sel );
		if ( !opnr ) return false;
		sections.push({
			opnr 	: opnr,
			parent 	: parent,
			section : section,
			active 	: false
		});
		return true;
	}
	function cws_toggle_attach (){
		var tgl = this;
		var sections_data = tgl.sections;
		var i, section_data;
		for ( i = 0; i < sections_data.length; i++ ){
			section_data = sections_data[i];
			tgl.attach_section( section_data );
		}
		tgl.attached = true;
		return true;
	}
	function cws_toggle_attach_section ( section_data ){
		var tgl = this;
		if ( typeof section_data != 'object' ){
			return false;
		}
		section_data.opnr.section_data 	= section_data;
		section_data.opnr.tgl 			= tgl;
		section_data.opnr.addEventListener( "click", tgl.opnr_click_handler, false );
		return true;
	}
	function cws_toggle_detach (){
		var tgl = this;
		var sections_data = tgl.sections;
		var i, section_data;
		for ( i = 0; i < sections_data.length; i++ ){
			section_data = sections_data[i];
			tgl.detach_section( section_data );
		}
		tgl.attached = false;
		return true;
	}
	function cws_toggle_detach_section ( section_data ){
		var tgl = this;
		var args = tgl.args;
		if ( typeof section_data != 'object' ) return false;
		section_data.opnr.removeEventListener( "click", tgl.opnr_click_handler );
		cws_remove_class( section_data.parent, args.active_class );
		section_data.section.style.removeProperty( 'display' );
		section_data.active = false;
		return true;
	}
	function cws_toggle_check_attachment (){
		var tgl = this;
		return tgl.attached;
	}
}(jQuery));

/*********************************************
***************** \CWS Toggle ****************
*********************************************/






cws_modules_state_init ();
is_visible_init ();
cws_milestone_init ();
cws_progress_bar_init ();
cws_widget_divider_init();
setTimeout(cws_widget_services_init,0);
var directRTL;
var wait_load_portfolio = false;
if (jQuery("html").attr('dir') == 'rtl') {
	directRTL =  'rtl'
}else{
	directRTL =  ''
};

window.addEventListener( "load", function (){
	window.cws_modules_state.sync = true;
	cws_revslider_pause_init ();
	cws_header_bg_init ();
	cws_header_imgs_cover_init ();
	cws_header_parallax_init ();
	cws_scroll_parallax_init ();
	widget_carousel_init();
	cws_sc_carousel_init();
	cws_sc_tabs_gallery_carousel_init();
	twitter_carousel_init();
	testimonials_carousel_init();
	category_carousel_init();
	cws_vc_carousel_init();
    cws_portfolio_carousel_init();
	isotope_init();
	blog_gallery_grid_init();
	cws_DividerSvgWrap();
	cws_portfolio_pagination_init ();
	cws_portfolio_filter_init ();
	cws_testimonials_single_carousel_init();
	cws_ourteam_pagination_init ();
	cws_ourteam_filter_init ();
	cws_parallax_init();
	cws_prlx_init_waiter ();
	cws_sticky_footer_init(false);
	cws_mobile_menu_slide_init();
	cws_slide_header_init();
	cws_animate_title_init();
	cws_msg_box_init();
	single_sticky_content();
	responsive_table();
	cws_megamenu_active();
	cws_first_place_col();
	cws_footer_on_bottom();
	cws_input_width();
	cws_unite_boxed_wth_vc_stretch_row_content();
	cws_toggle_service();
	cws_advanced_service();

	/* cws megamenu */
		if ( window.cws_megamenu != undefined ){

		var menu = document.querySelectorAll( ".main-nav-container .main-menu" );
		for (var i = 0; i <= menu.length; i++) {
			window.cws_megamenu_main 	= new cws_megamenu( menu[i], {
				'fw_sel'							: '.container',
				'bottom_level_sub_menu_width_adj'	: 2
			});
		}

		window.cws_megamenu_sticky 	= new cws_megamenu( document.querySelector( "#sticky_menu" ), {
			'fw_sel'							: '.wide_container',
			'bottom_level_sub_menu_width_adj'	: 2
		});
	}
	onYouTubePlayerAPIReady()
	Video_resizer ();

}, false );
jQuery(document).ready(function (){

	cws_mobile_controller();
	vimeo_init();
	cws_self_hosted_video ();
	cws_sticky_menu ();
	cws_responsive_custom_header_paddings_init ();
	cws_top_panel_mobile_init ();	/* async */
	ipad_hover_fix();
	wpml_click_fix();
	logo_extra_info_margin();
	cws_touch_events_fix ();
	cws_page_focus();
	cws_top_panel_search ();
	boxed_var_init ();
	cws_fs_video_bg_init ();
	wp_standard_processing ();
	cws_page_header_video_init ();
	cws_top_social_init ();
	custom_colors_init();
	gifts_card_init();
	cws_vc_tabs_fix ();
	cws_vc_toggle_accordion_action();
	widget_archives_hierarchy_init();
	fancybox_init();
	wow_init();
	load_more_init();
	cws_revslider_class_add();
	cws_menu_bar();
	cws_blog_full_width_layout();
	cws_fullwidth_background_row ();
	jQuery( ".cws_vc_shortcode_milestone" ).cws_milestone();
	jQuery( ".cws_vc_shortcode_pb" ).cws_progress_bar();
	cws_message_box_init ();
	scroll_down_init ();

	cws_tooltip_init();
	cws_fix_styles_init();
	// cws_hamburger_menu_init();
	cws_go_to_page_init();
	cws_mobile_menu_items_toggle();
	cws_sticky_sidebars_init();
	cws_side_panel_init();

	scroll_top_init ();
	cws_woo_product_thumbnails_carousel_init ();

	jQuery(window).resize( function (){
		cws_fullwidth_background_row ();
		cws_slider_video_height (jQuery( ".fs_video_slider" ));
		cws_slider_video_height (jQuery( ".fs_img_header" ));
	} );
});

jQuery(window).resize( function (){
	vimeo_init();
	cws_self_hosted_video ();
	cws_footer_on_bottom();
	Video_resizer ();
} );


function cws_unite_boxed_wth_vc_stretch_row_content (){
	jQuery( ".cws-layer .vc_row" ).each( function (){
		if(jQuery(this).data( "layerMargin" )){
			jQuery(this).css({'margin': jQuery(this).data( "layerMargin" )});
		}
	});
}

function cws_toggle_service() {
	jQuery('.cws_service_item.style_toggle').each( function() {
		var wrapper = jQuery(this);
		if (wrapper.hasClass('active')) {
            jQuery( '.cws_service_desc', wrapper ).slideDown();
		}
		jQuery('.cws_service_title, .cws_service_icon_wrapper', this).on( 'click', function() {
            wrapper.toggleClass('active');
			jQuery( '.cws_service_desc', wrapper ).slideToggle(300);
		} );
	} );
}

function cws_advanced_service() {
    jQuery('.cws_service_item.style_advanced').each( function() {
    	if (jQuery(this).hasClass('active')) {
            jQuery(this).addClass('holder');
		}

        var obj = jQuery(this);
        obj.on( 'mouseover', function() {
            jQuery('.cws_service_item.style_advanced', obj.parents('.vc_row')).removeClass('active');
        } );
        obj.on( 'mouseleave', function() {
            jQuery('.cws_service_item.style_advanced.holder', obj.parents('.vc_row')).addClass('active');
        } );
    } );
}

function cws_fullwidth_background_row (){
	var main_width = jQuery('main').width();
	var row_bg_ofs, column_first_ofs, column_last_ofs;
	jQuery('.row_bg.fullwidth_background_bg').each(function(){

		row_bg_ofs = jQuery(this).offset();

		column_first_ofs = jQuery(this).find('.grid_col:first-child .cols_wrapper').offset();
		column_last_ofs = jQuery(this).find('.grid_col:last-child .cols_wrapper').offset();

		jQuery(this).find('.grid_col:first-child > .cols_wrapper > .row_bg_layer').css({'left':''+( row_bg_ofs.left - column_first_ofs.left )+'px','width':'auto','right':'0'});
		jQuery(this).find('.grid_col:first-child > .cols_wrapper > .row_bg_img_wrapper').css({'left':''+( row_bg_ofs.left - column_first_ofs.left )+'px','width':'auto','right':'0'});

		jQuery(this).find('.grid_col:last-child > .cols_wrapper > .row_bg_layer').css({'left':'0px','width':'auto','right':'-'+(jQuery(this).outerWidth() + row_bg_ofs.left - column_last_ofs.left - jQuery(this).find('.grid_col:last-child .cols_wrapper').outerWidth())+'px'});
		jQuery(this).find('.grid_col:last-child > .cols_wrapper > .row_bg_img_wrapper').css({'left':'0px','width':'auto','right':'-'+(jQuery(this).outerWidth() + row_bg_ofs.left - column_last_ofs.left - jQuery(this).find('.grid_col:last-child .cols_wrapper').outerWidth())+'px'});

	});
}

function cws_megamenu_active (){
	jQuery( ".main-menu .cws_megamenu_item .menu-item.current-menu-item" ).each(function(){
		jQuery(this).closest( ".menu-item-object-megamenu_item" ).addClass( "current-menu-item" );
	})
}




function cws_modules_state_init (){
	window.cws_modules_state = {
		"sync" : false,
	}
}

function cws_revslider_class_add (){
	if (jQuery('.rev_slider_wrapper.fullwidthbanner-container').length) {
		jQuery('.rev_slider_wrapper.fullwidthbanner-container').next().addClass('benefits_after_slider');
		if (jQuery('.rev_slider_wrapper.fullwidthbanner-container').length && jQuery('.site-main main .benefits_cont:first-child').length) {
			if (jQuery('.site-main main .benefits_cont:first-child').css("margin-top").replace("px", "") < -90) {
				jQuery('.site-main main .benefits_cont:first-child').addClass('responsive-minus-margin');
			}
		}
	};
}

function cws_prlx_init_waiter (){
	var interval, layers, layer_ids, i, layer_id, layer_obj, layer_loaded;
	if ( window.cws_prlx == undefined ){
		return;
	}
	layers = cws_clone_obj( window.cws_prlx.layers );
	interval = setInterval( function (){
		layer_ids = Object.keys( layers );
		for ( i = 0; i < layer_ids.length; i++ ){
			layer_id = layer_ids[i];
			layer_obj = window.cws_prlx.layers[layer_id];
			layer_loaded = layer_obj.loaded;
			if ( layer_loaded ){
				delete layers[layer_id];
			}
		}
		if ( !Object.keys( layers ).length ){
			clearInterval ( interval );
		}
	}, 100);
}

function ipad_hover_fix() {
	if(is_mobile_device() || is_mobile()){
		jQuery('.cws_service_item').hover(function() {}, function() {}); //Fix ipad hover issue
		jQuery('.portfolio_item_post').hover(function() {}, function() {}); //Fix ipad hover issue
		jQuery('.cws_benefits_item').hover(function() {}, function() {}); //Fix ipad hover issue

		jQuery('.cws_portfolio_nav_item').hover(function() { jQuery(this).click(); }); //Fix ipad click issue
	}
}

function wpml_click_fix() {
	jQuery('.copyrights_area .wpml-ls-legacy-dropdown a.wpml-ls-item-toggle').on('click', function(e) {
		e.preventDefault();
	});
}

function logo_extra_info_margin(){
	if( jQuery(window).width() <= 400 ){
		var logoMB = jQuery('.header_logo_part .logo').css('margin-bottom');
		jQuery('.header_logo_part .logo_extra_info').css('margin-bottom', parseInt(logoMB)+'px');
	}
}

function cws_touch_events_fix (){
	if ( is_mobile_device() || is_mobile() ){
		jQuery( "body" ).on( "click", "a.woo_icon, .pic_alt .link_overlay, .products .pic > a, .category-block > a", function (e){
			if ( jQuery(this).hasClass('mobile_hover') ) {
			} else {
				jQuery(this).closest('body').find('a').removeClass('mobile_hover');
				jQuery(this).addClass('mobile_hover');
				e.preventDefault();
			}
		});
	}
}

function cws_is_rtl(){
	return jQuery("body").hasClass("rtl");
}

function cws_page_focus(){
	document.getElementsByTagName('html')[0].setAttribute('data-focus-chek', 'focused');
		window.addEventListener('focus', function() {
		document.getElementsByTagName('html')[0].setAttribute('data-focus-chek', 'focused');
	});
}

function boxed_var_init (){
	var body_el = document.body;
	var children = body_el.childNodes;
	var child_class = "";
	var match;
	window.boxed_layout = false;
	for ( var i=0; i<children.length; i++ ){
		child_class = children[i].className;
		if ( child_class != undefined ){
			match = /page_boxed/.test( child_class );
			if ( match ){
				window.boxed_layout = true;
				break;
			}
		}
	}
}

function reload_scripts(){
	wp_standard_processing();
	fancybox_init();
}

function is_visible_init (){
	jQuery.fn.is_visible = function (){
		return ( jQuery(this).offset().top >= jQuery(window).scrollTop() ) && ( jQuery(this).offset().top <= jQuery(window).scrollTop() + jQuery(window).height() );
	}
}

//SlidDown header
function cws_slide_header_init (){
	var header = jQuery('.bg_page_header');

	if (header.hasClass('hide_header')){
		var top = jQuery('.bg_page_header').data('top');
		var bottom = jQuery('.bg_page_header').data('bottom');
		setTimeout(function(){
			// header.slideDown();
			jQuery('.bg_page_header').animate({ height: top+bottom+88}, 500, function(){

			});
		} , 1000);
	}

}

//Animate header title
function cws_animate_title_init (){
	var header_title = jQuery('.page_title');

	if (header_title.hasClass('animate_title') && !is_mobile() && !is_mobile_device() && !has_mobile_class() ){
		if (typeof fancybox === 'function') {
		skrollr.init({
		    constants: {
		        header: jQuery('.bg_page_header').offset().top
		    }
		});
	}
	}

}

/* sticky */
function cws_sticky_menu (){
	var enable_on_mobile;
	if (is_mobile() || is_mobile_device()){
		if (sticky_menu_on_mobile){
			enable_on_mobile = true;
		} else {
			enable_on_mobile = false;

		}
	} else {
		enable_on_mobile = true;
	}

	if ( (sticky_menu_enable && jQuery('.sticky_header').length) && (enable_on_mobile) ) {

		jQuery('.sticky_header').removeClass('sticky_mobile_off');
		var lastScrollTop = 0;
		var percent = 100;
		if(jQuery('.header_wrapper_container .menu_box').length === 0){
			return;
		}
		var el_offset = jQuery('.header_wrapper_container .menu_box').offset().top;
		var el_height = jQuery('.sticky_header .menu_box').innerHeight();
		el_offset = el_offset + jQuery('.header_wrapper_container .menu_box').outerHeight() + 200;

		var reset_height = el_height;
		jQuery(window).scroll(function(event){
		   var st = jQuery(this).scrollTop();
			if (sticky_menu_mode == 'smart') {
				if ( st > el_offset){
					if (st < lastScrollTop) {
					//TOP
					el_height = el_height + (st - lastScrollTop);
						if ( Math.abs(st - lastScrollTop) > 15){
							//FAST SCROLL
							jQuery('.sticky_header:not(.sticky_mobile_off)').removeAttr('style').addClass('sticky_active');
						}
						jQuery('.sticky_header:not(.sticky_mobile_off)').css({
						'-webkit-transform': 'translateY(-'+el_height+'px)',
						'-ms-transform': 'translateY(-'+el_height+'px)',
						'transform': 'translateY(-'+el_height+'px)',
						});
						jQuery('.sticky_header:not(.sticky_mobile_off)').removeClass('sticky_transition');
						jQuery('.sticky_header:not(.sticky_mobile_off)').addClass('sticky_active');
					} else {
						//BOTTOM
						el_height = reset_height;
							jQuery('.sticky_header:not(.sticky_mobile_off)').css({
							'-webkit-transform': 'translateY(-'+el_height+'px)',
							'-ms-transform': 'translateY(-'+el_height+'px)',
							'transform': 'translateY(-'+el_height+'px)',
							});
						jQuery('.sticky_header:not(.sticky_mobile_off)').addClass('sticky_transition');
						jQuery('.sticky_header:not(.sticky_mobile_off)').removeClass('sticky_active');
					}
					jQuery('.mobile_menu_wrapper').removeClass('active_mobile');
				} else {
					el_height = reset_height;
					jQuery('.sticky_header:not(.sticky_mobile_off)').css({
					'-webkit-transform': 'translateY(-'+el_height+'px)',
					'-ms-transform': 'translateY(-'+el_height+'px)',
					'transform': 'translateY(-'+el_height+'px)',
					'transition': 'all .15s ease-in-out'
				});
				}
			}

			if (sticky_menu_mode == 'simple'){
				if (st <= el_offset) {
					jQuery('.sticky_header:not(.sticky_mobile_off)').removeClass('sticky_active');
					jQuery('.mobile_menu_wrapper').removeClass('active_mobile');
				} else {
					jQuery('.sticky_header:not(.sticky_mobile_off)').addClass('sticky_active');
					jQuery('.mobile_menu_wrapper').removeClass('active_mobile');
				}
			}
			lastScrollTop = st;
		});

	}else{
		jQuery('.sticky_header').addClass('sticky_mobile_off');
	}

}

jQuery(window).resize( function (){
	cws_sticky_menu ();
	logo_extra_info_margin();
});


function get_logo_position(){
	if (jQuery(".site_header").length) {
		return /logo-\w+/.exec(jQuery(".site_header").attr("class"))[0];
	};
}


function is_mobile (){
	return window.innerWidth < 760;
}

function is_mobile_device (){
	if ( navigator.userAgent.match( /(Android|iPhone|iPod|iPad)/ ) ) {
		return true;
	} else {
		return false;
	}
}

function has_mobile_class(){
	return jQuery("body").hasClass("cws_mobile");
}

/* sticky */

/* mobile menu */
var mobile_menu_controller_init_once = false;
function mobile_menu_controller_init (){
	if (mobile_menu_controller_init_once == false) {
		window.mobile_nav = {
			"is_mobile_menu" : false,
			"nav_obj" : jQuery(".header_wrapper_container .main-menu").clone(),
			"level" : 1,
			"current_id" : false,
			"next_id" : false,
			"prev_id" : "",
			"animation_params" : {
				"vertical_start" : 50,
				"vertical_end" : 10,
				"horizontal_start" : 0,
				"horizontal_end" : 70,
				"speed" : 200
			}
		}
		if ( is_mobile_device() ){
			set_mobile_menu();
		}
		else{
			mobile_menu_controller();
			jQuery(window).resize( function (){
				mobile_menu_controller();
			});
		}
		mobile_nav_switcher_init ();
	};
	mobile_menu_controller_init_once = true;
}

function mobile_nav_switcher_init (){
	var nav_container = jQuery(".header_wrapper_container .site_header .header_nav_part");
	jQuery(document).on("click", ".header_wrapper_container .header_nav_part.mobile_nav .mobile_menu_header .mobile_menu_switcher", function (){
		var nav = get_current_nav_level();
		var cls = "opened";
		if ( nav_container.hasClass(cls) ){
			nav.stop().animate( {"margin-top": window.mobile_nav.animation_params.vertical_start + "px","opacity":0}, window.mobile_nav.animation_params.speed, function (){
				nav_container.removeClass(cls);
			})
		}
		else{
			nav_container.addClass(cls);
			nav.stop().animate( {"margin-top": window.mobile_nav.animation_params.vertical_end + "px","opacity":1}, window.mobile_nav.animation_params.speed );
		}
	});
}

// function mobile_nav_handlers_init (){
// 	jQuery(".header_wrapper_container .header_nav_part.mobile_nav .button_open").on( "click", function (e){
// 		var el = jQuery(this);
// 		var next_id = el.closest(".menu-item").attr("id");
// 		var current_nav_level = get_current_nav_level();
// 		var next_nav_level = get_next_nav_level( next_id );
// 		current_nav_level.animate( { "right": window.mobile_nav.animation_params.horizontal_end + "px", "opacity" : 0 }, window.mobile_nav.animation_params.speed, function (){
// 			current_nav_level.remove();
// 			jQuery(".header_wrapper_container .main-nav-container").append(next_nav_level);
// 			next_nav_level.css( {"display": "block", "margin-top": window.mobile_nav.animation_params.vertical_end + "px", "right": "-" + window.mobile_nav.animation_params.horizontal_end + "px", "opacity" : 0} );
// 			next_nav_level.animate( { "right": window.mobile_nav.animation_params.horizontal_start + "px", "opacity" : 1 }, window.mobile_nav.animation_params.speed );
// 			window.mobile_nav.current_id = next_id;
// 			window.mobile_nav.level ++;
// 			mobile_nav_handlers_init ();
// 		});
// 	});
// 	jQuery(".header_wrapper_container .header_nav_part.mobile_nav .back>a").on("click", function (){
// 		var current_nav_level = get_current_nav_level();
// 		var next_nav_level = get_prev_nav_level();
// 		current_nav_level.animate( { "right": "-" + window.mobile_nav.animation_params.horizontal_end + "px", "opacity" : 0 }, window.mobile_nav.animation_params.speed, function (){
// 			current_nav_level.remove();
// 			jQuery(".header_wrapper_container .main-nav-container").append(next_nav_level);
// 			next_nav_level.addClass('items-visible');
// 			next_nav_level.css( {"margin-top": window.mobile_nav.animation_params.vertical_end + "px", "right": window.mobile_nav.animation_params.horizontal_end + "px", "opacity" : 0} );
// 			next_nav_level.animate( { "right": window.mobile_nav.animation_params.horizontal_start + "px", "opacity" : 1 }, window.mobile_nav.animation_params.speed );
// 			window.mobile_nav.level --;
// 			mobile_nav_handlers_init ();
// 		});
// 	});
// }

function get_current_nav_level (){
	var r = window.mobile_nav.level < 2 ? jQuery( ".header_wrapper_container .header_nav_part .main-menu" ) : jQuery( ".header_wrapper_container .main-nav-container .sub-menu" );
	r.find(".sub-menu").remove();
	return r;
}

function get_next_nav_level ( next_id ){
	var r = window.mobile_nav.nav_obj.find( "#" + next_id ).children(".sub-menu").first().clone();
	r.find(".sub-menu").remove();
	return r;
}

function get_prev_nav_level (){
	var r = {};
	if ( window.mobile_nav.level > 2 ){
		r = window.mobile_nav.nav_obj.find( "#" + window.mobile_nav.current_id ).parent(".sub-menu").parent(".menu-item");
		window.mobile_nav.current_id = r.attr("id");
		r = r.children(".sub-menu").first();
	}
	else{
		r = window.mobile_nav.nav_obj;
		window.mobile_nav.current_id = false;
	}
	r = r.clone();
	r.find(".sub-menu").remove();
	return r;
}

function mobile_menu_controller (){
	window.mobile_menu = {'site_header':jQuery(".header_wrapper_container .site_header"),
							'subst_header_height': 0,
							'logo_position':get_logo_position(),
							'menu_container':jQuery('.header_wrapper_container .site_header .header_nav_part'),
							'header_bg': jQuery('.header_bg_img, .cws_parallax_scene_container').eq(0),
							'is_set':false,
							'logo_init_height':jQuery(".header_wrapper_container .site_header .logo>img").height(),
							'menu_item_height': jQuery('.header_wrapper_container .site_header .header_nav_part').find(".main-menu>.menu-item").eq(0).outerHeight(),
							'logo_indent':12,
							'header_content_part_width':parseInt(jQuery(".header_wrapper_container .site_header .container").eq(0).width()),
							'animation_speed':300};
	if ( (is_mobile() && !window.mobile_nav.is_mobile_menu) ){
		set_mobile_menu ();
	}
	else if ( !is_mobile() && window.mobile_nav.is_mobile_menu ){
		reset_mobile_menu ();
	}else{
		window.mobile_menu.site_header.addClass('loaded')
	}
}

function set_mobile_menu (){
	var nav = get_current_nav_level();
	jQuery(".header_wrapper_container .site_header").addClass("mobile_nav");
	jQuery('.header_wrapper_container .site_header .header_nav_part').addClass("mobile_nav");
	nav.css( { "margin-top":window.mobile_nav.animation_params.vertical_start+"px" } );
	window.mobile_nav.is_mobile_menu = true;
	mobile_nav_handlers_init ();
	jQuery(".header_wrapper_container .site_header").addClass('loaded');
}

function reset_mobile_menu (){
	var nav = get_current_nav_level();
	jQuery(".header_wrapper_container .site_header").removeClass("mobile_nav opened");
	jQuery('.header_wrapper_container .site_header .header_nav_part').removeClass("mobile_nav opened");
	nav.removeAttr("style");
	window.mobile_nav.is_mobile_menu = false;
	nav.remove();
	reset_mobile_nav_params ();
}

function reset_mobile_nav_params (){
	jQuery(".header_wrapper_container .main-nav-container").append(window.mobile_nav.nav_obj.clone());
	window.mobile_nav.level = 1;
	window.mobile_nav.current_id = false;
	window.mobile_nav.next_id = false;
}

/* \mobile menu */

function cws_top_panel_search (){
		//Top bar search
		jQuery("#site_top_panel .search_icon").on( 'click',function(){
			var el = jQuery(this);
			el.parents('#site_top_panel').find('.row_text_search .search-field').val('');
			el.parents('#site_top_panel').find('.row_text_search .search-field').focus();
			el.parents('#site_top_panel').toggleClass( "show-search" );
		});

		//Clear text (ESC)
		jQuery("#site_top_panel .row_text_search .search-field").keydown(function(event) {
			if (event.keyCode == 27){
				jQuery(this).val('');
			}
		});

		//Menu search
		jQuery(".site_header .menu_box .search_menu").on( 'click',function(){

			jQuery(this).parents('.header_container').find('.search_menu_wrap').removeClass('fadeOut');
			jQuery(this).parents('.header_container').find('.search_menu_wrap').addClass('fadeIn');
			jQuery(this).parents('.header_container').find('.search_menu_wrap').fadeToggle(200, "linear");
			jQuery(this).parents('.header_container').find('.search_menu_wrap').addClass('search-on');
			jQuery("body").addClass('search-on-wrap');
			jQuery(this).parents('.header_container').find('.search_menu_wrap .search-field').focus();
		});

		jQuery('.site_header .header_container .search_back_button').on( 'click',function(){

			jQuery(this).parents('.header_container').find('.search_menu_wrap').removeClass('fadeIn');
			jQuery(this).parents('.header_container').find('.search_menu_wrap').addClass('fadeOut').delay(500).fadeToggle("fast", "linear");
			jQuery(this).parents('.header_container').find('.search_menu_wrap').removeClass('search-on');
			jQuery("body").removeClass('search-on-wrap');
		});
}

/* carousel */

function count_carousel_items ( cont, layout_class_prefix, item_class, margin ){
	var re, matches, cols, cont_width, items, item_width, margins_count, cont_without_margins, items_count;
	if ( !cont ) return 1;
	layout_class_prefix = layout_class_prefix ? layout_class_prefix : 'grid-';
	item_class = item_class ? item_class : 'item';
	margin = margin ? margin : 30;
	re = new RegExp( layout_class_prefix + "(\d+)" );
	matches = re.exec( cont.attr( "class" ) );
	cols = matches == null ? 1 : parseInt( matches[1] );
	cont_width = cont.outerWidth();
	items = cont.children( "." + item_class );
	item_width = items.eq(0).outerWidth();
	margins_count = cols - 1;
	cont_without_margins = cont_width - ( margins_count * margin ); /* margins = 30px */
	items_count = Math.floor( cont_without_margins / ( item_width -6 ) );
	return items_count;
}

function widget_carousel_init(){
	jQuery( ".widget-cws-gallery" ).each( function(){
        var bigimage = jQuery(".widget_carousel", this);
        var thumbs = jQuery(".widget_thumbs", this);
        bigimage.owlCarousel( {
            items: 1,
            direction: directRTL,
            singleItem: true,
            slideSpeed: 300,
            navigation: false,
            pagination: true
        });

        thumbs.owlCarousel( {
            items: 3,
            direction: directRTL,
            singleItem: false,
            slideSpeed: 300,
            navigation: false,
            pagination: false
        });

        thumbs.on("click", ".owl-item", function(e) {
            e.preventDefault();
            var number = jQuery(this).index();
            bigimage.trigger('owl.goTo', number);
        });
	});
}

jQuery.fn.cws_flex_carousel = function ( parent_sel, header_sel ){
	parent_sel = parent_sel != undefined ? parent_sel : '';
	header_sel = header_sel != undefined ? header_sel : '';
	jQuery( this ).each( function (){
		var owl = jQuery( this );
		var nav = jQuery(this).parents(parent_sel).find( ".carousel_nav_panel_container" );
		owl.cws_flex_carousel_controller( parent_sel, header_sel );
		if ( nav.length ){
			jQuery( ".next", nav ).on( 'click', function (){
				owl.trigger( "owl.next" );
			});
			jQuery( ".prev", nav ).on( 'click', function (){
				owl.trigger( "owl.prev" );
			});
		}
		jQuery( window ).resize( function (){
			owl.cws_flex_carousel_controller( parent_sel, header_sel );
		});
	});
}

jQuery.fn.cws_flex_carousel_controller = function ( parent_sel, header_sel ){
	var owl = jQuery(this);
	var nav = jQuery(this).closest(parent_sel).find('.carousel_nav_panel_container');
	var show_hide_el = nav.siblings().length ? nav : nav.closest( header_sel );
	var show_pagination = false;
	if (show_hide_el.length) {
		var show_hide_el_display_prop = window.getComputedStyle( show_hide_el[0] ).display;
		show_pagination = false;
	}else{
		show_pagination = true;
	}

	var is_init = owl.hasClass( 'owl-carousel' );
	if ( is_init ){
		owl.data('owlCarousel').destroy();
		show_hide_el.css( 'display', 'none' );
	}

	var items_count = owl.children().length;
	var visible_items_count = count_carousel_items( owl );
	var args = {
		direction: directRTL,
		items: visible_items_count,
		slideSpeed: 300,
		navigation: false,
		pagination: show_pagination,
		responsive: false,
	}
	if ( items_count > visible_items_count ){
		owl.owlCarousel( args );
		if (show_hide_el.length) {
			show_hide_el.css( 'display', show_hide_el_display_prop );
		}

	}
}

/* Image Circle Wrap */
function cws_DividerSvgWrap(){
	jQuery(".div_title").each(function(){
		var self = jQuery(this);
		if(!jQuery(this).find('span:not(.svg_lotus)')[0]){
			jQuery(this).addClass('standard_color');
		}
		jQuery(this).css({'fill' : jQuery(this).find('span:not(.svg_lotus)').css("color"),
			'stroke' : jQuery(this).find('span:not(.svg_lotus)').css("color")
		});
		var ajax = new XMLHttpRequest();
		ajax.open("GET", ajaxurl.templateDir + "/img/lotos.svg", true);
		ajax.send();
		ajax.onload = function(e) {
		  var span = document.createElement("span");
		  span.className = 'svg_lotus';
		  span.innerHTML = ajax.responseText;
		  jQuery(self).append(span);
		}
	});
}

function cws_vc_carousel_init ( area ){
	var area = area == undefined ? document : area;
	jQuery( ".cws_vc_shortcode_carousel", area ).each( function (){
		var carousel = this;
		// debugger;
		var section = jQuery( carousel ).closest( ".posts_grid" );
		var nav = jQuery( ".carousel_nav_panel", section );
		var cols = carousel.dataset.cols;
		var args = {
			//itemsel: "*:not(style)",	/* for staff members because they have custom color styles */
			slideSpeed: 300,
			navigation: false,
			direction: directRTL,
			pagination: false,
		};
		if(jQuery(section).hasClass('auto_play_owl')){
			args.autoPlay = true;
		}
		if(jQuery(section).hasClass('pagination_owl')){
			args.pagination = true;
		}
		if(jQuery(this).hasClass('carousel_pagination')){
			args.pagination = true;
		}
		if(cws_is_mobile()){
			args.pagination = true;
			args.navigation = false;
		}
		switch ( cols ){
            case '4':
                args.itemsCustom = [
                    [0,1],
                    [479,2],
                    [980,3],
                    [1170, 4]
                ];
                break
            case '3':
                args.itemsCustom = [
                    [0,1],
                    [479,2],
                    [980,3]
                ];
                break
            case '2':
                args.itemsCustom = [
                    [0,1],
                    [479,2]
                ];
                break
            default:
                args.singleItem = true;
		}
		jQuery( carousel ).owlCarousel( args );
		if ( nav.length || jQuery(section).hasClass('navigation_owl')){
			jQuery( ".next", nav ).on( 'click', function (){
				jQuery( carousel ).trigger( "owl.next" );
			});
			jQuery( ".prev", nav ).on( 'click', function (){
				jQuery( carousel ).trigger( "owl.prev" );
			});
		}
	});

}

function cws_sc_tabs_gallery_carousel_init ( area ){
	var area = area == undefined ? document : area;
	jQuery( ".shortcode_tabs_gallery", area ).each( function (){
		var carousel_text = jQuery('.tabs_text_wrapper', this);
		var carousel_gallery = jQuery('.tabs_gallery', this);
		// debugger;
		var args_text = {
            items: 1,
            singleItem: true,
			slideSpeed: 300,
			navigation: false,
			direction: directRTL,
			pagination: false,
            mouseDrag: false,
            touchDrag: false
		};
        var args_gallery = {
            items: 1,
            singleItem: true,
            slideSpeed: 300,
            navigation: false,
            direction: directRTL,
            pagination: false,
            mouseDrag: false,
            touchDrag: false
        };

		jQuery( carousel_text ).owlCarousel( args_text );
		jQuery( carousel_gallery ).owlCarousel( args_gallery );
        jQuery( ".tabs_control_item", this ).on( 'click', function (){
        	if (jQuery(this).hasClass('active')) {
        		return false;
			} else {
        		jQuery(this).addClass('active').siblings('.tabs_control_item').removeClass('active');
        		var current = jQuery(this).index();
                carousel_text.trigger('owl.goTo', current);
                carousel_gallery.trigger('owl.goTo', current);
			}
		});
	});

}
function cws_portfolio_carousel_init ( area ){
    var area = area == undefined ? document : area;
    jQuery( ".cws_portfolio_carousel", area ).each( function (){
        var carousel = this;
        // debugger;
        var section = jQuery( carousel ).closest( ".posts_grid" );
        var nav = jQuery( ".carousel_nav_panel", section );
        var cols = carousel.dataset.cols;
        var args = {
            slideSpeed: 300,
            navigation: true,
            direction: directRTL,
            pagination: false,
            navigationText: ['', '']
        };
        if(jQuery(section).hasClass('auto_play_owl')){
            args.autoPlay = true;
        }
        if(jQuery(section).hasClass('pagination_owl')){
            args.pagination = true;
        }
        if(jQuery(this).hasClass('carousel_pagination')){
            args.pagination = true;
        }
        if(cws_is_mobile()){
            args.pagination = true;
            args.navigation = false;
        }
        switch ( cols ){
            case '4':
                args.itemsCustom = [
                    [0,1],
                    [479,2],
                    [980,3],
                    [1170, 4]
                ];
                break
            case '3':
                args.itemsCustom = [
                    [0,1],
                    [479,2],
                    [980,3]
                ];
                break
            case '2':
                args.itemsCustom = [
                    [0,1],
                    [479,2]
                ];
                break
            default:
                args.singleItem = true;
        }
        jQuery( carousel ).owlCarousel( args );
    });

}

function cws_sc_carousel_init (){
	jQuery( ".cws_sc_carousel" ).each( cws_sc_carousel_controller );
	window.addEventListener( 'resize', function (){
		jQuery( ".cws_sc_carousel" ).each( cws_sc_carousel_controller );
	}, false);
}
function cws_sc_carousel_controller (){
	var el = jQuery( this );
	var bullets_nav = el.hasClass( "bullets_nav" );
	var content_wrapper = jQuery( ".cws_wrapper", el );
	var owl = content_wrapper;
	var content_top_level = content_wrapper.children();
	var nav = jQuery( ".carousel_nav_panel", el );
	var cols = el.data( "columns" );
	var items_count, grid_class, col_class, items, is_init, matches, args, page_content_section, sb_count;
	var autoplay_speed = (el.hasClass( "autoplay" ) ? el.data( "autoplay" ) : false);

	page_content_section = jQuery( ".page_content" );
	if ( page_content_section.hasClass( "double_sidebar" ) ){
		sb_count = 2;
	}
	else if ( page_content_section.hasClass( "single_sidebar" ) ){
		sb_count = 1;
	}
	else{
		sb_count = 0;
	}
	if ( content_top_level.find(".gallery[class*='galleryid-']").length > 0 ){
		owl = content_top_level.find( ".gallery[class*='galleryid-']" );
		is_init = owl.hasClass( "owl-carousel" );
		if ( is_init ) owl.data( "owlCarousel" ).destroy();
		owl.children( ":not(.gallery-item)" ).remove();
		items_count = count_carousel_items( owl, "gallery-columns-", "gallery-item" );
	}
	else if ( content_top_level.is( ".woocommerce" ) ){
		owl = content_top_level.children( ".products" );
		is_init = owl.hasClass( "owl-carousel" );
		if ( is_init ) owl.data( "owlCarousel" ).destroy();
		owl.children( ":not(.product)" ).remove();
		matches = /columns-\d+/.exec( content_top_level.attr( "class" ) );
		grid_class = matches != null && matches[0] != undefined ? matches[0] : '';
		owl.addClass( grid_class );
		items_count = count_carousel_items( owl, "columns-", "product" );
		owl.removeClass( grid_class );
	}
	else if ( content_top_level.is( "ul" ) ){
		owl = content_top_level;
		is_init = owl.hasClass( "owl-carousel" );
		if ( is_init ) owl.data( "owlCarousel" ).destroy();
		items = owl.children();
		grid_class = "crsl-grid-" + cols;
		col_class = "grid_col_" + Math.round( 12 / cols );
		owl.addClass( grid_class );
		if ( !items.hasClass( "item" ) ) items.addClass( "item" )
		items.addClass( col_class );
		items_count = count_carousel_items( owl, "crsl-grid-", "item" );
		owl.removeClass( grid_class );
		items.removeClass( col_class );
	}
	else {
		is_init = owl.hasClass( "owl-carousel" );
		if ( is_init ) owl.data( "owlCarousel" ).destroy();
		items = owl.children();
		grid_class = "crsl-grid-" + cols;
		col_class = "grid_col_" + Math.round( 12 / cols );
		owl.addClass( grid_class );
		if ( !items.hasClass( "item" ) ) items.addClass( "item" )
		items.addClass( col_class );
		items_count = count_carousel_items( owl, "crsl-grid-", "item" );
		owl.removeClass( grid_class );
		items.removeClass( col_class );
	}

	args = {
		direction: directRTL,
		slideSpeed: 300,
		navigation: false,
		pagination: bullets_nav,
		autoPlay: autoplay_speed
	}
	if(cws_is_mobile()){
		args.pagination = true;
		args.navigation = false;
	}
	switch ( items_count ){
        case 6:
            if ( sb_count == 2 ){
                args.itemsCustom = [
                    [0,1],
                    [750,2],
                    [980,2],
                    [1170,3]
                ];
            }
            else if ( sb_count == 1 ){
                args.itemsCustom = [
                    [0,1],
                    [750,3],
                    [980,3],
                    [1170,4]
                ];
            }
            else{
                args.itemsCustom = [
                    [0,1],
                    [750,3],
                    [980,5],
                    [1170,6]
                ];
            }
            break;
        case 5:
            if ( sb_count == 2 ){
                args.itemsCustom = [
                    [0,1],
                    [750,2],
                    [980,2],
                    [1170,3]
                ];
            }
            else if ( sb_count == 1 ){
                args.itemsCustom = [
                    [0,1],
                    [750,3],
                    [980,3],
                    [1170,4]
                ];
            }
            else{
                args.itemsCustom = [
                    [0,1],
                    [750,4],
                    [980,4],
                    [1170,5]
                ];
            }
            break;
		case 4:
			if ( sb_count == 2 ){
				args.itemsCustom = [
					[0,1],
					[750,2],
					[980,2],
					[1170, 2]
				];
			}
			else if ( sb_count == 1 ){
				args.itemsCustom = [
					[0,1],
					[750,3],
					[980,3],
					[1170, 3]
				];
			}
			else{
				args.itemsCustom = [
					[0,1],
					[750,4],
					[980,4],
					[1170, 4]
				];
			}
			break;
		case 3:
			if ( sb_count == 2 ){
				args.itemsCustom = [
					[0,1],
					[750,2],
					[980,2],
					[1170, 2]
				];
			}
			else if ( sb_count == 1 ){
				args.itemsCustom = [
					[0,1],
					[750,3],
					[980,3],
					[1170, 3]
				];
			}
			else{
				args.itemsCustom = [
					[0,1],
					[750,3],
					[980,3]
				];
			}
			break;
		case 2:
			if ( sb_count == 2 ){
				args.itemsCustom = [
					[0,1],
					[750,2],
					[980,2],
					[1170, 2]
				];
			}
			else if ( sb_count == 1 ){
				args.itemsCustom = [
					[0,1],
					[750,2],
					[980,2],
					[1170, 2]
				];
			}
			else{
				args.itemsCustom = [
					[0,1],
					[750,2],
					[980,2],
					[1170, 2]
				];
			}
			break;
		default:
			args.singleItem = true;
	}
	owl.owlCarousel(args);
	if ( nav.length ){
		jQuery( ".next", nav ).on( 'click', function (){
			owl.trigger( "owl.next" );
		});
		jQuery( ".prev", nav ).on( 'click', function (){
			owl.trigger( "owl.prev" );
		});
	}
}

function cws_woo_product_thumbnails_carousel_init (){
	jQuery( ".woo_product_thumbnail_carousel" ).each( function (){
		var cols, args, prev, next;
		var owl = jQuery( this );
		var matches = /carousel_cols_(\d+)/.exec( this.className );
		if ( !matches ){
			cols = 3;
		}
		else{
			cols = matches[1];
		}
		args = {
			slideSpeed: 300,
			navigation: false,
			pagination: false,
			items: cols
		}
		owl.owlCarousel( args );
		prev = this.parentNode.querySelector( ":scope > .prev" );
		next = this.parentNode.querySelector( ":scope > .next" );
		if ( prev ){
			prev.addEventListener( "click", function (){
				owl.trigger( "owl.prev" );
			}, false );
		}
		if ( next ){
			next.addEventListener( "click", function (){
				owl.trigger( "owl.next" );
			}, false );
		}
	});
}

function twitter_carousel_init (){
	jQuery( ".tweets_carousel" ).each( function (){
		var el = jQuery( this );
		var owl = jQuery( ".cws_wrapper", el );
		owl.owlCarousel({
			direction: directRTL,
			singleItem: true,
			slideSpeed: 300,
			navigation: false,
			pagination: true
		});
	});
}

function testimonials_carousel_init (){
	jQuery( ".testimonials_carousel" ).each( function (){
		var carousel = jQuery( this );
		var cols = carousel.data('col');
		var autoplay_speed = (carousel.hasClass( "autoplay" ) ? carousel.data( "autoplay" ) : false);
        var bullets_nav = carousel.hasClass( "bullets_nav" );
		var args = {
			direction: directRTL,
			slideSpeed: 300,
			navigation: false,
			pagination: bullets_nav,
			autoPlay: autoplay_speed,
		};
        if ( cws_is_mobile() ){
            args.pagination = true;
            args.navigation = false;
        };
        var section = jQuery( carousel ).closest( ".testimonials-wrapper" );
        var nav = jQuery( ".carousel_nav_panel", section );
		switch ( cols ){
			case 3:
			args.itemsCustom = [
			[0,1],
			[479,1],
			[980,2],
			[1200,3]
			];
			break;
			case 2:
			args.itemsCustom = [
			[0,1],
			[1200,2]
			];
			break;
			default:
			args.singleItem = true;
		}
		carousel.owlCarousel(args);
        if ( nav.length ){
            jQuery( ".next", nav ).on( 'click', function (){
                jQuery( carousel ).trigger( "owl.next" );
            });
            jQuery( ".prev", nav ).on( 'click', function (){
                jQuery( carousel ).trigger( "owl.prev" );
            });
        }
	});
}
function category_carousel_init (){
	jQuery( ".category_carousel" ).each( function (){
		var carousel = jQuery( this );
		var cols = carousel.data('col');
		var autoplay_speed = (carousel.hasClass( "autoplay" ) ? carousel.data( "autoplay" ) : false);
		var args = {
			direction: directRTL,
			slideSpeed: 300,
			navigation: true,
			pagination: false,
			autoPlay: autoplay_speed,
		}
		switch ( cols ){
			case 4:
			args.itemsCustom = [
			[0,1],
			[479,1],
			[768,2],
			[980,3],
			[1200,4]
			];
			break
			case 3:
			args.itemsCustom = [
			[0,1],
			[479,1],
			[980,2],
			[1200,3]
			];
			break
			case 2:
			args.itemsCustom = [
			[0,1],
			[1200,2]
			];
			break
			default:
			args.singleItem = true;
		}
		if (cws_is_mobile()) {
			args.pagination = true;
			args.navigation = false;
		}
		carousel.owlCarousel(args);
	});
}

/* \carousel */

function wp_standard_processing (){
	var galls;
	jQuery( "img[class*='wp-image-']" ).each( function (){
		var canvas_id;
		var el = jQuery( this );
		var parent = el.parent( "a" );
		var align_class_matches = /align\w+/.exec( el.attr( "class" ) );
		var align_class = align_class_matches != null && align_class_matches[0] != undefined ? align_class_matches[0] : "";
		var added_class = "cws_img_frame";
		if ( align_class.length ){
			if ( parent.length ){
				el.removeClass( align_class );
			}
			added_class += " " + align_class;
		}
		if ( parent.length ){
			parent.addClass( added_class );
			parent.children().wrapAll( "<div class='cws_blur_wrapper' />" );
		}
	});
	galls = jQuery( ".gallery[class*='galleryid-']" );
	if ( galls.length ){
		galls.each( function (){
			var gall = jQuery( this );
			var gall_id = cws_unique_id ( "wp_gallery_" );
			jQuery( "a", gall ).attr( "data-fancybox-group", gall_id );
		});
	}

	//Check if function exist
	if (typeof fancybox === 'function') {
	jQuery( ".gallery-icon a[href*='.jpg'], .gallery-icon a[href*='.jpeg'], .gallery-icon a[href*='.png'], .gallery-icon a[href*='.gif'], .cws_img_frame[href*='.jpg'], .cws_img_frame[href*='.jpeg'], .cws_img_frame[href*='.png'], .cws_img_frame[href*='.gif']" ).fancybox();
}
}

function cws_unique_id ( prefix ){
	var prefix = prefix != undefined && typeof prefix == 'string' ? prefix : "";
	var d = new Date();
	var t = d.getTime();
	var unique = Math.random() * t;
	var unique_id = prefix + unique;
	return unique_id;
}

/* fancybox */

function fancybox_init (){
	//Check if function exist
	if (typeof fancybox === 'function') {
	jQuery(".fancy").fancybox();
}
}

/* \fancybox */

/* wow */

function wow_init (){
	if (typeof WOW === 'function') {
		new WOW().init();
	}
}

/* wow */

/* isotope */

function isotope_init (){
	jQuery(".news.news-pinterest .isotope").each(function(item, value){
		jQuery(this).isotope({
			itemSelector: ".item"
		});
	});
	jQuery(".blog_gallery_grid.isotope").each(function(item, value){
		jQuery(this).isotope({
			// percentPosition: true,
			itemSelector: ".pic"
		});
	});
}


/* \isotope */
/* freewall */

function blog_gallery_grid_init (){
	jQuery(".posts_grid_grid .blog_gallery_grid").each(function(item, value){
		console.log('+++++++++');
	});
}

/* \freewall */

/* load more */
var wait_load_posts = false;
function load_more_init (){
	jQuery( document ).on( "click", ".cws_load_more", function (e){
		e.preventDefault();
		if ( wait_load_posts ) return;
		var el = jQuery(this);
		var url = el.attr( "href" );
		var paged = parseInt( el.data( "paged" ) );
		var max_paged = parseInt( el.data( "max-paged" ) );
		var template = el.data( "template" );
		var item_cont = el.parent().siblings( ".grid" );
		var isotope = false;
		var args = { ajax : "true", paged : paged, template: template };

		if ( !item_cont.length ) return;
		el.closest('.cws_wrapper').find('.portfolio_loader_wraper').show();
		wait_load_posts = true;
		jQuery.post( url, args, function ( data ){
			var new_items = jQuery(data).filter( '.item' );
			if ( !new_items.length ) return;
			new_items.css( 'display' , 'none' );
			jQuery(item_cont).append( new_items );
			el.closest('.cws_wrapper').find('.portfolio_loader_wraper').hide();
			wait_load_posts = false;
			var img_loader = imagesLoaded( jQuery(item_cont) );
			img_loader.on ('always', function (){
				reload_scripts();
				new_items.css( 'display', 'block' );
				if ( jQuery(item_cont).isotope ){
					jQuery(item_cont).isotope( 'appended', new_items);
					jQuery(item_cont).isotope( 'layout' );
				}
			    if (Retina.isRetina()) {
		        	jQuery(window.retina.root).trigger( "load" );
			    }
			    if ( paged == max_paged ){
			    	el.fadeOut( { duration : 300, complete : function (){
			    		el.remove();
			    	}})
			    }
			    else{
			    	el.data( "paged", String( paged + 1 ) );
			    }
			});
		});
	});
}

/* \load more */

function cws_widget_divider_init (){
	jQuery.fn.cws_widget_divider = function (){
		jQuery(this).each( function (){
			var el = jQuery(this);
			var done = false;
			if (!done) done = cws_widget_divider_controller(el);
			jQuery(window).scroll(function (){
				if (!done) done = cws_widget_divider_controller(el);
			});
		});
	}
}

function cws_widget_divider_controller (el){
	if (el.is_visible()){
		jQuery(el).addClass('divider_init');
		return true;
	}
	return false;
}

function cws_widget_services_init (){
	jQuery.fn.cws_services_icon = function (){
		jQuery(this).each( function (){
			var el = jQuery(this);
			var done = false;
			if (!done) done = cws_icon_animation_controller(el);
			jQuery(window).scroll(function (){
				if (!done) done = cws_icon_animation_controller(el);
			});
		});
	}
}

function cws_icon_animation_controller (el){
	if (el.is_visible() && jQuery(el).hasClass('add_animation_icon') ){
		jQuery(el).addClass('icon_init');
		return true;
	}
	return false;
}



/* widget archives hierarchy */

function widget_archives_hierarchy_init (){
	widget_archives_hierarchy_controller ( ".cws-widget>ul li", "ul.children", "parent_archive", "widget_archive_opener" );
	widget_archives_hierarchy_controller ( ".cws-widget .menu li", "ul.sub-menu", "menu-item-has-children", "opener" );
}

function widget_archives_hierarchy_controller ( list_item_selector, sublist_item_selector, parent_class, opener_class ){
	jQuery( list_item_selector ).has( sublist_item_selector ).each( function (){
		jQuery( this ).addClass( parent_class );
		var sublist = jQuery( this ).children( sublist_item_selector ).first();
		var level_height = jQuery( this ).outerHeight() - sublist.outerHeight();
		jQuery(this).append( "<span class='fa fa-angle-right " + opener_class + "'></span>" );
	});
	jQuery( list_item_selector + ">" + sublist_item_selector ).css( "display", "none" );
	jQuery( document ).on( "click", "." + opener_class, function (){
		var el = jQuery(this);
		var sublist = el.siblings( sublist_item_selector );
		if ( !sublist.length ) return;
		sublist = sublist.first();
		el.toggleClass( "active" ).parent('.menu-item').toggleClass('active');
		sublist.slideToggle( 300 );
	});
}

/* \widget archives hierarchy */

/* select 2 */

/* \select 2 */

/* tabs */

function cws_vc_tabs_fix(){
	jQuery(document).off("click.vc.accordion.data-api");
	jQuery(document).off("show.vc.accordion hide.vc.accordion");
	jQuery("[data-vc-accordion]").off("show.vc.accordion");
	jQuery("[data-vc-accordion]").off();

	if(jQuery(window).width() < 768){
		jQuery('.vc_tta-panels').find('.vc_tta-panel').removeClass('vc_active');
	}

	jQuery('.vc_tta-container .vc_tta-tabs .vc_tta-tabs-list a, .vc_tta-container .vc_tta-tabs .vc_tta-panel-heading a').on('click', function(e){
		e.preventDefault();

		if(jQuery(window).width() > 767){
			var tab = jQuery(this).attr('href');
			tab = tab.replace('#','');
			var row = jQuery(this).closest('.vc_tta-tabs').find('.vc_tta-panels-container .vc_tta-panel[id="'+tab+'"]');

			jQuery(this).closest('.vc_tta-tabs-list').find('.vc_tta-tab').removeClass('vc_active');
			jQuery(this).parent().addClass('vc_active');

			jQuery(this).closest('.vc_tta-tabs').find('.vc_tta-panels-container .vc_tta-panel').removeClass('vc_active');
			row.addClass('vc_active');
		} else {
			var link = jQuery(this).closest('.vc_tta-panel');
			var row = jQuery(this).closest('.vc_tta-panel').find('.vc_tta-panel-body');

			link.toggleClass('tab_active');
			jQuery(this).closest('.vc_tta-panels').find('.vc_tta-panel').not(link).removeClass('tab_active');

			row.slideToggle(400);
			jQuery(this).closest('.vc_tta-panels').find('.vc_tta-panel-body').not(row).slideUp(400);
		}
	});

	if( jQuery(window).width() < 768 ){
		jQuery('.vc_general.vc_tta-tabs .vc_tta-panels .vc_tta-panel:first-child .vc_tta-panel-heading a').click();
	}
}

function cws_vc_toggle_accordion_action(){
    jQuery(".vc_tta-accordion [data-vc-accordion][data-vc-container]").off();

    jQuery('.vc_tta-container .vc_tta-accordion .vc_tta-panel a').on('click', function(e) {
        e.preventDefault();
    });

    jQuery('.vc_tta-container[data-vc-action="collapseAll"]').find('.vc_tta-accordion').addClass('cwsToggle');
    jQuery('.vc_tta-container[data-vc-action="collapse"]').find('.vc_tta-accordion').addClass('cwsAccordion');
    jQuery('.vc_tta-accordion').find('.vc_tta-panel.vc_active').addClass('cws_active');

    jQuery('.vc_tta-container .vc_tta-accordion .vc_tta-panel').on('click', function(e) {
        jQuery(this).closest('.vc_tta-panels').find('.vc_tta-panel').not(jQuery(this)).find('.vc_tta-panel-body').slideUp();
        jQuery(this).closest('.vc_tta-panels').find('.vc_tta-panel').not(jQuery(this)).removeClass('cws_active');

        if ( jQuery(this).closest('.vc_tta-container').attr('data-vc-action') == 'collapseAll' ){
            jQuery(this).find('.vc_tta-panel-body').slideToggle();
            jQuery(this).toggleClass('cws_active');
        } else if ( jQuery(this).closest('.vc_tta-container').attr('data-vc-action') == 'collapse' ){
            jQuery(this).find('.vc_tta-panel-body').slideDown();
            jQuery(this).addClass('cws_active');
        }
    });
}

/* \tabs */


/* message box */

function cws_message_box_init (){
	jQuery( document ).on( 'click', '.cws_msg_box.closable .cls_btn', function (){
		var cls_btn = jQuery(this);
		var el = cls_btn.closest( ".cws_msg_box" );
		el.fadeOut( function (){
			el.remove();
		});
	});
}

/* \message box */

/* portfolio ajax */

function cws_portfolio_pagination_init (){
	jQuery( ".cws_portfolio .pagination" ).each( function (){
		var pagination = jQuery( this );
		cws_portfolio_pagination ( pagination );
	});

	jQuery('.cws_portfolio_fw .pagination').each( function (){
		var pagination = jQuery( this );
		cws_portfolio_pagination ( pagination , true );
	});
}

function cws_portfolio_pagination ( pagination , is_fw ){
	if ( pagination == undefined ) return;
	if (is_fw != undefined){
		is_fw == is_fw ;
	}else{
		is_fw == false ;
	}
	var old_page_links = pagination.find( ".page_links" );
	var items = old_page_links.find( ".page-numbers:not(.dots)" ).not( ".current" );
	if (is_fw) {
		var parent = pagination.closest( ".cws_portfolio_fw" );
	}else{
		var parent = pagination.closest( ".cws_portfolio" );
	}

	if (is_fw) {
		var grid = parent.find( ".grid_fw" );
	}else{
		var grid = parent.find( ".cws_portfolio_items" );
	}

	if (is_fw) {
		var ajax_data_input = parent.find( "input.cws_portfolio_fw_ajax_data" );
	}else{
		var ajax_data_input = parent.find( "input.cws_portfolio_ajax_data" );
	}

	items.each( function (){
		var item = jQuery( this );
		var url = item.attr( "href" );
		var ajax_data = JSON.parse( ajax_data_input.val() );
		var action_func;
		ajax_data['url'] = url;
		if (is_fw) {
			action_func = 'cws_portfolio_fw_pagination';
		}else{
			action_func = 'cws_portfolio_pagination';
		}

		item.on( "click", function ( e ){
			e.preventDefault();
			if ( wait_load_portfolio ) return;
			wait_load_portfolio = true;
			if (is_fw) {
				pagination.closest('.cws_portfolio_fw').find('.portfolio_loader_wraper').show();
			}else{
				pagination.closest('.cws_portfolio').find('.portfolio_loader_wraper').show();
			}
			jQuery.post( ajaxurl, {
				"action" : action_func,
				"data" : ajax_data
			}, function ( data, status ){
				var img_loader;
				var parent_offset = parent.offset().top;
				var old_items = jQuery( ".item", grid );
				var new_items = jQuery( ".item", jQuery( data ) );
				var new_page_links = jQuery( ".pagination .page_links", jQuery( data ) );
				var new_page_links_exists = Boolean( new_page_links.children().length );
				new_items.css( "display", "none" );
				if (ajax_data['pagination_style'] != 'load_more') {
					grid.isotope( 'remove', old_items );
					if ( window.scrollY > parent_offset ){
						jQuery( 'html, body' ).stop().animate({
							scrollTop : parent_offset
						}, 300);
					}
				}
				grid.append( new_items );
				img_loader = imagesLoaded( grid );
				img_loader.on( "always", function (){
					grid.isotope( 'appended', new_items );
					if (is_fw) {
						pagination.closest('.cws_portfolio_fw').find('.portfolio_loader_wraper').hide();
					}else{
						pagination.closest('.cws_portfolio').find('.portfolio_loader_wraper').hide();
					}
					grid.isotope( 'layout' );
					old_page_links.fadeOut( function (){
						old_page_links.remove();
						wait_load_portfolio = false;
						if ( new_page_links_exists ){
							new_page_links.css( "display", "none" );
							pagination.append( new_page_links );
							new_page_links.fadeIn();
							if (is_fw){
								cws_portfolio_pagination ( pagination , true );
							}else{
								cws_portfolio_pagination ( pagination );
							}
						}
						else{
							pagination.remove();
						}
					    if (Retina.isRetina()) {
				        	jQuery(window.retina.root).trigger( "load" );
					    }
						fancybox_init ();
					});
				});
			});
		});
	});
}


function cws_portfolio_filter_init (){
	var els = jQuery( ".cws_portfolio .cws_portfolio_filter" );
	els.each( function (){
		var el = jQuery( this );
		var parent = el.closest( ".cws_portfolio" );
		var grid = parent.find( ".cws_portfolio_items" );
		var ajax_data_input = parent.find( "input.cws_portfolio_ajax_data" );
		var filter_el = el.children("a");
		filter_el.on( "click", function (e){

			e.preventDefault();
			jQuery( this ).addClass('active').siblings().removeClass('active');
			var val = jQuery( this ).attr('data-filter');
			var ajax_data = JSON.parse( ajax_data_input.val() );
			ajax_data["filter"] = val;
			var old_pagination = parent.find( ".pagination" );
			var old_page_links = jQuery( ".page_links", old_pagination );

			el.closest('.cws_portfolio_header').siblings( '.cws_wrapper' ).find('.portfolio_loader_wraper').show();
			jQuery.post( ajaxurl, {
				"action" : "cws_portfolio_filter",
				"data" : ajax_data
			}, function ( data, status ){
				var img_loader;
				var old_items = jQuery( ".item", grid );
				var new_items = jQuery( ".item", jQuery( data ) );
				var new_pagination = jQuery( ".pagination", jQuery( data ) );
				var new_page_links = jQuery( ".page_links", new_pagination );
				var new_page_links_exists = Boolean( new_page_links.children().length );
				new_items.css( "display", "none" );
				grid.isotope( 'remove', old_items );
				grid.append( new_items );
				el.closest('.cws_portfolio_header').siblings( '.cws_wrapper' ).find('.portfolio_loader_wraper').hide();
				img_loader = imagesLoaded( grid );
				img_loader.on( "always", function (){
					grid.isotope( 'appended', new_items );
					grid.isotope( 'layout' );
					ajax_data_input.attr( "value", JSON.stringify( ajax_data ) );
					if ( old_pagination.length ){
						if ( new_page_links_exists ){
							new_page_links.css( "display", "none" );
							old_page_links.fadeOut( function (){
								old_page_links.remove();
								old_pagination.append( new_page_links );
								new_page_links.fadeIn();
								cws_portfolio_pagination ( old_pagination );
							});
						}
						else{
							old_pagination.fadeOut( function (){
								old_pagination.remove();
							});
						}
					}
					else{
						if ( new_page_links_exists ){
							new_pagination.css( "display", "none" );
							parent.append( new_pagination );
							new_pagination.fadeIn();
							cws_portfolio_pagination ( new_pagination );
						}
					}
				    if (Retina.isRetina()) {
			        	jQuery(window.retina.root).trigger( "load" );
				    }
					fancybox_init ();
				});
			});
		});
	});
}


function cws_testimonials_single_carousel_init (){
	jQuery( ".cws_testimonials.single.related" ).each( function (){
		var parent = jQuery(this);
		var grid = jQuery( ".cws_testimonials_items", parent );
		var ajax_data_input = jQuery( "#cws_testimonials_single_ajax_data", parent );
		var carousel_nav = jQuery( ".carousel_nav_panel", parent );
		if ( !carousel_nav.length ) return;
		jQuery( ".prev,.next", carousel_nav ).on( "click", function (){
			var el = jQuery( this );
			var action = el.hasClass( "prev" ) ? "prev" : "next";
			var ajax_data = JSON.parse( ajax_data_input.val() );
			var current = ajax_data['current'];
			var all = ajax_data['related_ids'];
			var next_ind;
			var next;
			for ( var i=0; i<all.length; i++ ){
				if ( all[i] == current ){
					if ( action == "prev" ){
						if ( i <= 0 ){
							next_ind = all.length-1;
						}
						else{
							next_ind = i-1;
						}
					}
					else{
						if ( i >= all.length-1 ){
							next_ind = 0;
						}
						else{
							next_ind = i+1
						}
					}
					break;
				}
			}
			if ( typeof next_ind != "number" || typeof all[next_ind] == undefined ) return;
			next = all[next_ind];
			jQuery.post( ajaxurl, {
				'action' : 'cws_testimonials_single',
				'data' : {
					'initial_id' : ajax_data['initial'],
					'requested_id' : next
				}
			}, function ( data, status ){
				var animation_config, old_el, new_el, hiding_class, showing_class, delay, img_loader;
				ajax_data['current'] = next;
				ajax_data_input.attr( "value", JSON.stringify( ajax_data ) );
				animation_config = {
					'prev' : {
						'in' : 'fadeInLeft',
						'out' : 'fadeOutRight'
					},
					'next' : {
						'in' : 'fadeInRight',
						'out' : 'fadeOutLeft'
					},
					'delay' : 150
				};
				old_el = jQuery( ".cws_testimonials_items .item" , parent );
				new_el = jQuery( ".item", jQuery( data ) );
				hiding_class = "animated " + animation_config[action]['out'];
				showing_class = "animated " + animation_config[action]['in'];
				delay = animation_config['delay'];
				new_el.css( "display", "none" );
				grid.append( new_el );
				img_loader = imagesLoaded( grid );
				img_loader.on( 'always', function (){
					old_el.addClass( hiding_class );
					setTimeout( function (){
						old_el.remove();
						new_el.addClass( showing_class );
						new_el.css( "display", "block" );

					    if (Retina.isRetina()) {
				        	jQuery(window.retina.root).trigger( "load" );
					    }
					    fancybox_init();

					}, delay );
				});
			});
		});
	});
}


/* ourteam ajax */

function cws_ourteam_pagination_init (){
	var els = jQuery( ".cws_ourteam .pagination" );
	els.each( function (){
		var pagination = jQuery( this );
		cws_ourteam_pagination( pagination );
	});
}

function cws_ourteam_pagination ( pagination ){
	if ( pagination == undefined ) return;
	var old_page_links = pagination.find( ".page_links" );
	var items = old_page_links.find( ".page-numbers" ).not( ".current" );
	var parent = pagination.closest( ".cws_ourteam" );
	var grid = parent.find( ".cws_ourteam_items" );
	var ajax_data_input = parent.find( "input.cws_ourteam_ajax_data" );
	items.each( function (){
		var item = jQuery( this );
		var url = item.attr( "href" );
		var ajax_data = JSON.parse( ajax_data_input.val() );
		ajax_data['url'] = url;
		item.on( "click", function ( e ){
			e.preventDefault();
			jQuery.post( ajaxurl, {
				"action" : "cws_ourteam_pagination",
				"data" : ajax_data
			}, function ( data, status ){
				var img_loader;
				var parent_offset = parent.offset().top;
				var old_items = jQuery( ".item", grid );
				var new_items = jQuery( ".item", jQuery( data ) );
				var new_page_links = jQuery( ".pagination .page_links", jQuery( data ) );
				var new_page_links_exists = Boolean( new_page_links.children().length );
				new_items.css( "display", "none" );
				grid.isotope( 'remove', old_items );
				if ( window.scrollY > parent_offset ){
					jQuery( 'html, body' ).stop().animate({
						scrollTop : parent_offset
					}, 300);
				}
				grid.append( new_items );
				img_loader = imagesLoaded( grid );
				img_loader.on( "always", function (){
					grid.isotope( 'appended', new_items );
					grid.isotope( 'layout' );
					old_page_links.fadeOut( function (){
						old_page_links.remove();
						if ( new_page_links_exists ){
							new_page_links.css( "display", "none" );
							pagination.append( new_page_links );
							new_page_links.fadeIn();
							cws_ourteam_pagination ( pagination );
						}
						else{
							pagination.remove();
						}
					    if (Retina.isRetina()) {
				        	jQuery(window.retina.root).trigger( "load" );
					    }
						fancybox_init ();
					});
				});

			});
		});
	});
}

function cws_ourteam_filter_init (){
	var els = jQuery( ".cws_ourteam select.cws_ourteam_filter" );
	els.each( function (){
		var el = jQuery( this );
		var parent = el.closest( ".cws_ourteam" );
		var grid = parent.find( ".cws_ourteam_items" );
		var ajax_data_input = parent.find( "input.cws_ourteam_ajax_data" );
		el.on( "change", function (){
			var val = el.val();
			var ajax_data = JSON.parse( ajax_data_input.val() );
			ajax_data["filter"] = val;
			var old_pagination = parent.find( ".pagination" );
			var old_page_links = jQuery( ".page_links", old_pagination );
			jQuery.post( ajaxurl, {
				"action" : "cws_ourteam_filter",
				"data" : ajax_data
			}, function ( data, status ){
				console.log(data);
				var img_loader;
				var old_items = jQuery( ".item", grid );
				var new_items = jQuery( ".item", jQuery( data ) );
				var new_pagination = jQuery( ".pagination", jQuery( data ) );
				var new_page_links = jQuery( ".page_links", new_pagination );
				var new_page_links_exists = Boolean( new_page_links.children().length );
				new_items.css( "display", "none" );
				grid.isotope( 'remove', old_items );
				grid.append( new_items );
				img_loader = imagesLoaded( grid );
				img_loader.on( "always", function (){
					grid.isotope( 'appended', new_items );
					grid.isotope( 'layout' );
					ajax_data_input.attr( "value", JSON.stringify( ajax_data ) );
					if ( old_pagination.length ){
						if ( new_page_links_exists ){
							new_page_links.css( "display", "none" );
							old_page_links.fadeOut( function (){
								old_page_links.remove();
								old_pagination.append( new_page_links );
								new_page_links.fadeIn();
								cws_ourteam_pagination ( old_pagination );
							});
						}
						else{
							old_pagination.fadeOut( function (){
								old_pagination.remove();
							});
						}
					}
					else{
						if ( new_page_links_exists ){
							new_pagination.css( "display", "none" );
							parent.append( new_pagination );
							new_pagination.fadeIn();
							cws_ourteam_pagination ( new_pagination );
						}
					}
				    if (Retina.isRetina()) {
			        	jQuery(window.retina.root).trigger( "load" );
				    }
					fancybox_init ();
				});
			});
		});
	});
}

/* \ourteam ajax */

/* parallax */

function cws_parallax_init(){
	if (jQuery( ".cws_prlx_section" ).length) {
		jQuery( ".cws_prlx_section" ).cws_prlx();
	};
}

/* \parallax */

/* milestone */

function cws_milestone_init (){
	jQuery.fn.cws_milestone = function (){
		jQuery(this).each( function (){
			var el = jQuery(this);
			var number_container = el.find(".cws_vc_shortcode_milestone_number");
			var done = false;
			if (number_container.length){
				if ( !done ) done = milestone_controller (el, number_container);
				jQuery(window).scroll(function (){
					if ( !done ) done = milestone_controller (el, number_container);
				});
			}
		});
	}
}

function milestone_controller (el, number_container){
	var od, args;
	var speed = number_container.data( 'speed' );
	var number = number_container.text();
	if (el.is_visible()){
		args= {
			el: number_container[0],
			format: 'd',
		};
		if ( speed ) args['duration'] = speed;
		od = new Odometer( args );
		od.update( number );

        var num = 0;
        jQuery('.odometer-digit-spacer', el).each( function () {
            jQuery(this).html(number.substr(num, 1));
            num++;
		} );

		return true;
	}
	return false;
}

function get_digit (number, digit){
	var exp = Math.pow(10, digit);
	return Math.round(number/exp%1*10);
}

/* \milestone */

/* progress bar */

function cws_progress_bar_init (){
	jQuery.fn.cws_progress_bar = function (){
		jQuery(this).each( function (){
			var el = jQuery(this);
			var done = false;
			if (!done) done = progress_bar_controller(el);
			jQuery(window).scroll(function (){
				if (!done) done = progress_bar_controller(el);
			});
		});
	}
}

function progress_bar_controller (el){
	if (el.is_visible()){
		var progress = el.find(".cws_vc_shortcode_pb_progress");
		var value = parseInt( progress.attr("data-value") );
		var width = parseInt(progress.css('width').replace(/%|(px)|(pt)/,""));
		var ind = el.find(".indicator");
		if ( width < value ){
			var progress_interval = setInterval( function(){
				width ++;
				progress.css("width", width+"%");
				ind.text(width+'%');
				if (width == value){
					clearInterval(progress_interval);
				}
			}, 5);
		}
		return true;
	}
	return false;
}

/* \progress bar */

/* message box */
function cws_msg_box_init (){
	jQuery( document ).on( 'click', '.cws_vc_shortcode_msg_box.closable .close_button', function (){
		var cls_btn = jQuery(this);
		var el = cls_btn.closest( ".cws_vc_shortcode_msg_box" );
		el.fadeOut(500, function (){
			el.remove();
		});
	});
}
function cws_input_width() {
	jQuery('.cws_width_50').closest('p').addClass('cws_width_50');
	jQuery('.cws_margin_top_30').closest('p').addClass('cws_margin_top_30');
	jQuery('.cws_submit').closest('p').addClass('cws_submit');
	jQuery('.cws_one_row').closest('p').addClass('cws_one_row');
	jQuery('.cws_first_color').closest('p').addClass('cws_first_color');

	jQuery('.wpcf7-form-control-wrap').children().each(function(i, el) {
		if( el.tagName == 'SELECT' ){
			jQuery(el).parent().addClass('cws_custom_select');
		}
	});
}
function cws_footer_on_bottom(){
	if( jQuery(window).height() > jQuery('body').height() ){
		jQuery('.copyrights_area').addClass('bottom_fixed');
	} else {
		jQuery('.copyrights_area').removeClass('bottom_fixed');
	}
}
function cws_first_place_col(){
	jQuery('.first_col_trigger').each(function(i, el) {
		jQuery(el).next().addClass('vc_inner_col-first-place');
	});

	jQuery('.vc_col-first-place').closest('.vc_row').addClass('custom_flex_row');
	jQuery('.vc_inner_col-first-place').closest('.vc_row').addClass('custom_inner_flex_row');
}

function gifts_card_init(){
	jQuery(".cws_vc_shortcode_gifts_cards.cws_vc_shortcode_module").each(function(){
		var height = jQuery(this).find('.front').outerHeight() - 50;
		jQuery(this).find('.back').css({'height': height});
	});
}

function custom_colors_init (){

	jQuery('.cws_sc_carousel.custom-control-color').each(function(){
		var control_color = jQuery(this).attr("data-customcontrol");
		jQuery(this).find('.cws_sc_carousel_header .carousel_nav_panel .prev').css(
				   {"background-color":'transparent',
					"color":control_color,
					"-webkit-box-shadow":"0px 0px 0px 1px "+control_color,
					"-moz-box-shadow":"0px 0px 0px 1px "+control_color,
					"-ms-box-shadow":"0px 0px 0px 1px "+control_color,
					"box-shadow":"0px 0px 0px 1px "+control_color
				});

		jQuery(this).find('.cws_sc_carousel_header .carousel_nav_panel .next').css(
				   {"background-color":'transparent',
					"color":control_color,
					"-webkit-box-shadow":"0px 0px 0px 1px "+control_color,
					"-moz-box-shadow":"0px 0px 0px 1px "+control_color,
					"-ms-box-shadow":"0px 0px 0px 1px "+control_color,
					"box-shadow":"0px 0px 0px 1px "+control_color
				});

		jQuery(this).find('.cws_sc_carousel_header .carousel_nav_panel .prev').on("mouseenter", function (){
			jQuery(this).css({"background-color":'rgba('+cws_Hex2RGB(control_color)+',0.25)'});
		});
		jQuery(this).find('.cws_sc_carousel_header .carousel_nav_panel .prev').on("mouseleave", function (){
			jQuery(this).css({"background-color":'transparent'});
		});
		jQuery(this).find('.cws_sc_carousel_header .carousel_nav_panel .next').on("mouseenter", function (){
			jQuery(this).css({"background-color":'rgba('+cws_Hex2RGB(control_color)+',0.25)'});
		});
		jQuery(this).find('.cws_sc_carousel_header .carousel_nav_panel .next').on("mouseleave", function (){
			jQuery(this).css({"background-color":'transparent'});
		});


		})

	jQuery('.pricing_table_column:not(.active_table_column) .price_section').each(function(){
		if (jQuery(this).attr('data-bg-color') !== undefined) {
			var bg_color = jQuery(this).attr("data-bg-color");
			jQuery(this).parents('.pricing_table_column').on("mouseenter", function (){
				jQuery(this).find(".price_section").css({"color":'#ffffff;'});
				jQuery(this).find(".price_section .color-overlay").css({"background":bg_color});
				jQuery(this).find('.widget_wrapper').css({"border-color":bg_color});
			});
			jQuery(this).parents('.pricing_table_column').on("mouseleave", function (){
				jQuery(this).find(".price_section").css({"color":''});
				jQuery(this).find(".price_section .color-overlay").css({"background":''});
				jQuery(this).find('.widget_wrapper').css({"border-color":''});
			});
		}
	})

	jQuery(".cws_button.custom_colors").each(function (){
		var bg_color = jQuery(this).attr("data-bg-color");
		var font_color = jQuery(this).attr("data-font-color");
		var alt = jQuery(this).hasClass("alt");
		if ( alt ){
			if (jQuery(this).parents('.pricing_table_column').length) {

				jQuery(this).css({"background-color":bg_color,"color":font_color,"border-color":font_color});

				jQuery(this).parents('.pricing_table_column').on("mouseenter", function (){
					jQuery(this).find(".cws_button.custom_colors").css({"background-color":font_color,"color":bg_color,"border-color":font_color});
				});
				jQuery(this).parents('.pricing_table_column').on("mouseleave", function (){
					jQuery(this).find(".cws_button.custom_colors").css({"background-color":bg_color,"color":font_color,"border-color":font_color});
				});

				jQuery(this).on("mouseenter", function (){
					jQuery(this).css({"background-color":bg_color,"color":font_color,"border-color":font_color});
				});

				jQuery(this).on("mouseleave", function (){
					jQuery(this).css({"background-color":font_color,"color":bg_color,"border-color":font_color});
				});
			}else{
				jQuery(this).css({"background-color": 'transparent',"color":bg_color,"border-color":bg_color});

				jQuery(this).on("mouseover", function (){
						jQuery(this).css({"background-color":bg_color,"color":font_color,"border-color":bg_color});
				});
				jQuery(this).on("mouseout", function (){
					jQuery(this).css({"background-color": 'transparent',"color":bg_color,"border-color":bg_color});
				});
			}
		}
		else{
			jQuery(this).css({"background-color":bg_color,"color":font_color,"border-color":bg_color});
			jQuery(this).on("mouseover", function (){
				jQuery(this).css({"background-color": 'transparent',"color":bg_color,"border-color":bg_color});
			});
			jQuery(this).on("mouseout", function (){
				jQuery(this).css({"background-color":bg_color,"color":font_color,"border-color":bg_color});
			});
		}
	});

	jQuery(".cws_fa.custom_colors").each(function (){
		var bg_color = jQuery(this).attr("data-bg-color");
		var font_color = jQuery(this).attr("data-font-color");
		var alt = jQuery(this).hasClass("alt");
		if ( alt ){
			if (jQuery(this).is('.bordered_icon.simple_icon')) {
				jQuery(this).css({"background-color":bg_color,
					"color":font_color,
					"-webkit-box-shadow":"0px 0px 0px 1px "+bg_color,
					"-moz-box-shadow":"0px 0px 0px 1px "+bg_color,
					"-ms-box-shadow":"0px 0px 0px 1px "+bg_color,
					"box-shadow":"0px 0px 0px 1px "+bg_color});
			}else if(jQuery(this).is('.simple_icon')){
				jQuery(this).css({
					"color":bg_color});
			}else{
				jQuery(this).css({"color":font_color,"border-color":font_color});
			}

			if (jQuery(this).parent('.cws_fa_wrapper').length) {
				jQuery(this).parent('.cws_fa_wrapper').on("mouseover", function (){
					jQuery(this).find('.cws_fa').css({"background-color":font_color,"color":bg_color, 'border-color':font_color});
					jQuery(this).find('.ring').css({
						"-webkit-box-shadow":"0px 0px 0px 1px "+font_color,
						"-moz-box-shadow":"0px 0px 0px 1px "+font_color,
						"-ms-box-shadow":"0px 0px 0px 1px "+font_color,
						"box-shadow":"0px 0px 0px 1px "+font_color
					});
				});
				jQuery(this).parent('.cws_fa_wrapper').on("mouseout", function (){
					jQuery(this).find('.cws_fa').css({"background-color":'transparent',"color":font_color,"border-color":'#f2f2f2'});
					jQuery(this).find('.ring').css({
						"-webkit-box-shadow":"0px 0px 0px 1px #fafafa",
						"-moz-box-shadow":"0px 0px 0px 1px #fafafa",
						"-ms-box-shadow":"0px 0px 0px 1px #fafafa",
						"box-shadow":"0px 0px 0px 1px #fafafa"
					});
				});
			}else{
				if (jQuery(this).is('.bordered_icon.simple_icon')) {
					jQuery(this).on("mouseover", function (){
						jQuery(this).css({"color":bg_color,'background-color':'transparent'});
					});
					jQuery(this).on("mouseout", function (){
						jQuery(this).css({"background-color":bg_color,
							"color":font_color,
							"-webkit-box-shadow":"0px 0px 0px 1px "+bg_color,
							"-moz-box-shadow":"0px 0px 0px 1px "+bg_color,
							"-ms-box-shadow":"0px 0px 0px 1px "+bg_color,
							"box-shadow":"0px 0px 0px 1px "+bg_color});
					});
				}else if(jQuery(this).is('.simple_icon')){
					jQuery(this).on("mouseover", function (){
						jQuery(this).css({"color":font_color});
					});
					jQuery(this).on("mouseout", function (){
						jQuery(this).css({"color":bg_color});
					});
				}else{
					jQuery(this).on("mouseover", function (){
						jQuery(this).css({"color":bg_color,"border-color":bg_color});
					});
					jQuery(this).on("mouseout", function (){
						jQuery(this).css({"color":font_color,"border-color":font_color});
					});
				}

			}

		}
		else{
			if (jQuery(this).is('.bordered_icon.simple_icon')) {
				jQuery(this).css({"background-color":'transparent',
					"color":font_color,
					"-webkit-box-shadow":"0px 0px 0px 1px "+font_color,
					"-moz-box-shadow":"0px 0px 0px 1px "+font_color,
					"-ms-box-shadow":"0px 0px 0px 1px "+font_color,
					"box-shadow":"0px 0px 0px 1px "+font_color});
			}else if(jQuery(this).is('.simple_icon')){
				jQuery(this).css({"background-color":'transparent',
					"color":font_color});
			}else{
				jQuery(this).css({"color":bg_color,"border-color":bg_color});
			}
			if (jQuery(this).parent('.cws_fa_wrapper').length) {
				jQuery(this).next('.ring').css({
					"-webkit-box-shadow":"0px 0px 0px 1px "+bg_color,
					"-moz-box-shadow":"0px 0px 0px 1px "+bg_color,
					"-ms-box-shadow":"0px 0px 0px 1px "+bg_color,
					"box-shadow":"0px 0px 0px 1px "+bg_color
				})
				jQuery(this).parent('.cws_fa_wrapper').on("mouseover", function (){
					jQuery(this).find('.cws_fa').css({"border-color":font_color,"color":font_color});
				});
				jQuery(this).parent('.cws_fa_wrapper').on("mouseout", function (){
					jQuery(this).find('.cws_fa').css({"color":bg_color,"border-color":bg_color});
				});
			}else{
				if (jQuery(this).is('.bordered_icon.simple_icon')) {
					jQuery(this).on("mouseover", function (){
						jQuery(this).css({"color":bg_color,'background-color':font_color});
					});
					jQuery(this).on("mouseout", function (){
						jQuery(this).css({"background-color":'transparent',
							"color":font_color,
							"-webkit-box-shadow":"0px 0px 0px 1px "+font_color,
							"-moz-box-shadow":"0px 0px 0px 1px "+font_color,
							"-ms-box-shadow":"0px 0px 0px 1px "+font_color,
							"box-shadow":"0px 0px 0px 1px "+font_color});
					});
				}else if(jQuery(this).is('.simple_icon')){
					jQuery(this).on("mouseover", function (){
						jQuery(this).css({"color":font_color});
					});
					jQuery(this).on("mouseout", function (){
						jQuery(this).css({"color":bg_color});
					});
				}else{
					jQuery(this).on("mouseover", function (){
						jQuery(this).css({"color":font_color,"border-color": font_color});
					});
					jQuery(this).on("mouseout", function (){
						jQuery(this).css({"color":bg_color,"border-color":bg_color});
					});
				}

			}

		}
	});
}

function cws_Hex2RGB(hex) {
	var hex = hex.replace("#", "");
	var color = '';
	if (hex.length == 3) {
		color = hexdec(hex.substr(0,1))+',';
		color = color + hexdec(hex.substr(1,1))+',';
		color = color + hexdec(hex.substr(2,1));
	}else if(hex.length == 6){
		color = hexdec(hex.substr(0,2))+',';
		color = color + hexdec(hex.substr(2,2))+',';
		color = color + hexdec(hex.substr(4,2));
	}
	return color;
}
function hexdec(hex_string) {
	hex_string = (hex_string + '')
	.replace(/[^a-f0-9]/gi, '');
	return parseInt(hex_string, 16);
}

/* header parallax */


function cws_header_imgs_cover_init (){
	cws_header_imgs_cover_controller ();
	window.addEventListener( "resize", cws_header_imgs_cover_controller, false );
}

function cws_header_imgs_cover_controller (){
	var prlx_sections, prlx_section, section_imgs, section_img, i, j;
	var prlx_sections = jQuery( '.cws_parallax_scene_container > .cws_parallax_scene, .header_bg_img > .cws_parallax_section');
	for ( i = 0; i < prlx_sections.length; i++ ){
		prlx_section = prlx_sections[i];
		section_imgs = jQuery( "img", jQuery( prlx_section ) );
		for ( j = 0; j < section_imgs.length; j++ ){
			section_img = section_imgs[j];
			cws_cover_image( section_img, prlx_section );
		}
	}
}

function cws_cover_image ( img, section ){
	var section_w, section_h, img_nat_w, img_nat_h, img_ar, img_w, img_h, canvas;
	if ( img == undefined || section == undefined ) return;
	section_w = section.offsetWidth;
	section_h = section.offsetHeight;
	img_nat_w = img.naturalWidth;
	img_nat_h = img.naturalHeight;
	img_ar = img_nat_w / img_nat_h;
	if ( img_ar > 1 ){
		img_h = section_h;
		img_w = section_h * img_ar;
	}
	else{
		img_w = section_w;
		img_h = section_w / img_ar;
	}
	img.width = img_w;
	img.height = img_h;
}


function cws_header_bg_init(){
	var bg_sections = jQuery('.header_bg_img, .cws_parallax_scene_container');
	bg_sections.each( function (){
		var bg_section = jQuery( this );
		cws_header_bg_controller( bg_section );
	});
	window.addEventListener( 'resize', function (){
		var bg_sections = jQuery('.header_bg_img, .cws_parallax_scene_container');
		bg_sections.each( function (){
			var bg_section = jQuery( this );
			cws_header_bg_controller( bg_section );
		});
	}, false );
}

function cws_header_bg_controller ( bg_section ){
	var benefits_area = jQuery( ".benefits_area" ).eq( 0 );
	var page_content_section = jQuery( ".page_content" ).eq( 0 );
	var top_curtain_hidden_class = "hidden";
	var top_panel = jQuery( "#site_top_panel" );
	var top_curtain = jQuery( "#top_panel_curtain" );
	var consider_top_panel = top_panel.length && top_curtain.length && top_curtain.hasClass( top_curtain_hidden_class );
		if ( benefits_area.length ){
			if ( consider_top_panel ){
				bg_section.css( {
					'height' : bg_section.parent().outerHeight() + 200 + bg_section.parent().offset().top + top_panel.outerHeight() + "px",
					'margin-top' : "-" + ( bg_section.parent().offset().top + top_panel.outerHeight() ) + "px"
				});
			}
			else{
				bg_section.css( {
					'height' : bg_section.parent().outerHeight() + 200 + bg_section.parent().offset().top + "px",
					'margin-top' : "-" + bg_section.parent().offset().top + "px"
				});
			}
			bg_section.addClass( 'height_assigned' );
		}
		else if ( page_content_section.length ){
			if ( page_content_section.hasClass( "single_sidebar" ) || page_content_section.hasClass( "double_sidebar" ) ){
				if ( consider_top_panel ){
					bg_section.css({
						'height' : bg_section.parent().outerHeight() + bg_section.parent().offset().top + top_panel.outerHeight() + "px",
						'margin-top' : "-" + ( bg_section.parent().offset().top + top_panel.outerHeight() ) + "px"
					});
				}
				else{
					bg_section.css({
						'height' : bg_section.parent().outerHeight() + bg_section.parent().offset().top + "px",
						'margin-top' : "-" + bg_section.parent().offset().top + "px"
					});
				}
				bg_section.addClass( 'height_assigned' );
			}
			else{
				if ( consider_top_panel ){
					bg_section.css({
						'height' : bg_section.parent().outerHeight() + 200 + bg_section.parent().offset().top + top_panel.outerHeight() + "px",
						'margin-top' : "-" + ( bg_section.parent().offset().top + top_panel.outerHeight() ) + "px"
					});
				}
				else{
					bg_section.css({
						'height' : bg_section.parent().outerHeight() + 200 + bg_section.parent().offset().top + "px",
						'margin-top' : "-" + bg_section.parent().offset().top + "px"
					});
				}
				bg_section.addClass( 'height_assigned' );
			}
		}
}

function cws_header_parallax_init (){
	var scenes = jQuery( ".cws_parallax_section, .cws_parallax_scene" );
	if (typeof Parallax === 'function') {
	scenes.each( function (){
		var scene = this;
		var prlx_scene = new Parallax ( scene );
	});
}
}

// Title image with parallax effect
function cws_scroll_parallax_init (){
	var scroll = 0;
	var window_width = jQuery(window).width();
	var background_size_width;

	jQuery(window).scroll(function() {
		scroll = jQuery(window).scrollTop();
		window_width = jQuery(window).width();
	});


	if(jQuery('.title.has_fixed_background').length){

		var background_size_width = parseInt(jQuery('.title.has_fixed_background').css('background-size').match(/\d+/));
		var title_holder_height = jQuery('.title.has_fixed_background').height();

		if (jQuery('.bg_page_header').hasClass('hide_header')){
			var top = jQuery('.bg_page_header').data('top');
			var bottom = jQuery('.bg_page_header').data('bottom');
			title_holder_height = top+bottom+88;
		}

		var title_rate = (title_holder_height / 10000) * 7;
		var title_distance = scroll - jQuery('.title.has_fixed_background').offset().top;
		var title_bpos = -(title_distance * title_rate);
		jQuery('.title.has_fixed_background').css({'background-position': 'center 0px' });
		if(jQuery('.title.has_fixed_background').hasClass('zoom_out')){
			jQuery('.title.has_fixed_background').css({'background-size': background_size_width-scroll + 'px auto'});
		}
	}

	jQuery(window).on('scroll', function() {

		if(jQuery('.title.has_fixed_background').length){
			var title_distance = scroll - jQuery('.title.has_fixed_background').offset().top;
			var title_bpos = -(title_distance * title_rate);
			jQuery('.title.has_fixed_background').css({'background-position': 'center ' + title_bpos + 'px' });
			if(jQuery('.title.has_fixed_background').hasClass('zoom_out') && (background_size_width-scroll > window_width)){
				jQuery('.title.has_fixed_background').css({'background-size': background_size_width-scroll + 'px auto'});
			}
		}
	});

}

function cws_carousels_init_waiter ( els, callback ){
	for ( var i = 0; i < els.length; i++ ){
		if ( jQuery( els[i] ).hasClass( 'owl-carousel' ) ){
			els.splice( i, 1 );
		}
	}
	if ( els.length ){
		setTimeout( function (){
			cws_carousels_init_waiter ( els, callback );
		}, 10 );
	}
	else{
		callback ();
		return true;
	}
}

function cws_wait_for_header_bg_height_assigned ( callback ){
	var header_bg_sections = jQuery( '.header_bg_img, .cws_parallax_scene_container' );
	if ( callback == undefined || typeof callback != 'function' ) return;
	cws_header_bg_height_assigned_waiter ( header_bg_sections, callback );
}

function cws_header_bg_height_assigned_waiter ( els, callback ){
	var i;
	for ( i = 0; i < els.length; i++ ){
		if ( jQuery( els[i] ).hasClass( 'height_assigned' ) ){
			els.splice( i, 1 );
		}
	}
	if ( els.length ){
		setTimeout( function (){
			cws_header_bg_height_assigned_waiter ( els, callback );
		}, 10 );
	}
	else{
		callback ();
		return true;
	}
}

/* \header parallax */

/* full screen video */

function cws_page_header_video_init (){
	cws_set_header_video_wrapper_height();
	window.addEventListener( 'resize', cws_set_header_video_wrapper_height, false )
}

function cws_set_header_video_wrapper_height (){
	var containers = document.getElementsByClassName( 'page_header_video_wrapper' );
	for ( var i=0; i<containers.length; i++ ){
		cws_set_window_height( containers[i] );
	}
}

function scroll_down_init (){
	jQuery( ".fs_video_slider" ).on( "click", ".scroll_down", function ( e ){
		var anchor, matches, id, el, el_offset;
		e.preventDefault();
		anchor = jQuery( this ).attr( "href" );
		matches = /#(\w+)/.exec( anchor );
		if ( matches == null ) return;
		id = matches[1];
		el = document.getElementById( id );
		if ( el == null ) return;
		el_offset = jQuery( el ).offset().top;
		jQuery( "html, body" ).animate({
			scrollTop : el_offset
		}, 300);
	});
}

/* \full screen video */

/* BLUR */

function cws_wait_for_image ( img, callback ){
	var complete = false;
	if ( img == undefined || img.complete == undefined || callback == undefined || typeof callback != 'function' ) return;
	if ( !img.complete ){
		setTimeout( function (){
			cws_wait_for_image ( img, callback );
		}, 10 );
	}
	else{
		callback ();
		return true;
	}
}

function cws_wait_for_canvas ( canvas, callback ){
	var drawn = false;
	if ( canvas == undefined || typeof canvas != 'object' || callback == undefined || typeof callback != 'function' ) return;
	if ( !jQuery( canvas ).hasClass( 'drawn' ) ){
		setTimeout( function (){
			cws_wait_for_canvas ( canvas, callback );
		}, 10);
	}
	else{
		callback ();
		return true;
	}
}

/* \BLUR */

/* SCROLL TO TOP */
function scroll_top_vars_init (){
	window.scroll_top = {
		el : jQuery( "#scroll_to_top" ),
		anim_in_class : "fadeIn",
		anim_out_class : "fadeOut"
	};
}
function scroll_top_init (){
	scroll_top_vars_init ();
	scroll_top_controller ();
	window.addEventListener( 'scroll', scroll_top_controller, false);
	window.scroll_top.el.on( 'click', function (){
		window.scroll_top.el.css({
			"pointer-events" : "none"
		});
		jQuery( "html, body" ).animate( {scrollTop : 0}, animation_curve_speed, animation_curve_scrolltop, function (){
			window.scroll_top.el.addClass( window.scroll_top.anim_out_class );
		});
	});
}
function scroll_top_controller (){
	var scroll_pos = window.pageYOffset;
	if ( window.scroll_top == undefined ) return;
	if ( scroll_pos < window.innerHeight && window.scroll_top.el.hasClass( window.scroll_top.anim_in_class ) ){
		window.scroll_top.el.css({
			"pointer-events" : "none"
		});
		window.scroll_top.el.removeClass( window.scroll_top.anim_in_class );
		window.scroll_top.el.addClass( window.scroll_top.anim_out_class );
	}
	else if( scroll_pos >= window.innerHeight && !window.scroll_top.el.hasClass( window.scroll_top.anim_in_class ) ){
		window.scroll_top.el.css({
			"pointer-events" : "auto"
		});
		window.scroll_top.el.removeClass( window.scroll_top.anim_out_class );
		window.scroll_top.el.addClass( window.scroll_top.anim_in_class );
	}
}
/* \SCROLL TO TOP */

function cws_set_window_width ( el ){
	var window_w;
	if ( el != undefined ){
		window_w = document.body.clientWidth;
		el.style.width = window_w + 'px';
	}
}
function cws_set_window_height ( el ){
	var window_h;
	if ( el != undefined ){
		window_h = window.innerHeight;
		el.style.height = window_h + 'px';
	}
}

function cws_top_social_init (){
	if (jQuery("#top_social_links_wrapper").hasClass('toggle-on')) {
		var el = jQuery( "#top_social_links_wrapper" );
		var toggle_class = "expanded";
		var parent_toggle_class = "active_social";
		if ( !el.length ) return;
		el.on( 'click', function (){
			var el = jQuery( this ).children('.cws_social_links');
			if ( el.hasClass( toggle_class ) ){
				el.removeClass( toggle_class );
				setTimeout( function (){
					el.closest( "#site_top_panel" ).removeClass( parent_toggle_class );
				}, 300);
			}
			else{
				el.addClass( toggle_class );
				el.closest( "#site_top_panel" ).addClass( parent_toggle_class );
			}
		});
	};
}

function single_sticky_content() {
	var item = jQuery(".cws_portfolio_single_content.sticky_cont");
	var item_p = item.parent();
	if(typeof item_p.theiaStickySidebar != 'undefined'){
		item_p.theiaStickySidebar({
			additionalMarginTop: 80,
			additionalMarginBottom: 30
		});
	}

}

var func_section = '.cws_vc_shortcode_grid.layout-1';
function cws_full_width_row(func_section){
	var section = jQuery(section);
    var $elements = jQuery(section).find('[data-cws-full-width="true"]');
    $elements.after('<div class="cws_row-full-width"></div>');
    jQuery.each($elements, function(key, item) {
        var $el = jQuery(this);
        var test = $el.attr("data-cws-full-width-init");
        $el.addClass("vc_hidden");
        var $el_full = $el.next(".cws_row-full-width");
        if ($el_full.length || ($el_full = $el.parent().next(".cws_row-full-width")),
        $el_full.length) {
            var el_margin_left = parseInt($el.css("margin-left"), 10)
              , el_margin_right = parseInt($el.css("margin-right"), 10)
              , offset = 0 - $el_full.offset().left - el_margin_left
              , width = jQuery(window).width()
              , cws_styles = ''
              , top = $el.css('top');

            cws_styles += "position: absolute;";
            cws_styles += "left: "+offset+"px !important;";
            cws_styles += "box-sizing: border-box;";
            cws_styles += "width: "+width+ "px;";
            cws_styles += "top: "+top+ ";";

            if (!$el.data("vcStretchContent")) {
                var padding = -1 * offset;
                0 > padding && (padding = 0);
                var paddingRight = width - padding - $el_full.width() + el_margin_left + el_margin_right;
                0 > paddingRight && (paddingRight = 0);
                cws_styles += "padding-left:"+ padding + "px;";
                cws_styles += "padding-right:"+ paddingRight + "px;";
            }

            $el.css("cssText", cws_styles);

            $el.attr("data-cws-full-width-init", "true"),
            $el.removeClass("vc_hidden");
        }
    });
}

jQuery(window).on('resize', function() {
	 cws_full_width_row();
});

function cws_fs_video_bg_init (){
	var slider_wrappers, header_height_is_set;
	header_height_is_set = document.getElementsByClassName( 'header_video_fs_view' );


	if ( !header_height_is_set.length) return;
		cws_fs_video_slider_controller( header_height_is_set[0] );
	window.addEventListener( 'resize', function (){
		cws_fs_video_slider_controller( header_height_is_set[0] );
	});
}
function cws_fs_video_slider_controller ( el ){
	cws_set_window_width( el );
	cws_set_window_height( el );
}

function cws_slider_video_height (element){
	var height_coef = element.attr('data-wrapper-height')
	if (height_coef) {
		if (window.innerWidth<960) {
			element.height(window.innerWidth/height_coef)
		}else{
			element.height(960/height_coef)
		}
	}
}

/* SLIDER SCROLL CONTROLLER */

function cws_revslider_pause_init (){
	var slider_els, slider_el, slider_id, id_parts, revapi_ind, revapi_id, i;
	var slider_els = document.getElementsByClassName( "rev_slider" );
	window.cws_revsliders = {};
	if ( !slider_els.length ) return;
	for ( i = 0; i < slider_els.length; i++ ){
		slider_el = slider_els[i];
		slider_id = slider_el.id;
		id_parts = /rev_slider_(\d+)(_\d+)?/.exec( slider_id );
		if ( id_parts == null ) continue;
		if ( id_parts[1] == undefined ) continue;
		revapi_ind = id_parts[1];
		revapi_id = "revapi" + revapi_ind;
		window.cws_revsliders[slider_id] = {
			'el' : slider_el,
			'api_id' : revapi_id,
			'stopped' : false
		}
		window[revapi_id].on( 'bind', 'revolution.slide.onloaded', function (){
			cws_revslider_scroll_controller ( slider_id );
		});
		window.addEventListener( 'scroll', function (){
			cws_revslider_scroll_controller ( slider_id );
		});
	}
}
function cws_revslider_scroll_controller ( slider_id ){
	var slider_obj, is_visible;
	if ( slider_id == undefined ) return;
	slider_obj = window.cws_revsliders[slider_id];
	is_visible = jQuery( slider_obj.el ).is_visible();
	if ( is_visible && slider_obj.stopped ){
		window[slider_obj.api_id].revresume();
		slider_obj.stopped = false;
	}
	else if ( !is_visible && !slider_obj.stopped ){
		window[slider_obj.api_id].revpause();
		slider_obj.stopped = true;
	}
}

/* \SLIDER SCROLL CONTROLLER */

/* CUSTOM HEADER SPASINGS RESPONSIVE */

function cws_responsive_custom_header_paddings_init (){
	cws_responsive_custom_header_paddings ();
	window.addEventListener( "resize", cws_responsive_custom_header_paddings, false );
}

function cws_responsive_custom_header_paddings (){
	var sections, section, i, initial_viewport, current_viewport, viewport_coef;
	var sections = document.getElementsByClassName( "page_title customized" );
	if ( !sections.length ) return;
	initial_viewport = 1920;
	current_viewport = window.innerWidth;
	viewport_coef = current_viewport / initial_viewport;
	for ( i = 0; i < sections.length; i++  ){
		section = sections[i];
		cws_responsive_custom_header_paddings_controller ( section, viewport_coef );
	}
}

function cws_responsive_custom_header_paddings_controller ( section, coef ){
	var section_cont, section_atts, matches, attr, prop, init_val, proc_val, i;
	if ( section == undefined || coef == undefined ) return;
	section_cont = jQuery( ".container", section );
	if ( !section_cont.length ) return;
	if ( section == undefined || !section.hasAttributes() || section.attributes == undefined ) return;
	section_atts = section.attributes;
	for ( i = 0; i < section_atts.length; i++ ){
		attr = section_atts[i];
		matches = /^data-init-(padding-\w+)$/.exec( attr.name );
		if ( matches == null ) continue;
		prop = matches[1];
		init_val = attr.value;
		proc_val = Math.round( init_val * coef );
		section_cont.css( prop, proc_val + "px" );
	}
}

/* \CUSTOM HEADER SPASINGS RESPONSIVE */

/* TOP PANEL MOBILE */

function cws_top_panel_mobile_init (){
	top_panel_curtain_init ();
	cws_top_panel_mobile_controller ();
	window.addEventListener( "resize", cws_top_panel_mobile_controller, false );
}

function cws_top_panel_mobile_controller (){
	var top_panel, curtain, _is_mobile, mobile_init, is_curtain_hidden, hidden_class;
	hidden_class = "hidden";
	top_panel = jQuery( "#site_top_panel" );
	curtain = jQuery( "#top_panel_curtain" );

	if ( !top_panel.length || !curtain.length ) return;
	_is_mobile = is_mobile();
	mobile_init = top_panel.hasClass( "mobile" );
	if ( _is_mobile ){

		if ( mobile_init ){
			is_curtain_hidden = curtain.hasClass( hidden_class );
			if ( is_curtain_hidden ){
				top_panel.css({
					"margin-top" : "-" + top_panel.outerHeight() + "px"
				})
			}
		}
		else{
			top_panel.addClass( "mobile" );
			cws_wait_for_header_bg_height_assigned( function (){
				pick_up_curtain ();
			});
		}
	}
	else if ( !_is_mobile && mobile_init ){
		if ( mobile_init ){
			top_panel.removeClass( "mobile" );
			put_down_curtain ();
		}
	}
	else{
	}
}

function top_panel_curtain_init (){
	var curtain = document.getElementById( "top_panel_curtain" );
	if ( curtain != null ){
		curtain.addEventListener( "click", top_panel_curtain_click_controller, false );
	}
}
function top_panel_curtain_click_controller (){
	var curtain_obj, hidden_class;
	curtain_obj = jQuery( "#top_panel_curtain" );
	hidden_class = "hidden";
	if ( curtain_obj.hasClass( hidden_class ) ){
		put_down_curtain ( true );
	}
	else{
		pick_up_curtain ( true );
	}
}
function pick_up_curtain ( animated ){
	var curtain_obj, top_panel, top_panel_obj, top_panel_height, anim_speed, hidden_class;
	if ( animated == undefined ) animated = false;
	curtain_obj = jQuery( "#top_panel_curtain" );
	top_panel = document.getElementById( "site_top_panel" );
	top_panel_obj = jQuery( top_panel );
	top_panel_height = top_panel.offsetHeight;
	anim_speed = 300;
	hidden_class = "hidden";
	if ( animated ){
		top_panel_obj.stop().animate({
			"margin-top" : "-" + top_panel_height + "px"
		}, anim_speed, function (){
			curtain_obj.addClass( hidden_class );
		});
	}
	else{
		top_panel.style.marginTop = "-" + top_panel_height + "px";
		curtain_obj.addClass( hidden_class );
	}
}
function put_down_curtain ( animated ){
	var curtain_obj, top_panel, top_panel_obj, top_panel_height, anim_speed, hidden_class;
	if ( animated == undefined ) animated = false;
	curtain_obj = jQuery( "#top_panel_curtain" );
	top_panel = document.getElementById( "site_top_panel" );
	top_panel_obj = jQuery( top_panel );
	anim_speed = 300;
	hidden_class = "hidden";
	if ( animated ){
		top_panel_obj.stop().animate({
			"margin-top" : "0px"
		}, anim_speed, function (){
			curtain_obj.removeClass( hidden_class );
		});
	}
	else{
		top_panel.style.marginTop = "0px";
		curtain_obj.removeClass( hidden_class );
	}
}

/* \TOP PANEL MOBILE */

function cws_clone_obj ( src_obj ){
	var new_obj, keys, i, key, val;
	if ( src_obj == undefined || typeof src_obj != 'object' ) return false;
	new_obj = {};
	keys = Object.keys( src_obj );
	for ( i = 0; i < keys.length; i++ ){
		key = keys[i];
		val = src_obj[key];
		new_obj[key] = val;
	}
	return new_obj;
}

//Detect browser
function cws_detect_browser() {
    if((navigator.userAgent.indexOf("Opera") || navigator.userAgent.indexOf('OPR')) != -1 )
    {
        return 'Opera';
    }
    else if(navigator.userAgent.indexOf("Chrome") != -1 )
    {
        return 'Chrome';
    }
    else if(navigator.userAgent.indexOf("Safari") != -1)
    {
        return 'Safari';
    }
    else if(navigator.userAgent.indexOf("Firefox") != -1 )
    {
        return 'Firefox';
    }
    else if((navigator.userAgent.indexOf("MSIE") != -1 ) || (!!document.documentMode == true )) //IF IE > 10
    {
    	return 'IE';
    }
    else
    {
       return 'unknown';
    }
}

// Fix styles
function cws_fix_styles_init(){
	//Full width map fix
	jQuery('#wpgmza_map').closest('.cws-column').addClass('full_width_map');

	jQuery( window ).resize(function() {
		cws_sticky_footer_init(false);
	});

	var resizeTimer;
	jQuery('footer.footer_fixed').on('click', 'ul.menu li.has_children span', function(event) {
		console.log(jQuery(this));
		clearTimeout(resizeTimer);
		resizeTimer = setTimeout(function() {
			cws_sticky_footer_init(true);
		}, 500);
	});

	var browser = cws_detect_browser();
	//Fixed IE styles
	if (browser == 'IE') jQuery('body').addClass('ie11');

	jQuery('.copyrights_container  .lang_bar .lang_sel_list_vertical').parents('.copyrights_panel_wrapper').addClass('lang_vertical');

	jQuery('#reply-title, .widget-title, .cws_blog_header .ce_title, .cws_portfolio .cws_portfolio_header .ce_title, .cws_testimonials_header .ce_title').each(function(){
		jQuery(this).addClass('ce_title und-title themecolor');
	});

	jQuery('.cws_ourteam .item .ourteam_item_wrapper .grayscale').closest('.item').addClass('shadow');

	jQuery('.cws-widget ul li a.rsswidget').parent('li').addClass('rss-block');

	//jQuery('.cws-widget ul li.cat-item').parent('ul:not(.children)').addClass('category_list');

	jQuery('ul.hexagon_style').find('li').prepend("<span class='list-hexagon'><svg class='svg-hexagon' xmlns='http://www.w3.org/2000/svg'><g><path stroke-width='1' stroke-opacity='null' stroke='red' fill-opacity='0' fill='#fff' d='m8.62519,0.63895l6.62517,4.07292l0,7.32256l-6.62517,4.06325l-6.62517,-4.06325c0,-3.05108 0,-4.37804 0,-7.32256l6.62517,-4.07292z'></path></g></svg></span>");
	jQuery('ul.triangle_style').find('li').prepend("<span class='list-triangle'><svg class='svg-triangle' xmlns='http://www.w3.org/2000/svg'><g><path transform='rotate(90 13.262424468994142,14.855527877807617)' stroke-width='1' stroke-opacity='null' stroke='red' fill-opacity='0' fill='#fff' d='m7.35502,19.72045l5.90741,-9.72985l5.90741,9.72985l-11.81482,0z'></path></g></svg></span>");
}

function cws_tooltip_init(){
	jQuery('.tip').tipr();
}

function cws_mobile_menu_slide_init(){
	jQuery(document).on('click', '.mobile_menu_switcher', function(event) {

		var menu = jQuery(this).data('menu');
		var parent = jQuery('.'+menu);

		jQuery(this).toggleClass('active');

		var container = parent.find('.mobile_menu_wrapper .mobile_menu_container');
		container.slideToggle(500);
		container.toggleClass('active_mobile');
	});

}

// function cws_hamburger_menu_init(){

// 	jQuery('.mobile_menu_hamburger').on('click', function() {
// 		jQuery(this).toogleClass('is-active');
// 		setTimeout(function() {
// 			jQuery(this).closest('.menu_box').find('.mobile_menu_wrapper .mobile_menu_container').slideToggle(400);
// 		}, 10000);
// 	});


//   // var toggles = document.querySelectorAll(".mobile_menu_hamburger:not(.deactive)");

//   // for (var i = toggles.length - 1; i >= 0; i--) {
//   //   var toggle = toggles[i];
//   //   toggleHandler(toggle);
//   // };

//   // function toggleHandler(toggle) {
//   //   toggle.addEventListener( "click", function(e) {
//   //     	e.preventDefault();
//   //     	(this.classList.contains("is-active") === true) ? this.classList.remove("is-active") : this.classList.add("is-active");
//   //   });
//   // }
// }

function cws_fix_vc_full_width_row(){
    if( jQuery('html').attr('dir') == 'rtl' ){
        var $elements = jQuery('.cws_stretch_row[data-vc-full-width="true"]');
        jQuery($elements).each(function( i, el ){
        	jQuery(el).css('right', '-'+jQuery(el).css('left')).css('left', '');
        });
    }
}

// Fixes rows in RTL
jQuery(document).on('vc-full-width-row', function () {
    cws_fix_vc_full_width_row();
});

// Run one time because it was not firing in Mac/Firefox and Windows/Edge some times
cws_fix_vc_full_width_row();


function cws_go_to_page_init(){
	var hashTagActive = false;

	jQuery('.menu-item a').on( 'click',function(event) {
		if(!jQuery(this).hasClass("fancy") && jQuery(this).attr("href") != "#" && jQuery(this).attr("target") != "_blank"){
		    var anchor = jQuery(this).attr("href");
		    var link = anchor.replace('/#','#')
			var re = new RegExp( "^#.*$" );
			var matches = re.exec( link );

			if ((matches == null && jQuery(this).attr("href").indexOf("#") != -1) || (!!navigator.userAgent.match(/Version\/[\d\.]+.*Safari/))){
				return true;
			} else {
				event.preventDefault();
			}

		    if (hashTagActive) return;
		    hashTagActive = true;

		    if (jQuery(this).attr("href").indexOf("#") != -1 && matches !== null){

		        if (jQuery(link).length){
		                jQuery('html, body').animate({
		                scrollTop: jQuery(link).offset().top
		            }, animation_curve_speed, animation_curve_menu, function () {
		                hashTagActive = false;
		            });
		        }
		    } else {
		        jQuery('body').fadeOut(1000, newpage(anchor));
		    }

		}
	});

   function newpage(e) {
     window.location = e;
   }
}

function cws_mobile_menu_items_toggle(){

	var windowWidth = jQuery(window).width();
	if( (windowWidth > 767 && windowWidth < 1200) || (windowWidth < 768) ){

		jQuery('.mobile_menu .menu-item.menu-item-has-children .menu_row, .mobile_menu .menu-item.menu-item-object-megamenu_item .menu_row').off();

		jQuery('.mobile_menu .menu-item.menu-item-has-children .menu_row, .mobile_menu .menu-item.menu-item-object-megamenu_item .menu_row').on('click', function( e ) {
			var thisIs = jQuery(this),
				thisParent = jQuery(this).closest('.menu-item'),
				thisParents = jQuery(this).parents('.menu-item'),
				thisSubMenu = jQuery(this).closest('.menu-item').children('.sub-menu'),
				thisParentParent = jQuery(this).closest('.menu-item').parents('.menu-item'),
				thisParentSubMenu = jQuery(this).closest('.menu-item').parents('.menu-item').children('.sub-menu');

			jQuery('.mobile_menu .menu-item').not(thisParent).not(thisParentParent).removeClass('active-li');
			thisParent.toggleClass('active-li');

			thisSubMenu.slideToggle(400);
			jQuery('.mobile_menu .menu-item:not(.active-li) .sub-menu').not(thisSubMenu).not(thisParentSubMenu).slideUp(400);
		});

		jQuery('.mobile_menu .menu-item .menu_row > a').off();

		jQuery('.mobile_menu .menu-item .menu_row > a').on('click', function( e ) {
			if (jQuery(this).attr("href").indexOf("#") != -1 && matches !== null){

			    if (jQuery(link).length){
			            jQuery('html, body').animate({
			            scrollTop: jQuery(link).offset().top
			        }, animation_curve_speed, animation_curve_menu, function () {
			            hashTagActive = false;
			        });              
			    }
			} else {
			    jQuery('body').fadeOut(1000, newpage(anchor)); 
			}
		});

	}

}

function cws_sticky_sidebars_init(){
	//Check if function exist
	if (typeof jQuery.fn.theiaStickySidebar === 'function') {
	if (sticky_sidebars == 1 && !is_mobile() ){
		jQuery('aside.sb_left, aside.sb_right').theiaStickySidebar({
		      additionalMarginTop: 60,
		      additionalMarginBottom: 60
		});
	}
}
}

function cws_side_panel_init () {
	if (jQuery('.side_panel').hasClass('slide')){
		if (jQuery('.side_panel').hasClass('left')){
			jQuery("body").addClass('slide_side_panel').addClass('left_slide');
		} else if (jQuery('.side_panel').hasClass('right')){
			jQuery("body").addClass('slide_side_panel').addClass('right_slide');
		}
	} else if (jQuery('.side_panel').hasClass('pull')){
		if (jQuery('.side_panel').hasClass('left')){
			jQuery("body").addClass('slide_side_panel').addClass('left_pull');
		} else if (jQuery('.side_panel').hasClass('right')){
			jQuery("body").addClass('slide_side_panel').addClass('right_pull');
		}
	}

	jQuery(".side_panel_icon").on( 'click', function(){
		jQuery("body").toggleClass("side_panel_show");
		return false;
	});

	jQuery(".side_panel_overlay, .close_side_panel").on( 'click', function(){
		jQuery("body").removeClass("side_panel_show");
	});
}

function cws_sticky_footer_init(scroll){
	var fixed = Boolean(jQuery('footer.footer_fixed').length);
	var el_offset = jQuery('#scroll_to_top').offset().top;
	var footer_height = jQuery('footer').innerHeight();
	var win_height = jQuery(window).height();

	function enable_sticky_footer(){
		jQuery('footer.footer_fixed, .copyrights_area.footer_fixed').addClass('fixed');
		jQuery('#main').css({
			'background-color': '#ffffff',
			'margin-bottom': footer_height
		});
	}

	function disable_sticky_footer(){
		jQuery('footer.footer_fixed, .copyrights_area.footer_fixed').removeClass('fixed');
		jQuery('#main').css({
			'background-color': 'transparent',
			'margin-bottom': '0px'
		});
	}

	if (fixed && !is_mobile() && !is_mobile_device() && !has_mobile_class()) {
		if (Boolean(jQuery('.page_boxed').length)){
			var content_width = jQuery('.page_content').width();
			jQuery('footer, .copyrights_area').width(content_width);
		}

		if (footer_height > win_height){
			jQuery('footer.footer_fixed, .copyrights_area.footer_fixed').addClass('large_sidebar');

			//If sidebar hight then window
			if (Boolean(jQuery('.sticky_header').length)){
				var sticky_header_height =  jQuery('.sticky_header').height()+50;
				jQuery('footer').css('padding-top',sticky_header_height+'px');
			}

			jQuery(window).scroll(function(event){
				if (fixed && !is_mobile() && !is_mobile_device() && !has_mobile_class()){
					var st = jQuery(this).scrollTop();

					if (st > el_offset){
						//From line to BOTTOM
						if (Boolean(jQuery('.page_boxed').length)){
							jQuery('footer.footer_fixed, .copyrights_area.footer_fixed').addClass('no_shadow');
						}

						disable_sticky_footer();
					} else {
						//From line to TOP
						if (Boolean(jQuery('.page_boxed').length)){
							jQuery('footer.footer_fixed, .copyrights_area.footer_fixed').removeClass('no_shadow');
						}

						enable_sticky_footer();
					}
				} else {
					disable_sticky_footer();
				}
			});
		} else {
			enable_sticky_footer();
		}
	if (scroll) jQuery( "html, body" ).animate( {scrollTop : jQuery( "html").height()}, 'slow');
	} else {
		disable_sticky_footer();
	}
}

function cws_menu_bar () {
  jQuery(".menu-bar").on( 'click', function(){
    jQuery(".main-menu , .menu-bar").toggleClass("items-visible");
    return false;
  })
}

function responsive_table(){
	var headertext = [];
	var headers = document.querySelectorAll("thead");
	var tablebody = document.querySelectorAll("tbody");

	if(headers.length == 0){
		headers = document.querySelectorAll("tbody");
	}

	for(var i = 0; i < headers.length; i++) {
		headertext[i]=[];
		headers[i].classList.add("responsive_table");
		if(typeof headers[i].rows[0] != 'undefined' && typeof headers[i].rows[0].cells[0] != 'undefined'){
			for (var j = 0, headrow; headrow = headers[i].rows[0].cells[j]; j++) {
			  var current = headrow;
			  headertext[i].push(current.textContent.replace(/\r?\n|\r/,""));
			}
		}
	}



	if (headers.length > 0) {
		for (var h = 0, tbody; tbody = tablebody[h]; h++) {
			for (var i = 0, row; row = tbody.rows[i]; i++) {
			  for (var j = 0, col; col = row.cells[j]; j++) {
			  	if(headertext[h]){
			  		col.setAttribute("data-th", headertext[h][j]);
			  	}

			  }
			}
		}
	}
}

function cws_blog_full_width_layout() {
	function cws_blog_full_width_controller(){
		var div = jQuery('.posts_grid.posts_grid_fw_img');
		jQuery(div).each(function(){
			div = jQuery(this);
			if (!div.hasClass('posts_grid_carousel')) {
				var doc_w = jQuery(window).width();
				var div_w = jQuery('.page_content main .grid_row').width();
				var marg = ( doc_w - div_w ) / 2;

				div.each(function() {
					jQuery(this).css({
						'margin-left' : '-'+(marg-15)+'px',
						'margin-right' : '-'+(marg-15)+'px'
					})
				});
				div.find('article.posts_grid_post').each(function() {
					jQuery(this).css({
						'padding-left' : marg+'px',
						'padding-right' : marg+'px'
					})
				})
			}
		});
	}
	cws_blog_full_width_controller();

	jQuery(window).resize( function(){
		cws_blog_full_width_controller();
		cws_mobile_menu_items_toggle();
	});
}

/*******************************************************
************** CWS Self Vimeo Background ***************
*******************************************************/
function vimeo_init() {
	var element;
	var vimeoId;
	var chek;
	jQuery(".cws_Vimeo_video_bg").each(function(){
		element = jQuery(this);
		var el_width;
		var el_height;
		vimeoId = jQuery(".cws_Vimeo_video_bg").attr('data-video-id');

		jQuery("#"+vimeoId).vimeo("play");
			jQuery("#"+vimeoId).vimeo("setVolume", 0);
			jQuery("#"+vimeoId).vimeo("setLoop", true);
			el_width = element[0].offsetWidth;

		if (element[0].offsetHeight<((el_width/16)*9)) {
			el_height = (element[0].offsetWidth/16)*9;
		}else{
			el_height = element[0].offsetHeight;
			el_width = (el_height/9)*16;
		}
		jQuery("#"+vimeoId)[0].style.width = el_width+'px';
		jQuery("#"+vimeoId)[0].style.height = el_height+'px';
		setInterval(check_on_page, 1000);
	})

	function check_on_page (){
		if (document.getElementsByTagName('html')[0].hasAttribute('data-focus-chek')) {
			if (chek < 1) {
				chek++
				jQuery("#"+vimeoId).vimeo("play");
			}else{
				chek = 1
			}
		}else{
			jQuery("#"+vimeoId).vimeo("pause");
			chek = 0;
		}
	}
}

function cws_self_hosted_video (){
	var element,el_width,video
	jQuery('.cws_self_hosted_video').each(function(){
		element = jQuery(this)
		video = element.find('video')
		el_width = element[0].offsetWidth;

		if (element[0].offsetHeight<((el_width/16)*9)) {
			el_height = (element[0].offsetWidth/16)*9;
		}else{
			el_height = element[0].offsetHeight;
			el_width = (el_height/9)*16;
		}
		video[0].style.width = el_width+'px';
		video[0].style.height = el_height+'px';
	})
}

/*******************************************************
************** \CWS Self Vimeo Background ***************
*******************************************************/

/*******************************************************
************** YouTube video Background ****************
*******************************************************/

var i,
	currTime,
	duration,
	video_source,
	video_id,
	el_height,
	element,
	el_width,
	el_quality,
	player;

	element = document.getElementsByClassName("cws_Yt_video_bg");

function onYouTubePlayerAPIReady() {
	if(typeof element === 'undefined')
		return;
	for (var i = element.length - 1; i >= 0; i--) {
		video_source = element[i].getAttribute("data-video-source");
		video_id = element[i].getAttribute("data-video-id");
		el_width = element[i].offsetWidth;



		if (element[i].offsetHeight<((el_width/16)*9)) {
			el_height = (element[i].offsetWidth/16)*9;
		}else{
			el_height = element[i].offsetHeight;
			el_width = (el_height/9)*16;
		}
		if (el_width > 1920){
			el_quality = 'highres';
		}
		if (el_width < 1920){
			el_quality = 'hd1080';
		}
		if (el_width < 1280) {
			el_quality = 'hd720';
		}
		if (el_width < 853) {
			el_quality = 'large';
		}
		if (el_width < 640) {
			el_quality = 'medium';
		};
		rev (video_id,video_source,el_width,el_height);

	};
}
function rev (video_id,video_source,el_width,el_height){
	window.setTimeout(function() {
		if (!YT.loaded) {
			console.log('not loaded yet');
			window.setTimeout(arguments.callee, 50)
		} else {
			var curplayer = video_control(video_id,video_source,el_width,el_height);
		}
	}, 50);
}

var chek = 0;
var YouTube;

function video_control (uniqid,video_source,el_width,el_height) {
	var interval;

	player = new YT.Player(uniqid, {
			height: el_height,
			width: el_width,
			videoId: video_source,
			playerVars: {
				'autoplay' : 1,
				'rel' : 0,
				'showinfo' : 0,
				'showsearch' : 0,
				'controls' : 0,
				'loop' : 1,
				'enablejsapi' : 1,
				'theme' : 'dark',
				'modestbranding' : 0,
				'wmode' : 'transparent',
			},
			events: {
				'onReady': onPlayerReady,
				'onStateChange': onPlayerStateChange
			}
		}
	);
}

window.addEventListener('focus', function() {
	checkPlayer();
	return true;
});
function onPlayerReady(event){
	YouTube = event.target;
	YouTube.mute();
	YouTube.setPlaybackQuality(el_quality);
}
function onPlayerStateChange(event) {
	YouTube.playVideo();
}
function seekTo(event) {
	player.seekTo(0);
}
function checkPlayer() {
	if (undefined !== player && undefined !== player.getCurrentTime) {
		currTime = player.getCurrentTime(); //get video position
		duration = player.getDuration(); //get video duration
		(currTime > (duration - 0.8)) ? seekTo(event) : '';
	};

}
function chek_on_page (){
	if (document.getElementsByTagName('html')[0].hasAttribute('data-focus-chek')) {
		if (chek < 1 && undefined !== player.playVideo) {
			chek++
			player.playVideo();
		}else{
			chek = 1
		}
	}else if (undefined !== player.pauseVideo) {
		player.pauseVideo();
		chek = 0;
	}
}

function Video_resizer (){
	if (element.length) {
		for (var i = element.length - 1; i >= 0; i--) {
			video_source = element[i].getAttribute("data-video-source");
			video_id = element[i].getAttribute("data-video-id");
			el_width = element[i].offsetWidth;


			if (element[i].offsetHeight<((el_width/16)*9)) {
				el_height = (element[i].offsetWidth/16)*9;
			}else{
				console.log(element[i].offsetHeight);
				el_height = element[i].offsetHeight;
				el_width = (el_height/9)*16;
			}
			var el_iframe = document.getElementById(element[i].getAttribute("data-video-id"));
			el_iframe.style.width = el_width+'px';
			el_iframe.style.height = el_height+'px';
		};
	};
}
/*******************************************************
************** \YouTube video Background ****************
*******************************************************/


/*******************************************************
************** RETINA ****************
*******************************************************/
var retina = {};
retina.root = (typeof exports === 'undefined' ? window : exports);
retina.config = {
        // An option to choose a suffix for 2x images
        retinaImageSuffix : '@2x',

        // Ensure Content-Type is an image before trying to load @2x image
        // https://github.com/imulus/retinajs/pull/45)
        check_mime_type: true,

        // Resize high-resolution images to original image's pixel dimensions
        // https://github.com/imulus/retinajs/issues/8
        force_original_dimensions: true
    };
retina.config.retinaImagePattern = new RegExp( retina.config.retinaImageSuffix + "." );

(function() {
    function Retina() {}

    window.retina.root.Retina = Retina;

    Retina.configure = function(options) {
        if (options === null) {
            options = {};
        }

        for (var prop in options) {
            if (options.hasOwnProperty(prop)) {
                window.retina.config[prop] = options[prop];
            }
        }
    };

    Retina.init = function(context) {
        if (context === null) {
            context = window.retina.root;
        }

        var existing_onload = context.onload || function(){};

        context.onload = function() {
            var images = document.getElementsByTagName('img'), retinaImages = [], i, image;
            for (i = 0; i < images.length; i += 1) {
                image = images[i];
                if ( !retina.config.retinaImagePattern.test(image.getAttribute("src")) ){
                    if (!!!image.getAttributeNode('data-no-retina')) {
                        retinaImages.push(new RetinaImage(image));
                    }
                }
            }
            existing_onload();
        };
    };

    Retina.isRetina = function(){
        var mediaQuery = '(-webkit-min-device-pixel-ratio: 1.5), (min--moz-device-pixel-ratio: 1.5), (-o-min-device-pixel-ratio: 3/2), (min-resolution: 1.5dppx)';

        if (window.retina.root.devicePixelRatio > 1) {
            return true;
        }

        if (window.retina.root.matchMedia && window.retina.root.matchMedia(mediaQuery).matches) {
            return true;
        }

        return false;
    };


    var regexMatch = /\.\w+$/;
    function suffixReplace (match) {
        return window.retina.config.retinaImageSuffix + match;
    }

    function RetinaImagePath(path, at_2x_path) {
        this.path = path || '';
        if (typeof at_2x_path !== 'undefined' && at_2x_path !== null) {
            this.at_2x_path = at_2x_path;
            this.perform_check = false;
        } else {
            if (undefined !== document.createElement) {
                var locationObject = document.createElement('a');
                locationObject.href = this.path;
                locationObject.pathname = locationObject.pathname.replace(regexMatch, suffixReplace);
                this.at_2x_path = locationObject.href;
            } else {
                var parts = this.path.split('?');
                parts[0] = parts[0].replace(regexMatch, suffixReplace);
                this.at_2x_path = parts.join('?');
            }
            this.perform_check = true;
        }
    }

    window.retina.root.RetinaImagePath = RetinaImagePath;

    RetinaImagePath.confirmed_paths = [];

    RetinaImagePath.prototype.is_external = function() {
        return !!(this.path.match(/^https?\:/i) && !this.path.match('//' + document.domain) );
    };

    RetinaImagePath.prototype.check_2x_variant = function(callback) {
        var http, that = this;
        if (this.is_external()) {
            return callback(false);
        } else if (!this.perform_check && typeof this.at_2x_path !== 'undefined' && this.at_2x_path !== null) {
            return callback(true);
        } else if (this.at_2x_path in RetinaImagePath.confirmed_paths) {
            return callback(true);
        } else {
            return callback(false);
        }
    };


    function RetinaImage(el) {
        this.el = el;
        this.path = new RetinaImagePath(this.el.getAttribute('src'), this.el.getAttribute('data-at2x'));
        var that = this;
        this.path.check_2x_variant(function(hasVariant) {
            if (hasVariant) {
                that.swap();
            }
        });
    }

    window.retina.root.RetinaImage = RetinaImage;

    RetinaImage.prototype.swap = function(path) {
        if (typeof path === 'undefined') {
            path = this.path.at_2x_path;
        }

        var that = this;
        function load() {
            var width = that.el.offsetWidth;
            var height = that.el.offsetHeight;
            if ( !that.el.complete || !width || !height ) {
                setTimeout(load, 5);
            } else {
                if (window.retina.config.force_original_dimensions) {
                    that.el.setAttribute('width', width);
                    that.el.setAttribute('height', height);
                }

                that.el.setAttribute('src', path);
            }
        }
        load();
    };


    if (Retina.isRetina()) {
        Retina.init(window.retina.root);
    }
})();

/*******************************************************
************** \RETINA ****************
*******************************************************/

/*******************************************************
************** TIPR ****************
*******************************************************/
(function($){$.fn.tipr=function(options){var set=$.extend({'speed':200,'mode':'bottom'},options);return this.each(function(){var tipr_cont='.tipr_container_'+set.mode;$(this).hover( function()
{var d_m=set.mode;if($(this).attr('data-mode'))
{d_m=$(this).attr('data-mode')
tipr_cont='.tipr_container_'+d_m;}
var out='<div class="tipr_container_'+d_m+'"><div class="tipr_point_'+d_m+'"><div class="tipr_content">'+$(this).attr('data-tip')+'</div></div></div>';$(this).append(out);var w_t=$(tipr_cont).outerWidth();var w_e=$(this).width();var m_l=(w_e / 2)-(w_t / 2);$(tipr_cont).css('margin-left',m_l+'px');$(this).removeAttr('title alt');$(tipr_cont).fadeIn(set.speed);},function()
{$(tipr_cont).remove();});});};})(jQuery);
/*******************************************************
************** \TIPR ****************
*******************************************************/


/*******************************************************
************** TOOLTIPSTER ****************
*******************************************************/
(function(e, t, n) {
    function s(t, n) {
        this.bodyOverflowX;
        this.callbacks = {
            hide: [],
            show: []
        };
        this.checkInterval = null;
        this.Content;
        this.$el = e(t);
        this.$elProxy;
        this.elProxyPosition;
        this.enabled = true;
        this.options = e.extend({}, i, n);
        this.mouseIsOverProxy = false;
        this.namespace = "tooltipster-" + Math.round(Math.random() * 1e5);
        this.Status = "hidden";
        this.timerHide = null;
        this.timerShow = null;
        this.$tooltip;
        this.options.iconTheme = this.options.iconTheme.replace(".", "");
        this.options.theme = this.options.theme.replace(".", "");
        this._init()
    }
    function o(t, n) {
        var r = true;
        e.each(t, function(e, i) {
            if (typeof n[e] === "undefined" || t[e] !== n[e]) {
                r = false;
                return false
            }
        });
        return r
    }
    function f() {
        return !a && u
    }
    function l() {
        var e = n.body || n.documentElement,
            t = e.style,
            r = "transition";
        if (typeof t[r] == "string") {
            return true
        }
        v = ["Moz", "Webkit", "Khtml", "O", "ms"], r = r.charAt(0).toUpperCase() + r.substr(1);
        for (var i = 0; i < v.length; i++) {
            if (typeof t[v[i] + r] == "string") {
                return true
            }
        }
        return false
    }
    var r = "tooltipster",
        i = {
            animation: "fade",
            arrow: true,
            arrowColor: "",
            autoClose: true,
            content: null,
            contentAsHTML: false,
            contentCloning: true,
            debug: true,
            delay: 200,
            minWidth: 0,
            maxWidth: null,
            functionInit: function(e, t) {},
            functionBefore: function(e, t) {
                t()
            },
            functionReady: function(e, t) {},
            functionAfter: function(e) {},
            icon: "(?)",
            iconCloning: true,
            iconDesktop: false,
            iconTouch: false,
            iconTheme: "tooltipster-icon",
            interactive: false,
            interactiveTolerance: 350,
            multiple: false,
            offsetX: 0,
            offsetY: 0,
            onlyOne: false,
            position: "top",
            positionTracker: false,
            speed: 350,
            timer: 0,
            theme: "tooltipster-default",
            touchDevices: true,
            trigger: "hover",
            updateAnimation: true
        };
    s.prototype = {
        _init: function() {
            var t = this;
            if (n.querySelector) {
                if (t.options.content !== null) {
                    t._content_set(t.options.content)
                } else {
                    var r = t.$el.attr("title");
                    if (typeof r === "undefined") r = null;
                    t._content_set(r)
                }
                var i = t.options.functionInit.call(t.$el, t.$el, t.Content);
                if (typeof i !== "undefined") t._content_set(i);
                t.$el.removeAttr("title").addClass("tooltipstered");
                if (!u && t.options.iconDesktop || u && t.options.iconTouch) {
                    if (typeof t.options.icon === "string") {
                        t.$elProxy = e('<span class="' + t.options.iconTheme + '"></span>');
                        t.$elProxy.text(t.options.icon)
                    } else {
                        if (t.options.iconCloning) t.$elProxy = t.options.icon.clone(true);
                        else t.$elProxy = t.options.icon
                    }
                    t.$elProxy.insertAfter(t.$el)
                } else {
                    t.$elProxy = t.$el
                }
                if (t.options.trigger == "hover") {
                    t.$elProxy.on("mouseenter." + t.namespace, function() {
                        if (!f() || t.options.touchDevices) {
                            t.mouseIsOverProxy = true;
                            t._show()
                        }
                    }).on("mouseleave." + t.namespace, function() {
                        if (!f() || t.options.touchDevices) {
                            t.mouseIsOverProxy = false
                        }
                    });
                    if (u && t.options.touchDevices) {
                        t.$elProxy.on("touchstart." + t.namespace, function() {
                            t._showNow()
                        })
                    }
                } else if (t.options.trigger == "click") {
                    t.$elProxy.on("click." + t.namespace, function() {
                        if (!f() || t.options.touchDevices) {
                            t._show()
                        }
                    })
                }
            }
        },
        _show: function() {
            var e = this;
            if (e.Status != "shown" && e.Status != "appearing") {
                if (e.options.delay) {
                    e.timerShow = setTimeout(function() {
                        if (e.options.trigger == "click" || e.options.trigger == "hover" && e.mouseIsOverProxy) {
                            e._showNow()
                        }
                    }, e.options.delay)
                } else e._showNow()
            }
        },
        _showNow: function(n) {
            var r = this;
            r.options.functionBefore.call(r.$el, r.$el, function() {
                if (r.enabled && r.Content !== null) {
                    if (n) r.callbacks.show.push(n);
                    r.callbacks.hide = [];
                    clearTimeout(r.timerShow);
                    r.timerShow = null;
                    clearTimeout(r.timerHide);
                    r.timerHide = null;
                    if (r.options.onlyOne) {
                        e(".tooltipstered").not(r.$el).each(function(t, n) {
                            var r = e(n),
                                i = r.data("tooltipster-ns");
                            e.each(i, function(e, t) {
                                var n = r.data(t),
                                    i = n.status(),
                                    s = n.option("autoClose");
                                if (i !== "hidden" && i !== "disappearing" && s) {
                                    n.hide()
                                }
                            })
                        })
                    }
                    var i = function() {
                        r.Status = "shown";
                        e.each(r.callbacks.show, function(e, t) {
                            t.call(r.$el)
                        });
                        r.callbacks.show = []
                    };
                    if (r.Status !== "hidden") {
                        var s = 0;
                        if (r.Status === "disappearing") {
                            r.Status = "appearing";
                            if (l()) {
                                r.$tooltip.clearQueue().removeClass("tooltipster-dying").addClass("tooltipster-" + r.options.animation + "-show");
                                if (r.options.speed > 0) r.$tooltip.delay(r.options.speed);
                                r.$tooltip.queue(i)
                            } else {
                                r.$tooltip.stop().fadeIn(i)
                            }
                        } else if (r.Status === "shown") {
                            i()
                        }
                    } else {
                        r.Status = "appearing";
                        var s = r.options.speed;
                        r.bodyOverflowX = e("body").css("overflow-x");
                        e("body").css("overflow-x", "hidden");
                        var o = "tooltipster-" + r.options.animation,
                            a = "-webkit-transition-duration: " + r.options.speed + "ms; -webkit-animation-duration: " + r.options.speed + "ms; -moz-transition-duration: " + r.options.speed + "ms; -moz-animation-duration: " + r.options.speed + "ms; -o-transition-duration: " + r.options.speed + "ms; -o-animation-duration: " + r.options.speed + "ms; -ms-transition-duration: " + r.options.speed + "ms; -ms-animation-duration: " + r.options.speed + "ms; transition-duration: " + r.options.speed + "ms; animation-duration: " + r.options.speed + "ms;",
                            f = r.options.minWidth ? "min-width:" + Math.round(r.options.minWidth) + "px;" : "",
                            c = r.options.maxWidth ? "max-width:" + Math.round(r.options.maxWidth) + "px;" : "",
                            h = r.options.interactive ? "pointer-events: auto;" : "";
                        r.$tooltip = e('<div class="tooltipster-base ' + r.options.theme + '" style="' + f + " " + c + " " + h + " " + a + '"><div class="tooltipster-content"></div></div>');
                        if (l()) r.$tooltip.addClass(o);
                        r._content_insert();
                        r.$tooltip.appendTo("body");
                        r.reposition();
                        r.options.functionReady.call(r.$el, r.$el, r.$tooltip);
                        if (l()) {
                            r.$tooltip.addClass(o + "-show");
                            if (r.options.speed > 0) r.$tooltip.delay(r.options.speed);
                            r.$tooltip.queue(i)
                        } else {
                            r.$tooltip.css("display", "none").fadeIn(r.options.speed, i)
                        }
                        r._interval_set();
                        e(t).on("scroll." + r.namespace + " resize." + r.namespace, function() {
                            r.reposition()
                        });
                        if (r.options.autoClose) {
                            e("body").off("." + r.namespace);
                            if (r.options.trigger == "hover") {
                                if (u) {
                                    setTimeout(function() {
                                        e("body").on("touchstart." + r.namespace, function() {
                                            r.hide()
                                        })
                                    }, 0)
                                }
                                if (r.options.interactive) {
                                    if (u) {
                                        r.$tooltip.on("touchstart." + r.namespace, function(e) {
                                            e.stopPropagation()
                                        })
                                    }
                                    var p = null;
                                    r.$elProxy.add(r.$tooltip).on("mouseleave." + r.namespace + "-autoClose", function() {
                                        clearTimeout(p);
                                        p = setTimeout(function() {
                                            r.hide()
                                        }, r.options.interactiveTolerance)
                                    }).on("mouseenter." + r.namespace + "-autoClose", function() {
                                        clearTimeout(p)
                                    })
                                } else {
                                    r.$elProxy.on("mouseleave." + r.namespace + "-autoClose", function() {
                                        r.hide()
                                    })
                                }
                            } else if (r.options.trigger == "click") {
                                setTimeout(function() {
                                    e("body").on("click." + r.namespace + " touchstart." + r.namespace, function() {
                                        r.hide()
                                    })
                                }, 0);
                                if (r.options.interactive) {
                                    r.$tooltip.on("click." + r.namespace + " touchstart." + r.namespace, function(e) {
                                        e.stopPropagation()
                                    })
                                }
                            }
                        }
                    }
                    if (r.options.timer > 0) {
                        r.timerHide = setTimeout(function() {
                            r.timerHide = null;
                            r.hide()
                        }, r.options.timer + s)
                    }
                }
            })
        },
        _interval_set: function() {
            var t = this;
            t.checkInterval = setInterval(function() {
                if (e("body").find(t.$el).length === 0 || e("body").find(t.$elProxy).length === 0 || t.Status == "hidden" || e("body").find(t.$tooltip).length === 0) {
                    if (t.Status == "shown" || t.Status == "appearing") t.hide();
                    t._interval_cancel()
                } else {
                    if (t.options.positionTracker) {
                        var n = t._repositionInfo(t.$elProxy),
                            r = false;
                        if (o(n.dimension, t.elProxyPosition.dimension)) {
                            if (t.$elProxy.css("position") === "fixed") {
                                if (o(n.position, t.elProxyPosition.position)) r = true
                            } else {
                                if (o(n.offset, t.elProxyPosition.offset)) r = true
                            }
                        }
                        if (!r) {
                            t.reposition()
                        }
                    }
                }
            }, 200)
        },
        _interval_cancel: function() {
            clearInterval(this.checkInterval);
            this.checkInterval = null
        },
        _content_set: function(e) {
            if (typeof e === "object" && e !== null && this.options.contentCloning) {
                e = e.clone(true)
            }
            this.Content = e
        },
        _content_insert: function() {
            var e = this,
                t = this.$tooltip.find(".tooltipster-content");
            if (typeof e.Content === "string" && !e.options.contentAsHTML) {
                t.text(e.Content)
            } else {
                t.empty().append(e.Content)
            }
        },
        _update: function(e) {
            var t = this;
            t._content_set(e);
            if (t.Content !== null) {
                if (t.Status !== "hidden") {
                    t._content_insert();
                    t.reposition();
                    if (t.options.updateAnimation) {
                        if (l()) {
                            t.$tooltip.css({
                                width: "",
                                "-webkit-transition": "all " + t.options.speed + "ms, width 0ms, height 0ms, left 0ms, top 0ms",
                                "-moz-transition": "all " + t.options.speed + "ms, width 0ms, height 0ms, left 0ms, top 0ms",
                                "-o-transition": "all " + t.options.speed + "ms, width 0ms, height 0ms, left 0ms, top 0ms",
                                "-ms-transition": "all " + t.options.speed + "ms, width 0ms, height 0ms, left 0ms, top 0ms",
                                transition: "all " + t.options.speed + "ms, width 0ms, height 0ms, left 0ms, top 0ms"
                            }).addClass("tooltipster-content-changing");
                            setTimeout(function() {
                                if (t.Status != "hidden") {
                                    t.$tooltip.removeClass("tooltipster-content-changing");
                                    setTimeout(function() {
                                        if (t.Status !== "hidden") {
                                            t.$tooltip.css({
                                                "-webkit-transition": t.options.speed + "ms",
                                                "-moz-transition": t.options.speed + "ms",
                                                "-o-transition": t.options.speed + "ms",
                                                "-ms-transition": t.options.speed + "ms",
                                                transition: t.options.speed + "ms"
                                            })
                                        }
                                    }, t.options.speed)
                                }
                            }, t.options.speed)
                        } else {
                            t.$tooltip.fadeTo(t.options.speed, .5, function() {
                                if (t.Status != "hidden") {
                                    t.$tooltip.fadeTo(t.options.speed, 1)
                                }
                            })
                        }
                    }
                }
            } else {
                t.hide()
            }
        },
        _repositionInfo: function(e) {
            return {
                dimension: {
                    height: e.outerHeight(false),
                    width: e.outerWidth(false)
                },
                offset: e.offset(),
                position: {
                    left: parseInt(e.css("left")),
                    top: parseInt(e.css("top"))
                }
            }
        },
        hide: function(n) {
            var r = this;
            if (n) r.callbacks.hide.push(n);
            r.callbacks.show = [];
            clearTimeout(r.timerShow);
            r.timerShow = null;
            clearTimeout(r.timerHide);
            r.timerHide = null;
            var i = function() {
                e.each(r.callbacks.hide, function(e, t) {
                    t.call(r.$el)
                });
                r.callbacks.hide = []
            };
            if (r.Status == "shown" || r.Status == "appearing") {
                r.Status = "disappearing";
                var s = function() {
                    r.Status = "hidden";
                    if (typeof r.Content == "object" && r.Content !== null) {
                        r.Content.detach()
                    }
                    r.$tooltip.remove();
                    r.$tooltip = null;
                    e(t).off("." + r.namespace);
                    e("body").off("." + r.namespace).css("overflow-x", r.bodyOverflowX);
                    e("body").off("." + r.namespace);
                    r.$elProxy.off("." + r.namespace + "-autoClose");
                    r.options.functionAfter.call(r.$el, r.$el);
                    i()
                };
                if (l()) {
                    r.$tooltip.clearQueue().removeClass("tooltipster-" + r.options.animation + "-show").addClass("tooltipster-dying");
                    if (r.options.speed > 0) r.$tooltip.delay(r.options.speed);
                    r.$tooltip.queue(s)
                } else {
                    r.$tooltip.stop().fadeOut(r.options.speed, s)
                }
            } else if (r.Status == "hidden") {
                i()
            }
            return r
        },
        show: function(e) {
            this._showNow(e);
            return this
        },
        update: function(e) {
            return this.content(e)
        },
        content: function(e) {
            if (typeof e === "undefined") {
                return this.Content
            } else {
                this._update(e);
                return this
            }
        },
        reposition: function() {
            var n = this;
            if (e("body").find(n.$tooltip).length !== 0) {
                n.$tooltip.css("width", "");
                n.elProxyPosition = n._repositionInfo(n.$elProxy);
                var r = null,
                    i = e(t).width(),
                    s = n.elProxyPosition,
                    o = n.$tooltip.outerWidth(false),
                    u = n.$tooltip.innerWidth() + 1,
                    a = n.$tooltip.outerHeight(false);
                if (n.$elProxy.is("area")) {
                    var f = n.$elProxy.attr("shape"),
                        l = n.$elProxy.parent().attr("name"),
                        c = e('img[usemap="#' + l + '"]'),
                        h = c.offset().left,
                        p = c.offset().top,
                        d = n.$elProxy.attr("coords") !== undefined ? n.$elProxy.attr("coords").split(",") : undefined;
                    if (f == "circle") {
                        var v = parseInt(d[0]),
                            m = parseInt(d[1]),
                            g = parseInt(d[2]);
                        s.dimension.height = g * 2;
                        s.dimension.width = g * 2;
                        s.offset.top = p + m - g;
                        s.offset.left = h + v - g
                    } else if (f == "rect") {
                        var v = parseInt(d[0]),
                            m = parseInt(d[1]),
                            y = parseInt(d[2]),
                            b = parseInt(d[3]);
                        s.dimension.height = b - m;
                        s.dimension.width = y - v;
                        s.offset.top = p + m;
                        s.offset.left = h + v
                    } else if (f == "poly") {
                        var w = [],
                            E = [],
                            S = 0,
                            x = 0,
                            T = 0,
                            N = 0,
                            C = "even";
                        for (var k = 0; k < d.length; k++) {
                            var L = parseInt(d[k]);
                            if (C == "even") {
                                if (L > T) {
                                    T = L;
                                    if (k === 0) {
                                        S = T
                                    }
                                }
                                if (L < S) {
                                    S = L
                                }
                                C = "odd"
                            } else {
                                if (L > N) {
                                    N = L;
                                    if (k == 1) {
                                        x = N
                                    }
                                }
                                if (L < x) {
                                    x = L
                                }
                                C = "even"
                            }
                        }
                        s.dimension.height = N - x;
                        s.dimension.width = T - S;
                        s.offset.top = p + x;
                        s.offset.left = h + S
                    } else {
                        s.dimension.height = c.outerHeight(false);
                        s.dimension.width = c.outerWidth(false);
                        s.offset.top = p;
                        s.offset.left = h
                    }
                }
                var A = 0,
                    O = 0,
                    M = 0,
                    _ = parseInt(n.options.offsetY),
                    D = parseInt(n.options.offsetX),
                    P = n.options.position;
                function H() {
                    var n = e(t).scrollLeft();
                    if (A - n < 0) {
                        r = A - n;
                        A = n
                    }
                    if (A + o - n > i) {
                        r = A - (i + n - o);
                        A = i + n - o
                    }
                }
                function B(n, r) {
                    if (s.offset.top - e(t).scrollTop() - a - _ - 12 < 0 && r.indexOf("top") > -1) {
                        P = n
                    }
                    if (s.offset.top + s.dimension.height + a + 12 + _ > e(t).scrollTop() + e(t).height() && r.indexOf("bottom") > -1) {
                        P = n;
                        M = s.offset.top - a - _ - 12
                    }
                }
                if (P == "top") {
                    var j = s.offset.left + o - (s.offset.left + s.dimension.width);
                    A = s.offset.left + D - j / 2;
                    M = s.offset.top - a - _ - 12;
                    H();
                    B("bottom", "top")
                }
                if (P == "top-left") {
                    A = s.offset.left + D;
                    M = s.offset.top - a - _ - 12;
                    H();
                    B("bottom-left", "top-left")
                }
                if (P == "top-right") {
                    A = s.offset.left + s.dimension.width + D - o;
                    M = s.offset.top - a - _ - 12;
                    H();
                    B("bottom-right", "top-right")
                }
                if (P == "bottom") {
                    var j = s.offset.left + o - (s.offset.left + s.dimension.width);
                    A = s.offset.left - j / 2 + D;
                    M = s.offset.top + s.dimension.height + _ + 12;
                    H();
                    B("top", "bottom")
                }
                if (P == "bottom-left") {
                    A = s.offset.left + D;
                    M = s.offset.top + s.dimension.height + _ + 12;
                    H();
                    B("top-left", "bottom-left")
                }
                if (P == "bottom-right") {
                    A = s.offset.left + s.dimension.width + D - o;
                    M = s.offset.top + s.dimension.height + _ + 12;
                    H();
                    B("top-right", "bottom-right")
                }
                if (P == "left") {
                    A = s.offset.left - D - o - 12;
                    O = s.offset.left + D + s.dimension.width + 12;
                    var F = s.offset.top + a - (s.offset.top + s.dimension.height);
                    M = s.offset.top - F / 2 - _;
                    if (A < 0 && O + o > i) {
                        var I = parseFloat(n.$tooltip.css("border-width")) * 2,
                            q = o + A - I;
                        n.$tooltip.css("width", q + "px");
                        a = n.$tooltip.outerHeight(false);
                        A = s.offset.left - D - q - 12 - I;
                        F = s.offset.top + a - (s.offset.top + s.dimension.height);
                        M = s.offset.top - F / 2 - _
                    } else if (A < 0) {
                        A = s.offset.left + D + s.dimension.width + 12;
                        r = "left"
                    }
                }
                if (P == "right") {
                    A = s.offset.left + D + s.dimension.width + 12;
                    O = s.offset.left - D - o - 12;
                    var F = s.offset.top + a - (s.offset.top + s.dimension.height);
                    M = s.offset.top - F / 2 - _;
                    if (A + o > i && O < 0) {
                        var I = parseFloat(n.$tooltip.css("border-width")) * 2,
                            q = i - A - I;
                        n.$tooltip.css("width", q + "px");
                        a = n.$tooltip.outerHeight(false);
                        F = s.offset.top + a - (s.offset.top + s.dimension.height);
                        M = s.offset.top - F / 2 - _
                    } else if (A + o > i) {
                        A = s.offset.left - D - o - 12;
                        r = "right"
                    }
                }
                if (n.options.arrow) {
                    var R = "tooltipster-arrow-" + P;
                    if (n.options.arrowColor.length < 1) {
                        var U = n.$tooltip.css("background-color")
                    } else {
                        var U = n.options.arrowColor
                    }
                    if (!r) {
                        r = ""
                    } else if (r == "left") {
                        R = "tooltipster-arrow-right";
                        r = ""
                    } else if (r == "right") {
                        R = "tooltipster-arrow-left";
                        r = ""
                    } else {
                        r = "left:" + Math.round(r) + "px;"
                    }
                    if (P == "top" || P == "top-left" || P == "top-right") {
                        var z = parseFloat(n.$tooltip.css("border-bottom-width")),
                            W = n.$tooltip.css("border-bottom-color")
                    } else if (P == "bottom" || P == "bottom-left" || P == "bottom-right") {
                        var z = parseFloat(n.$tooltip.css("border-top-width")),
                            W = n.$tooltip.css("border-top-color")
                    } else if (P == "left") {
                        var z = parseFloat(n.$tooltip.css("border-right-width")),
                            W = n.$tooltip.css("border-right-color")
                    } else if (P == "right") {
                        var z = parseFloat(n.$tooltip.css("border-left-width")),
                            W = n.$tooltip.css("border-left-color")
                    } else {
                        var z = parseFloat(n.$tooltip.css("border-bottom-width")),
                            W = n.$tooltip.css("border-bottom-color")
                    }
                    if (z > 1) {
                        z++
                    }
                    var X = "";
                    if (z !== 0) {
                        var V = "",
                            J = "border-color: " + W + ";";
                        if (R.indexOf("bottom") !== -1) {
                            V = "margin-top: -" + Math.round(z) + "px;"
                        } else if (R.indexOf("top") !== -1) {
                            V = "margin-bottom: -" + Math.round(z) + "px;"
                        } else if (R.indexOf("left") !== -1) {
                            V = "margin-right: -" + Math.round(z) + "px;"
                        } else if (R.indexOf("right") !== -1) {
                            V = "margin-left: -" + Math.round(z) + "px;"
                        }
                        X = '<span class="tooltipster-arrow-border" style="' + V + " " + J + ';"></span>'
                    }
                    n.$tooltip.find(".tooltipster-arrow").remove();
                    var K = '<div class="' + R + ' tooltipster-arrow" style="' + r + '">' + X + '<span style="border-color:' + U + ';"></span></div>';
                    n.$tooltip.append(K)
                }
                n.$tooltip.css({
                    top: Math.round(M) + "px",
                    left: Math.round(A) + "px"
                })
            }
            return n
        },
        enable: function() {
            this.enabled = true;
            return this
        },
        disable: function() {
            this.hide();
            this.enabled = false;
            return this
        },
        destroy: function() {
            var t = this;
            t.hide();
            if (t.$el[0] !== t.$elProxy[0]) t.$elProxy.remove();
            t.$el.removeData(t.namespace).off("." + t.namespace);
            var n = t.$el.data("tooltipster-ns");
            if (n.length === 1) {
                var r = typeof t.Content === "string" ? t.Content : e("<div></div>").append(t.Content).html();
                t.$el.removeClass("tooltipstered").attr("title", r).removeData(t.namespace).removeData("tooltipster-ns").off("." + t.namespace)
            } else {
                n = e.grep(n, function(e, n) {
                    return e !== t.namespace
                });
                t.$el.data("tooltipster-ns", n)
            }
            return t
        },
        elementIcon: function() {
            return this.$el[0] !== this.$elProxy[0] ? this.$elProxy[0] : undefined
        },
        elementTooltip: function() {
            return this.$tooltip ? this.$tooltip[0] : undefined
        },
        option: function(e, t) {
            if (typeof t == "undefined") return this.options[e];
            else {
                this.options[e] = t;
                return this
            }
        },
        status: function() {
            return this.Status
        }
    };
    e.fn[r] = function() {
        var t = arguments;
        if (this.length === 0) {
            if (typeof t[0] === "string") {
                var n = true;
                switch (t[0]) {
                    case "setDefaults":
                        e.extend(i, t[1]);
                        break;
                    default:
                        n = false;
                        break
                }
                if (n) return true;
                else return this
            } else {
                return this
            }
        } else {
            if (typeof t[0] === "string") {
                var r = "#*$~&";
                this.each(function() {
                    var n = e(this).data("tooltipster-ns"),
                        i = n ? e(this).data(n[0]) : null;
                    if (i) {
                        if (typeof i[t[0]] === "function") {
                            var s = i[t[0]](t[1], t[2])
                        } else {
                            throw new Error('Unknown method .tooltipster("' + t[0] + '")')
                        }
                        if (s !== i) {
                            r = s;
                            return false
                        }
                    } else {
                        throw new Error("You called Tooltipster's \"" + t[0] + '" method on an uninitialized element')
                    }
                });
                return r !== "#*$~&" ? r : this
            } else {
                var o = [],
                    u = t[0] && typeof t[0].multiple !== "undefined",
                    a = u && t[0].multiple || !u && i.multiple,
                    f = t[0] && typeof t[0].debug !== "undefined",
                    l = f && t[0].debug || !f && i.debug;
                this.each(function() {
                    var n = false,
                        r = e(this).data("tooltipster-ns"),
                        i = null;
                    if (!r) {
                        n = true
                    } else if (a) {
                        n = true
                    } else if (l) {
                        console.log('Tooltipster: one or more tooltips are already attached to this element: ignoring. Use the "multiple" option to attach more tooltips.')
                    }
                    if (n) {
                        i = new s(this, t[0]);
                        if (!r) r = [];
                        r.push(i.namespace);
                        e(this).data("tooltipster-ns", r);
                        e(this).data(i.namespace, i)
                    }
                    o.push(i)
                });
                if (a) return o;
                else return this
            }
        }
    };
    var u = !!("ontouchstart" in t);
    var a = false;
    e("body").one("mousemove", function() {
        a = true
    })
})(jQuery, window, document);


/*******************************************************
************** \TOOLTIPSTER ****************
*******************************************************/

jQuery(document).ready(function($) {
    $('.cwstooltip-wrapper').each(function() {
      var _this = $(this);
      var _tooltipstyle = $(this).data('tooltipstyle');
      var _tooltipanimation = $(this).data('tooltipanimation');
      var _trigger = $(this).data('trigger') || "hover";
      var _maxwidth = $(this).data('maxwidth') || 320;
      var _opacity = $(this).data('opacity') || 0.5;
      var _isdisplayall = $(this).data('isdisplayall');
      var _displayednum = parseInt($(this).data('displayednum'));
      var _marginoffset = $(this).data('marginoffset') || '0';
      var _newbg;

      if(_marginoffset!="0"){
          $(window).on('resize', function(event) {
              var _windowwidth = $(this).width();
              if(_windowwidth<=540){
                  $('.hotspot-item', _this).each(function(index) {
                      $(this).css('margin', _marginoffset);
                  })
              }else{
                  $('.hotspot-item', _this).each(function(index) {
                      $(this).css('margin', '0');
                  })
              }
          });
          $(window).trigger('resize');
      }

      $('.cws-tooltip', $(this)).each(function(index) {
        var _tooltip = $(this);
        var _bg = $(this).css('background-color');
        var _arrowposition = $(this).data('arrowposition') || 'top';
        if(_bg.indexOf('a') == -1){
          _newbg = _bg.replace(')', ', '+_opacity+')').replace('rgb', 'rgba');
        }else{
          _newbg = _bg;
        }
        $(this).css('background-color', _newbg);
        $(this).on('click', function(event) {
            $(this).parents('.hotspot-item').addClass('active').siblings('.hotspot-item').removeClass('active');
          	if($(this).attr('href')==""||$(this).attr('href')=="#") event.preventDefault();
        });
        var _content = $(this).data('tooltip');
        var _offsetx = $(window).width()<=480?0:2;
        var _offsety = 0;
        $(this).tooltipster({
          content: _content,
          position: _arrowposition,
          offsetX: _offsetx,
          offsetY: _offsety,
          maxWidth: _maxwidth,
          delay: 100,
          speed: 300,
          interactive: true,
          animation: _tooltipanimation,
          trigger: _trigger,
          contentAsHTML: true,
          theme   : 'tooltipster-' + _tooltipstyle,
        });
        if(_isdisplayall=="on"){
            setTimeout(function() {
              _tooltip.tooltipster('show').parents('.hotspot-item').addClass('active').siblings('.hotspot-item').removeClass('active');
            }, 600);
        }else if(_isdisplayall=="specify"&&(_displayednum-1)==index){
              setTimeout(function() {
                _tooltip.tooltipster('show').parents('.hotspot-item').addClass('active').siblings('.hotspot-item').removeClass('active');
              }, 600);
        }

  });
  });

});