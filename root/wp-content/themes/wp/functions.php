<?php
/* ===============================================================================
  総合設定ファイル
=============================================================================== */

/* 1.ディレクトリ設定
------------------------------------------------------------------------------- */
$templatepath = get_template_directory();

define('T_FUNCTIONS', $templatepath . '/functions/');
define('T_LIBS', $templatepath . '/libs/');
define('T_THEME', get_template_directory_uri());

/* 2.必須インクルードファイル
------------------------------------------------------------------------------- */
/* ----- 管理画面設定ファイル ----- */
if (is_admin()) {
  include_once(T_FUNCTIONS . '/admin.php');
}

/* ----- カスタム投稿設定ファイル ----- */
include_once(T_FUNCTIONS . '/custom_post_type.php');

/* ----- ショートコード ----- */
include_once(T_FUNCTIONS . '/shortcodes.php');

/* ----- ループ ----- */
include_once(T_FUNCTIONS . '/loop.php');

/* ----- メディア ----- */
include_once(T_FUNCTIONS . '/media.php');

/* ----- その他 ----- */
include_once(T_FUNCTIONS . '/other.php');


function custom_excerpt_length($length)
{
  return 40;
}
add_filter('excerpt_length', 'custom_excerpt_length', 999);

// function max_title_length($title)
// {
//   $max = 40;
//   if (strlen($title) > $max) {
//     return substr($title, 0, $max) . " &hellip;";
//   } else {
//     return $title;
//   }
// }
// add_filter('the_title', 'max_title_length');

add_action('admin_menu', 'remove_default_post_type');

function remove_default_post_type()
{
  remove_menu_page('edit.php');
}

add_filter('post_thumbnail_html', 'post_thumbnail');

function post_thumbnail($html)
{
  if (empty($html))
    $html = '<img src="' . trailingslashit(get_stylesheet_directory_uri()) .
      '/assets/default.png' . '" alt="" />';
  return $html;
}

