'use strict';

const gulp = require('gulp');
const browserSync = require('browser-sync');
const nodemon = require('gulp-nodemon');

const stylus = require('gulp-stylus');
const plumber = require('gulp-plumber');

const BROWSER_SYNC_RELOAD_DELAY = 3000;


gulp.task('default', ['browser-sync'], () => {
  gulp.watch('public/**/*.js',   ['js', browserSync.reload]);
  gulp.watch('public/**/*.styl',  ['css']);
  gulp.watch('views/**/*.jade', ['bs-reload']);
});


gulp.task('browser-sync', ['nodemon'], () => {

  browserSync({
    proxy: 'http://localhost:3000',
    port: 7000,
    notify: false
    //browser: ['google-chrome']
  });
});

gulp.task('nodemon',  cb => {

  let called = false;

  return nodemon({
    script: 'bin/www',
    watch: ['./','!public/**'] //ignore static files
  })
    .on('start', ()  => {
      if (!called) { cb(); }
      called = true;
    })
    .on('restart', () =>  {
      setTimeout(() => {
        browserSync.reload({
          stream: false
        });
      }, BROWSER_SYNC_RELOAD_DELAY);
    });
});

gulp.task('js', () => {
  return gulp.src(['public/**/*.js','!public/js/plugins/*.js']);
  // do stuff with JavaScript files
  //.pipe(uglify())
  //.pipe(babelify())
  //.pipe(gulp.dest('...'));
});

gulp.task('css', () => {
  return gulp.src('public/**/*.styl')
    .pipe(plumber())
    .pipe(stylus())
    .pipe(gulp.dest("public"))
    .pipe(browserSync.stream());
});

gulp.task('bs-reload', () => {
  browserSync.reload();
});



