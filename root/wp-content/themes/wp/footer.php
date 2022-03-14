<?php global $page_id; ?>
<footer class="footer" id="footer">
	footer
</footer><!--End .footer-->

</div><!--End #wrapper-->

<?php wp_footer(); ?>

<script src="<?php bloginfo( 'template_url' ); ?>/assets/js/jquery-3.6.0.min.js"></script>
<script src="<?php bloginfo( 'template_url' ); ?>/assets/js/jquery-migrate-3.3.2.min.js"></script>
<script src="<?php bloginfo( 'template_url' ); ?>/assets/js/jquery-ie-1.0.0.min.js"></script>
<script src="<?php bloginfo( 'template_url' ); ?>/assets/js/jquery.match-height.min.js"></script>
<script src="<?php bloginfo( 'template_url' ); ?>/assets/js/footer-fixed.min.js"></script>

<?php if ( $page_id == 'index' ): ?>
	<script src="<?php bloginfo( 'template_url' ); ?>/assets/js/slick/slick.min.js"></script>
<?php endif; ?>

<script src="<?php bloginfo( 'template_url' ); ?>/assets/js/common.js"></script>

</body>
</html>
