var gulp = require('gulp'), // Подключаем Gulp
    browserSync = require('browser-sync'), // Подключаем Browser Sync
    rename = require('gulp-rename'), // Подключаем библиотеку для переименования файлов
    cssnano = require('gulp-cssnano'), // Подключаем пакет для минификации CSS
    autoprefixer = require('gulp-autoprefixer');// Подключаем библиотеку для автоматического добавления префиксов

gulp.task('browser-sync', function () { // Создаем таск browser-sync
    browserSync({ // Выполняем browserSync
        server: { // Определяем параметры сервера
            baseDir: 'app' // Директория для сервера - app
        },
        notify: false // Отключаем уведомления
    });
});

gulp.task('code', function () {
    return gulp.src('app/*.html')
        .pipe(browserSync.reload({ stream: true }))
});

gulp.task('css', function () {
    return gulp.src('app/css/*.css')
        .pipe(browserSync.reload({ stream: true }))
});

gulp.task('css-min', function () {
    return gulp.src('app/css/*.css') // Выбираем файл для минификации
        .pipe(autoprefixer(['last 2 versions', '> 1%'], { cascade: true })) // Создаем префиксы
        .pipe(cssnano()) // Сжимаем
        .pipe(rename({ suffix: '.min' })) // Добавляем суффикс .min
        .pipe(gulp.dest('app/css')) // Выгружаем в папку app/css
});

gulp.task('watch', function () {
    gulp.watch('app/css/**/*.css', gulp.parallel('css')); // Наблюдение за sass файлами
    gulp.watch('app/*.html', gulp.parallel('code')); // Наблюдение за HTML файлами в корне проекта
});

gulp.task('default', gulp.parallel('browser-sync', 'watch'));
gulp.task('build', gulp.parallel('css-min', 'browser-sync', 'watch'));
