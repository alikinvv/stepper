'use strict';

var gulp = require('gulp'),
    gp = require('gulp-load-plugins')(),
    browserSync = require('browser-sync').create();

gulp.task('html', function() {
    return gulp.src('src/*.html')
        .pipe(gp.rigger())
        .pipe(gulp.dest('build/'))
        .on("error", gp.notify.onError({
            message: "Error: <%= error.message %>",
            title: "HTML"
          }))
        .on('end', browserSync.reload);
});

gulp.task('css', function() {
    return gulp.src('src/scss/**/*.scss')
        .pipe(gp.sourcemaps.init())
        .pipe(gp.sass().on('error', gp.sass.logError))
        .pipe(gp.autoprefixer({
            browsers: ['last 10 versions'],
            cascade: false
        }))
        .pipe(gp.csso())
        .pipe(gp.sourcemaps.write())
        .pipe(gulp.dest('build/css'))
        .on("error", gp.notify.onError({
            message: "Error: <%= error.message %>",
            title: "CSS"
        }))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('css:build',function() {
    return gulp.src('src/scss/**/*.css')
        .pipe(gulp.dest('build/css'))
});

gulp.task('js:dev', function() {
    return gulp.src('src/js/**/*.js')
        .on("error", gp.notify.onError({
            message: "Error: <%= error.message %>",
            title: "CSS"
        }))
        .pipe(browserSync.reload({
            stream: true
        }))
        .pipe(gulp.dest('build/js'));
});

gulp.task('js:build',function() {
    return gulp.src('src/js/**/*')
        .pipe(gulp.dest('build/js'))
});

gulp.task('img:dev',function() {
    return gulp.src('src/img/**/*')
        .pipe(gulp.dest('build/img'))
});

gulp.task('img:build',function() {
    return gulp.src('src/img/**/*.{png,jpg}')
        .pipe(gp.tinypng('4jyAh2TumYspKSm9bJ8td6WmPOA7MzjG'))
        .pipe(gulp.dest('build/img'))
});

gulp.task('svg',function() {
    return gulp.src('src/img/**/*.svg')
        .pipe(gp.svgmin({
            js2svg: {
                pretty: true
            }
        }))
        
        .pipe(gp.replace('&gt;','>'))
        .pipe(gp.svgSprite({
            mode: {
				symbol: {
					sprite: "../sprite.svg"
                }
            }
        }))
        .pipe(gulp.dest('build/img'))
});

gulp.task('fonts:build',function() {
    return gulp.src('src/fonts/**/*')
        .pipe(gulp.dest('build/fonts'))
});


gulp.task('server', function() {
    browserSync.init({
        server: {
            baseDir: './build'
        }
    });
});

gulp.task('watch',function() {
    gulp.watch('src/**/*.html',gulp.series('html'));
    gulp.watch('src/scss/**/*.scss',gulp.series('css'));
    gulp.watch('src/js/**/*.js',gulp.series('js:dev'));
    gulp.watch('src/img/**/*',gulp.series('img:dev'));
});

gulp.task('default',gulp.series(gulp.parallel('html','css','js:dev','img:dev'), gulp.parallel('watch','server')));
gulp.task('build',gulp.series(gulp.parallel('html','css','css:build','js:build','img:build','fonts:build','svg')));