<!DOCTYPE html>
<html lang="en">

<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>WebShop</title>
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
				<p class="c-header__nameCompany">ບໍລີສັດ PX WebShop</p>
				<ul class="c-header__address">
					<li class="c-header__address__item">
						<span><i class="fa-solid fa-envelope"></i> pxwebshop@gmail.com</span>
					</li>
					<li class="c-header__address__item">
						<a href="tel:0361.0214.01265"><i class="fa-solid fa-phone"></i> 0361.0214.01265</a href="tel:">
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
					<span class="tel_link"><a href="tel:07038951109">070-3895-1109</a></span>
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
					<a href="/"><span>ໜ້າຫຼັກ</span></a>
				</li>
				<li class="c-header__gnav__item">
					<a href="/kho-giao-dien"><span>ຄັງເວັບໄຊ</span></a>
				</li>
				<li class="c-header__gnav__item">
					<a class="c-header__gnav__parent" href="#">
						<span>ບໍລິການ</span>
						<i class="fa-solid fa-plus"></i>
						<i class="fa-solid fa-minus"></i>
					</a>
					<ul class="c-header__gnav__menu__sub">
						<li class="c-header__gnav__item">
							<a href="#"><span>ອອກແບບເວັບໄຊ</span></a>
						</li>
						<li class="c-header__gnav__item">
							<a href="#"><span>ຂຽນໂປແກມຕາມຄວາມຕ້ອງການ</span></a>
						</li>
						<li class="c-header__gnav__item">
							<a href="#"><span>ອອກແບບໂລໂກ</span></a>
						</li>
						<li class="c-header__gnav__item">
							<a href="#">ຂຽນ Web App</a>
						</li>
					</ul>
				</li>
				<li class="c-header__gnav__item">
					<a href="#">
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
						<li class="c-header__gnav__item">
							<a href="/gioi-thieu"><span>ແນະນຳ</span></a>
						</li>
						<li class="c-header__gnav__item">
							<a href="/thanh-toan"><span>ຊຳລະເງິນ</span></a>
						</li>
						<li class="c-header__gnav__item">
							<a href="/lien-he"><span>ຕິດຕໍ່</span></a>
						</li>
					</ul>
				</li>
				<li class="c-header__itemSeach">
					<div class="c-header__search">
						<form action="" class="c-header__form">
							<input type="text" placeholder="ໃສ່ຂໍ້ມູນທີ່ຕ້ອງການຄົ້ນຫາ">
							<button class="c-header__btnSearch" type="submit">
								<i class="fa-solid fa-magnifying-glass"></i>
							</button>
						</form>
					</div>
				</li>
			</ul>
		</nav>
	</header>
	<div class="c-header__sticky">
		<div class="l-container pc-only">
			<div class="c-header__inner">
				<a href="/" class="c-header__logo">
					<img src="https://placehold.jp/150x80.png" alt="pxwebshop">
				</a>
				<ul class="c-header__menu">
					<li class="c-header__item">
						<a class="c-header__link" href="/">ໜ້າຫຼັກ</a>
					</li>
					<li class="c-header__item">
						<a class="c-header__link" href="/kho-giao-dien">ຄັງເວັບໄຊ</a>
					</li>
					<li class="c-header__item c-header__item__services">
					<span>ບໍລິການ<i class="fa-solid fa-caret-down"></i></span>
						<ul class="c-header__child">
							<li class="c-header__child__item">
								<a href="#">ອອກແບບເວັບໄຊ</a>
							</li>
							<li class="c-header__child__item">
								<a href="#"> ຂຽນໂປແກມຕາມຄວາມຕ້ອງການ</a>
							</li>
							<li class="c-header__child__item">
								<a href="#"> ອອກແບບໂລໂກ</a>
							</li>
							<li class="c-header__child__item">
								<a href="#">ຂຽນ Web App </a>
							</li>
						</ul>
					</li>
					<li class="c-header__item">
						<a class="c-header__link" href="/tin-tuc">ຂ່າວສານ</a>
					</li>
					<li class="c-header__item c-header__item__abouts">
						<span>ກຽ່ວກັບເຮົາ<i class="fa-solid fa-caret-down"></i></span>

						<ul class="c-header__child">
							<li class="c-header__child__item">
								<a href="/gioi-thieu">ແນະນຳ</a>
							</li>
							<li class="c-header__child__item">
								<a href="/thanh-toan">ຊຳລະເງິນ</a>
							</li>
							<li class="c-header__child__item">
								<a href="/lien-he">ຕິດຕໍ່</a>
							</li>
						</ul>
					</li>
					<li class="c-header__itemSeach">
						<i class="fa-solid fa-magnifying-glass is-searchMenu"></i>
						<div class="c-header__search">
							<form action="" class="c-header__form">
								<input type="text" placeholder="ໃສ່ຂໍ້ມູນທີ່ຕ້ອງການຄົ້ນຫາ">
								<button class="c-header__btnSearch" type="submit">
									<i class="fa-solid fa-magnifying-glass"></i>
								</button>
							</form>
						</div>
					</li>
				</ul>
			</div>
		</div>
	</div>

	<!--▲ Header ▲-->