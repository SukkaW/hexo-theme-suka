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

gulp.task('default', gulp.series('minify-js', 'minify-css'));
