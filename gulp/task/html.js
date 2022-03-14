/**
 * HTMLの更新の度にブラウザをリロードします。
 */

const gulp = require("gulp");
const config = require("../config");
const setting = config.setting;
const $ = require("gulp-load-plugins")(config.loadPlugins);

gulp.task("html", () => {
	return gulp
		.src(setting.html.dest + "**/*.html")
		.on("error", $.notify.onError("Error: <%= error.message %>"))
		.pipe($.htmlhint(".htmlhintrc"))
		.pipe($.plumber())
		.pipe($.w3cjs())
		.pipe($.htmlhint.failReporter())
		.pipe($.browserSync.reload({steam: true}));
});
