"use strict";

var gulp        = require('gulp'),
  compass     = require('gulp-compass'),
  sass          = require('gulp-ruby-sass'),
  autoprefixer  = require('gulp-autoprefixer'),
  minifycss     = require('gulp-minify-css'),
  rename        = require('gulp-rename'),
  clean         = require('gulp-clean'),
  lr            = require('tiny-lr'),
  jshint        = require('gulp-jshint'),
  concat        = require('gulp-concat'),
  imagemin      = require('gulp-imagemin'),
  uglify        = require('gulp-uglify'),
  cache         = require('gulp-cache'),
  notify        = require('gulp-notify');

var paths = {
  app  : '../src',
  dest : '../dist'
};

gulp.task('styles', function(){
  return gulp.src([
    paths.app + '/scss/*.scss'
    ])
    .pipe(compass({
      style: 'expanded',
      css: paths.app + '/css',
      sass: paths.app + '/scss',
      image: paths.app + '/img'
    }))
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(gulp.dest( paths.app + '/css'))
    .pipe(rename('app.min.css'))
    .pipe(minifycss())
    .pipe(gulp.dest( paths.dest + '/css'))
    .pipe(notify({ message: 'Styles task complete!' }));
});

gulp.task('lintscripts', function(){
  return gulp.src([
      '!' + paths.app + '/js/vendor/*',
      '!' + paths.app + '/js/app.js',
      paths.app + '/js/**/*.js'
    ])
    .pipe(jshint('.jshintrc')) // Edit the .jshintrc file to change the options
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('scripts', ['lintscripts', 'scripts:vendor'], function(){
  return gulp.src([
      // setup script sequence
      paths.app + '/js/main.js'
    ])
    .pipe(concat('app.js'))
    .pipe(gulp.dest( paths.app + '/js'))
    .pipe(uglify())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest( paths.dest + '/js'))
    .pipe(notify({ message: 'Scripts task complete!' }));
});

gulp.task('scripts:vendor', [], function(){
  return gulp.src([
      // setup script sequence
      paths.app + '/js/vendor/jquery-migrate-1.2.1.min',
      paths.app + '/js/vendor/modernizr.js',
      paths.app + '/js/vendor/Placeholders.min.js',
      paths.app + '/js/vendor/respond.min.js',
      paths.app + '/js/vendor/selectivizr.min.js',
      paths.app + '/js/vendor/html5shiv.js'
    ])
    .pipe(concat('vendor.js'))
    .pipe(gulp.dest( paths.app + '/js'))
    .pipe(uglify())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest( paths.dest + '/js'))
    .pipe(notify({ message: 'Vendor Scripts task complete!' }));
});

gulp.task('images', function(){
  return gulp.src([
      paths.app + '/img/**/*.png',
      paths.app + '/img/**/*.jpg',
      paths.app + '/img/**/*.gif',
      '!' + paths.app + '/img/icons/*',
      '!' + paths.app + '/img/icons2x/*'

    ])
    // .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
    .pipe(gulp.dest( paths.dest + '/img'))
    .pipe(notify({ message: 'Images task complete!' }));
});


gulp.task('copy-fonts', function() {
  return gulp.src([
      paths.app + '/fonts/**/*.ttf',
      paths.app + '/fonts/**/*.svg',
      paths.app + '/fonts/**/*.eot',
      paths.app + '/fonts/**/*.woff'
    ])
    .pipe(gulp.dest(paths.dest + '/fonts'));
});

gulp.task('copy', function(){
  gulp.start('copy-fonts');
});

gulp.task('default', ['copy'] , function(){
  gulp.start('styles', 'scripts', 'images');
});

// WATCH
gulp.task('watch_scripts', function(){
  gulp.watch([
      paths.app + '/js/**/*.js'
    ], ['scripts']);
});

gulp.task('watch_styles', function(){
  gulp.watch([
      paths.app + '/scss/**/*.scss',
      paths.app + '/css/**/*.css'
    ], ['styles']);
});

gulp.task('watch', function() {
  // Watch .scss files
  gulp.watch([
      paths.app + '/scss/**/*.scss',
      paths.app + '/css/**/*.css'
    ], ['styles']);

  // Watch .js files
  gulp.watch([
      paths.app + '/js/**/*.js'
    ], ['scripts']);

  // Watch images
  gulp.watch([
      paths.app + '/img/**/*.png',
      paths.app + '/img/**/*.jpg',
      paths.app + '/img/**/*.gif'
    ], ['images']);

});