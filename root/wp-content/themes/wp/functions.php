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

update_option( 'siteurl', 'http://159.89.80.74' );
update_option( 'home', 'http://159.89.80.74' );
