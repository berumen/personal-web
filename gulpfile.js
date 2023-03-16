const { src, dest, series, watch } = require('gulp');
const postCss = require('gulp-postcss');
const tailwindCss = require('tailwindcss');
const rename = require('gulp-rename');

function styleTC() {
  return src('./src/input.css')
    .pipe(postCss([tailwindCss('./src/tailwind.config.js')]))
    .pipe(rename('berumen.css'))
    .pipe(dest('./src/css'));
}

const cssMinify = require('gulp-clean-css');
function styleMin() {
  return src('./src/css/*.css')
    .pipe(cssMinify())
    .pipe(rename({ extname: '.min.css' }))
    .pipe(dest('./dist/'));
}

function cpHtml() {
  return src('./src/*.html').pipe(dest('./dist/'));
}

function watcher() {
  watch(['./src/*.html'], series(styleMin));
}

exports.default = series(styleTC, styleMin, cpHtml, watcher);
