<?php $page_id = 'lien-he'; ?>
<?php get_header(); ?>

<main class="p-contact ">
    <section class="p-contact__sc1 ">
        <div class="c-page__heading" id="particles-js">
            <div class="c-page__title">
                <div>
                    <h2 class="c-title1 c-title1--color1">ຕິດຕໍ່</h2>
                    <div class="c-page__url">
                        <a href="/" class="c-page__link">ໜ້າຫຼັກ</a>
                        <a href="/contact">/ ຕິດຕໍ່</a>
                    </div>
                </div>
            </div>
        </div>
        <div class="grid-bg ba-grid anim">
            <div class="c-contact__map">
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7589.420135974364!2d102.66638249405541!3d17.992221101233906!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3124679cd1397e6f%3A0x6820293abbbefccf!2z4LqaLiDgu4HguqrguofguqrgurDguqvguqfgu4jgurLguocg4Lqu4LuI4Lqt4LqhIDYs4LuE4LqK4LuA4Lqq4LqU4LqW4LqyLOC6meC6sOC6hOC6reC6meC6q-C6vOC6p-C6h-C6p-C6veC6h-C6iOC6seC6mQ!5e0!3m2!1sen!2s!4v1649131023954!5m2!1sen!2s" allowfullscreen="" loading="lazy"></iframe>
            </div>
            <div class="l-container">
                <div class="c-contact__content inner">

                    <div class="c-contact__info">
                        <div class="c-contact__address1">
                            <i class="fa-solid fa-location-dot"></i>
                            <span class="c-contact__txt">&nbsp; ບ້ານ ຂາມງອຍ,​ ເມືອງ ໄຊເສດຖາ, ນະຄອນຫຼວງວຽງຈັນ</span>
                        </div>
                        <div class="c-contact__phone">
                            <i class="fa-solid fa-phone"></i>
                            <span class="c-contact__txt">&nbsp; 020 28266650</span>
                        </div>
                        <div class="c-contact__email">
                            <i class="fa-solid fa-envelope"></i>
                            <span class="c-contact__txt">&nbsp; pxwebshop@gmail.com</span>
                        </div>

                    </div>
                    <div class="c-contact__form">
                    <?php
						while ( have_posts() ) : the_post();
							the_content();
						endwhile;
					?>

                    </div>
                </div>
            </div>
        </div>

    </section>
    <div class="c-pageTop">
        <span class="c-pageTop__icon">
            <i class="fa-solid fa-angles-up"></i>
        </span>
    </div>
</main>

<?php get_footer(); ?>