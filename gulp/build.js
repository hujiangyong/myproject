var fs = require('fs'),
    gulp = require('gulp'),
    lazypipe = require('lazypipe'),
    sourcemaps = require('gulp-sourcemaps'),
    rev = require('gulp-rev'),
    htmlmin = require('gulp-htmlmin'),
    prefix = require('gulp-autoprefixer'),
    cssnano = require('gulp-cssnano'),
    uglify = require('gulp-uglify'),
    revReplace = require("gulp-rev-replace")
    plumber = require('gulp-plumber'),
    gulpIf = require('gulp-if'),
    handleErrors = require('./handleErrors'),
    useref = require('gulp-useref');

var config = require('./config');

var jsTask = lazypipe()
    .pipe(uglify);
var cssTask = lazypipe()
    .pipe(prefix)
    .pipe(cssnano);

module.exports = function() {
     var manifest = gulp.src(config.revManifest);
     return gulp.src([config.app + '*.html',
          '!' + config.app + 'content/**/*.html',
          '!' + config.bower + '**/*.!(html)'])
        .pipe(plumber({errorHandler: handleErrors}))
        .pipe(useref())
        .pipe(gulpIf('*.js', jsTask()))
        .pipe(gulpIf('*.css', cssTask()))
        .pipe(gulpIf('**/*.!(html)', rev()))
        .pipe(revReplace({manifest: manifest}))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(config.dist));
        
}
