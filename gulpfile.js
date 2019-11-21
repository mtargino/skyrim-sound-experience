
var gulp = require('gulp');
var sass = require('gulp-sass');
var minify = require('gulp-clean-css');
var rename = require('gulp-rename');
const imagemin = require('gulp-imagemin');



gulp.task('sass', function(){
  return gulp.src('assets/css/main.scss')
    .pipe(sass().on('error',sass.logError)) // Converts Sass to CSS with gulp-sass
    .pipe(gulp.dest('assets/css'));
});

gulp.task('minify', function() {
  return gulp.src('assets/css/*.css')
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('assets/css'));
});

gulp.task('css:minify', function () {
  return gulp.src('assets/css/main.css')
      .pipe(gulp.dest('assets/css'))
      .pipe(minify())
      .pipe(rename({ extname: '.min.css' }))
      .pipe(gulp.dest('assets/css'));
});

gulp.task('imagemin', function(){
  gulp.src('assets/img/*')
  .pipe(imagemin([
    imagemin.gifsicle({interlaced: true}),
    imagemin.jpegtran({progressive: true}),
    imagemin.optipng({optimizationLevel: 3}),
    imagemin.svgo({
        plugins: [
            {removeViewBox: true},
            {cleanupIDs: false}
        ]
    })
]));
});

gulp.task('watch',function(){
  gulp.watch('assets/css/settings/*.scss', gulp.series('sass'));
  gulp.watch('assets/css/components/*.scss', gulp.series('sass'));
});


gulp.task('default',function(){

});