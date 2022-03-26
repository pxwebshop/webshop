var NOO_RP_SUPPORT=NOO_RP_SUPPORT||{};(function($){"use strict";NOO_RP_SUPPORT={Gellary_Property:function(){var gallery=$('body').find('.property-gallery-top'),thumb_nav=gallery.data('for'),rtl=gallery.data('rtl');var autoplay_slider=gallery.data('autoplay_slider');var duration_silder=gallery.data('duration_silder');if(thumb_nav!=undefined){gallery.slick({slidesToShow:1,slidesToScroll:1,arrows:true,fade:true,rtl:rtl,asNavFor:'.slider-nav',adaptiveHeight:true});$('.'+thumb_nav).slick({slidesToShow:$('.'+thumb_nav).data('number'),slidesToScroll:1,asNavFor:'.property-gallery-top',dots:false,arrows:true,rtl:rtl,centerMode:true,focusOnSelect:true});}else{gallery.slick({autoplay:autoplay_slider?true:false,autoplaySpeed:duration_silder?parseInt(duration_silder):1500,slidesToShow:1,slidesToScroll:1,arrows:true,fade:true,rtl:rtl,speed:300,infinite:true,adaptiveHeight:true});}},Property_Featured:function(){$('.noo-property-featured').each(function(){if($(this).hasClass('owl-carousel')){var new_id=$(this).attr('id'),autoplay=$(this).attr('data-autoplay'),duration=$(this).attr('data-duration'),rtl=$(this).attr('data-rtl');var owl=$('#'+new_id);owl.owlCarousel({items:1,margin:30,rtl:rtl?true:false,loop:true,autoplay:autoplay?true:false,autoplayTimeout:duration?parseInt(duration):6000,autoplayHoverPause:true,});$(this).closest('.noo-property-featured-wrap').find('.nav_next').on('click',function(){owl.trigger('next.owl.carousel');});$(this).closest('.noo-property-featured-wrap').find(' .nav_prev').on('click',function(){owl.trigger('prev.owl.carousel');});}});},Property_Slider:function(){$('.noo-simple-featured-property-sc-wrap').each(function(){var autoplay=$(this).attr('data-autoplay'),duration=$(this).attr('data-duration'),rtl=$(this).attr('data-rtl');var args={items:1,margin:0,loop:true,rtl:rtl?true:false,};if(autoplay==='true'){args.autoplay=true;args.autoplayTimeout=duration?parseInt(duration):6000;}
$(this).owlCarousel(args);$(this).find('.nav_next').on('click',function(){$(this).trigger('next.owl.carousel');});$(this).find('.nav_prev').on('click',function(){$(this).trigger('prev.owl.carousel');});});},Property_Slider_List:function(){$('.noo-list-property.style-slider').each(function(){var autoplay=$(this).attr('data-autoplay'),duration=$(this).attr('data-duration'),rtl=$(this).attr('data-rtl'),owl=$(this).find('.owl-carousel');owl.owlCarousel({loop:true,items:3,margin:30,rtl:'true'==rtl?true:false,autoplay:'true'==autoplay?true:false,autoplayTimeout:duration?parseInt(duration):6000,autoplayHoverPause:true,nav:false,dots:false,responsive:{0:{items:1,nav:true},600:{items:2,nav:false},1000:{items:3,nav:true,loop:false}}});$(this).find('.nav_next').on('click',function(){owl.trigger('next.owl.carousel');});$(this).find('.nav_prev').on('click',function(){owl.trigger('prev.owl.carousel');});});},Property_Tab:function(){$('.noo-tab').each(function(){var noo_tab=$(this),noo_tab_wrap=noo_tab.closest('.noo-tab-wrap'),item_first=noo_tab.find('span').first();item_first.addClass('active');noo_tab_wrap.find('.noo-tab-event').hide();noo_tab_wrap.find('.noo-tab-event#noo-'+item_first.data('id')).show();noo_tab.on('click','span',function(){var current_event=$(this),id_element=current_event.data('id');noo_tab_wrap.find('span').removeClass('active');current_event.addClass('active');noo_tab_wrap.find('.noo-tab-event').hide();noo_tab_wrap.find('.noo-tab-event#noo-'+id_element).show();});});},Property_Event:function(){$('.property-action').each(function(index,el){var property_action=$(this);property_action.on('click','.action-item',function(event){var current_event=$(this),current_action=current_event.data('action'),property_id=current_event.data('id'),action_msg=current_event.data('msg');if(current_action){event.preventDefault();var ajax_action='rp_agent_dashboard';if('lock'===current_action||'unlock'===current_action){ajax_action='noo_property_action';}
if('remove'===current_action){if(!confirm(action_msg)){return false;}}
$.ajax({url:RP_Property.ajax_url,type:"POST",dataType:"json",data:{action:ajax_action,security:RP_Agent.security,type:current_action,property_id:property_id},beforeSend:function(){if('remove'===current_action){current_event.find('i').removeClass('fa-trash-o');current_event.find('i').addClass('fa-circle-o-notch fa-spin');}else if('lock'===current_action){current_event.find('i').removeClass('fa-unlock');current_event.find('i').addClass('fa-circle-o-notch fa-spin');}else if('unlock'===current_action){current_event.find('i').removeClass('fa-lock');current_event.find('i').addClass('fa-circle-o-notch fa-spin');}},success:function(res){current_event.find('i').removeClass('fa-circle-o-notch fa-spin');try{if('remove'===current_action){current_event.removeClass('loadmore');current_event.closest('.property-item').remove();}else if('lock'===current_action){current_event.find('i').removeClass('fa-unlock');current_event.find('i').addClass('fa-lock');current_event.data('action','unlock');}else if('unlock'===current_action){current_event.find('i').removeClass('fa-lock');current_event.find('i').addClass('fa-unlock');current_event.data('action','lock');}
$.notifyBar({cssClass:res.status,html:res.message,position:"bottom"});}catch(err){$.notifyBar({cssClass:"error",html:err,position:"bottom"});}
location.reload();}});}});});},Hover_Tab_Agent:function(){$('.noo-agent-listing-sc').each(function(){var tab_wrap=$(this);tab_wrap.on('click','.agent-item',function(){var current_event=$(this),class_show=current_event.data('class');tab_wrap.find('.agent-item-content').hide();tab_wrap.find('.agent-item').removeClass('active');current_event.addClass('active');$('.'+class_show).show();});});},Hover_Tab_Property:function(){$('.noo-list-property-tab').each(function(){var tab_wrap=$(this);tab_wrap.on('click','.property-item',function(){var current_event=$(this),class_show=current_event.data('class');tab_wrap.find('.property-item-content').hide();tab_wrap.find('.property-item').removeClass('active');current_event.addClass('active');$('.'+class_show).show();});});},Modal_View_Statistics:function(){$('body').on('click','.noo-property-statistic-btn',function(){var $this=$(this);$this.find('i').removeClass('fa-line-chart');$this.find('i').addClass('fa-circle-o-notch fa-spin');$.ajax({type:'POST',dataType:'json',url:RP_CORE.ajax_url,data:{action:'noo_ajax_property_statistic',security:$this.data('security'),property_id:$this.data('property')},success:function(data){if(data.success==true){$this.find('i').removeClass('fa-circle-o-notch fa-spin');$this.find('i').addClass('fa-line-chart');var $modal=$(data.html);$('body').append($modal);NOO_RP_SUPPORT.Statistics_Init();$modal.modal('show').on('hidden.bs.modal',function(event){$('body').find('.modalStatistic').remove();});}},complete:function(){},error:function(){}});return false;});},Modal_Add_Alert:function(){$('body').on('click','.noo-btn-saved-search-modal',function(){var $modal=$('#modalAlertForm');$modal.modal('show');});},Modal_Submit_Alert:function(){$('body').on('click','.noo-btn-add-new-alert',function(){var form=$('#noo-save-search-form');var data=form.serialize();$('body').find('#modalAlertForm .modal-footer .txt').html('');$.ajax({url:RP_Property.ajax_url,type:'POST',dataType:'json',data:{action:'noo_palazzo_save_search',security:RP_Property.security,results:data},beforeSend:function(){},success:function(save_search){if('success'===save_search.status){$('body').find('#modalAlertForm .modal-footer .txt').html(save_search.msg);}else{alert('Error');}}})});},Slider_Slick:function(){if($('.style-slick').length>0){$('.style-slick').each(function(index,el){var current_slick=$(this),rtl=$(this).data('rtl'),autoplay=$(this).data('autoplay')?$(this).data('autoplay'):false,duration=$(this).data('duration')?$(this).data('duration'):2000;current_slick.find('.style-slick-top').slick({infinite:autoplay,slidesToShow:1,slidesToScroll:1,arrows:false,autoplay:autoplay,autoplaySpeed:duration,rtl:rtl,fade:true,asNavFor:'.style-slick-list'});current_slick.find('.style-slick-list').slick({infinite:false,slidesToShow:3,slidesToScroll:1,autoplay:autoplay,autoplaySpeed:duration,rtl:rtl,asNavFor:'.style-slick-top',dots:false,arrows:false,centerMode:true,focusOnSelect:true,responsive:[{breakpoint:1450,settings:{slidesToShow:3,slidesToScroll:1}},{breakpoint:1200,settings:{slidesToShow:3,slidesToScroll:1}},{breakpoint:991,settings:{slidesToShow:2,slidesToScroll:1}},{breakpoint:500,settings:{slidesToShow:1,slidesToScroll:1}}]});});}},Offers_Slider_Slick:function(){if($('.noo-slider-property-offers').length>0){$('body').find('.noo-slider-property-offers').each(function(index,el){var current_slick=$(this),items=current_slick.data('items')?current_slick.data('items'):1,rows=current_slick.data('rows')?current_slick.data('rows'):1,dots=current_slick.data('dots')?current_slick.data('dots'):false;var sdefault={infinite:true,speed:300,slidesToShow:items,adaptiveHeight:true,arrows:false,rows:rows,dots:dots,responsive:[{breakpoint:1024,settings:{slidesToShow:1,slidesToScroll:1}},{breakpoint:768,settings:{slidesToShow:1,slidesToScroll:1,rows:1}},{breakpoint:480,settings:{slidesToShow:1,slidesToScroll:1,rows:1}}]}
if(items>3){var config={infinite:true,speed:300,slidesToShow:items,adaptiveHeight:true,arrows:false,rows:rows,responsive:[{breakpoint:991,settings:{slidesToShow:3,slidesToScroll:1}},{breakpoint:768,settings:{slidesToShow:2,slidesToScroll:1}},{breakpoint:480,settings:{slidesToShow:1,slidesToScroll:1}}]}}
if(items=3){var config={infinite:true,speed:300,slidesToShow:items,adaptiveHeight:true,arrows:false,rows:rows,responsive:[{breakpoint:991,settings:{slidesToShow:3,slidesToScroll:1}},{breakpoint:768,settings:{slidesToShow:2,slidesToScroll:1}},{breakpoint:480,settings:{slidesToShow:1,slidesToScroll:1}}]}}
if(items<3){var config={infinite:true,speed:300,slidesToShow:items,adaptiveHeight:true,arrows:false,rows:rows,responsive:[{breakpoint:991,settings:{slidesToShow:items,slidesToScroll:1}},{breakpoint:768,settings:{slidesToShow:items,slidesToScroll:1}},{breakpoint:480,settings:{slidesToShow:1,slidesToScroll:1}}]}}
var sconfigs=$.extend(sdefault,config);current_slick.slick(sconfigs);if($('.noo-slick-button').length){$('.noo-slick-button .noo-prev').on('click',function(event){current_slick.slick('slickPrev')});$('.noo-slick-button .noo-next').on('click',function(event){current_slick.slick('slickNext')});}});}},Process_Tab_Property_Category:function(){$('body').each(function(index,el){var current_action=$(this);current_action.find('.noo-offers-action').on('click','a',function(event){event.preventDefault();var current_event=$(this),tax_id=current_event.data('id'),max_number=current_event.data('max-number'),style=current_event.data('style'),title=current_event.attr('title');$.ajax({url:RP_CORE.ajax_url,type:"POST",dataType:"json",data:{action:'noo_load_property_taxonomy',tax_id:tax_id,max_number:max_number,style:style},beforeSend:function(){current_event.html('<i class="fa fa-spinner fa-spin"></i>');},success:function(response){try{if(response.status==='success'){current_event.closest('.noo-property-offers').find('.noo-list-property-offers').html(response.content);current_action.find('.noo-offers-action a').removeClass('active');current_event.addClass('active');current_event.html(title);current_event.closest('.noo-property-offers').find('.noo-slider-property-offers-wrap').html(response.content);NOO_RP_SUPPORT.Offers_Slider_Slick();}}catch(err){console.log(err);}}});});current_action.find('.noo-country-action').on('click','a',function(event){event.preventDefault();var current_event=$(this),country_id=current_event.data('id'),max_number=current_event.data('max-number'),style=current_event.data('style'),title=current_event.attr('title');$.ajax({url:RP_CORE.ajax_url,type:"POST",dataType:"json",data:{action:'noo_load_property_country',country_id:country_id,max_number:max_number,style:style},beforeSend:function(){current_event.find('i').removeClass('hide');},success:function(response){try{if(response.status==='success'){current_event.closest('.noo-property-country').find('.noo-list-property-country').html(response.content);current_action.find('.noo-country-action a').removeClass('active');current_event.addClass('active');current_event.html(title);current_event.find('i').addClass('hide');}}catch(err){alert(err);}}});});current_action.find('.noo-country-list').on('click','a',function(event){event.preventDefault();var current_event=$(this),wrapper=$(this).parents('.noo-property-country').find('.noo-tab-country-detail'),country_id=current_event.data('id'),max_number=current_event.data('max-number'),style=current_event.data('style'),title=current_event.attr('title');$.ajax({url:RP_CORE.ajax_url,type:"POST",dataType:"json",data:{action:'noo_load_property_country',country_id:country_id,max_number:max_number,style:style},beforeSend:function(){wrapper.block({message:null,overlayCSS:{backgroundColor:'#fff',opacity:0.5,cursor:'wait'}});},success:function(response){try{if(response.status==='success'){current_event.closest('.noo-property-country').find('.noo-tab-country-detail').html(response.content);current_action.find('.noo-country-list a').removeClass('active');current_event.addClass('active');current_event.html(title);NOO_RP_SUPPORT.Slider_tab_Country_Detail();}}catch(err){alert(err);}
wrapper.unblock();}});});});},Slider_tab_Country_Detail:function(){$(document).find('.noo-tab-country-slider').each(function(index,el){var current_event=jQuery(this);var rtl=false;if($('body').hasClass('rtl')){rtl=true;}
current_event.slick({dots:true,infinite:false,autoplay:true,rtl:rtl,autoplaySpeed:6000,adaptiveHeight:true});});},Statistics_Init:function(){if($('#property_statitic').length>0){var ctx=document.getElementById("property_statitic").getContext('2d');var label=$('.noo-property-statistic').data('label');var value=$('.noo-property-statistic').data('value');var myChart=new Chart(ctx,{type:'line',data:{labels:label,datasets:[{data:value,backgroundColor:'rgba(252, 172, 47, 0.4)',borderWidth:1,barDatasetSpacing:0,}]},options:{scaleBeginAtZero:true,scaleShowGridLines:true,scaleGridLineColor:"rgba(0,0,0,.05)",scaleGridLineWidth:1,scaleShowHorizontalLines:true,scaleShowVerticalLines:true,barShowStroke:true,barStrokeWidth:2,barValueSpacing:5,barDatasetSpacing:1,legend:{display:false},tooltips:{enabled:true,mode:'x-axis',cornerRadius:4},}});}},Request_Viewing_Ajax:function(){if($('.rp-box-schedule-tour').length>0){$('.rp-box-schedule-tour').each(function(index,el){var $$=$(this);$$.on('click','.rp-submit',function(event){event.preventDefault();var data=$$.serializeArray(),btn=$(this);data.push({'name':'action','value':'rp_send_request_viewing'},{'name':'security','value':RP_CORE.security});$.ajax({url:RP_Agent.ajax_url,type:'POST',dataType:'json',data:data,beforeSend:function(){btn.find('>i').removeClass('hide');},success:function(agent){btn.find('>i').addClass('hide');el.reset();$.notifyBar({cssClass:agent.status,html:agent.message,position:"bottom"});}})});});}},Requested_Viewings_Show_Message:function(){$('.btn-view-msg span').on('click',function(e){e.preventDefault();var $this=$(this);$this.parents('.item').toggleClass('active');$this.parents('.item').on('click','.feedback .rp-button',function(){$(this).parents('.item-message').addClass('active');});$this.parents('.item').on('click','.feedback-title .close',function(){$(this).parents('.item-message').removeClass('active');});});if($('.item-message').length>0){$('.item-message').each(function(){$(this).on('click','.rp-feedback',function(e){e.preventDefault();var $fb=$(this),form=$fb.parents('.rp-form-feedback'),email=form.find('#rp-field-email'),data=form.serializeArray();data.push({'name':'action','value':'rp_feedback_request'},{'name':'security','value':RP_CORE.security});$.ajax({url:RP_Property.ajax_url,type:'POST',dataType:'json',data:data,beforeSend:function(){$fb.find('>i').removeClass('hide');},success:function(response){$fb.find('>i').addClass('hide');var status=response.status,msg=response.msg;if('success'==status){form.find('.notice').html(response.msg);}else{form.find('.rp-response').addClass('val-error');form.find('.notice').html(response.msg);}}});});});}},Request_Viewing_Mark_Complete_Ajax:function(){$('.mark-complete').each(function(){$(this).on('click',function(){var request_id=$(this).data('id'),label_completed=$(this).data('label-complete'),parent_item=$(this).parents('.item');$.ajax({url:RP_Property.ajax_url,type:'POST',dataType:'json',data:{action:'rp_request_viewing_mark_completed',security:RP_CORE.security,request_id:request_id},beforeSend:function(){},success:function(response){if('success'==response.status){parent_item.removeClass('in-process').addClass('complete');parent_item.find('.status-label').html(label_completed);}}})})});},IDX_Script:function(){$('.dsidx-prop-title').css('margin','0 0 15px 0');$('.dsidx-prop-summary a img').css('border','none');$('#dsidx-contact-form-submit').addClass('real-btn');$('.dsidx-search-button .submit').addClass('real-btn');var $single_listing=$('.sidebar .widget .dsidx-widget-single-listing');if($single_listing.length>0){$single_listing.each(function(){$(this).closest('.widget').css('border','none').css('background','transparent');});}
$('#dsidx-top-search #dsidx-search-form table td').removeClass('label');$('.dsidx-tag-pre-foreclosure br').replaceWith(' ');},LoadMore:function(){$('body').on('click','.noo-loadmore',function(event){event.preventDefault();var current_event=$(this),type=current_event.data('type'),id_wrap=current_event.parents('.noo-list-property'),current_page=current_event.data('current-page'),max_page=current_event.data('max-page'),posts_per_page=current_event.data('posts_per_page'),listing_type=current_event.data('listing_type'),listing_offers=current_event.data('listing_offers');$.ajax({url:RP_Property.ajax_url,type:"POST",dataType:"json",data:{action:'noo_palazzo_loadmore',security:RP_Property.security,type:type,current_page:current_page,max_page:max_page,posts_per_page:posts_per_page,listing_type:listing_type,listing_offers:listing_offers,},beforeSend:function(){current_event.button('loading');},success:function(res){try{if(res.status==='success'){id_wrap.append(res.content);current_event.button('reset');current_event.remove();}}catch(err){alert(err);}}});});},Toggle_Filters_Advanced_Search:function(){$('.box-show-features').on('click','.show-features',function(){$('#'+$(this).data('id')).toggle(300);});},Toggle_Fiter_Advanced_Search_Modern:function(){$('.noo-search-box').on('click','.noo-btn-advance',function(){var advance_box=$('.noo-search-box-advanced-content');if(advance_box.hasClass('active')){advance_box.slideUp()
advance_box.removeClass('active');}else{advance_box.slideDown()
advance_box.addClass('active');}});},Agent_Slider:function(){$('.noo-agent-slider').each(function(index,el){var autoplay=$(this).data('autoplay'),column=$(this).data('column'),duration=$(this).data('duration'),rtl=$(this).data('rtl');$(this).slick({infinite:true,slidesToShow:column,slidesToScroll:1,autoplay:autoplay,rtl:rtl,autoplaySpeed:duration,responsive:[{breakpoint:1024,settings:{slidesToShow:column,slidesToScroll:1,}},{breakpoint:600,settings:{slidesToShow:2,slidesToScroll:1}},{breakpoint:480,settings:{slidesToShow:1,slidesToScroll:1}}]});});},ToolTip_Init:function(){$(function(){$('[data-toggle="tooltip"]').tooltip()});},Sidebar_Sticky_Init:function(){var windowsize=$(window).width();if(windowsize>=1024){$('.sidebar-sticky').stick_in_parent();}
$(window).resize(function(){windowsize=$(window).width();if(windowsize>=1024){$('.sidebar-sticky').stick_in_parent();}});},View_Mode:function(){$('.view-mode').each(function(){var view_mode=$(this),view_mode_wrap=view_mode.closest('.noo-view-mode');view_mode.on('click','span',function(){var current_event=$(this),style=current_event.data('style');view_mode.closest('.view-mode').find('span').removeClass('active');current_event.addClass('active');if('grid'===style){view_mode_wrap.find('.agent-item').addClass('col-md-6');view_mode_wrap.find('.noo-list-agent').removeClass('style-list');view_mode_wrap.find('.noo-list-agent').addClass('style-grid');view_mode_wrap.find('.agent-item .noo-thumbnail').removeClass('col-md-4');view_mode_wrap.find('.agent-item .noo-header .right').removeClass('col-md-4');view_mode_wrap.find('.agent-item .noo-content').removeClass('col-md-8');view_mode_wrap.find('.agent-item .noo-header .left').removeClass('col-md-8');}else{view_mode_wrap.find('.agent-item').removeClass('col-md-6');view_mode_wrap.find('.noo-list-agent').addClass('style-list');view_mode_wrap.find('.noo-list-agent').removeClass('style-grid');view_mode_wrap.find('.agent-item .noo-thumbnail').addClass('col-md-4');view_mode_wrap.find('.agent-item .noo-header .right').addClass('col-md-4');view_mode_wrap.find('.agent-item .noo-content').addClass('col-md-8');view_mode_wrap.find('.agent-item .noo-header .left').addClass('col-md-8');}});});},Add_Member:function(){$('.create-agent').each(function(){var current=$(this);current.on('click',function(event){event.preventDefault();var current=$(this),btn_text=current.data('text'),form=$('#noo-box-create-agent'),data=form.serializeArray();data.push({'name':'action','value':'rp_create_agency'},{'name':'security','value':RP_CORE.security});$.ajax({url:RP_Property.ajax_url,type:"POST",dataType:"json",data:data,beforeSend:function(){current.html('<i class="fa fa-spinner fa-spin"></i>');},success:function(res){try{if(res.status==='success'){var username=$('#agent-user').val(),email=$('#agent-email').val();$('.noo-list-member').find('.no-member').hide();$('.noo-list-member').append('<li class="agent-item row">'+
'<div class="col-md-4 agent-name">\n'+
'<a href="#">'+username+'</a>\n'+
'</div>\n'+
'<div class="col-md-4 agent-email">'+email+'</div>'+
'<div class="col-md-2 agent-role">'+res.group+'</div>\n'+
'<div class="col-md-2 agent-role">\n'+
'    <a href="javascript:void(0);" class="close-member" data-id="'+res.agency_id+'">\n'+
'        <i class="fa fa-times remove_member" aria-hidden="true"></i>\n'+
'    </a>\n'+
'</div>\n'+
'</li>');form[0].reset();form.modal('hide');current.html(btn_text);}else{$.notifyBar({cssClass:'error',html:res.message,position:"bottom"});current.html(btn_text);}}catch(err){$.notifyBar({cssClass:'error',html:err,position:"bottom"});}}});});});},Remove_Member:function(){$(document).on('click','.noo-box-team-member .close-member',function(event){event.preventDefault();var current=$(this),agent_id=current.data('id'),content=current.html();$.ajax({url:RP_Property.ajax_url,type:"POST",dataType:"json",data:{action:'rp_remote_agency',agent_id:agent_id},beforeSend:function(){current.html('<i class="fa fa-spinner fa-spin"></i>');},success:function(res){try{if(res.status==='success'){current.closest('li').remove();}else{$.notifyBar({cssClass:'error',html:res.message,position:"bottom"});current.html(content);}}catch(err){$.notifyBar({cssClass:'error',html:err,position:"bottom"});}}});});},Active_Member:function(){$(document).on('click','.noo-box-team-member .member-status',function(event){event.preventDefault();var current=$(this),agent_type=current.data('type'),agent_id=current.data('id'),content=current.html();$.ajax({url:RP_Property.ajax_url,type:"POST",dataType:"json",data:{action:'rp_status_agency',agent_id:agent_id,agent_type:agent_type},beforeSend:function(){current.html('<i class="fa fa-spinner fa-spin"></i>');},success:function(res){try{if('success'===res.status){if('active'===res.member_status){current.html('<i class="fa fa-toggle-on" aria-hidden="true"></i>');}else{current.html('<i class="fa fa-toggle-off" aria-hidden="true"></i>');}
current.data('type',res.member_status);}else{$.notifyBar({cssClass:'error',html:res.message,position:"bottom"});current.html(content);}}catch(err){$.notifyBar({cssClass:'error',html:err,position:"bottom"});}}});});},Login_Demo:function(){$(document).on('click','.login-demo',function(event){event.preventDefault();var current_event=$(this);$.ajax({url:RP_Property.ajax_url,type:"POST",dataType:"json",data:{action:'noo_login_demo'},beforeSend:function(){current_event.find('i').removeClass('fa-user');current_event.find('i').addClass('fa-spinner fa-spin');},success:function(response){try{window.location.href=response.url_redirect;}catch(err){alert(err);}}});});},Quick_View:function(){$('body').on('click','.btn-quick-view-popup',function(){var $this=$(this);$this.find('.fa').removeClass('.fa-eye').addClass('fa-circle-o-notch fa-spin');$.ajax({type:'POST',dataType:'json',url:RP_Property.ajax_url,data:{action:'noo_quick_view_property_buy',security:RP_Property.security,p_id:$this.data('id')},success:function(data){if(data.success==true){$this.removeClass('loading');var $modal=$(data.html);$('body').append($modal);$modal.modal('show').on('shown.bs.modal',function(event){var gallery=$(document).find('.property-gallery-top');gallery.slick({slidesToShow:1,slidesToScroll:1,arrows:true,dots:true,fade:true,adaptiveHeight:true});}).on('hidden.bs.modal',function(event){$('body').find('#modalPropertyBuy').remove();});$this.find('.fa').removeClass('fa-circle-o-notch fa-spin').addClass('fa-eye');}},complete:function(){},error:function(){}});return false;});},Live_Search_Property:function(){var form_live=$('.noo-live-search');if(form_live.length>0){var elm_live_search=$('.noo-property-live-search');var ajax_count=0;form_live.on('change','input, select, textarea',function(event){elm_live_search.find('.noo-list-property').fadeOut();$.ajax({url:RP_Property.ajax_url,type:"POST",dataType:"json",data:form_live.serialize(),beforeSend:function(){ajax_count++;elm_live_search.find('.noo_result').html('<div class="noo-spin"><i class="fa fa-circle-o-notch fa-spin"</i></div>');},success:function(response){try{ajax_count--;if(0==ajax_count&&response.status==='success'){elm_live_search.find('.noo-pagination').hide();if(''!=response.content){elm_live_search.find('.noo_result').empty().html(response.content);}}}catch(err){alert(err);}
elm_live_search.unblock();}});});}},Property_Set_Featured:function(){$('body').on('click','.noo-property-set-featured',function(){var $this=$(this);$this.find('i').removeClass('fa-star');$this.find('i').addClass('fa-circle-o-notch fa-spin');$.ajax({type:'POST',dataType:'json',url:RP_Property.ajax_url,data:{action:'noo_ajax_property_set_featured',property_id:$this.data('id')},success:function(data){$this.find('i').removeClass('fa-circle-o-notch fa-spin');$this.find('i').addClass('fa-star');if(data.success==true){if(data.current_action=='set_feature'){$this.addClass('featured');}else{$this.removeClass('featured');}
$.notifyBar({cssClass:'success',html:data.message,position:"bottom"});}else{$.notifyBar({cssClass:'error',html:data.message,position:"bottom"});}},complete:function(){},error:function(){}});return false;});},Property_Set_Sold:function(){$('body').on('click','.noo-property-set-sold',function(){var $this=$(this);$this.find('i').removeClass('fa-star');$this.find('i').addClass('fa-circle-o-notch fa-spin');$.ajax({type:'POST',dataType:'json',url:RP_Property.ajax_url,data:{action:'noo_ajax_property_sold',property_id:$this.data('id')},success:function(data){$this.find('i').removeClass('fa-circle-o-notch fa-spin');$this.find('i').addClass('fa-star');if(data.success==true){if(data.current_action=='set_sold'){$this.addClass('sold');}else{$this.removeClass('sold');}
$.notifyBar({cssClass:'success',html:data.message,position:"bottom"});}else{$.notifyBar({cssClass:'error',html:data.message,position:"bottom"});}},complete:function(){},error:function(){}});return false;});},}
NOO_RP_SUPPORT.Property_Featured();NOO_RP_SUPPORT.Modal_View_Statistics();NOO_RP_SUPPORT.Modal_Add_Alert();NOO_RP_SUPPORT.Modal_Submit_Alert();NOO_RP_SUPPORT.Statistics_Init();NOO_RP_SUPPORT.Request_Viewing_Ajax();NOO_RP_SUPPORT.Requested_Viewings_Show_Message();NOO_RP_SUPPORT.Request_Viewing_Mark_Complete_Ajax();NOO_RP_SUPPORT.ToolTip_Init();NOO_RP_SUPPORT.Sidebar_Sticky_Init();NOO_RP_SUPPORT.Quick_View();NOO_RP_SUPPORT.Property_Set_Featured();NOO_RP_SUPPORT.Property_Set_Sold();NOO_RP_SUPPORT.LoadMore();if(typeof datetimepicker!='undefined'){$('.rp-field-item-date').datetimepicker({format:'d-m-Y H:i',});}
var current=1;var form=$("#rp-property-submit");var formStep=$(".noo-form-step");var tabStep=$(".noo-tab-step span");var btnnext=$(".noo-form-btn-next");var btnback=$(".noo-form-btn-back");var btnsubmit=$(".noo-form-btn-submit");var errorBlock=$(".validate-errors");if(form.length>0){form.validate({ignore:":hidden:not(.submit-form-wrap .noo-form-step.active)",errorPlacement:function(error,element){return false;},});}
var hideButtons=function(current){var limit=parseInt(formStep.length);$("#rp-property-submit .rp-property-action").hide();if(current<limit){btnnext.show();btnsubmit.hide();}
if(current>1)btnback.show();if(current==limit){btnnext.hide();btnsubmit.show();}};hideButtons(current);var tabClassActive=function(current){tabStep.removeClass('active');tabStep.eq(current-1).addClass('active');};tabClassActive(current);btnnext.click(function(){$("#rp-property-submit").animate({scrollTop:0},"slow");var valid=form.valid();if(current<formStep.length){if(form.valid()){formStep.removeClass('active').css({display:'none'});formStep.eq(current++).addClass('active').css({display:'block'});errorBlock.hide();}else{$("html, body").animate({scrollTop:$('.noo-page-main-dashboard').offset().top-92},'slow');errorBlock.show();}}
hideButtons(current);tabClassActive(current);});btnback.click(function(){if(current>1){current=current-2;if(current<formStep.length){formStep.removeClass('active').css({display:'none'});formStep.eq(current++).addClass('active').css({display:'block'});}}
hideButtons(current);tabClassActive(current);});$("#noo_additional_details").sortable({revert:100,placeholder:"detail-placeholder",handle:".sort-additional-row",cursor:"move"});$('.add-additional-row').click(function(e){e.preventDefault();var numVal=$(this).data("increment")+1;$(this).data('increment',numVal);$(this).attr({"data-increment":numVal});var newAdditionalDetail='<tr>'+
'<td class="action-field">'+
'<span class="sort-additional-row"><i class="fa fa-navicon"></i></span>'+
'</td>'+
'<td class="field-title">'+
'<input class="noo-ft-field" type="text" name="rp_additional_features['+numVal+'][additional_feature_label]" id="additional_feature_label_'+numVal+'" value="">'+
'</td>'+
'<td>'+
'<input class="noo-ft-field" type="text" name="rp_additional_features['+numVal+'][additional_feature_value]" id="additional_feature_value_'+numVal+'" value="">'+
'</td>'+
'<td class="action-field">'+
'<span data-remove="'+numVal+'" class="remove-additional-row"><i class="fa fa-remove"></i></span>'+
'</td>'+
'</tr>';$('#noo_additional_details').append(newAdditionalDetail);removeAdditionalDetails();});var removeAdditionalDetails=function(){$('.remove-additional-row').click(function(event){event.preventDefault();var $this=$(this);$this.closest('tr').remove();});}
removeAdditionalDetails();$(window).bind('beforeunload',function(){$('.header-logo > a').addClass('loading');});function noo_print_invoice(){$('.btn-print-invoice').click(function(){var invoice=$(this).data('invoice');var printInvoiceWindow=window.open('','','width=700 ,height=842');$.ajax({url:noo_framework_app.ajax_url,type:'POST',dataType:'html',data:{action:'noo_create_print_invoice',invoice:invoice,},success:function(data_print){try{printInvoiceWindow.document.write(data_print);printInvoiceWindow.document.close();printInvoiceWindow.focus();}catch(e){}}});return false;});}
noo_print_invoice();$('.noo-contact-type-label').click(function(){$('.list-agents').addClass('hide');if($(this).hasClass('lb-agent')){$('.list-agents').removeClass('hide');$('.list-agents').addClass('active');}})})(jQuery);