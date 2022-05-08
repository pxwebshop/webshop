<?php get_header(); ?>

<?php while (have_posts()) : the_post(); ?>
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
                        <h2 class="c-title1 c-title1--color1">ບົດຄວາມ</h2>
                        <div class="c-page__url">
                            <a href="/" class="c-page__link">ໜ້າຫຼັກ</a>
                            <a href="/lien-he">/ ບົດຄວາມທີ່ <?php the_ID(); ?></a>
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
                            <?php the_title(); ?>
                        </h1>
                        <p class="c-detail__info">
                            <?php the_author();
                            echo " | ";
                            the_date();
                            echo " | ";
                            the_time(); ?>
                        </p>
                        <?php the_content(); ?>
                        <!-- <div class="c-detail__info1">
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
                        </div> -->
                    </div>
                </div>
            </div>
            <div class="l-container">
                <div class="c-detail__related">
                    <h2 class="c-title2">ບົດຄວາມທີ່ກ່ຽວຂ້ອງ</h2>
                    <div class="c-list10">
                        <?php
                        $query = new WP_Query(array(
                            'post_type'            => array('news'),
                            'posts_per_page'    => 4,
                            'offset'            => 1,
                            'post_status'        => 'publish',
                        ));
                        ?>
                        <?php if ($query->have_posts()) : ?>
                            <?php while ($query->have_posts()) : $query->the_post(); ?>
                                <div class="c-list10__item">
                                    <figure class="c-list10__img">
                                    <a href="<?php the_permalink($post->ID); ?>"><?php the_post_thumbnail(); ?></a>
                                    </figure>
                                    <div class="c-list10__info">
                                        <h3 class="c-list10__title">
                                        <?php echo substr(get_the_title(), 0,60) . " &hellip;";?>
                                        </h3>
                                        <div class="c-list10__time">
                                            <i class="fa-solid fa-calendar-days"></i>
                                            <span> <?php the_date(); ?></span>
                                        </div>
                                        <div class="c-list10__author">
                                            <i class="fa-solid fa-user"></i>
                                            <span><?php the_author(); ?></span> <br>
                                        </div>
                                        <p class="c-list10__txt">
                                             <?php the_excerpt(); ?>
                                        </p>
                                    </div>
                                </div>
                            <?php endwhile; ?>
                        <?php endif; ?>
                        <?php wp_reset_query(); ?>
                    </div>
                </div>
            </div>
        </div>


    </main>

<?php endwhile; ?>
<?php get_footer(); ?>