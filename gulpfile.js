var gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync'),
    notify = require('gulp-notify'),
    smartgrid = require('smart-grid'),
    gcmq = require('gulp-group-css-media-queries'),
    concat = require('gulp-concat'),
    autoprefixer = require('gulp-autoprefixer'),
    cleanCSS = require('gulp-clean-css'),
    uglify = require('gulp-uglify'),
    del = require('del'),
    imagemin = require('gulp-imagemin'),
    babel = require('gulp-babel'),
    svgSprite = require('gulp-svg-sprite'),
    svgmin = require('gulp-svgmin'),
    cheerio = require('gulp-cheerio'),
    replace = require('gulp-replace');

const arrayOfcss = ['./source/css/normalize.css', './source/css/smart-grid.css', './source/css/main.css']//, './source/css/main.css'];
const arrayOfJs = ['./source/js/jquery.min.js'];

gulp.task('concatCss', function () {
    console.log("im in concatcss");
    return gulp.src(arrayOfcss)
        .pipe(concat('styles.css'))
        .pipe(gcmq())
        .pipe(autoprefixer({
            cascade: false
        }))
        .pipe(cleanCSS({ level: 2 }))
        .pipe(gulp.dest('./dist/css'));
});

gulp.task('concatJS', function () {
    console.log("im in concatcss");
    return gulp.src(arrayOfJs)
        .pipe(concat('index.js'))
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(uglify({ toplevel: true }))
        .pipe(gulp.dest('./dist/js'));
});

gulp.task('compress', function () {
    return gulp.src('./dist/js/indexBabel.js')
        .pipe(uglify({ toplevel: true }))
        .pipe(gulp.dest('./dist/js/indexUglify.js'))
});

gulp.task('makeSvgSprite', function () {
    return gulp.src('./source/svg/*.svg')
        .pipe(svgmin())
        .pipe(cheerio({
            run: function ($) {
                $('[fill]').removeAttr('fill');
                $('[stroke]').removeAttr('stroke');
                $('[style]').removeAttr('style');
            },
            parserOptions: { xmlMode: true }
        }))
        .pipe(replace('&gt;', '>'))
        .pipe(svgSprite({
            mode: {
                symbol: {
                    dest: '',
                    sprite: 'sprite.svg'
                }
            },
            svg: {
                namespaceClassnames: ''
            }
        }))
        .pipe(gulp.dest('./dist/svgSprite/'))
})

/* It's principal settings in smart grid project */
var settings = {
    outputStyle: 'sass', /* less || scss || sass || styl */
    columns: 12, /* number of grid columns */
    offset: '30px', /* gutter width px || % || rem */
    mobileFirst: false, /* mobileFirst ? 'min-width' : 'max-width' */
    container: {
        maxWidth: '1165px', /* max-width оn very large screen */
        fields: '30px' /* side fields */
    },
    breakPoints: {
        sec21440: {
            width: '1440px'
        },
        sec21610: {
            width: '1610px'
        },
        lge: {
            width: '1520px'
        },
        lg: {
            width: '1100px', /* -> @media (max-width: 1100px) */
        },
        md: {
            width: '960px'
        },
        sm: {
            width: '780px',
            fields: '15px' /* set fields only if you want to change container.fields */
        },
        xs: {
            width: '560px',
            fields: '15px'
        }
    }
};

smartgrid('./source/sass', settings);

gulp.task('sass', function () {
    return gulp.src('source/sass/*.+(sass|scss)')
        .pipe(sass({ outputStyle: 'expanded' }).on("error", notify.onError()))
        .pipe(gulp.dest('source/css'))
        .pipe(browserSync.reload({ stream: true }))
    //.pipe(browserSync.stream());
});

gulp.task('browser-sync', function () {
    browserSync({
        server: {
            baseDir: './'
        },
        notify: false
    });
});


//Не использую не устраивает сжатие.(лучше тут https://www.iloveimg.com/ru/compress-image)
gulp.task('imageMin', function () {
    gulp.src('app/img/**')
        .pipe(imagemin([
            imagemin.gifsicle({ interlaced: true }),
            imagemin.jpegtran({ progressive: true }),
            imagemin.optipng({ optimizationLevel: 5 }),
            imagemin.svgo({
                plugins: [
                    { removeViewBox: true },
                    { cleanupIDs: false }
                ]
            })
        ]))
        .pipe(gulp.dest('dist/img/'))
});

gulp.task('cleanDist', async function () {
    const deletedPaths = await del(['dist/**', '!dist/imgs', '!dist/fonts', '!dist/index.html']);
    console.log('Deleted files and directories:\n', deletedPaths.join('\n'));
})

gulp.task('dev', gulp.parallel('sass', 'browser-sync', function () {
    gulp.watch('source/sass/**/*.+(sass|scss)', gulp.parallel('sass'))
    //gulp.watch('source/sass/**/*.+(sass|scss)', gulp.parallel('sass')).on('change', browserSync.reload);
    gulp.watch('./*.html').on('change', browserSync.reload);
    gulp.watch('source/js/*.js').on('change', browserSync.reload);
}));

gulp.task('build', gulp.series("cleanDist", 'sass', 'concatCss', 'concatJS', 'makeSvgSprite'));