let gulp = require('gulp'), watch = require('gulp-watch');
let cleanCSS = require('gulp-clean-css');
let sass = require('gulp-sass');

gulp.task('watch', () => {
    // Endless stream mode 
    gulp.watch('./src/css/*.scss', ['styles']);
    return watch('.', { ignoreInitial: false })
        .pipe(gulp.dest('.'));
});

gulp.task('styles', () => {
    return gulp.src('./src/css/style.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(cleanCSS())
    .pipe(gulp.dest('./src/css'));
});

gulp.task('default', function() {
    //Silence is golden   
}); 