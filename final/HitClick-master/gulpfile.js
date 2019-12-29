const gulp = require('gulp');
const sass = require('gulp-sass');
const plumber = require('gulp-plumber');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync').create();

const handleError = function(err){
    console.log(err.toString());
    this.emit('end');
}

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./"

        }
    });
});



gulp.task('sass', function () {
  return gulp.src('./scss/main.scss')
    .pipe(plumber({ errorHandler: handleError }))
    .pipe(sourcemaps.init())
    .pipe(sass({
        outputStyle: 'nested' // nested, expanded , compact , compressed

    }))
    .pipe(autoprefixer({
            browsers: ['last 2 versions']
             }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./css'))
    .pipe(browserSync.stream());
});

gulp.task('watch', function () {
  gulp.watch('./scss/**/*.scss', ['sass']);
  gulp.watch("./*.html").on('change', browserSync.reload);
});


// default
gulp.task('default', ['sass', 'watch', 'browser-sync']);
