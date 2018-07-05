let gulp = require('gulp');
let cleanCSS = require('gulp-clean-css');
let uglify = require('gulp-uglify');
let rename = require("gulp-rename");

gulp.task('minify-js', () => {
  return gulp.src('dist/**/*.js')
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('source'));
});

gulp.task('minify-css', () => {
  return gulp.src('dist/**/*.css')
    .pipe(rename({suffix: '.min'}))
    .pipe(cleanCSS())
    .pipe(gulp.dest('source'));
});

gulp.task('build', gulp.parallel('minify-js', 'minify-css'));

gulp.task('default', gulp.parallel('build'));

gulp.task('watch', function() {
  gulp.watch('./dist/**', gulp.parallel('build'));
});