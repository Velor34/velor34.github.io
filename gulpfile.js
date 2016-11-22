'use strict';
var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var jade = require('gulp-jade');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var csscomb = require('gulp-csscomb');
var csso = require('gulp-csso');
var	gulp_uglify = require('gulp-uglify');
var	gulp_concat = require('gulp-concat');
//var svgmin = require('gulp-svgmin');
var plumber = require('gulp-plumber');
var spritesmith = require('gulp.spritesmith');

var path = {
	sass: './app/sass/',
	jade: './app/jade/',
	i: './app/i/',
	js: './app/js/',
	css: './build/f/css/',
	html: './build/v/',
	i_comp: './build/f/i/',
	js_com: './build/f/js/'
}

var js = [
	path.js + 'com/jquery-2.2.4.min.js',
	path.js + 'com/swiper.min.js',
	path.js + 'com/select2.full.min.js',
	//path.js + 'main.js',
]

gulp.task('sass', function () {
	gulp.src(path.sass + '**/*.scss')
	.pipe(sass({
		outputStyle: 'expanded'
	})
	.on('error', sass.logError))
	.pipe(csscomb())
	.pipe(autoprefixer())
	.pipe(csso())
	.pipe(gulp.dest(path.css))
	.pipe(browserSync.stream());
});
 
gulp.task('jade', function() {
	var my = {};
	gulp.src(path.jade + '*.jade')
		.pipe(jade({
		locals: my,
		client: false,
		pretty: true,
	}))
	.on('error', console.log)
	.pipe(gulp.dest(path.html))
	.pipe(browserSync.stream());
});

gulp.task('js', function() {
	return gulp.src(js)
		.pipe(gulp_concat('all-js.js'))
		.pipe(plumber())
		.pipe(gulp_uglify())
		.pipe(gulp.dest(path.js_com))
		.pipe(browserSync.stream());
});

gulp.task('serve', ['sass', 'jade', 'js'], function(){

	browserSync.init(
		{
			server: "./"
		}
		
	);

	gulp.watch(path.jade + '**/*.jade', ['jade']);
	gulp.watch(path.sass + '**/*.scss', ['sass']);
	gulp.watch(path.js + '**/*.js', ['js']);

	gulp.watch("htdocs/*.html").on('change', browserSync.reload);
	gulp.watch("htdocs/*.css").on('change', browserSync.reload);
	gulp.watch("htdocs/*.js").on('change', browserSync.reload);

});

gulp.task('svgmin', function(){
	return gulp.src('./htdocs/dev/svg/*.svg')
        .pipe(svgmin())
        .pipe(gulp.dest('./htdocs/build/f/svg/'));
});

gulp.task('sprite', function() {
	var spriteData = 
	gulp.src('./app/img/sprite/*.*') // путь, откуда берем картинки для спрайта
		.pipe(spritesmith({
			imgName: 'sprite.png',
			cssName: '_sprite.scss',
			cssFormat: 'scss',
			retinaSrcFilter: ['./app/img/sprite/*@2x.png'],
			retinaImgName: 'sprite@2x.png',
			algorithm: 'binary-tree',
			padding: 10,
			cssVarMap: function(sprite) {
				sprite.name = 's-' + sprite.name
			}
		})
	);
	spriteData.img.pipe(gulp.dest('./build/f/i/')); // путь, куда сохраняем картинку
	spriteData.css.pipe(gulp.dest('./app/sass/')); // путь, куда сохраняем стили
});

gulp.task('default', ['serve']);

gulp.task('callSprite', ['sprite']);

// gulp.task('watch', function () {
// 	gulp.watch(path.jade + '**/*.jade', ['jade']);
// 	gulp.watch(path.sass + '**/*.scss', ['sass']);
// 	gulp.watch(path.js + '**/*.js', ['js']);
// });