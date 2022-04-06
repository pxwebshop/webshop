<?php $page_id = 'chi-tiet-bai-viet'; ?>
<?php get_header(); ?>


<main class="p-detail">
    <div class="c-detail">
        <!-- <div class="c-detail__heading">
            <figure class="c-detail__banner">
                <img src="https://designmodo.com/wp-content/uploads/2020/01/Valentines-Day-Email-Newsletter-1920x1080.jpg" alt="">
            </figure>
        </div> -->
        <div class="c-page__heading" id="particles-js">
            <div class="c-page__title">
                <div>
                    <h2 class="c-title1 c-title1--color1">Tin tức</h2>
                    <div class="c-page__url">
                        <a href="/" class="c-page__link">Trang chủ</a>
                        <a href="/lien-he">/ Bài viết số XX</a>
                    </div>
                </div>
            </div>
        </div>
        <div class="l-container">
            <div class="c-detail__article">
                <div class="c-detail__share">
                    <span><i class="fa-solid fa-share-nodes"></i>Share</span>
                    <ul>
                        <li>
                            <i class="fa-brands fa-facebook">Share</i>
                        </li>
                        <li>
                            <i class="fa-brands fa-twitter">Tweet</i>
                        </li>
                        <li>
                            <i class="fa-brands fa-linkedin">Share</i>
                        </li>
                        <li>
                            <i class="fa-brands fa-pinterest">Pin It</i>
                        </li>
                    </ul>
                </div>
                <div class="c-detail__content">
                    <h1 class="c-detail__title1">
                        <?php the_title();?>
                    </h1>
                    <p class="c-detail__info">
                        Tin tức | Đặng Ngọc Quý | 23/03/2022 | 8 phút trước
                    </p>
                    <p class="c-detail__txt">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Amet dictum sit amet justo donec enim diam. Habitasse platea dictumst vestibulum rhoncus est pellentesque elit ullamcorper dignissim. Arcu vitae elementum curabitur vitae nunc sed velit.
                    </p>
                    <p class="c-detail__txt">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Amet dictum sit amet justo donec enim diam. Habitasse platea dictumst vestibulum rhoncus est pellentesque elit ullamcorper dignissim. Arcu vitae elementum curabitur vitae nunc sed velit.</p>
                    <p class="c-detail__txt">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Morbi tempus iaculis urna id volutpat lacus. Diam sit amet nisl suscipit adipiscing.</p>
                    <div class="c-detail__tableContent">
                        <span>Table of Contents</span>
                        <i class="fa-solid fa-eye-slash c-detail__hide" id="hideTableOfContent"></i>
                        <i class="fa-solid fa-eye c-detail__show" id="showTableOfContent"></i>
                        <div class="c-detail__ItemContent">
                            <div class="c-detail__contentItem">
                                <a href="#title1">Mục lục 1</a>
                            </div>
                            <div class="c-detail__contentItem">
                                <a href="#title2">Mục lục 2</a>
                            </div>
                            <div class="c-detail__contentItem">
                                <a href="#title3">Mục lục 3</a>
                            </div>
                            <div class="c-detail__contentSubItem">
                                <a href="#title3-1">Mục lục 3.1</a>
                            </div>
                            <div class="c-detail__contentSubItem">
                                <a href="#title3-2">Mục lục 3.2</a>
                            </div>
                            <div class="c-detail__contentSubItem">
                                <a href="#title3-3">Mục lục 3.2</a>
                            </div>
                            <div class="c-detail__contentItem">
                                <a href="#title4">Mục lục 4</a>
                            </div>
                        </div>

                    </div>
                    <h2 class="c-detail__title2" id="title1">
                        Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    </h2>
                    <p class="c-detail__txt">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Non consectetur a erat nam at lectus urna. Imperdiet sed euismod nisi porta lorem.</p>
                    <p class="c-detail__txt">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Non consectetur a erat nam at lectus urna. Imperdiet sed euismod nisi porta lorem.</p>
                    <p class="c-detail__txt">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Non consectetur a erat nam at lectus urna. Imperdiet sed euismod nisi porta lorem.</p>
                    <p class="c-detail__txt">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Non consectetur a erat nam at lectus urna. Imperdiet sed euismod nisi porta lorem.</p>
                    <figure class="c-detail__img">
                        <img src="https://placehold.jp/1280x720.png" alt="">
                    </figure>
                    <p class="c-detail__subImg">Lorem ipsum</p>
                    <p class="c-detail__txt">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis vel eros donec ac odio. Magna fermentum iaculis eu non diam phasellus vestibulum. Vestibulum mattis ullamcorper velit sed ullamcorper.</p>
                    <h2 class="c-detail__title2" id="title2">Lorem ipsum dolor sit amet, consectetur adipiscing elit</h2>
                    <p class="c-detail__txt">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Dignissim cras tincidunt lobortis feugiat vivamus at. Tellus pellentesque eu tincidunt tortor.</p>
                    <figure class="c-detail__img">
                        <img src="https://placehold.jp/1280x720.png" alt="">
                    </figure>
                    <p class="c-detail__subImg">Lorem ipsum</p>
                    <h2 class="c-detail__title2" id="title3">Lorem ipsum dolor sit amet, consectetur adipiscing elit</h2>
                    <h3 class="c-detail__title3" id="title3-1">Lorem ipsum</h3>
                    <p class="c-detail__txt">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis vel eros donec ac odio. Magna fermentum iaculis eu non diam phasellus vestibulum. Vestibulum mattis ullamcorper velit sed ullamcorper.</p>
                    <p class="c-detail__txt">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis vel eros donec ac odio. Magna fermentum iaculis eu non diam phasellus vestibulum. Vestibulum mattis ullamcorper velit sed ullamcorper.</p>
                    <h3 class="c-detail__title3" id="title3-2">Lorem ipsum</h3>
                    <p class="c-detail__txt">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis vel eros donec ac odio. Magna fermentum iaculis eu non diam phasellus vestibulum. Vestibulum mattis ullamcorper velit sed ullamcorper.</p>
                    <h3 class="c-detail__title3" id="title3-3">Lorem ipsum</h3>
                    <p class="c-detail__txt">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis vel eros donec ac odio. Magna fermentum iaculis eu non diam phasellus vestibulum. Vestibulum mattis ullamcorper velit sed ullamcorper.</p>
                    <p class="c-detail__txt">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis vel eros donec ac odio. Magna fermentum iaculis eu non diam phasellus vestibulum. Vestibulum mattis ullamcorper velit sed ullamcorper.</p>
                    <figure class="c-detail__img">
                        <img src="https://placehold.jp/1280x720.png" alt="">
                    </figure>
                    <p class="c-detail__subImg">Lorem ipsum</p>
                    <p class="c-detail__txt">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis vel eros donec ac odio. Magna fermentum iaculis eu non diam phasellus vestibulum. Vestibulum mattis ullamcorper velit sed ullamcorper.</p>
                    <h2 class="c-detail__title2" id="title4">Lorem ipsum dolor sit amet, consectetur adipiscing elit</h2>
                    <p class="c-detail__txt">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Dignissim cras tincidunt lobortis feugiat vivamus at. Tellus pellentesque eu tincidunt tortor.</p>
                    <div class="c-detail__info1">
                        <figure class="c-detail__ava">
                            <img src="/assets/img/team/dangquy.jpg" alt="">
                        </figure>
                        <div class="c-detail__text">
                            <span>Tác giả</span>
                            <h4 class="c-detail__title4">Đặng Ngọc Quý</h4>
                            <p class="c-detail__txt1">Đặng Ngọc Quý là một lập trình viên đến từ Bình Định, Việt Nam, với đủ thứ kinh nghiệm :))</p>
                            <ul>
                                <li>
                                    <i class="fa-brands fa-facebook"> <a href="">Facebook</a> </i>
                                </li>
                                <li>
                                    <i class="fa-brands fa-twitter"> <a href="">Tweet</a> </i>
                                </li>
                                <li>
                                    <i class="fa-brands fa-linkedin"> <a href="">Linkedin</a> </i>
                                </li>
                                <li>
                                    <i class="fa-brands fa-pinterest"> <a href="">Pinterest</a> </i>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="l-container">
            <div class="c-detail__related">
                <h2 class="c-title2">Bài viết liên quan</h2>
                <div class="c-list10">
                    <div class="c-list10__item">
                        <figure class="c-list10__img">
                            <img src="https://placehold.jp/200x150.png" alt="">
                        </figure>
                        <div class="c-list10__info">
                            <h3 class="c-list10__title">
                                <a href="#">Arcu dui vivamus arcu felis</a>
                            </h3>
                            <div class="c-list10__time">
                                <i class="fa-solid fa-calendar-days"></i>
                                <span>23 Tháng Ba, 2022</span>
                            </div>
                            <div class="c-list10__author">
                                <i class="fa-solid fa-user"></i>
                                <span>Đặng Ngọc Quý</span> <br>
                            </div>
                            <p class="c-list10__txt">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Eleifend mi in nulla posuere sollicitudin aliquam ultrices. Phasellus vestibulum lorem sed risus ultricies tristique nulla.
                            </p>
                        </div>
                    </div>
                    <div class="c-list10__item">
                        <figure class="c-list10__img">
                            <img src="https://placehold.jp/200x150.png" alt="">
                        </figure>
                        <div class="c-list10__info">
                            <h3 class="c-list10__title">
                                <a href="#">Arcu dui vivamus arcu felis</a>
                            </h3>
                            <div class="c-list10__time">
                                <i class="fa-solid fa-calendar-days"></i>
                                <span>23 Tháng Ba, 2022</span>
                            </div>
                            <div class="c-list10__author">
                                <i class="fa-solid fa-user"></i>
                                <span>Đặng Ngọc Quý</span> <br>
                            </div>
                            <p class="c-list10__txt">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Eleifend mi in nulla posuere sollicitudin aliquam ultrices. Phasellus vestibulum lorem sed risus ultricies tristique nulla.
                            </p>
                        </div>
                    </div>
                    <div class="c-list10__item">
                        <figure class="c-list10__img">
                            <img src="https://placehold.jp/200x150.png" alt="">
                        </figure>
                        <div class="c-list10__info">
                            <h3 class="c-list10__title">
                                <a href="#">Arcu dui vivamus arcu felis</a>
                            </h3>
                            <div class="c-list10__time">
                                <i class="fa-solid fa-calendar-days"></i>
                                <span>23 Tháng Ba, 2022</span>
                            </div>
                            <div class="c-list10__author">
                                <i class="fa-solid fa-user"></i>
                                <span>Đặng Ngọc Quý</span> <br>
                            </div>
                            <p class="c-list10__txt">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Eleifend mi in nulla posuere sollicitudin aliquam ultrices. Phasellus vestibulum lorem sed risus ultricies tristique nulla.
                            </p>
                        </div>
                    </div>
                    <div class="c-list10__item">
                        <figure class="c-list10__img">
                            <img src="https://placehold.jp/200x150.png" alt="">
                        </figure>
                        <div class="c-list10__info">
                            <h3 class="c-list10__title">
                                <a href="#">Arcu dui vivamus arcu felis</a>
                            </h3>
                            <div class="c-list10__time">
                                <i class="fa-solid fa-calendar-days"></i>
                                <span>23 Tháng Ba, 2022</span>
                            </div>
                            <div class="c-list10__author">
                                <i class="fa-solid fa-user"></i>
                                <span>Đặng Ngọc Quý</span> <br>
                            </div>
                            <p class="c-list10__txt">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Eleifend mi in nulla posuere sollicitudin aliquam ultrices. Phasellus vestibulum lorem sed risus ultricies tristique nulla.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="c-pageTop">
        <span class="c-pageTop__icon">
            <i class="fa-solid fa-angles-up"></i>
        </span>
    </div>

</main>


<?php get_footer(); ?>