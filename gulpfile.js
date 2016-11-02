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
    'scsssrc': './app/scss',
    'scssdist': './public/css'
  };

gulp.task('clean', function(cb) {
  var del = require('del');

  return del([
    fpath.jsdist +'/*.js', // public/js/*.js
    fpath.scssdist +'/*.css', // public/css/*.js
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

gulp.task('scssmerge', function() {
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

  return gulp.src(fpath.scsssrc +'/modules.scss.json')
    .pipe(builder({ext:'scss'}))
    .pipe(header(trailer.header, headerOpt))
    .pipe(footer(trailer.footer))
    .pipe(gulp.dest(fpath.scssdist));
});

gulp.task('scss', function () {
  var del = require('del');

  gulp.src(fpath.scssdist + '/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(fpath.scssdist))
    .pipe(livereload());

  del(fpath.scssdist + '/*.scss');
});

gulp.task('watch', function () {
  gulp.watch(fpath.scsssrc + '/**/*.scss', function() {
    runsync('scssmerge', 'scss');
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
  runsync('clean', 'scssmerge', 'scss', 'jsmerge', 'uglify', done);
});

gulp.task('local', function(done) {
  runsync('clean', 'scssmerge', 'scss', 'jsmerge', 'develop', 'watch', done);
});
