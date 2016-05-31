var gulp = require('gulp');
var gutil = require('gulp-util');
var changed = require('gulp-changed');
var cache = require('gulp-cached');
var babel = require('gulp-babel');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
var server = require('gulp-develop-server');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var envify = require('envify');
var del = require('del');


gulp.task('default',['server:start']);

/** Dev Server **/
gulp.task('server:start',['build-server','build-dev','watch'],function() {
  gutil.log('Starting Dev Server');
  return server.listen({path: 'bin/www'});
});
gulp.task('server:restart',['build-server'],function() {
  gutil.log('Restarting Dev Server');
  return server.restart();
});
gulp.task('watch',[],function() {
  gulp.watch(['src/**/*.{js,jsx}','src/views/**/*','!src/ssets/**/*'],['server:restart']);
  gulp.watch(['src/assets/js/**/*.js','src/assets/js/**/*.jsx','src/components/**/*.jsx','src/data/**/*.js','src/flux/**/*.js'],['browserify']);
  gulp.watch(['src/assets/style/**/*.scss'],['sass']);
  gulp.watch(['src/assets/images/**/*.{gif,jpg,jpeg,png}'],['image-min']);
  gulp.watch(['src/assets/fonts/**/*'],['static-assets']);
});
gulp.task('build-dev',['browserify','sass','image-min','static-assets'], function() {
  return gutil.log('Front end assets built.');
})
gulp.task('clean',function() {
  return del(['build/*']);
});

/** Production **/
gulp.task('build-prod',['build-server','production-js','production-css','image-min','static-assets'],function() {
  return gutil.log('Production build complete');
});

/** Server Build **/
gulp.task('build-server',['copy-views','transpile-server'],function() {
  return gutil.log('Server build complete');
});
gulp.task('transpile-server',[],function() {
  return gulp.src(['src/**/*.{js,jsx}','!src/ssets/**/*'])
    .pipe(cache('server-build'))
    .pipe(babel().on('error',function(err) {
      gutil.log(err.message);
      this.emit('end');
    }))
    .pipe(gulp.dest('build'));
});
gulp.task('copy-views',[],function() {
  return gulp.src('src/views/**/*')
    .pipe(changed('build/views'))
    .pipe(gulp.dest('build/views'));
});

/** JS tasks **/
gulp.task('browserify',[],function() {
  return browserify({
    entries: 'src/assets/js/main.js',
    extensions: ['.jsx'],
  })
  .transform('babelify')
  .transform('envify',{
    NODE_ENV: process.env.NODE_ENV || 'development'
  })
  .bundle()
  .on('error',function(err) {
    gutil.log('Babelify ERR: ',err.message);
    this.emit('end');
  })
  .pipe(source('main.js'))
  .pipe(gulp.dest('build/public/javascripts'))
});
gulp.task('production-js',[],function() {
  return browserify({
    entries: 'src/assets/js/main.js',
    extensions: ['.jsx'],
  })
  .transform('babelify')
  .transform('envify',{
    NODE_ENV: process.env.NODE_ENV || 'development'
  })
  .bundle()
  .pipe(source('main.js'))
  .pipe(buffer())
  .pipe(uglify())
  .pipe(gulp.dest('./build/public/javascripts'));
});

/** CSS **/
gulp.task('sass',[],function() {
  return gulp.src('src/assets/style/main.scss')
    .pipe(sass().on('error',sass.logError))
    .pipe(gulp.dest('build/public/stylesheets'));
});
gulp.task('production-css',function() {
  return gulp.src('src/assets/style/main.scss')
    .pipe(sass({outputStyle: 'compressed'}).on('error',gutil.log))
    .pipe(gulp.dest('build/public/stylesheets'));
});

/** Images **/
gulp.task('image-min',function() {
  console.log('minifying images...');
  return gulp.src('src/assets/images/**/*.{png,jpg,jpeg,gif}')
    .pipe(changed('build/public/images/'))
    .pipe(imagemin({
      progressive: true,
      svgoPlugins: [{removeViewBox: false}],
      use: [pngquant()]
    }))
    .pipe(gulp.dest('build/public/images/'))
});

/** Static Files **/
gulp.task('static-assets',function() {
  gulp.src('src/assets/fonts/**/*')
    .pipe(changed('build/public/fonts'))
    .pipe(gulp.dest('build/public/fonts'));
  // gulp.src('src/assets/docs/**/*')
  //   .pipe(changed('build/public/docs'))
  //   .pipe(gulp.dest('build/public/docs'));
  gulp.src([
      'src/assets/favicon*',
      'src/assets/mstile*',
      'src/assets/apple-touch-icon*',
      'src/assets/sitemap.txt',
    ])
    .pipe(changed('build/public'))
    .pipe(gulp.dest('build/public'));
});
