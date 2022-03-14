<?php
class MWS_Functions {

////////////////////////////////////////////////
// WP設定を変更
////////////////////////////////////////////////
public static function wp_setting() {
	self::remove_wp_version();
	self::remove_comment_feed();
	self::remove_rsd_url();
	self::remove_admin_bar();
	self::remove_admin_footer();
	self::remove_update_wpcore();
	self::remove_update_plugin();
	self::remove_admin_help();
	self::remove_content_wpautop();
	self::remove_rest_api();
	self::remove_embed();
	self::remove_admin_menu();
	self::remove_dashbord();
	self::remove_emoji();
	self::remove_self_ping();
	self::admin_bar_menus();
	self::add_editor_css();
}

////////////////////////////////////////////////
// WP管理画面サイドにメニュー追加
////////////////////////////////////////////////
public static function add_plugin_admin_menu() {
	 add_menu_page(
		  MWS_Config::PAGE_TITLE,
		  MWS_Config::MENU_TITLE,
		  MWS_Config::CAPABILITY,
		  MWS_Config::SLUG,
		  'MWS_Page::display_plugin_admin_page',
		  MWS_Config::ICON_URL,
		  MWS_Config::MENU_POSITION
	 );

	// プラグインページにCSSとJSを表示
	add_action('admin_head', function(){
	    wp_enqueue_style('mws-style', plugins_url('../assets/css/style.css', __FILE__));
	    wp_enqueue_script('mws-js', plugins_url('../assets/js/function.js', __FILE__));
	});

}

////////////////////////////////////////////////
// チェックボックスの値をoptionへ格納
////////////////////////////////////////////////
public function post_update_option($post_data) {
	$post_data = stripslashes_deep($post_data);
	update_option('mws_option', $post_data);
}

////////////////////////////////////////////////
// optionの値を取り出す - 単品
////////////////////////////////////////////////
public static function get_option_item($key) {
	$option = get_option('mws_option');
	if(!empty($option)){
		if(array_key_exists($key, $option)){
			return $option[$key];
		}else{
			return false;
		}
	}
}

////////////////////////////////////////////////
// 管理画面 設定ページ HTMLテンプレート
////////////////////////////////////////////////
public function page_html_tmpl($title, $label, $option_name) {
	$html = '';
	$html .= '<tr>';
	$html .= "<th>{$title}</th>";
	$html .= '<td>';
	$html .= "<input type='hidden' name='{$option_name}' value='0'>";
	$html .= '<label>';
	$html .= "<input name='{$option_name}' type='checkbox' value='1' ".checked( 1, self::get_option_item($option_name), false).">";
	$html .= $label;
	$html .= '</label>';
	$html .= '</td>';
	$html .= '</tr>';
	echo $html;
}

////////////////////////////////////////////////
// 管理画面 設定ページ 保存メッセージ
////////////////////////////////////////////////
public static function page_html_savemessage() {
	echo '<div id="setting-error-settings_updated" class="updated settings-error notice is-dismissible mws-message"><p><strong>設定を保存しました。</strong></p></div>';
}

////////////////////////////////////////////////
// WPバージョンを消す
////////////////////////////////////////////////
private static function remove_wp_version() {
	if(self::get_option_item(MWS_Config::OPTION_WP_VERSION)){
		remove_action('wp_head', 'wp_generator');
		foreach ( array( 'rss2_head', 'commentsrss2_head', 'rss_head', 'rdf_header', 'atom_head', 'comments_atom_head', 'opml_head', 'app_head' ) as $action ) {
			remove_action( $action, 'the_generator' );
		}
	}
}

////////////////////////////////////////////////
// コメントフィードを削除
////////////////////////////////////////////////
private static function remove_comment_feed() {
	if(self::get_option_item(MWS_Config::OPTION_COMMENT_FEED)){
		remove_action('wp_head', 'feed_links_extra', 3);
		add_filter('feed_links_show_comments_feed', '__return_false' );
		add_action('parse_query', 'remove_comment_feed_action');
	}
	function remove_comment_feed_action() {
	    if ( is_comment_feed() ) {
	        remove_action('do_feed_rdf', 'do_feed_rdf');
	        remove_action('do_feed_rss', 'do_feed_rss');
	        remove_action('do_feed_rss2', 'do_feed_rss2');
	        remove_action('do_feed_atom', 'do_feed_atom');
	    }
	}
}

////////////////////////////////////////////////
// <head>内の外部投稿URL
////////////////////////////////////////////////
private static function remove_rsd_url() {
	if(self::get_option_item(MWS_Config::OPTION_RSD_URL)){
		remove_action('wp_head', 'wlwmanifest_link');
		remove_action('wp_head', 'rsd_link');
	}
}

////////////////////////////////////////////////
// Admin bar
////////////////////////////////////////////////
private static function remove_admin_bar() {
	if(self::get_option_item(MWS_Config::OPTION_ADMIN_BAR)){
		add_filter( 'show_admin_bar', '__return_false' );
	}
}

////////////////////////////////////////////////
// 管理画面のフッター
////////////////////////////////////////////////
private static function remove_admin_footer() {
	if(self::get_option_item(MWS_Config::OPTION_ADMIN_FOOTER)){
		function remove_footer_version() {
		    remove_filter('update_footer','core_update_footer');
		}
		add_action('admin_menu','remove_footer_version');
		add_filter('admin_footer_text','__return_empty_string');
	}
}

////////////////////////////////////////////////
// 更新通知 WP本体
////////////////////////////////////////////////
private static function remove_update_wpcore() {
	if(self::get_option_item(MWS_Config::OPTION_UPDATE_WPCORE)){
		remove_action ('wp_version_check','wp_version_check');
		remove_action ('admin_init','_maybe_update_core');
	}
}

////////////////////////////////////////////////
// 更新通知 プラグイン
////////////////////////////////////////////////
private static function remove_update_plugin() {
	if(self::get_option_item(MWS_Config::OPTION_UPDATE_PLUGIN)){
		function remove_core_updates(){
			global $wp_version;return(object) array('last_checked'=> time(),'version_checked'=> $wp_version,);
		}
		add_filter('pre_site_transient_update_core','remove_core_updates');
		add_filter('pre_site_transient_update_plugins','remove_core_updates');
		add_filter('pre_site_transient_update_themes','remove_core_updates');
	}
}

////////////////////////////////////////////////
// 管理画面右上のヘルプ
////////////////////////////////////////////////
private static function remove_admin_help() {
	if(self::get_option_item(MWS_Config::OPTION_ADMIN_HELP)){
		add_action('admin_head', function(){
		    echo '<style type="text/css">
		            #contextual-help-link-wrap {display: none !important;}
		          </style>';
		});
	}
}

////////////////////////////////////////////////
// エディターにCSS適用
////////////////////////////////////////////////
private static function add_editor_css() {
	if(self::get_option_item(MWS_Config::OPTION_EDITOR_CSS)){
		add_action( 'after_setup_theme', function(){
			add_editor_style('style.css');
		});
	}
}

////////////////////////////////////////////////
// 本文の自動整形を外す
////////////////////////////////////////////////
private static function remove_content_wpautop() {
	if(self::get_option_item(MWS_Config::OPTION_CONTENT_WPAUTOP)){
		remove_filter('the_content', 'wpautop');
	}
}

////////////////////////////////////////////////
// 一部を除きREST APIを無効
////////////////////////////////////////////////
private static function remove_rest_api() {

	if(self::get_option_item(MWS_Config::OPTION_REST_API)){

		// /index.php?rest_route= を空にする
		function nendebcom_deny_restapi_except_embed( $result, $wp_rest_server, $request ){

		    $namespaces = $request->get_route();

		    // /oembed/1.0
		    if( strpos( $namespaces, 'oembed/' ) === 1 ){
		        return $result;
		    }

		    // /jetpack/v4
		    if( strpos( $namespaces, 'jetpack/' ) === 1 ){
		        return $result;
		    }

		    //contact form 7 (Ver4.7～)
		    if( strpos( $namespaces, 'contact-form-7/' ) === 1 ){
		        return $result;
		    }

		    //Gutenberg (Ver4.9?～)
		    if ( current_user_can( 'edit_posts' ) ) {
		        return $result;
		    }

		    return new WP_Error( 'rest_disabled', __( 'The REST API on this site has been disabled.' ), array( 'status' => rest_authorization_required_code() ) );
		}
		add_filter( 'rest_pre_dispatch', 'nendebcom_deny_restapi_except_embed', 10, 3 );

	}

	// <head>内のリンクを削除
	remove_action('wp_head','rest_output_link_wp_head');

}

////////////////////////////////////////////////
// Embed関連を外す
////////////////////////////////////////////////
private static function remove_embed() {
	if(self::get_option_item(MWS_Config::OPTION_EMBED)){
		remove_action('wp_head','rest_output_link_wp_head');
		remove_action('wp_head','wp_oembed_add_discovery_links');
		remove_action('wp_head','wp_oembed_add_host_js');
	}
}

////////////////////////////////////////////////
// 絵文字関連を外す
////////////////////////////////////////////////
private static function remove_emoji() {
	if(self::get_option_item(MWS_Config::OPTION_EMOJI)){
		remove_action('wp_head', 'print_emoji_detection_script', 7);
		remove_action('admin_print_scripts', 'print_emoji_detection_script');
		remove_action('wp_print_styles', 'print_emoji_styles' );
		remove_action('admin_print_styles', 'print_emoji_styles');
	}
}

////////////////////////////////////////////////
// 管理画面 メニュー
////////////////////////////////////////////////
private static function remove_admin_menu() {

	function my_wp_setting_remove_menus () {
		//remove_submenu_page('edit.php', 'edit-tags.php?taxonomy=post_tag'); // 投稿 -> タグ
		//remove_menu_page('edit.php'); // 投稿
		//remove_menu_page('tools.php'); // ツール
		//remove_menu_page('edit.php?post_type=page'); // 固定ページ
		//remove_menu_page('themes.php'); // 外観
		//remove_menu_page('plugins.php'); // プラグイン
		//remove_menu_page('options-general.php'); // 設定
		remove_menu_page('link-manager.php'); // リンク

		if(MWS_Functions::get_option_item(MWS_Config::OPTION_ADMIN_MENU_COMMENT)){
			remove_menu_page('edit-comments.php'); // コメント
		}
		if(MWS_Functions::get_option_item(MWS_Config::OPTION_ADMIN_MENU_PRIVACY)){
			remove_submenu_page( 'tools.php', 'export_personal_data' ); // ツール「個人データのエクスポート」を非表示
			remove_submenu_page( 'tools.php', 'remove_personal_data' ); // ツール「個人データの削除」を非表示
			remove_submenu_page( 'options-general.php', 'privacy.php' ); // 設定「プライバシー」を非表示
		}

		global $menu;
	}

	//if(!current_user_can('administrator')){
		add_action('admin_menu', 'my_wp_setting_remove_menus',999);
	//}

}

////////////////////////////////////////////////
// ダッシュボード
////////////////////////////////////////////////
private static function remove_dashbord() {

	if(MWS_Functions::get_option_item(MWS_Config::OPTION_ADMIN_DASHBORD)){
		add_action('wp_dashboard_setup', function(){
			remove_action( 'welcome_panel', 'wp_welcome_panel' ); //WordPressへようこそ
			remove_meta_box( 'dashboard_incoming_links', 'dashboard', 'normal' );
			remove_meta_box( 'dashboard_plugins', 'dashboard', 'normal' ); //WordPressニュースなど
			remove_meta_box( 'dashboard_primary', 'dashboard', 'side' );
			remove_meta_box( 'dashboard_secondary', 'dashboard', 'normal' );
			remove_meta_box( 'dashboard_quick_press', 'dashboard', 'side' ); //クイックドラフト
			remove_meta_box( 'dashboard_recent_drafts', 'dashboard', 'side' );
			remove_meta_box( 'dashboard_recent_comments', 'dashboard', 'normal' ); //コメント
			remove_meta_box( 'dashboard_right_now', 'dashboard', 'normal' );
			remove_meta_box( 'dashboard_activity', 'dashboard', 'normal'); //アクティビティ

			// 点線も非表示に
			echo '<style type="text/css">
			.empty-container{ border:0px !important}
			.metabox-holder .postbox-container .empty-container {display: none;}
			</style>';

		});
	}

}

////////////////////////////////////////////////
// 管理画面のAdmin bar
////////////////////////////////////////////////
private static function admin_bar_menus() {

	if(MWS_Functions::get_option_item(MWS_Config::OPTION_ADMIN_BAR_MENU)){

		add_action('admin_bar_menu', function(){
		global $wp_admin_bar;
		    $wp_admin_bar->remove_menu( 'wp-logo' );      // ロゴ
		    //$wp_admin_bar->remove_menu( 'site-name' );    // サイト名
		    $wp_admin_bar->remove_menu( 'view-site' );    // サイト名 -> サイトを表示
		    $wp_admin_bar->remove_menu( 'dashboard' );    // サイト名 -> ダッシュボード (公開側)
		    $wp_admin_bar->remove_menu( 'themes' );       // サイト名 -> テーマ (公開側)
		    $wp_admin_bar->remove_menu( 'customize' );    // サイト名 -> カスタマイズ (公開側)
		    $wp_admin_bar->remove_menu( 'comments' );     // コメント
		    $wp_admin_bar->remove_menu( 'updates' );      // 更新
		    $wp_admin_bar->remove_menu( 'view' );         // 投稿を表示
		    $wp_admin_bar->remove_menu( 'new-content' );  // 新規
		    $wp_admin_bar->remove_menu( 'new-post' );     // 新規 -> 投稿
		    $wp_admin_bar->remove_menu( 'new-media' );    // 新規 -> メディア
		    $wp_admin_bar->remove_menu( 'new-link' );     // 新規 -> リンク
		    $wp_admin_bar->remove_menu( 'new-page' );     // 新規 -> 固定ページ
		    $wp_admin_bar->remove_menu( 'new-user' );     // 新規 -> ユーザー
		    //$wp_admin_bar->remove_menu( 'my-account' );   // マイアカウント
		    $wp_admin_bar->remove_menu( 'user-info' );    // マイアカウント -> プロフィール
		    $wp_admin_bar->remove_menu( 'edit-profile' ); // マイアカウント -> プロフィール編集
		    //$wp_admin_bar->remove_menu( 'logout' );       // マイアカウント -> ログアウト
		    $wp_admin_bar->remove_menu( 'search' );       // 検索 (公開側)
		}, 201);

	}

}

////////////////////////////////////////////////
// セルフピンバックを停止
////////////////////////////////////////////////
private static function remove_self_ping() {
	if(MWS_Functions::get_option_item(MWS_Config::OPTION_SELF_PING)){
		function no_self_ping( &$links ) {
			echo "aaaaa";
		    $home = get_option( 'home' );
		    foreach ( $links as $l => $link )
		        if ( 0 === strpos( $link, $home ) )
		            unset($links[$l]);
		}
		add_action( 'pre_ping', 'no_self_ping' );
	}
}

}
