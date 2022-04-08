<?php $page_id = 'lien-he'; ?>
<?php get_header(); ?>

<main class="p-logoDesign">
    <div class="c-logoDesign">
        <div class="c-page__heading" id="particles-js">
            <div class="c-page__title">
                <div class="l-container">
                    <h2 class="c-title1 c-title1--color1">Thiết kế logo</h2>
                    <div class="c-page__url">
                        <a href="/" class="c-page__link">Trang chủ</a>
                        <a href="/lien-he">/ Thiết kế logo</a>
                    </div>
                </div>
            </div>
        </div>
        <div class="l-container">
            <div class="c-logoDesign__header">
                <h2 class="c-title1">Tại sao cần thiết kế logo chuyên nghiệp</h2>
                <p class="c-list12__txt">Logo là một sản phẩm trừu tượng mang đậm tính biểu trưng, đại diện cho doanh nghiệp, thể hiện thông điệp, giá trị mà thương hiệu muốn gửi gắm tới khách hàng. Để ghi dấu logo trong tâm trí khách hàng, các doanh nghiệp cần xây dựng cho mình một thiết kế ấn tượng, chuyên nghiệp. Đó là lý do vì sao PXWebShop cung cấp dịch vụ thiết kế logo chuyên nghiệp nhằm đem đến cho khách hàng một thiết kế độc đáo, hiệu quả.</p>
            </div>
            <div class="c-list12">
                <div class="c-list12__item">
                    <h2 class="c-logoDesign__title">Bạn nhận được gì khi thiết kế tại PXWebShop?</h2>
                    <ul class="c-logoDesign__list">
                        <li><span>Mẫu thiết kế logo chuyên nghiệp nổi bật</span>, phản ánh rõ nét thông điệp thương hiệu của doanh nghiệp.</li>
                        <li><span>Hồ sơ thiết kế đầy đủ các file ảnh máy tính</span>, file vector chất lượng cao nhất dùng cho in ấn.</li>
                        <li><span>Chứng nhận doanh nghiệp</span> có toàn quyền sở hữu và sử dụng mẫu thiết kế.</li>
                        <li><span>Giảm ngay 10 đến 15%</span> cho các dịch vụ thiết kế nhận diện, in ấn, website.</li>
                    </ul>
                    <h2 class="c-logoDesign__title">Cam kết dịch vụ</h2>
                    <ul class="c-logoDesign__list">
                        <li><span>Đáp ứng tiến độ:</span> Đảm bảo tiến độ và chất lượng, đáp ứng nhanh chóng nhu cầu thiết kế của khách hàng.</li>
                        <li><span>Tư vấn miễn phí:</span> PXWebShop sẽ giúp bạn giải đáp các thắc mắc liên quan đến xây dựng thương hiệu và bảo hộ nhãn hiệu.</li>
                        <li><span>Chỉnh sửa thoải mái:</span> PXWebShop cam kết mang đến cho bạn mẫu thiết kế logo mà bạn ưng ý nhất, thực hiện chỉnh sửa logo theo yêu cầu của khách hàng..</li>
                        <li><span>Chăm sóc khách hàng tận tâm:</span> PXWebShop đảm bảo trong quá trình dịch vụ, khách hàng sẽ được đảm bảo tự vấn nhiệt tình ”Trước, trong và sau” bàn giao.</li>
                    </ul>
                </div>
                <div class="c-list12__item">
                    <figure class="c-list12__img">
                        <img src="/assets/img/common/thietkelogo.jpg" alt="">
                    </figure>
                </div>
            </div>
            <div class="c-logoDesign__contact">
                <h2 class="c-logoDesign__title c-logoDesign__title--center">Liên hệ với chúng tôi</h2>
                <p class="c-logoDesign__txt">Hãy liên hệ trực tiếp với chúng tôi để được tư vấn và báo giá chi tiết</p>
                <ul class="c-logoDesign__contactList">
                    <li><a href="tel:0361.0214.01265"> <i class="fa-solid fa-phone"></i></a></li>
                    <li><a href="https://www.facebook.com/pxwebshop"><i class="fa-solid fa-message"></i></a> </li>
                    <li><a href="/lien-he"><i class="fa-solid fa-file-contract"></i></a></li>
                </ul>
            </div>
        </div>
        <div class="l-container">
            <div class="c-detail__related">
                <h2 class="c-title2">Tin tức mới</h2>
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
                                        <a href="<?php the_permalink($post->ID); ?>">
                                            <?php $n = strlen(get_the_title($post->ID));
                                            if ($n < 36) {
                                                echo get_the_title();
                                            } else {
                                                echo substr(get_the_title(), 0, 50) . "&hellip;";
                                            }
                                            ?></a>
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

<?php get_footer(); ?>