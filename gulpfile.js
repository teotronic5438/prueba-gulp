// gulpfile.js
// require gulp es una instrauccion nueva, busca el archivo de gulo en node modules y trae todo
// lo guarda en una variable para poder trabajarlo.

// require gulp
var gulp = require('gulp');

// require other packages
var concat = require('gulp-concat');
var cssmin = require('gulp-minify-css');
var rename = require("gulp-rename");
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');





// styles task compila css de sass
gulp.task('styles', function() {
    return gulp.src('./src/css/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./dest/css/'))
        .pipe(cssmin())
        .pipe(gulp.dest('./dest/css/'));
});

// scripts task compila todos los archivos de javascript
gulp.task('scripts', function() {
    return gulp.src('./src/js/*.js')
    .pipe(concat('app.js'))
    .pipe(gulp.dest('./dest/js/'))
    .pipe(uglify())
    .pipe(rename({
    suffix: '.min'
    }))
    .pipe(gulp.dest('./dest/js/'));
});

// watch task - esto automatiza las dos anteriores pero necesita tenerlas previamente
// chequear escritura de gulp.series('instruccion a correr'); por actualizacion.
// CTRL + C salgo de estado watch
gulp.task('watch', function() {
    gulp.watch('./src/js/*.js', gulp.series('scripts'));
    gulp.watch('./src/css/*.scss', gulp.series('styles'));
});

// default task accion por default, se lo cambio y dejo activado el observador para
// que guarde los cambios en cada edicion de sass y javaScript
// gulp.parallel ('instruccion1', 'instruccion2', 'instrucion3 que mira las dos primeras')
gulp.task('default', gulp.parallel('styles', 'scripts', 'watch'));