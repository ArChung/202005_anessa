import gulp from "gulp"
import del from "del"
import autoprefixer from "autoprefixer"
import browserSync from "browser-sync"
import minimist from "minimist"
import sassImage from "gulp-sass-image"
import order from "gulp-order"

// import merge from 'merge-stream'

const $ = require("gulp-load-plugins")()
const jsLibs = [
  "./node_modules/jquery/dist/jquery.min.js",
  "./node_modules/jquery-migrate/dist/jquery-migrate.min.js", // 補充一些jquery 更新後刪掉的 functions
  "./node_modules/fastclick/lib/fastclick.js",
  "./node_modules/lettering.js/index.js",
  "./node_modules/swiper/js/swiper.min.js",
  "./node_modules/slideout/dist/slideout.min.js",
  "./node_modules/in-view/dist/in-view.min.js",
  "./node_modules/motus/dist/motus.web.js",
  "./node_modules/gsap/dist/gsap.min.js",
  './node_modules/imagesloaded/imagesloaded.pkgd.min.js',
  './node_modules/jquery-modal/jquery.modal.min.js'
];

/*****************************************************
 * 變數 block
 *****************************************************/
var envOptions = {
  string: "env",
  default: {
    env: "develop"
  }
}
var options = minimist(process.argv.slice(2), envOptions) // process.argv = [node, gulp.js, arg1, arg2, ...]
var envIsPro = options.env === "production" || options.env == "pro"

export function envNow(cb) {
  console.log(`env now is: ${options.env}, so envIsPro is ${envIsPro}`)
  console.log(options)
  cb()
}

/*****************************************************
 * 複製檔案 block
 *****************************************************/
export function copyHTML() {
  return gulp.src("./src/**/*.html").pipe(gulp.dest("./public"))
}

export function cpBsVar() {
  return gulp
    .src("./node_module/bootstrap/scss/_variables.scss")
    .pipe(gulp.dest(".src/sass/hellper/"))
}

export function copy() {
  return gulp
    .src([
      "./src/**/**",
      "!src/js/**/**",
      "!src/sass/**/**",
      "!src/views/**/**",
      "!src/**/*.ejs",
      "!src/**/*.html"
    ])
    .pipe(gulp.dest("./public"))
}

/*****************************************************
 * 清除暫存 block
 *****************************************************/
export function clean() {
  return del(["./public", "./.tmp"])
}

/*****************************************************
 * HTML 處理 block
 *****************************************************/
export function ejs() {
  return gulp
    .src(["./src/**/*.html"])
    .pipe($.plumber())
    .pipe($.frontMatter())
    .pipe(
      $.layout(file => {
        return file.frontMatter
      })
    )
    .pipe(gulp.dest("./public"))
    .pipe($.if(!envIsPro, browserSync.stream()))
}

/*****************************************************
 * CSS 處理 block
 *****************************************************/
export function sass() {

  const plugins = [
    autoprefixer({
      overrideBrowserslist: ["last 5 version"]
    }),
  ];


  return gulp
    .src(["./src/sass/**/*.sass", "./src/sass/**/*.scss"])
    .pipe($.plumber())
    .pipe($.sourcemaps.init())
    .pipe(
      $.sass({
        outputStyle: "nested",
        includePaths: ['node_modules']
      }).on("error", $.sass.logError)
    )
    .pipe($.postcss(plugins))
    .pipe($.if(envIsPro, $.cleanCss()))
    .pipe($.sourcemaps.write("."))
    .pipe(gulp.dest("./public/css"))
    .pipe($.if(!envIsPro, browserSync.stream()))
}


export function goSassImage() {
  return gulp.src('./src/images/**/*.+(jpeg|jpg|png|gif|svg)')
    .pipe(sassImage({
      targetFile: '_images_data.scss', // 處理完的 SCSS 檔名
      css_path: './src/css', // CSS 檔案位置
      images_path: './src/images', // image 檔案位置
      includeData: false, // 是否將 image 加入到 SCSS 中
    }))
    .pipe(gulp.dest('src/sass')); // 處理後的 SCSS 檔放位置
}

/*****************************************************
 *  JS 處理 block
 *****************************************************/
export function vendorJS() {
  return gulp
    .src(jsLibs)
    .pipe($.concat("vendor.js"))
    .pipe(gulp.dest("./public/js"))
}

export function babel() {
  return gulp
    .src("./src/js/**/*.js")
    .pipe(order([
      "tool/*.js",
      "**/*.js",
    ]))
    .pipe($.plumber())
    .pipe($.sourcemaps.init())
    .pipe($.concat("all.js"))
    .pipe(
      $.babel({
        presets: ["@babel/env"]
      })
    )
    .pipe(
      $.if(
        envIsPro,
        $.uglify({
          compress: {
            drop_console: true
          }
        })
      )
    )
    .pipe($.sourcemaps.write("."))
    .pipe(gulp.dest("./public/js"))
    .pipe($.if(!envIsPro, browserSync.stream()))
}

/*****************************************************
 *  圖片處理 block
 *****************************************************/
export function imageMin() {
  return gulp
    .src("./src/images/*")
    .pipe($.if(envIsPro, $.imagemin()))
    .pipe(gulp.dest("./public/images"))
    .pipe($.if(envIsPro, browserSync.stream()))

}


/*****************************************************
 *  實時預覽 block
 *****************************************************/
export function browser() {
  browserSync.init({
    server: {
      baseDir: "./public",
      reloadDebounce: 2000,
      logLevel: "silent"
    }
  })
}

export function watch() {
  gulp.watch(["./src/**/*.html", "./src/**/*.ejs"], ejs)
  // gulp.watch(['./src/**/*.jade', './src/**/*.pug'], ['jade'])
  gulp.watch(
    ["./src/sass/**/*.sass", "./src/sass/**/*.scss"],
    sass
  )
  gulp.watch("./src/js/**/*.js", babel)
  gulp.watch("./src/images/**/*.+(jpeg|jpg|png|gif|svg)", gulp.series(goSassImage,imageMin));
  console.log("watching file ~")
}

/*****************************************************
 *  指令 block
 *****************************************************/
// exports.default = gulp.parallel(
//   imageMin,
//   babel,
//   vendorJS,
//   sass,
//   goSassImage,
//   ejs,
//   browser,
//   watch
// )
exports.default = gulp.series(
  goSassImage,
  gulp.parallel(imageMin,
    babel,
    vendorJS,
    sass,
    goSassImage,
    ejs,
    browser,
    watch
  )
)


exports.build = gulp.series(
  gulp.series(goSassImage, clean, copy),
  gulp.parallel(vendorJS, babel, sass, ejs, imageMin)
)

// = gulp build --env production
exports.buildPro = gulp.series(
  cb => {
    envIsPro = true
    cb()
  },
  gulp.series(goSassImage, clean, copy),
  gulp.parallel(vendorJS, babel, sass, ejs, imageMin)
)

function deploy() {
  return gulp.src("./public/**/*").pipe($.ghPages())
}
exports.deploy = deploy