// Gulp Requirements
var gulp = require('gulp'),
    del = require('del'),
    hb = require('gulp-hb'),
    gutil = require('gulp-util'),
    intercept = require('gulp-intercept'),
    rename = require('gulp-rename');

// Gulp Utilities
var handleFile = require('./gulp-utils/transformMarkup');

gulp.task('handlebars', ['clean-hbs'], function() {
  return gulp.src('./handlebars/*.html')
    .pipe(hb({
      data: './handlebars/**/*.json',
      partials: './handlebars/**/*.hbs'
  }))
    .pipe(gulp.dest('./build/html/'));
});

gulp.task('clean-hbs', function(cb) {
  gutil.log('Cleaning out HTML build directory.');
  del('./build/html/*', cb);
});

gulp.task('jsp-compile', ['clean-jsp'], function() {
  return gulp.src('./handlebars/**/*.hbs')
  .pipe(intercept(handleFile))
  .pipe(rename({
    extname: '.jsp'
  }))
  .pipe(gulp.dest('./build/jsp/'));
});

gulp.task('clean-jsp', function(cb) {
  gutil.log('Cleaning out JSP build directory.');
  del('./build/jsp/*', cb);
});

gulp.task('clean', ['clean-hbs', 'clean-jsp']);