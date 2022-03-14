<?php
class MWS_Page {

////////////////////////////////////////////////
// プラグインの設定ページ
////////////////////////////////////////////////
public static function display_plugin_admin_page() {

	$Function = new MWS_Functions();

	if (!empty($_POST)) {
		$Function->post_update_option($_POST);
		$Function->page_html_savemessage();
	}

?>

<main id="mws-index">
<form method="post" action="">

	<h1>&lt;head>内</h1>
	<table>
		<?php
		$Function->page_html_tmpl('&lt;head&gt;内のWPバージョン', '表示しない', MWS_Config::OPTION_WP_VERSION);
		$Function->page_html_tmpl('&lt;head&gt;内の外部投稿URL', '出力しない', MWS_Config::OPTION_RSD_URL);
		$Function->page_html_tmpl('絵文字関連', '外す', MWS_Config::OPTION_EMOJI);
		$Function->page_html_tmpl('Embed関連', '外す', MWS_Config::OPTION_EMBED);
		$Function->page_html_tmpl('コメントのフィード', '出力しない', MWS_Config::OPTION_COMMENT_FEED);
		$Function->page_html_tmpl('oEmbed、Jetpack、Contact Form 7以外のREST API', '無効にする', MWS_Config::OPTION_REST_API);
		?>
	</table>

	<h1>更新通知</h1>
	<table>
		<?php
		$Function->page_html_tmpl('WP本体の更新通知', '表示しない', MWS_Config::OPTION_UPDATE_WPCORE);
		$Function->page_html_tmpl('プラグインの更新通知', '表示しない', MWS_Config::OPTION_UPDATE_PLUGIN);
		?>
	</table>

	<h1>管理画面</h1>
	<table>
		<?php
		$Function->page_html_tmpl('ダッシュボードに何も表示しない', '表示しない', MWS_Config::OPTION_ADMIN_DASHBORD);
		$Function->page_html_tmpl('管理画面のAdmin bar', 'シンプルにする', MWS_Config::OPTION_ADMIN_BAR_MENU);
		$Function->page_html_tmpl('管理画面右上のヘルプ', '表示しない', MWS_Config::OPTION_ADMIN_HELP);
		$Function->page_html_tmpl('管理画面のフッター', '表示しない', MWS_Config::OPTION_ADMIN_FOOTER);
		$Function->page_html_tmpl('エディターにCSS適用', '適用する', MWS_Config::OPTION_EDITOR_CSS);
		$Function->page_html_tmpl('メニューからコメントを外す', '外す', MWS_Config::OPTION_ADMIN_MENU_COMMENT);
		$Function->page_html_tmpl('メニューからプライバシー関連を外す', '外す', MWS_Config::OPTION_ADMIN_MENU_PRIVACY);
		?>
	</table>

	<h1>ほか</h1>
	<table>
		<?php
		$Function->page_html_tmpl('全ユーザーのAdmin Bar', '表示しない', MWS_Config::OPTION_ADMIN_BAR);
		$Function->page_html_tmpl('本文の自動整形', '外す', MWS_Config::OPTION_CONTENT_WPAUTOP);
		$Function->page_html_tmpl('セルフピンバック', '停止する', MWS_Config::OPTION_SELF_PING);
		?>
	</table>

	<div class="btn">
		<div class="btn__block">
			<div class="button is-allcheck">全てにチェックを入れる</div>
		</div>
		<div class="btn__block">
			<?php submit_button(); ?>
		</div>
	</div>

</form>
</main>

<?php }


}