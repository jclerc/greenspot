// Require each gulp plugins
var gulp         = require('gulp');
var uglify       = require('gulp-uglify');
var sass         = require('gulp-sass');
var browserSync  = require('browser-sync').create();
var imagemin     = require('gulp-imagemin');
var autoprefixer = require('gulp-autoprefixer');
var babel        = require('gulp-babel');
var sourcemaps   = require('gulp-sourcemaps');
var concat       = require('gulp-concat');
var plumber      = require('gulp-plumber');
var modernizr    = require('gulp-modernizr');
var config       = require('./config.json');

// Html
gulp.task('html', _ => {
  gulp.src(config.tasks.html.src)
  .pipe(plumber())
  .pipe(gulp.dest(config.tasks.html.dest))
  .pipe(browserSync.stream());
});

// Task script
gulp.task('script', _ => {
  let src = [].concat(config.tasks.script.dest + 'modernizr.js')
              .concat(config.tasks.script.src);

  gulp.src(src)
  .pipe(plumber())
  .pipe(sourcemaps.init())

  .pipe(babel({ presets: ['es2015'] }))
  .pipe(concat('app.js'))
  .pipe(uglify())

  .pipe(sourcemaps.write('.'))
  .pipe(gulp.dest(config.tasks.script.dest))
  .pipe(browserSync.stream());
});

// Task style
gulp.task('style', _ => {
  gulp.src(config.tasks.style.src)
  .pipe(plumber())
  .pipe(sourcemaps.init())

  .pipe(sass({ outputStyle: 'compressed' }))
  .pipe(autoprefixer('last 2 versions'))

  .pipe(sourcemaps.write('.'))
  .pipe(gulp.dest(config.tasks.style.dest))
  .pipe(browserSync.stream());
});

// Image compressor
gulp.task('image', _ => {
  gulp.src(config.tasks.image.src)
  .pipe(imagemin())
  .pipe(gulp.dest(config.tasks.image.dest));
});

// Media files
gulp.task('media', _ => {
  gulp.src(config.tasks.media.src)
  .pipe(gulp.dest(config.tasks.media.dest));
});

// Fonts
gulp.task('fonts', _ => {
  gulp.src(config.tasks.fonts.src)
  .pipe(plumber())
  .pipe(gulp.dest(config.tasks.fonts.dest))
  .pipe(browserSync.stream());
});

// Watches changes
gulp.task('watch', _ => {
  browserSync.init({ server: config.server.directory });
  gulp.watch(config.tasks.html.src, ['html']);
  gulp.watch(config.tasks.image.src, ['image']);
  gulp.watch(config.tasks.media.src, ['media']);
  gulp.watch(config.tasks.script.src, ['script']);
  gulp.watch(config.tasks.fonts.src, ['fonts']);
  gulp.watch(config.tasks.style.src, ['style']);
  gulp.watch(config.tasks.html.src).on('change', browserSync.reload);
});

// Build Task Modernizr
gulp.task('modernizr', _ => {
  gulp.src(config.tasks.script.src)
    .pipe(modernizr())
    .pipe(gulp.dest(config.tasks.script.dest));
});

// Trigger build & watch
gulp.task('default', ['script', 'fonts', 'style', 'image', 'media', 'html', 'watch']);

// Only build
gulp.task('build', ['script', 'fonts', 'style', 'image', 'media', 'html']);
