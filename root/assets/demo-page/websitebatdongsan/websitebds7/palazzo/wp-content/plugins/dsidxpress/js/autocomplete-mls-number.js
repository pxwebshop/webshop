jQuery().ready(function($){var omnibox=$('.dsidx-search-omnibox-autocomplete-mls-number');var selectedLocations=$('#dsidx-selected-search-mls-number');var searchLocationsText=$('#dsidx-search-mls-number');if(omnibox.length>0){$('.dsidx-search-omnibox-autocomplete-mls-number').each(function(){$(this).autocomplete({source:function(request,callback){var term=request.term;showLoader(this.element[0]);$.ajax({type:'post',url:dsidxAjaxHandler.ajaxurl,data:{'action':'dsidx_client_assist','dsidx_action':'AutoCompleteMlsNumber','term':request.term},dataType:'json',success:function(data,textStatus){if($.isEmptyObject(data)){data=[{'Name':'No MLS numbers found','Type':'Error'}];}
hideLoader();callback(data);},error:function(response){console.log('nope');data=[{'Name':'ERRR No MLS numbers found','Type':'Error'}];hideLoader();callback(data);}});},select:function(event,ui){if(ui.item.Type!='Error'){searchLocationsText=this;redirectToPDP(ui.item);}
return false;},selectFirst:true,}).data("ui-autocomplete")._renderItem=function(ul,item){return $('<li>').data('ui-autocomplete-item',item).append('<a>'+item.Name+'</a>').appendTo(ul);}});$('ul.ui-autocomplete').addClass('dsidx-ui-widget');}
function showLoader(sourceElement)
{$("#dsidx-autocomplete-spinner-guided-search").css("display","block");}
function hideLoader()
{$("#dsidx-autocomplete-spinner-guided-search").css("display","none");}
function redirectToPDP(item)
{var idx_pos=window.location.pathname.indexOf('/idx');if(idx_pos>-1){var path=window.location.pathname.slice(0,idx_pos+5);var url=path+'mls-'+item.MlsNumber+'-';}else{var url=localdsidx.homeUrl+'/idx/mls-'+item.MlsNumber+'-';}
window.location=url;}});