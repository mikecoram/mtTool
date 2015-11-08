var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var es = require('event-stream');
var browserSync = require('browser-sync').create();

gulp.task('html', function () {
	gulp.src('src/*.html')
	.pipe(gulp.dest('dist/'));
});

gulp.task('css', function() {
	gulp.src('src/css/*.css')
	.pipe(gulp.dest('dist/css/'));
});

gulp.task('img', function() {
	gulp.src('src/img/*')
	.pipe(gulp.dest('dist/img/'));
});

gulp.task('scripts', function () {
	gulp.src('src/js/*.js')
	.pipe(concat('all.min.js'))
	.pipe(uglify())
	.pipe(gulp.dest('dist/js'));
});

gulp.task('build', ['html', 'css', 'img', 'scripts'], function() {
	gulp.run('serve');
});

gulp.task('default', ['build']);

gulp.task('browser-sync', function() {
	browserSync.init({
		server: {
			baseDir: "./dist/"
		}
	});
});

gulp.task('serve', function () {
	browserSync.init({
        server: './dist/'
    });

    browserSync.reload();
});
