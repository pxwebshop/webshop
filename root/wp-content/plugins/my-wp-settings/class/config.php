<?php
class MWS_Config {

////////////////////////////////////////////////
// 表示設定
////////////////////////////////////////////////

// プラグイン画面の<title>
const PAGE_TITLE = "My WP Settings";

// WP管理画面サイドメニューのタイトル
const MENU_TITLE = "My WP Settings";

// WP管理画面サイドメニューのアイコン
const ICON_URL = '';

// WP管理画面サイドメニューの表示位置
const MENU_POSITION = '81';

// プラグインの管理画面URL
const SLUG = 'my-wp-settings';


////////////////////////////////////////////////
// 権限
////////////////////////////////////////////////

// プラグインを操作できる権限
const CAPABILITY = 'administrator';


////////////////////////////////////////////////
// 設定チェックボックスのname および
// DBのwp_optionに登録する項目名
////////////////////////////////////////////////

// header footer
const OPTION_WP_VERSION = 'wp_version'; // WPバージョンを消す
const OPTION_COMMENT_FEED = 'comment_feed'; // コメントのフィードを出力しない
const OPTION_RSD_URL = 'rsd_url'; // <head>内の外部投稿URL
const OPTION_ADMIN_BAR = 'admin_bar'; // Admin Bar
const OPTION_REST_API = 'rest_api'; // 一部を除きREST APIを無効
const OPTION_EMBED = 'embed'; // Embed関連を外す
const OPTION_EMOJI = 'emoji'; // 絵文字を外す

// 本文
const OPTION_CONTENT_WPAUTOP = 'content_wpautop'; // 本文の自動整形を外す

// 管理画面
const OPTION_ADMIN_FOOTER = 'admin_footer'; // 管理画面フッター
const OPTION_UPDATE_WPCORE = 'update_wpcore'; // 更新通知 WP本体
const OPTION_UPDATE_PLUGIN = 'update_plugin'; // 更新通知 プラグイン
const OPTION_ADMIN_HELP = 'admin_help'; // 管理画面右上のヘルプ
const OPTION_EDITOR_CSS = 'editor_css'; // エディターにCSS適用
const OPTION_ADMIN_BAR_MENU = 'admin_bar_menus'; // 管理画面のAdmin bar

// 管理画面 メニュー
const OPTION_ADMIN_MENU_COMMENT = 'admin_menu_comment'; // コメント
const OPTION_ADMIN_MENU_PRIVACY = 'admin_menu_privacy'; // ツール内のプライバシー

// 管理画面 ダッシュボード
const OPTION_ADMIN_DASHBORD ='admin_dashbord'; // ダッシュボード

// ほか
const OPTION_SELF_PING ='self_ping'; // セルフピンバック

}


