/**
 * デフォルトタスク
 * タスク名を指定せずに実行した場合に実行されるタスクです。
 * initタスク（初期化）、serveタスク（ローカルサーバー立ち上げ）を順番に実行します。
 */

const gulp = require("gulp");
const config = require("../config");
const $ = require("gulp-load-plugins")(config.loadPlugins);

gulp.task("default", () => {
	return $.sequence(["init", "serve", "disconnect"]);
});
