jQuery(document).ready(function(){	
	jQuery('.kaka').click(function() {		
	});
	var anhdanhmuc = jQuery('.wrap_danh_muc .vc_column-inner .wpb_single_image').size();
	for (var i = 1; i <= anhdanhmuc; i++) {
		var link = jQuery('.wrap_danh_muc .vc_column-inner .wpb_single_image:nth-child('+i+') .wpb_wrapper > a').attr('href');
		jQuery('.wrap_danh_muc .vc_column-inner .wpb_single_image:nth-child('+i+') .wpb_wrapper .wpb_heading').wrapInner('<a href="'+link+'"></a>');
	};
	var height_sidebar = jQuery('.main-content').height();
	jQuery('.sidebar.left-sidebar .sidebar-content').css('height',height_sidebar);
});

 