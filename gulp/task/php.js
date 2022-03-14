/**
 * PHPの更新
 *   → ブラウザリロード
 *   → phpファイルはHTML構文バリデートできないので、一旦.html出力してからその.htmlをバリデート
 */

const gulp = require("gulp");
const config = require("../config");
const setting = config.setting;
const $ = require("gulp-load-plugins")(config.loadPlugins);

gulp.task("php", () => {
	gulp.src(setting.html.dest + "**/*.php").pipe($.browserSync.stream());
});
