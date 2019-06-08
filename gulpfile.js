var gulp = require('gulp'), // Подключаем Gulp
    browserSync = require('browser-sync'), // Подключаем Browser Sync
    autoprefixer = require('gulp-autoprefixer');// Подключаем библиотеку для автоматического добавления префиксов

gulp.task('browser-sync', function () { // Создаем таск browser-sync
    browserSync({ // Выполняем browserSync
        server: { // Определяем параметры сервера
            baseDir: "./" //определяем папку для сервера
        },
        notify: false // Отключаем уведомления
    });
});

gulp.task('code', function () {
    return gulp.src('*.html')
        .pipe(browserSync.reload({ stream: true }))
});

gulp.task('css', function () {
    return gulp.src('css/*.css')
        .pipe(browserSync.reload({ stream: true }))
});

gulp.task('css-prefix', function () {
    return gulp.src('css/*.css') // Выбираем файл для минификации
        .pipe(autoprefixer(['last 2 versions', '> 1%'], { cascade: true })) // Создаем префиксы
        .pipe(gulp.dest('css')) // Выгружаем в папку css
});

gulp.task('watch', function () {
    gulp.watch('css/**/*.css', gulp.parallel('css')); // Наблюдение за sass файлами
    gulp.watch('*.html', gulp.parallel('code')); // Наблюдение за HTML файлами в корне проекта
});

gulp.task('default', gulp.parallel('browser-sync', 'watch'));
gulp.task('build', gulp.parallel('css-prefix', 'browser-sync', 'watch'));
