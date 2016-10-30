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

// Html
gulp.task('html', () => {
  gulp.src('src/*.html')
  .pipe(plumber())
  .pipe(gulp.dest('dist/'))
  .pipe(browserSync.stream());
});

// Task script
gulp.task('script', () => {
  gulp.src([
    'src/js/libs/*.js',
    'src/js/app/*.js',
    'src/js/main.js',
  ])
  .pipe(plumber())
  .pipe(sourcemaps.init())

  .pipe(babel({ presets: ['es2015'] }))
  .pipe(concat('app.js'))
  .pipe(uglify())

  .pipe(sourcemaps.write('.'))
  .pipe(gulp.dest('dist/js'))
  .pipe(browserSync.stream());
});

// Task style
gulp.task('style', () => {
  gulp.src('src/scss/*.scss')
  .pipe(plumber())
  .pipe(sourcemaps.init())

  .pipe(sass({ outputStyle: 'compressed' }))
  .pipe(autoprefixer('last 2 versions'))

  .pipe(sourcemaps.write('.'))
  .pipe(gulp.dest('dist/css'))
  .pipe(browserSync.stream());
});

// Image compressor
gulp.task('image', () => {
  gulp.src('src/img/**/*')
  .pipe(imagemin())
  .pipe(gulp.dest('dist/img/'));
});

// Media files
gulp.task('media', () => {
  gulp.src('src/media/**/*')
  .pipe(gulp.dest('dist/media/'));
});

// Fonts
gulp.task('fonts', () => {
  gulp.src('src/fonts/*')
  .pipe(plumber())
  .pipe(gulp.dest('dist/fonts/'))
  .pipe(browserSync.stream());
});

// Watches changes
gulp.task('watch', () => {
  browserSync.init({ server: 'dist/' });
  gulp.watch('src/*.html', ['html']);
  gulp.watch('src/img/**/*', ['image']);
  gulp.watch('src/media/**/*', ['media']);
  gulp.watch('src/js/**/*.js', ['script']);
  gulp.watch('src/fonts/**/*', ['fonts']);
  gulp.watch('src/scss/**/*.scss', ['style']);
  gulp.watch('src/*.html').on('change', browserSync.reload);
});

// Trigger build & watch
gulp.task('default', ['script', 'fonts', 'style', 'image', 'media', 'html', 'watch']);

