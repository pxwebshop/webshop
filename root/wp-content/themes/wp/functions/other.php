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