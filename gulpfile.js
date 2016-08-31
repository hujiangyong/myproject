
'use strict';

var gulp = require('gulp'),
	runSequence = require('run-sequence'),
	inject = require('gulp-inject'),
	bowerFiles = require('main-bower-files'),
	plumber = require('gulp-plumber'),
    shim = require('browserify-shim'),
    browserify = require("browserify"),
    babelify = require("babelify"),
    source = require("vinyl-source-stream"),
    es = require("event-stream"),
    less = require('gulp-less'),
    browserSync = require('browser-sync'),
    del = require('del'),
    changed = require('gulp-changed'),
    rev = require('gulp-rev'),
    imagemin = require('gulp-imagemin'),
    flatten = require('gulp-flatten');




var config = require('./gulp/config');

var handleErrors = require('./gulp/handleErrors'),
    serve = require('./gulp/serve'),
    build = require('./gulp/build');


/**
 * [清除任务]
 */
gulp.task('clean', function () {
    return del([config.dist], { dot: true });
});

/**
 * [复制任务，将一些静态文件复制到部署目录中]
 */
gulp.task('copy', function () {
     return es.merge(
        gulp.src(config.bower + 'bootstrap/fonts/*.*')
        .pipe(plumber({errorHandler: handleErrors}))
        .pipe(changed(config.dist + 'content/fonts/'))
        .pipe(rev())
        .pipe(gulp.dest(config.dist + 'content/fonts/'))
        .pipe(rev.manifest(config.revManifest, {
            base: config.dist,
            merge: true
        }))
        .pipe(gulp.dest(config.dist)),
        gulp.src(config.app + 'content/**/*.{woff,woff2,svg,ttf,eot,otf}')
        .pipe(plumber({errorHandler: handleErrors}))
        .pipe(changed(config.dist + 'content/fonts/'))
        .pipe(flatten())
        .pipe(rev())
        .pipe(gulp.dest(config.dist + 'content/fonts/'))
        .pipe(rev.manifest(config.revManifest, {
            base: config.dist,
            merge: true
        }))
        .pipe(gulp.dest(config.dist)),
        gulp.src([config.app + 'robots.txt', config.app + 'favicon.ico', config.app + '.htaccess'], { dot: true })
        .pipe(plumber({errorHandler: handleErrors}))
        .pipe(changed(config.dist))
        .pipe(gulp.dest(config.dist))
    );
});


/**
 * [图片压缩任务]
 */
gulp.task('images', function () {
    return gulp.src(config.app + 'content/images/**')
        .pipe(plumber({errorHandler: handleErrors}))
        .pipe(changed(config.dist + 'content/images'))
        .pipe(imagemin({optimizationLevel: 5, progressive: true, interlaced: true}))
        .pipe(rev())
        .pipe(gulp.dest(config.dist + 'content/images'))
        .pipe(rev.manifest(config.revManifest, {
            base: config.dist,
            merge: true
        }))
        .pipe(gulp.dest(config.dist))
        .pipe(browserSync.reload({stream: true}));
});

/**
 * [编译react任务]
 */
gulp.task('react:app',function(){
    return browserify(config.app + '/app/app.js')
         .transform(babelify,{
            presets:['es2015','react']
         })
         //.transform(shim)
         .bundle()
         .pipe(source('app.js'))
         .pipe(gulp.dest(config.app + '/content/js/'))
         .pipe(browserSync.reload({stream: true}));
});


/**
 * [编译less任务]
 */
gulp.task('less:app',function(){
    return gulp.src(config.app + '/less/**/*.less')
        .pipe(plumber({errorHandler: handleErrors}))
        .pipe(less())
        .pipe(gulp.dest(config.app + '/content/css/'))
        .pipe(browserSync.reload({stream: true}));    
    


});


/**
 * [将app依赖注入index.html任务]
 */
gulp.task('inject:app', function () {
    var stream = gulp.src(config.app + 'index.html')
        .pipe(plumber({errorHandler: handleErrors}))
        .pipe(inject(es.merge(gulp.src(config.app + "/css/**/*.css"),gulp.src(config.app + "/js/**/*.js")),
        {
            ignorePath:config.app + ""
        }))
        .pipe(gulp.dest(config.app));

    return stream;
});


/**
 * [将bower依赖注入index.html任务]
 */
gulp.task('inject:vendor', function () {
    var stream = gulp.src(config.app + 'index.html')
        .pipe(plumber({errorHandler: handleErrors}))
        .pipe(inject(gulp.src(bowerFiles(), {read: false}), {
            name: 'bower',
            relative: true
        }))
        .pipe(gulp.dest(config.app));

    return stream;
});

/**
 * [将所有依赖注入index.html任务]
 */
gulp.task('inject', function () {
    var stream = gulp.src(config.app + 'index.html')
        .pipe(plumber({errorHandler: handleErrors}))
        .pipe(inject(gulp.src(bowerFiles(), {read: false}), {
            name: 'bower',
            relative: true
        }))
        .pipe(inject(es.merge(gulp.src(config.app + "/content/css/**/*.css"),gulp.src(config.app + "/content/js/**/*.js"))))
        .pipe(gulp.dest(config.app));

    return stream;
});

/**
 * [监控文件变化任务]
 */
gulp.task('watch', function () {
    gulp.watch('bower.json', ['inject']);
    gulp.watch(config.app + 'less/**/*.less', ['less:app']);
    gulp.watch(config.app + 'images/**', ['images']);
    gulp.watch(config.app + 'app/**/*.js', ['react:app']);
    gulp.watch(config.app + '*.html', ['inject']).on('change', browserSync.reload);
});

/**
 * [编译任务]
 * 
 */
gulp.task('compile', function(){
    runSequence(['react:app','less:app'])
});

/**
 * [安装任务]
 */
gulp.task('install', function () {
    runSequence('compile','inject');
});

/**
 * [开发任务]
 */
gulp.task('serve', function () {
    runSequence('install',serve);
});


/**
 * [部署任务]
 */
gulp.task('build',['clean'],function(){
    runSequence(['copy', 'install'], build);
})


/**
 * [默认任务]
 */
gulp.task('default', ['serve']);









