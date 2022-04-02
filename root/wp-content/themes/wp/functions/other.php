<?php
/* ===============================================================================
  その他
=============================================================================== */

add_filter( 'site_url', 'wpse_381006_custom_site_url', 10, 1 );

function wpse_381006_custom_site_url( $url ){
    if( is_admin() ) // you probably don't want this in admin side
        return $url;

    $domain = [0 => 'webshop.local'];
    $host = $_SERVER['HTTP_HOST'];
    
    $not_local = array_search($host, $domain);
    if (empty($not_local)) {
      return '/index.php'. $_SERVER['REQUEST_URI'];
    }


    return $_SERVER['REQUEST_URI'];
}