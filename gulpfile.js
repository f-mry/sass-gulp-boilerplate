const gulp = require("gulp");
const sass = require("gulp-sass");
const browser = require("browser-sync");

const path = {
    scss : 'src/scss/*.scss',
    js : 'src/js/*.js',
    distJS : 'dist/js',
    distCss : 'dist/css'
}

function style(){
    return gulp.src(path.scss)
        .pipe(sass())
        .pipe(gulp.dest(path.distCss))
        .pipe(browser.stream())
}

function js(){
    return gulp.src(path.js)
        .pipe(gulp.src(path.distJS))
        .pipe(browser.stream())
}

function watchFile(){
    browser.init({
        server: {
            baseDir: "./"
        }});
    gulp.watch([path.js, path.scss], gulp.parallel(style, js));
    // gulp.watch(["./*.html"], browser.reload)
    gulp.watch("./*.html").on('change', browser.reload)
}

exports.watch = watchFile

exports.default = gulp.series(
    gulp.parallel(style,js),
    watchFile
)
