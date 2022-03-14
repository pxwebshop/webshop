<?php global $page_id; ?>
<!doctype html>
<html lang="ja">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no, shrink-to-fit=no">
	<meta http-equiv="X-UA-Compatible" content="ie=edge">

	<?php include( get_template_directory() . '/libs/meta.php' ); ?>

	<?php wp_head(); ?>

	<link href="<?php bloginfo( 'template_url' ); ?>/assets/img/common/favicon.ico" rel="shortcut icon">
	<link href="<?php bloginfo( 'template_url' ); ?>/assets/img/common/apple-touch-icon.png" rel="apple-touch-icon">

	<?php if ( $page_id == 'index' ): ?>
		<link href="<?php bloginfo( 'template_url' ); ?>/assets/js/slick/slick.css" rel="stylesheet" media="all">
		<link href="<?php bloginfo( 'template_url' ); ?>/assets/js/slick/slick-theme.css" rel="stylesheet" media="all">
	<?php endif; ?>

	<link href="<?php bloginfo( 'template_url' ); ?>/assets/css/style.css" rel="stylesheet" media="all">

</head>
<body class="page-<?php echo $page_id; ?>">

<div class="wrapper" id="wrapper">

	<header class="header" id="header">
		header
	</header><!--End .header-->
