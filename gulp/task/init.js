/**
 * プロジェクト初期化
 * コンパイル・生成タスクを実行しhtmlディレクトリをビルドします。
 */

const gulp = require("gulp");
const config = require("../config");
const setting = config.setting;
const $ = require("gulp-load-plugins")(config.loadPlugins);

gulp.task("init", () => {
	return $.sequence(["scss", "script"]);
});
