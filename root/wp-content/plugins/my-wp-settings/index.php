<?php
/*
Plugin Name: My WP Settings
Description: Wordpress設定を切り替えます
Version: 30.0.0
License: GPL2
*/

include_once( plugin_dir_path( __FILE__ ) . 'class/config.php' );
include_once( plugin_dir_path( __FILE__ ) . 'class/functions.php' );
include_once( plugin_dir_path( __FILE__ ) . 'class/page.php' );

if (!class_exists('My_Wp_Settings')){
class My_Wp_Settings{

////////////////////////////////////////////////
// Construct
////////////////////////////////////////////////
function __construct(){

    // 管理画面にメニュー追加
    if(is_admin()) {
        add_action('admin_menu', 'MWS_Functions::add_plugin_admin_menu');
	}

    // WP設定反映
	MWS_Functions::wp_setting();

    // プラグインが有効化されたときに実行
    if (function_exists('register_activation_hook')){
        register_activation_hook(__FILE__, array(&$this, 'activationHook'));
    }

    // プラグインが停止されたときに実行
    if (function_exists('register_deactivation_hook')){
        register_deactivation_hook(__FILE__, array(&$this, 'deactivationHook'));
    }

    // プラグインが削除されたときに実行
    if (function_exists('register_uninstall_hook')){
        register_uninstall_hook(__FILE__, array('My_Wp_Settings::uninstallHook'));
    }

}

////////////////////////////////////////////////
// プラグインが有効化されたときに実行
////////////////////////////////////////////////
public function activationHook(){
}

////////////////////////////////////////////////
// プラグインが停止されたときに実行
////////////////////////////////////////////////
public function deactivationHook(){
}

////////////////////////////////////////////////
// プラグインが削除されたときに実行
////////////////////////////////////////////////
public function uninstallHook(){
}

}}

$My_Wp_Settings = new My_Wp_Settings();