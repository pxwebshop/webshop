<?php $page_id = 'tin-tuc'; ?>
<?php get_header();
$current_page = (get_query_var('paged')) ? get_query_var('paged') : 1;
$queried = get_queried_object(); ?>

<main class="p-news">
    <section class="p-news__sc1">
        <div class="c-page__heading" id="particles-js">
            <div class="c-page__title">
                <div>
                    <h2 class="c-title1 c-title1--color1">Tin tức</h2>
                    <div class="c-page__url">
                        <a href="/" class="c-page__link">Trang chủ</a>
                        <a href="/lien-he">/ Tin tức</a>
                    </div>
                </div>
            </div>
        </div>
        <div class="l-container clearfix">
            <div class="p-news__content">
                <div class="c-list2">
                    <?php

                    $query = new WP_Query(array(
                        'post_type'            => array('news'),
                        'posts_per_page'    => 4,
                        'post_status'        => 'publish',
                        'paged' => $current_page,

                    ));
                    ?>
                    <?php if ($query->have_posts()) : ?>
                        <?php while ($query->have_posts()) : $query->the_post(); ?>
                            <div class="c-list2__item">
                                <figure class="c-list2__img">
                                    <a href="<?php the_permalink($post->ID); ?>"><?php the_post_thumbnail(); ?></a>
                                </figure>
                                <div class="c-list2__info">
                                    <h3 class="c-list2__title">
                                        <?php
                                        $n = strlen(get_the_title($post->ID));
                                        if ($n < 60) {
                                            echo get_the_title();
                                        } else {
                                            echo substr(get_the_title(), 0, 60) . "&hellip;";
                                        }
                                        ?>
                                    </h3>
                                    <div class="c-list2__time">
                                        <i class="fa-solid fa-calendar-days"></i>
                                        <span> <?php echo get_the_date(); ?></span>
                                    </div>
                                    <div class="c-list2__author">
                                        <i class="fa-solid fa-user"></i>
                                        <span><?php the_author(); ?></span> <br>
                                    </div>
                                    <p class="c-list2__txt">
                                        <?php echo get_the_excerpt(); ?>
                                    </p>
                                </div>
                            </div>
                        <?php endwhile; ?>
                    <?php endif; ?>
                    <div class="c-pagenavi"><?php wp_pagenavi(array('query' => $query)); ?></div>
                    <?php wp_reset_query(); ?>
                </div>
            </div>

            <div class="p-news__articleOther">
                <div class="c-block1">
                    <h3 class="c-block1__heading">Bài viết khác</h3>
                    <div class="c-block1__inner">
                        <?php
                        $args = array('posts_per_page' => 4);
                        $query = new WP_Query('offset=4', $args);
                        $query = new WP_Query(array(
                            'post_type'            => array('news'),
                            'posts_per_page'    => 4,
                            'offset'            => 4,
                            'post_status'        => 'publish',
                        ));
                        ?>
                        <?php if ($query->have_posts()) : ?>
                            <?php while ($query->have_posts()) : $query->the_post(); ?>
                                <div class="c-block1__item">
                                    <figure class="c-block1__img">
                                        <a href="/chi-tiet-bai-viet"><?php the_post_thumbnail(); ?></a>
                                    </figure>
                                    <div class="c-block1__info">
                                        <h5 class="c-block1__title"><?php
                                                                    $n = strlen(get_the_title($post->ID));
                                                                    if ($n < 36) {
                                                                        echo get_the_title();
                                                                    } else {
                                                                        echo substr(get_the_title(), 0, 36) . "&hellip;";
                                                                    }
                                                                    ?></h5>
                                        <p class="c-block1__txt"><?php echo substr(get_the_excerpt(), 0, 72) . "&hellip;"; ?></p>
                                    </div>
                                </div>
                            <?php endwhile; ?>
                        <?php endif; ?>
                        <?php wp_reset_query(); ?>
                        <!-- <div class="c-block1__item">
                            <figure class="c-block1__img">
                                <img src="https://placehold.jp/120x100.png" alt="">
                            </figure>
                            <div class="c-block1__info">
                                <h5 class="c-block1__title">Tuyển dụng nhân viên kinh doanh</h5>
                                <p class="c-block1__txt">Nhân viên có kiến thức về sale, và biết về excel. Để hỗ trợ trong công việc</p>
                            </div>
                        </div> -->
                    </div>
                </div>
            </div>
        </div>
        <!-- <div class="c-paginate">
            <div class="l-container">
                <ul class="c-paginate__list">
                    <li class="c-paginate__item"><a href="#">&laquo;</a></li>
                    <li class="c-paginate__item c-paginate__active"><a href="#">1</a></li>
                    <li class="c-paginate__item"><a href="#">2</a></li>
                    <li class="c-paginate__item"><a href="#">3</a></li>
                    <li class="c-paginate__item"><a href="#">...</a></li>
                    <li class="c-paginate__item"><a href="#">99</a></li>
                    <li class="c-paginate__item"><a href="#">&raquo;</a></li>
                </ul>
            </div>
        </div> -->
    </section>
    <div class="c-pageTop">
        <span class="c-pageTop__icon">
            <i class="fa-solid fa-angles-up"></i>
        </span>
    </div>
</main>

<?php get_footer(); ?>