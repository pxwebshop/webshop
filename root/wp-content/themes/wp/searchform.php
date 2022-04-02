<form action="<?php echo esc_url(home_url('/')); ?>" class="c-header__form search" role="search" method="get">
    <input type="search" name="s" placeholder="<?php _e('Nhập thông tin cần tìm', 'glw'); ?>" value="<?php the_search_query(); ?>" id="<?php echo esc_attr(uniqid('search-form-')); ?>">
    <button class="c-header__btnSearch" type="submit">
        <i class="fa-solid fa-magnifying-glass"></i>
    </button>
</form>