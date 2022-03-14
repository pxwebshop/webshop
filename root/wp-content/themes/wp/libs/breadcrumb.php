<?php global $page_id; ?>
<?php if ( ! is_home() ): ?>

	<ul class="c-breadcrumb">
		<li><a href="<?php echo home_url(); ?>">HOME</a></li>
		<?php if ( $page_id === 'xxx' ): ?>

			<li>XXX</li>

		<?php elseif ( is_page() || is_single() ): ?>

			<li><?php the_title(); ?></li>

		<?php endif; ?>
	</ul>

<?php endif; ?>
