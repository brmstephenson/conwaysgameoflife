//Include required modules
let gulp = require('gulp'),
    babelify = require('babelify'),
    browserify = require('browserify'),
    connect = require('gulp-connect'),
    source = require('vinyl-source-stream'),
    del = require('del'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps');

gulp.task('html', function(){
    return gulp.src('./src/**/*.html')
    .pipe(gulp.dest('./dist'));
});

gulp.task('sass', function() {
    return gulp.src('./src/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./dist/css'));
});

gulp.task('clean', function() {
    del('dist');
});

gulp.task('watch', ['scripts', 'html', 'sass'], () => {
    gulp.watch(['./src/**/*.js', '!src/**/*.spec.js'], ['scripts']);
    gulp.watch('./src/**/*.html', ['html']);
    gulp.watch('./src/**/*.scss', ['sass']);
});

gulp.task('serve', ['watch'], function(){
    connect.server({
        root : 'dist',
        livereload : true,
        port : 8080
    });
});

gulp.task('scripts', function(){
    return browserify({
        entries: ['./src/main.js'],
        debug: true
    })
    .transform(babelify.configure({
        presets : ['es2015']
    }))
    .bundle()
    .pipe(source('src/bundle.js'))
    .pipe(gulp.dest('./dist'))
    .pipe(connect.reload());
});
