"use strict";

var gulp        = require('gulp'),
  autoprefixer  = require('gulp-autoprefixer'),
  cache         = require('gulp-cache'),
  compass       = require('gulp-compass'),
  concat        = require('gulp-concat'),
  cssnano       = require('gulp-cssnano'),
  imagemin      = require('gulp-imagemin'),
  jshint        = require('gulp-jshint'),
  lr            = require('tiny-lr'),
  newer         = require('gulp-newer'),
  notify        = require('gulp-notify'),
  rimraf        = require('gulp-rimraf'),
  rename        = require('gulp-rename'),
  sass          = require('gulp-ruby-sass'),
  uglify        = require('gulp-uglify');

var paths = {
  app  : '../src',
  dest : '../dist'
};

gulp.task('styles', function(){
  return gulp.src([
    paths.app + '/scss/*.scss'
    ])
    .pipe(compass({
      config_file: 'config.rb',
      style: 'expanded',
      css: paths.app + '/css',
      sass: paths.app + '/scss',
      image: paths.app + '/img'
    }))
    .pipe(autoprefixer('last 2 versions', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(gulp.dest( paths.app + '/css'))
    .pipe(rename('app.min.css'))
    .pipe(cssnano())
    .pipe(gulp.dest( paths.dest + '/css'))
    .pipe(notify({ message: 'Styles task complete!' }));
});

gulp.task('lintscripts', function(){
  return gulp.src([
      '!' + paths.app + '/js/vendor/*',
      '!' + paths.app + '/js/vendor.js',
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

gulp.task('del-icons', function(){
  return gulp.src(paths.dest + '/img/icons*', { read: false })
    .pipe(rimraf({ force: true }));
});

gulp.task('images', ['del-icons'], function(){

  return gulp.src([
      paths.app + '/img/**/*.png',
      paths.app + '/img/**/*.jpg',
      paths.app + '/img/**/*.gif',
      '!' + paths.app + '/img/icons/*',
      '!' + paths.app + '/img/icons2x/*'
    ])
    .pipe(newer(paths.dest + '/img'))
    // .pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
    .pipe(gulp.dest(paths.dest + '/img'))
    .pipe(notify({ message: 'Images task complete!' }));
});

gulp.task('fonts', function() {
  return gulp.src([
      paths.app + '/fonts/**/*'
    ])
    .pipe(newer(paths.dest + '/fonts'))
    .pipe(gulp.dest(paths.dest + '/fonts'));
});

// gulp.task('copy', function(){
//   gulp.start('fonts');
// });

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
      paths.app + '/scss/**/*',
      paths.app + '/css/**/*'
    ], ['styles']);

  // Watch .js files
  gulp.watch([
      paths.app + '/js/**/*'
    ], ['scripts']);

  // Watch images
  gulp.watch([
      paths.app + '/img/**/*'
    ], ['images']);

  // Watch fonts
  gulp.watch([
      paths.app + '/fonts/**/*'
    ], ['fonts']);

});

// DEFAULT
gulp.task('default', function(){
  gulp.start('fonts', 'images', 'styles', 'scripts');
});