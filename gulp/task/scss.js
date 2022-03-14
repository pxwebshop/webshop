/**
 * Sassのコンパイル
 * .scssファイルを.cssファイルにコンパイルします。
 * 保存時にautoprefixerでベンダープレフィクスなどを自動付与し、ミニファイ化したファイルを*.min.cssとして保存します。
 */

const gulp = require("gulp");
const config = require("../config");
const setting = config.setting;
const $ = require("gulp-load-plugins")(config.loadPlugins);

gulp.task("scss", () => {
	gulp.src(setting.css.src + "**/*.scss")
		.pipe(
			$.plumber({
				errorHandler: $.notify.onError("Error: <%= error.message %>")
			})
		)
		.pipe($.sassGlob())
		.pipe($.sourcemaps.init())
		.pipe(
			$.sass({
				importer: $.sassImporter({
					extensions: [".scss", ".css"]
				})
			}).on("error", $.sass.logError)
		)
		.pipe($.if(setting.css.minify, $.cleanCSS()))
		.pipe($.if(setting.css.map, $.sourcemaps.write({includeContent: false})))
		.pipe($.if(setting.css.map, $.sourcemaps.init({loadMaps: true})))
		.pipe($.autoprefixer())
		//.pipe($.if(setting.css.minify, $.rename({ suffix: ".min" })))
		.pipe($.if(setting.css.map, $.sourcemaps.write(".")))
		.pipe($.flatten())
		.pipe(gulp.dest(setting.css.dest))
		.pipe($.browserSync.stream());
});
