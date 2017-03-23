//Include required modules
let gulp = require('gulp'),
    babelify = require('babelify'),
    browserify = require('browserify'),
    stringify = require('stringify'),
    connect = require('gulp-connect'),
    source = require('vinyl-source-stream'),
    del = require('del'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    autoprefix = require('gulp-autoprefixer'),
    concat = require('gulp-concat'),
    minify = require('gulp-minify-css');

gulp.task('html', function(){
    return gulp.src('./src/index.html')
    .pipe(gulp.dest('./dist'));
});

gulp.task('sass', function() {
    return gulp.src('./src/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefix())
        .pipe(concat('bundle.css'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./dist/src/'));
});

gulp.task('clean', function() {
    del('dist');
});

gulp.task('watch', ['sass', 'scripts', 'html'], function() {
    gulp.watch(['./src/**/*.js', '!src/**/*.spec.js', './src/components/**/*.html'], ['scripts']);
    gulp.watch('./src/index.html', ['html']);
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
      .transform(stringify, {
        appliesTo: { includeExtensions: ['.html'] },
        minify: true
      })
    .bundle()
    .pipe(source('src/bundle.js'))
    .pipe(gulp.dest('./dist'))
    .pipe(connect.reload());
});
