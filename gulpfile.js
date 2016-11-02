const appname = "ggamji";

var gulp = require('gulp'),
  nodemon = require('gulp-nodemon'),
  plumber = require('gulp-plumber'),
  livereload = require('gulp-livereload'),
  sass = require('gulp-sass'),
  runsync = require('run-sequence');

var pkg = require('./package.json'),
  fpath = {
    'jssrc': './app/js',
    'jsdist': './public/js',
    'sasssrc': './app/sass',
    'sassdist': './public/css'
  };

gulp.task('clean', function(cb) {
  var del = require('del');

  return del([
    fpath.jsdist +'/*.js', // public/js/*.js
    fpath.sassdist +'/*.css', // public/css/*.js
  ], cb);
});

gulp.task('jsmerge', function() {
  var builder = require('gulp-module-builder'),
    header = require('gulp-header'),
    footer = require('gulp-footer'),
    trailer = require('./gulp/trailer'),
    dateformat = require('dateformat'),
    now = new Date(),
    headerOpt = {
      pkg: pkg,
      date: {
        now: dateformat(now, 'yyyy-mm-dd HH:MM:ss'),
        year: dateformat(now, 'yyyy'),
      }
    };

  return gulp.src(fpath.jssrc +'/modules.js.json')
    .pipe(builder())
    .pipe(header(trailer.header, headerOpt))
    .pipe(footer(trailer.footer))
    .pipe(gulp.dest(fpath.jsdist))
    .pipe(livereload());
});

gulp.task('sassmerge', function() {
  var builder = require('gulp-module-builder'),
    header = require('gulp-header'),
    footer = require('gulp-footer'),
    trailer = require('./gulp/trailer'),
    dateformat = require('dateformat'),
    now = new Date(),
    headerOpt = {
      pkg: pkg,
      date: {
        now: dateformat(now, 'yyyy-mm-dd HH:MM:ss'),
        year: dateformat(now, 'yyyy'),
      }
    };

  return gulp.src(fpath.sasssrc +'/modules.sass.json')
    .pipe(builder({ext:'sass'}))
    .pipe(header(trailer.header, headerOpt))
    .pipe(footer(trailer.footer))
    .pipe(gulp.dest(fpath.sassdist));
});

gulp.task('sass', function () {
  var del = require('del');

  gulp.src(fpath.sassdist + '/*.sass')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(fpath.sassdist))
    .pipe(livereload());

  del(fpath.sassdist + '/*.sass');
});

gulp.task('watch', function () {
  gulp.watch(fpath.sasssrc + '/**/*.sass', function() {
    runsync('sassmerge', 'sass');
  });
  gulp.watch('./app/js/**/*.js', function() {
    runsync('jsmerge');
  });
});

gulp.task('develop', function () {
  livereload.listen();
  nodemon({
    script: 'app.js',
    ext: 'ejs js',
    ignore: ['app/js/', 'public/js/'],
    stdout: false
  }).on('readable', function () {
    this.stdout.on('data', function (chunk) {
      if(/^Express server listening on port/.test(chunk)){
        livereload.changed(__dirname);
      }
    });
    this.stdout.pipe(process.stdout);
    this.stderr.pipe(process.stderr);
  });
});

gulp.task('uglify', function() {
  var uglify = require('gulp-uglify'),
    rename = require('gulp-rename');

  return gulp.src(fpath.jsdist +'/*.js')
    .pipe(uglify({
      preserveComments: 'some',
      output: {
        beautify: false,
        source_map: null
      },
      compress: { warnings: false },
      mangle: {}
    }))
    .pipe(gulp.dest(fpath.jsdist));
});

gulp.task('default', function(done) {
  runsync('clean', 'sassmerge', 'sass', 'jsmerge', 'uglify', done);
});

gulp.task('local', function(done) {
  runsync('clean', 'sassmerge', 'sass', 'jsmerge', 'develop', 'watch', done);
});
