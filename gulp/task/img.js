/**
 * 画像の最適化
 * assets/img/配下の画像に対し最適化処理を行います。
 */

const gulp = require("gulp");
const config = require("../config");
const setting = config.setting;
const $ = require("gulp-load-plugins")(config.loadPlugins);

gulp.task("imagemin", () => {
	// JPEG
	gulp.src(setting.imagemin.path + "**/*.jpg")
		.pipe($.imagemin([$.jpegtran()]))
		.pipe(gulp.dest(setting.imagemin.path));

	// PNG
	gulp.src(setting.imagemin.path + "**/*.png")
		.pipe(
			$.imagemin([
				$.pngquant({
					quality: setting.imagemin.quality,
					speed: 1,
					floyd: 0
				}),
				$.imagemin.optipng()
			])
		)
		.pipe(gulp.dest(setting.imagemin.path));
});
