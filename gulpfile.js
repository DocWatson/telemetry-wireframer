//project vars
var projectName = 'Wireframes';
var outputPath  = '../public_html/wireframes/';

var browserSync = require('browser-sync').create();
var gulp        = require('gulp');
var concat      = require('gulp-concat');
var jade        = require('gulp-jade');
var less        = require('gulp-less');
var notifier    = require("node-notifier");
var path        = require('path');
var reload      = browserSync.reload;
var rename      = require('gulp-rename');
var uglify      = require('gulp-uglify');

//function to handle gulp watch errors
function swallowError(error) {
  console.log(error.message);
  notifier.notify({title: 'Error', message: error.message});
  this.emit('end');
}

// function to move fonts from bower installed directories to your output directory
gulp.task('copyfonts', function() {
   gulp.src(['./bower_components/font-awesome/fonts/**/*.{ttf,woff,eof,svg}',
            './bower_components/components-blokkfont/**/*.{ttf,woff,eof,svg,css}'])
   .pipe(gulp.dest(outputPath + 'fonts/'));
});

// default gulp task
gulp.task('default', function(){
  gulp.start(['copyfonts', 'js', 'less', 'templates', 'watch']);
});

gulp.task('js', function() {
  return gulp.src(['./bower_components/jquery/dist/jquery.js',
    './bower_components/bootstrap/dist/js/bootstrap.js',
    './assets/js/*.js'])
    .pipe(concat('scripts.js'))
    .pipe(gulp.dest(outputPath + 'js/'))
    .pipe(uglify())
    .on('error', swallowError)
    .pipe(rename('scripts.min.js'))
    .pipe(gulp.dest(outputPath + 'js/'))
    .pipe(reload({stream: true}));
});

// compile the less
gulp.task('less', function () {
  return gulp.src('./assets/less/app.less')
    .pipe(less({
      paths: [   ]
    }))
    .on('error', swallowError)
    .pipe(concat('style.css'))
    .pipe(gulp.dest(outputPath + 'css/'))
    .pipe(reload({stream: true}));
});

// compile the jade templates
gulp.task('templates', function() {
  gulp.src('./templates/*.jade')
    .pipe(jade())
    .on('error', swallowError)
    .pipe(gulp.dest(outputPath))
});

// watch tasks. Fires on jade template or less file change
gulp.task('watch', function(){
  browserSync.init({
      server: {
          baseDir: outputPath
      }
  });

  gulp.watch('templates/**/*.jade', ['templates']);
  gulp.watch('assets/less/**/*.less',['less']);
  gulp.watch('assets/js/**/*.js',['js']);
});
