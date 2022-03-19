<?php $page_id = 'lien-he'; ?>
<?php get_header(); ?>

<section class="p-contact">
    <div class="c-contact__heading">
        <div class="c-contact__title">
            <div>
                <h2 class="c-title1">Liên hệ</h2>
                <div class="c-contact__url">
                    <a href="/" class="c-contact__link">Trang chủ</a>
                    <a href="/lien-he">/ Liên hệ</a>
                </div>
            </div>
        </div>
    </div>
    <div class="c-contact__map">
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.21284151982!2d106.71968101535644!3d10.79500416180106!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317527c2f8f30911%3A0x36ac5073f8c91acd!2sLandmark%2081!5e0!3m2!1sen!2s!4v1647486094027!5m2!1sen!2s" allowfullscreen="" loading="lazy"></iframe>
    </div>
    <div class="l-container">
        <div class="c-contact__content">
            <div class="c-contact__info">
                <div class="c-contact__phone">
                    <i class="fa-solid fa-phone"></i>
                    <span>0361.0214.01265</span>
                </div>
                <div class="c-contact__email">
                    <i class="fa-solid fa-envelope"></i>
                    <span>pxwebshop@gmail.com</span>
                </div>
                <div class="c-contact__address1">
                    <i class="fa-solid fa-location-dot"></i>
                    <span>..., thành phố Hồ Chí Minh, Việt Nam</span>
                </div>
                <div class="c-contact__address2">
                    <i class="fa-solid fa-location-dot"></i>
                    <span>..., Vientiane, Lào</span>
                </div>
            </div>
            <div class="c-contact__form">
                <form action="#">
                    <div class="c-contact__group">
                        <label for="name">Tên</label>
                        <input type="text" name="yourname" id="name">
                    </div>
                    <div class="c-contact__group">
                        <label for="email">Email</label>
                        <input type="text" id="email">
                    </div>
                    <div class="c-contact__group">
                        <label for="phone">Số điện thoại</label>
                        <input type="text" id="phone">
                    </div>
                    <div class="c-contact__group">
                        <label for="message">Message</label>
                        <textarea rows="10" name="" id="message"></textarea>
                    </div>
                    <button class="c-contact__form__btn" type="submit">Gửi</button>
                </form>
            </div>
        </div>
    </div>
    <div class="c-contact__footing">
        <div class="c-contact__bgImg"></div>
    </div>
</section>

<?php get_footer(); ?>