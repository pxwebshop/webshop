<?php $page_id = get_post()->post_name; ?>
<?php get_header(); ?>

<?php
$layout_path = get_template_directory() . '/libs/page/' . $page_id . '.php';
if ( file_exists( $layout_path ) ) {
	//テンプレート埋め込み
	include( $layout_path );
} else {
	//管理画面で編集するページ
	while ( have_posts() ) {
		the_post();
		the_content();
	}
}
?>

<?php get_footer(); ?>
