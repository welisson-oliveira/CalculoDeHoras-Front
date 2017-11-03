const gulp = require('gulp');
const replace = require('gulp-replace');
const args = require('yargs').argv;
const gulpif = require('gulp-if');
const conf = require('../conf/gulp.conf');

const replaceableString = {
  path:'@@projectName@@',
  url: '@@SERVER_URL@@'
}
const pathToReplace = (args.projectName === undefined || args.projectName ===null) ? '' : args.projectName + '/';
const isProd = args.env === 'prod';
const isDefault = args.env === undefined || args.env ===null || args.env === 'local';
const endpoints = {
  local: 'http://localhost:8081/',
  prod: 'https://calculo-de-horas-server.herokuapp.com/'
}



function replaceUrl() {
  return gulp.src(conf.path.src('/*/constants/constants.js'))
            .pipe(gulpif(isDefault, replace(replaceableString.url, endpoints.local)))
            .pipe(gulpif(isProd, replace(replaceableString.url, endpoints.prod)))
            .pipe(gulp.dest(conf.paths.tmp));
}

gulp.task('replaceUrl', replaceUrl)
