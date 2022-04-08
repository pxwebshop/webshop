<!DOCTYPE html>
<html lang="en">

<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>ບໍລິສັດອອກແບບເວັບໄຊ, ອອກແບບໂປແກມທີ່ເປັນມືອາຊີບ - PXWebShop</title>
	<link rel="stylesheet" href="/assets/css/style.css">
	<script src="/assets/js/fontawesome.js" crossorigin="anonymous"></script>

	<link href="/assets/js/slick/slick.css" rel="stylesheet" media="all">
	<link href="/assets/js/slick/slick-theme.css" rel="stylesheet" media="all">

	<link href="/assets/css/aos.css" rel="stylesheet">
	<script src="/assets/js/aos.js"></script>

	<link rel='stylesheet' href='/assets/css/animate.min.css'>
	<script src='/assets/js/wow.min.js'></script>
</head>

<body>
	<!--▼ Header ▼-->
	<header class="c-header">
		<div class="c-header__top pc-only">
			<div class="l-container">
				<p class="c-header__nameCompany">PX WebShop</p>
				<ul class="c-header__address">
					<li class="c-header__address__item">
						<span><i class="fa-solid fa-envelope"></i> pxwebshop@gmail.com</span>
					</li>
					<li class="c-header__address__item">
						<a href="tel:0361.0214.01265"><i class="fa-solid fa-phone"></i> 020 28266650</a href="tel:">
					</li>
				</ul>
			</div>
		</div>
		<div class="c-header__gnav sp-only">
			<div class="c-header__logoSp">
				<a href="#">
					<img src="https://www.takabou.jp/wp-content/themes/No1_theme01/img/common/logo.svg" alt="高橋防水">
				</a>
			</div>

			<div class="c-header__btn">
				<div class="c-header__tel__btn">
					<span class="tel_link"><a href="tel:020 28266650">020 28266650</a></span>
				</div>

				<div class="c-header__gnav__btn" id="gnav_open">
					<span></span>
					<span></span>
					<span></span>
				</div>
			</div>
		</div>
		<nav class="c-header__gnav__child sp-only" id="gnav">
			<ul class="c-header__gnav__menu">
				<li class="c-header__gnav__item">
					<a href="/index.php/"><span>ໜ້າຫຼັກ</span></a>
				</li>
				<li class="c-header__gnav__item">
					<a href="/index.php/kho-giao-dien"><span>ຄັງເວັບໄຊ</span></a>
				</li>
				<li class="c-header__gnav__item">
					<a class="c-header__gnav__parent" href="#">
						<span>ບໍລິການ</span>
						<i class="fa-solid fa-plus"></i>
						<i class="fa-solid fa-minus"></i>
					</a>
					<ul class="c-header__gnav__menu__sub">
						<li class="c-header__gnav__item"><i class="fa-solid fa-angle-double-right"></i>
							<a href="/thiet-ke-web"><span>ອອກແບບເວັບໄຊ</span></a>
						</li>
						<li class="c-header__gnav__item"><i class="fa-solid fa-angle-double-right"></i>
							<a href="/xay-dung-phan-mem"><span>ຂຽນໂປແກມຕາມຄວາມຕ້ອງການ</span></a>
						</li>
						<li class="c-header__gnav__item"><i class="fa-solid fa-angle-double-right"></i>
							<a href="/thiet-ke-logo"><span>ອອກແບບໂລໂກ</span></a>
						</li>
						<li class="c-header__gnav__item"><i class="fa-solid fa-angle-double-right"></i>
							<a href="#">ຂຽນ Web App</a>
						</li>
					</ul>
				</li>
				<li class="c-header__gnav__item">
					<a href="/index.php/tin-tuc">
						<span>ຂ່າວສານ</span>
					</a>
				</li>
				<li class="c-header__gnav__item">
					<a class="c-header__gnav__parent" href="#">
						<span>ກຽ່ວກັບເຮົາ</span>
						<i class="fa-solid fa-plus"></i>
						<i class="fa-solid fa-minus"></i>
					</a>
					<ul class="c-header__gnav__menu__sub">
						<li class="c-header__gnav__item"><i class="fa-solid fa-angle-double-right"></i>
							<a href="/index.php/gioi-thieu"><span>ແນະນຳ</span></a>
						</li>
						<li class="c-header__gnav__item"><i class="fa-solid fa-angle-double-right"></i>
							<a href="/index.php/thanh-toan"><span>ຊຳລະເງິນ</span></a>
						</li>
						<li class="c-header__gnav__item"><i class="fa-solid fa-angle-double-right"></i>
							<a href="/index.php/lien-he"><span>ຕິດຕໍ່</span></a>
						</li>
					</ul>
				</li>
				<li class="c-header__itemSeach">
					<div class="c-header__search">
						<?php get_search_form();  ?>
					</div>
				</li>
			</ul>
		</nav>
	</header>
	<div class="c-header__sticky">
		<div class="l-container pc-only">
			<div class="c-header__inner">
				<a href="/index.php/" class="c-header__logo">
					<img src="https://placehold.jp/150x80.png" alt="pxwebshop">
				</a>
				<ul class="c-header__menu">
					<li class="c-header__item">
						<a class="c-header__link" href="/">ໜ້າຫຼັກ</a>
					</li>
					<li class="c-header__item">
						<a class="c-header__link" href="/index.php/kho-giao-dien">ຄັງເວັບໄຊ</a>
					</li>
					<li class="c-header__item c-header__item__services">
						<span>ບໍລິການ<i class="fa-solid fa-caret-down"></i></span>
						<ul class="c-header__child">
							<li class="c-header__child__item">
								<a href="/thiet-ke-web">ອອກແບບເວັບໄຊ</a>
							</li>
							<li class="c-header__child__item">
								<a href="/xay-dung-phan-mem"> ຂຽນໂປແກມຕາມຄວາມຕ້ອງການ</a>
							</li>
							<li class="c-header__child__item">
								<a href="/thiet-ke-logo"> ອອກແບບໂລໂກ</a>
							</li>
							<li class="c-header__child__item">
								<a href="#">ຂຽນ Web App </a>
							</li>
						</ul>
					</li>
					<li class="c-header__item">
						<a class="c-header__link" href="/index.php/tin-tuc">ບົດຄວາມ</a>
					</li>
					<li class="c-header__item c-header__item__abouts">
						<span>ກຽ່ວກັບເຮົາ<i class="fa-solid fa-caret-down"></i></span>

						<ul class="c-header__child">
							<li class="c-header__child__item">
								<a href="/index.php/gioi-thieu">ແນະນຳ</a>
							</li>
							<li class="c-header__child__item">
								<a href="/index.php/thanh-toan">ຊຳລະເງິນ</a>
							</li>
							<li class="c-header__child__item">
								<a href="/index.php/lien-he">ຕິດຕໍ່</a>
							</li>
						</ul>
					</li>
					<li class="c-header__itemSeach">
						<i class="fa-solid fa-magnifying-glass is-searchMenu"></i>
						<div class="c-header__search">
							<?php get_search_form();  ?>
						</div>
					</li>
				</ul>
			</div>
		</div>
	</div>

	<!--▲ Header ▲-->