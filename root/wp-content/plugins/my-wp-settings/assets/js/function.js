jQuery(document).ready(function($) {
	//全てにチェックを入れる
	$("#mws-index .is-allcheck").on("click", function() {
		$("#mws-index td input").prop("checked", true);
	});
});
