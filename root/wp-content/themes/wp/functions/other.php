<?php
/* ===============================================================================
  その他
=============================================================================== */

// add_filter( 'site_url', 'wpse_381006_custom_site_url', 10, 1 );

// function wpse_381006_custom_site_url( $url ){
//     if( is_admin() ) // you probably don't want this in admin side
//         return $url;

//     // $domain_local = 'webshop.local';
//     // $host = $_SERVER['HTTP_HOST'];
    
//     // // is server
//     // if (strstr($domain_local, $host) !== false) {
//     // var_dump(strstr($host, $domain_local));die;

//     //   return '/index.php'. $_SERVER['REQUEST_URI'];
//     // }
  
//     return 'data/'.$_SERVER['REQUEST_URI'];
// }


// MWForm custom error
add_filter( 'mwform_content_wpautop_mw-wp-form-99', '__return_false' );

function mytheme_mwform_error_message( $error, $key, $rule ) {

	$errors = array(
		'yourname'    => array( 'noempty' => 'Tên của bạn không được để trống' ),
		'phone'             => array( 'noempty' => 'Số điện thoại bắt buộc nhập' ),
		'message'    => array( 'noempty' => 'Nội dung bắt buộc nhập' ),
	);

	if ( isset( $errors[ $key ][ $rule ] ) ) {
		return $errors[ $key ][ $rule ];
	}

	return $error;
}

add_filter( 'mwform_error_message_mw-wp-form-99', 'mytheme_mwform_error_message', 10, 3 );
