/// <binding AfterBuild='default' />
var gulp = require('gulp');
var webpack = require('webpack-stream');
var fs = require('fs-jetpack');
var sass = require('gulp-sass');
var cleanss = require('gulp-cleancss');
var concat = require('gulp-concat');

var buildDir = fs.dir('./build');
var distDir = fs.dir('./libs');
var libjitsiDir = fs.dir('./node_modules/lib-jitsi-meet');
var cssDir = fs.dir('./css');

//STYLES_DESTINATION = css/all.css

var appBundle = [
    buildDir.path('app.bundle.min.js'),
    buildDir.path('app.bundle.min.map'),
    buildDir.path('do_external_connect.min.js'),
    buildDir.path('do_external_connect.min.map'),
    buildDir.path('external_api.min.js'),
    buildDir.path('external_api.min.map'),
    buildDir.path('device_selection_popup_bundle.min.js'),
    buildDir.path('device_selection_popup_bundle.min.map'),
    fs.path('analytics.js')
];

var libjitsiBundle = [
    libjitsiDir.path('lib-jitsi-meet.min.js'),
    libjitsiDir.path('lib-jitsi-meet.min.map'),
    libjitsiDir.path('connection_optimization/external_connect.js')
];


gulp.task('copy-appbundle', ['clean'], () => {
    return gulp.src(appBundle)
        .pipe(gulp.dest(distDir.path()));
});

gulp.task('copy-libjitsi', ['clean'], () => {
    return gulp.src(libjitsiBundle)
        .pipe(gulp.dest(distDir.path()));
});

gulp.task('build-and-copy-css', ['clean'], () => {
    return gulp.src([
        cssDir.path('all.bundle.css'),
        cssDir.path('main.scss')])
        .pipe(sass())
        .pipe(cleanss())
        .pipe(concat('all.css'))
        .pipe(gulp.dest(cssDir.path()));
});

gulp.task('clean', () => {
    distDir.dir('', { empty: true });
});

gulp.task('clean-build', ['copy-appbundle'], () => {
    buildDir.dir('', { empty: true });
});

gulp.task('default',
    ['clean',
        'copy-appbundle',
        'copy-libjitsi',
        'build-and-copy-css',
        'clean-build']);