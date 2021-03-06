/**
 * gulp環境変数
 */

module.exports.setting = {
	html: {
		dest: "root/"
	},
	css: {
		minify: false,
		map: false,
		src: "dev/scss/",
		dest: "root/assets/css/"
	},
	js: {
		webpack: false,
		minify: false,
		babel: true,
		src: "dev/js/",
		dest: "root/assets/js/"
	},
	imagemin: {
		dest: "root/assets/img/",
		quality: "80-90"
	},
	server: {
		localUrl: "webshop.local",
		base: "root",
		watch: "./root"
	}
};

/**
 * ロードモジュールの設定
 */
module.exports.loadPlugins = {
	pattern: [
		"gulp-*",
		"gulp.*",
		"browser-sync",
		"run-sequence",
		"imagemin-pngquant",
		"imagemin-jpegtran",
		"node-sass-package-importer"
	],
	rename: {
		"browser-sync": "browserSync",
		"run-sequence": "sequence",
		"imagemin-pngquant": "pngquant",
		"imagemin-jpegtran": "jpegtran",
		"gulp-connect-php": "php",
		"gulp-clean-css": "cleanCSS",
		"node-sass-package-importer": "sassImporter"
	}
};
