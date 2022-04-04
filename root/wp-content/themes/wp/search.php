<?php $page_id = 'search'; ?>
<?php get_header();
$current_page = (get_query_var('paged')) ? get_query_var('paged') : 1;
$queried = get_queried_object(); ?>

<main class="p-news">
    <section class="p-news__sc1">
        <div class="c-page__heading" id="particles-js">
            <div class="c-page__title">
                <div>
                    <h2 class="c-title1 c-title1--color1">Tìm kiếm</h2>
                    <!-- <div class="c-page__url">
                        <a href="/" class="c-page__link">Trang chủ</a>
                        <a href="/lien-he">/ Tin tức</a>
                    </div> -->
                </div>
            </div>
        </div>
        <div class="l-container clearfix">
            <div class="p-news__content p-news__search">
                <div class="c-list2">
                    <?php

                    $search_query = new WP_Query(array(
                        'post_type'            => array('news'),
                        'posts_per_page'    => 6,
                        'post_status'        => 'publish',
                        'paged' => $current_page,

                    ));
                    ?>
                    <?php
                    global $query_string;
                    wp_parse_str($query_string, $search_string);
                    $search_query = new WP_Query($search_string);
                    $total_results = $search_query->found_posts ? $search_query->found_posts : 0;
                    echo('<h3 class="c-list2__searchTotal">');
                    printf(__('Chúng tôi tìm thấy <b> %1$s bài viết </b> mà bạn tìm kiếm', 'glw'), $total_results);
                    echo('</h3>');
                    if ($search_query->have_posts()) :
                    ?>
                        <?php while ($search_query->have_posts()) : $search_query->the_post(); ?>
                            <div class="c-list2__item c-list2__item--search">
                                <figure class="c-list2__img">
                                    <a href="<?php the_permalink($post->ID); ?>"><?php the_post_thumbnail(); ?></a>
                                </figure>
                                <div class="c-list2__info">
                                    <h3 class="c-list2__title">
                                        <a href="<?php the_permalink($post->ID); ?>"><?php echo substr(get_the_title(), 0, 60) . " &hellip;"; ?></a>
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
                                        <?php the_excerpt(); ?>
                                    </p>
                                </div>
                            </div>
                        <?php endwhile; ?>
                        <div class="c-pagenavi"><?php wp_pagenavi(array('query' => $search_query)); ?></div>
                    <?php endif; ?>
                    <?php wp_reset_query(); ?>
                </div>
            </div>
        </div>
    </section>

</main>

<?php get_footer(); ?>