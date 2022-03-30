jQuery().ready(function($){var cache={};var omnibox=$('.dsidx-search-omnibox-autocomplete');var selectedLocations=$('#dsidx-selected-search-locations');var searchLocationsText=$('#dsidx-search-location');var lstSelectedLocations=[];var lstSelectedAddresses=[];var lstSelectedZips=[];var lstSelectedCounties=[];var lstSelectedMLS=[];var lstSelectedCities=[];var lstSelectedCommunities=[];var lstSelectedTracts=[];lstSelectedLocations=populateIDXFilters("Location",lstSelectedLocations,searchLocationsText);lstSelectedAddresses=populateIDXFilters("Address",lstSelectedAddresses,searchLocationsText);lstSelectedZips=populateIDXFilters("Zip",lstSelectedZips,searchLocationsText);lstSelectedCounties=populateIDXFilters("County",lstSelectedCounties,searchLocationsText);lstSelectedMLS=populateIDXFilters("MLSNumber",lstSelectedMLS,searchLocationsText);lstSelectedCities=populateIDXFilters("City",lstSelectedCities,searchLocationsText);lstSelectedCommunities=populateIDXFilters("Community",lstSelectedCommunities,searchLocationsText);lstSelectedTracts=populateIDXFilters("Tract",lstSelectedTracts,searchLocationsText);if(omnibox.length>0){$('.dsidx-search-omnibox-autocomplete').each(function(){$(this).autocomplete({source:function(request,callback){var term=request.term;$(this.element).attr('name','idx-q-Locations');if(term in cache){if(lstSelectedLocations){var arrNonSelected=cache[term].filter(function(item){return lstSelectedLocations.indexOf(item.Name)===-1;});callback(arrNonSelected);return;}
if(lstSelectedAddresses){var arrNonSelected=cache[term].filter(function(item){return lstSelectedAddresses.indexOf(item.Name)===-1;});callback(arrNonSelected);return;}
if(lstSelectedZips){var arrNonSelected=cache[term].filter(function(item){return lstSelectedZips.indexOf(item.Name)===-1;});callback(arrNonSelected);return;}
if(lstSelectedCounties){var arrNonSelected=cache[term].filter(function(item){return lstSelectedCounties.indexOf(item.Name)===-1;});callback(arrNonSelected);return;}
if(lstSelectedMLS){var arrNonSelected=cache[term].filter(function(item){return lstSelectedMLS.indexOf(item.Name)===-1;});callback(arrNonSelected);return;}
if(lstSelectedCities){var arrNonSelected=cache[term].filter(function(item){return lstSelectedCities.indexOf(item.Name)===-1;});callback(arrNonSelected);return;}
if(lstSelectedCommunities){var arrNonSelected=cache[term].filter(function(item){return lstSelectedCommunities.indexOf(item.Name)===-1;});callback(arrNonSelected);return;}
if(lstSelectedTracts){var arrNonSelected=cache[term].filter(function(item){return lstSelectedTracts.indexOf(item.Name)===-1;});callback(arrNonSelected);return;}
callback(cache[term]);return;}
showLoader(this.element[0]);$.ajax({type:'post',url:dsidxAjaxHandler.ajaxurl,data:{'action':'dsidx_client_assist','dsidx_action':'AutoComplete','term':request.term},dataType:'json',success:function(data,textStatus){if($.isEmptyObject(data)){data=[{'Name':'No locations, addresses, or MLS numbers found','Type':'Error'}];}
cache[term]=data;hideLoader();callback(data);},error:function(response){console.log('nope');data=[{'Name':'ERRR No locations, addresses, or MLS numbers found','Type':'Error'}];hideLoader();callback(data);}});},select:function(event,ui){if(ui.item.Type!='Error'){searchLocationsText=this;var formid=this.form.id;if(ui.item.Type=='Listing'&&ui.item.SupportingInfo.indexOf('MLS Number;')!=-1){redirectToPDP(ui.item);}else if(ui.item.Type=='Listing'&&ui.item.SupportingInfo.indexOf('Address;')!=-1){redirectToPDP(ui.item);}else if(ui.item.Type=='County'){lstSelectedCounties=addFilterElement(ui.item.Name,ui.item.Type,lstSelectedCounties,searchLocationsText,null,formid);$('#dsidxpress-auto-listing-status').remove();}else if(ui.item.Type=='Zip'){lstSelectedZips=addFilterElement(ui.item.Name,ui.item.Type,lstSelectedZips,searchLocationsText,null,formid);$('#dsidxpress-auto-listing-status').remove();}else{lstSelected=addFilterElement(ui.item.Name,ui.item.Type,lstSelectedLocations,searchLocationsText,null,formid);$('#dsidxpress-auto-listing-status').remove();}
$(this).val('');}
return false;},selectFirst:true,}).data("ui-autocomplete")._renderItem=function(ul,item){var name=(item.Type=='County')?item.Name+' (County)':item.Name;return $('<li>').data('ui-autocomplete-item',item).append('<a>'+name+'</a>').appendTo(ul);}});$('ul.ui-autocomplete').addClass('dsidx-ui-widget');}});function addFilterElement(itemValue,filterType,lstSelected,searchLocationsText,isPageLoad,formid){var count=0;if(lstSelected&&lstSelected.length>0)
count=lstSelected.length;if(!searchLocationsText)
return;var hfPrefix='idx-q-Locations';if(filterType==='Address')
hfPrefix='idx-q-AddressMasks';else if(filterType==='Zip')
hfPrefix='idx-q-ZipCodes'
else if(filterType==='County')
hfPrefix='idx-q-Counties';else if(filterType==='MLSNumber')
hfPrefix='idx-q-MLSNumbers'
else if(filterType==='City')
hfPrefix='idx-q-Cities'
else if(filterType==='Community')
hfPrefix='idx-q-Communities'
else if(filterType==='Tract')
hfPrefix='idx-q-TractIdentifiers'
else
hfPrefix='idx-q-Locations';if(formid)
{var lstFieldsInForm=$("#"+formid+" input[name*='"+hfPrefix+"<']")
if(lstFieldsInForm)
count=lstFieldsInForm.length;}
addDIVTOUI(hfPrefix,searchLocationsText,count,itemValue,lstSelected);lstSelected.push(itemValue);var loadingWidget=getQueryString('idx-st');if(isPageLoad){addDIVTOUI(hfPrefix,$('#dsidx-resp-location-quick-search'),count,itemValue,lstSelected);}
return lstSelected;}
var getQueryString=function(field,url){var href=url?url:window.location.href;var reg=new RegExp('[?&]'+field+'=([^&#]*)','i');var string=reg.exec(href);return string?string[1]:null;};function addDIVTOUI(hfPrefix,searchLocationsText,count,itemValue,lstSelected)
{var appendHiddenField="<input type='hidden' name='"+hfPrefix+'<'+count+'>'+"' value=\""+itemValue+"\"/>";$("<div></div>").addClass("dsidx-selected-filter-location").text(itemValue).append($("<span name='"+hfPrefix+"'></span>").addClass("dsidx-btn-remove-location").text('×').click(function(){var item=$(this).parent();if(lstSelected){var textToRemove=this.parentNode.innerText.substring(0,this.parentNode.innerText.length-1);var removeIndex=lstSelected.indexOf(textToRemove);if(removeIndex!=-1)
lstSelected.splice(removeIndex,1)}
var pfx=$(this).attr("name");var parentFRM=this.closest('form');this.parentNode.parentNode.removeChild(this.parentNode);if(parentFRM){reArrangeFields(pfx,parentFRM.id);}
return false;})).insertBefore(searchLocationsText).append($(appendHiddenField));}
function populateIDXFilters(filterType,lstSelected,searchLocationsText)
{var pageURL=window.location.href;var isSavedSearch;var hfPrefix='idx-q-Locations';if(filterType==='Address')
hfPrefix='idx-q-AddressMasks';else if(filterType==='Zip')
hfPrefix='idx-q-ZipCodes'
else if(filterType==='County')
hfPrefix='idx-q-Counties';else if(filterType==='MLSNumber')
hfPrefix='idx-q-MLSNumbers'
else if(filterType==='City')
hfPrefix='idx-q-Cities'
else if(filterType==='Community')
hfPrefix='idx-q-Communities'
else if(filterType==='Tract')
hfPrefix='idx-q-TractIdentifiers'
else
hfPrefix='idx-q-Locations';var getParams=function(url){var params=[];var parser=document.createElement('a');parser.href=url;var query=parser.search.substring(1);var vars=query.split('&');for(var i=0;i<vars.length;i++){var pair=vars[i].split('=');var param={Key:pair[0].replace('%3C','[').replace('%3E',']'),Value:toProperCase(decodeURIComponent(pair[1]).replace(/\+/g,' '))};params.push(param);}
return params;};function toProperCase(string){return string.replace(/\w\S*/g,function(txt){return txt.charAt(0).toUpperCase()+txt.substr(1).toLowerCase();});};var lstParams=getParams(pageURL);isSavedSearch=lstParams.filter(function(element){return element.Key.indexOf("idx-q-PropertySearchID")!==-1;});lstParams=lstParams.filter(function(element){return element.Key.indexOf(hfPrefix)!==-1;});lstParams.forEach(element=>{if(element.Value!=""){addFilterElement(element.Value,filterType,lstSelected,searchLocationsText,true);}});if((!lstParams||lstParams.length==0)&&isSavedSearch)
getSaveSearchData(filterType,lstSelected,searchLocationsText);return lstSelected;}
function getSaveSearchData(filterType,lstSelected,searchLocationsText)
{var savedDataField=document.getElementById("dsidx-Saved-"+filterType);if(savedDataField)
{var savedData=savedDataField.value;savedData.split(',').forEach(function(item){addFilterElement(item,filterType,lstSelected,searchLocationsText,true);});}
return savedData;}
function showLoader(sourceElement)
{if(sourceElement.id=="dsidx-resp-location-quick-search")
$("#dsidx-autocomplete-spinner-quick-search").css("display","block");else
$("#dsidx-autocomplete-spinner-search").css("display","block");}
function hideLoader()
{$("#dsidx-autocomplete-spinner-search").css("display","none");$("#dsidx-autocomplete-spinner-quick-search").css("display","none");}
function redirectToPDP(item)
{var idx_pos=window.location.pathname.indexOf('/idx');if(idx_pos>-1){var path=window.location.pathname.slice(0,idx_pos+5);var url=path+'mls-'+item.MlsNumber+'-';}else{var url=localdsidx.homeUrl+'/idx/mls-'+item.MlsNumber+'-';}
if(item.SupportingInfo.indexOf('Address;')!=-1)
url=url+item.Name.replace(/ /g,"_");window.location=url;}
function reArrangeFields(hfPrefix,formid)
{var lstFields=$("#"+formid+" input[name*='"+hfPrefix+"<']")
for(x=0;x<lstFields.length;x++)
{var field=lstFields[x].name;var newName=hfPrefix+'<'+x+'>'
$(lstFields[x]).attr("name",newName);}}