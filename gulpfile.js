'use strict';

var gulp 			= require('gulp'),
	browserSync 	= require('browser-sync').create(),
	rigger 			= require('gulp-rigger'),
	sass       		= require('gulp-sass'),
	autoprefixer  	= require('gulp-autoprefixer'),
	sourcemaps 		= require('gulp-sourcemaps'),
	uglify 			= require('gulp-uglify'),
	rename 			= require('gulp-rename'),
	imagemin 		= require('gulp-imagemin'),
	pngquant 		= require('imagemin-pngquant'),
	rimraf 			= require('rimraf'),
	chokidar    	= require('gulp-chokidar')(gulp);

var src = 'src/',
	build = 'build/';

var conf = {
	src 	: {
		html 	: '*.html',
		styles	: 'scss/**/*.scss',
		js		: 'js/bootstrap.js',
		fonts	: 'fonts/*',
		img		: 'img/*'
	},
	build 	: {
		html 	: '',
		styles	: 'css/',
		js		: 'js/',
		fonts	: 'fonts/',
		img		: 'img/'
	},
	watch 	: {
		html 	: '*.html',
		styles	: 'scss/**/*.scss',
		js		: 'js/**/*.js',
		fonts	: 'fonts/*',
		img		: 'img/*'
	},
};

gulp.task('server', ['html', 'styles', 'js', 'fonts', 'img'], function(){
	browserSync.init({
		server	: {
	        baseDir : "./" + build
	    },
	    tunnel	: false,
	    host	: 'localhost',
	    port	: 9000
	});

	chokidar(src + conf.watch.html, 'html');
	chokidar(src + conf.watch.styles, 'styles');
	chokidar(src + conf.watch.js, 'js');
	chokidar(src + conf.watch.fonts, 'fonts');
	chokidar(src + conf.watch.img, 'img');
});

gulp.task('html', function(){
	gulp.src([src + conf.src.html, '!**/_*'])
		.pipe(rigger())
		.pipe(gulp.dest(build + conf.build.html))
		.pipe(browserSync.stream());
});

gulp.task('fonts', function(){
	gulp.src(src + conf.src.fonts)
		.pipe(gulp.dest(build + conf.build.fonts))
		.pipe(browserSync.stream());
});

gulp.task('img', function () {
    gulp.src(src + conf.src.img) 
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()],
            interlaced: true
        }))
        .pipe(gulp.dest(build + conf.build.img))
        .pipe(browserSync.stream());
});

gulp.task('js', function() {
	gulp.src(src + 'js/jquery.min.js')
		.pipe(uglify())
		.pipe(gulp.dest(build + conf.build.js));

	gulp.src(src + conf.src.js)
		.pipe(rigger())
		.pipe(sourcemaps.init()) 
		.pipe(uglify())
		.pipe(sourcemaps.write())
		.pipe(rename({
			basename	: 'scripts',
			suffix		: '.min',
			extname		: '.js'
		}))
		.pipe(gulp.dest(build + conf.build.js))
		.pipe(browserSync.stream());
});

gulp.task('styles', function() {
	return gulp.src(src + conf.src.styles)
		.pipe(sourcemaps.init())
        .pipe(sass({
        	outputStyle	: 'compressed',
        	sourceMap 	: true
        }).on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: [
                "last 3 versions",
                "opera 12-13",
                "ie >= 9",
                "ff ESR"
            ],
            cascade: false
        }))
        .pipe(sourcemaps.write())
        .pipe(rename({
			basename	: 'styles',
			suffix		: '.min',
			extname		: '.css'
		}))
        .pipe(gulp.dest(build + conf.build.styles))
        .pipe(browserSync.stream());
});

gulp.task('clean', function(cb){
	rimraf('./' + build, cb);
});

gulp.task('default',['server']);