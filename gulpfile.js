//Подключаем локальные пакеты
var gulp = require("gulp");
var sass = require("gulp-sass");
var autoprefixer = require("gulp-autoprefixer");

//Определение задачи по умолчанию в GULP
gulp.task("default", function() {
  console.log(10);
});

gulp.task("sassToCSS", function(done) {
  gulp
    .src("./dev/*.scss")
    .pipe(
      sass({
        errorLogToConsole: true
        // outputStyle: 'compressed'
      })
    )
    .on("error", console.error.bind(console))
    // .pipe(rename({suffix: '.min'}))
    .pipe(
      autoprefixer({
        cascade: false
      })
    )
    .pipe(gulp.dest("./css/"));
  done();
});

//Отслеживание изменений
gulp.task("scss:watch", function() {
  //Находим папку и отмечаем, за каким файлом необходимо наблюдать, если он найден - выполняем задание "scss"
  gulp.watch("./dev/**/*.scss", gulp.series("sassToCSS"));
});

// gulp.task('watch', function() {
//     gulp.watch('app/css/*.css', gulp.series('styles'));
//     gulp.watch('app/js/*.js', gulp.series('scripts'));
//     gulp.watch('app/img/*', gulp.series('images'));
//   });
