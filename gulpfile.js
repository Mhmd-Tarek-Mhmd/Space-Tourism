const gulp = require("gulp"),
  rename = require("gulp-rename"),
  pug = require("gulp-pug"),
  scss = require("gulp-sass")(require("sass")),
  autoprefixer = require("gulp-autoprefixer"),
  babel = require("gulp-babel"),
  uglify = require("gulp-uglify");

// HTML Tasks

gulp.task("htmlHome", () =>
  gulp
    .src("src/pug/pages/home.pug")
    .pipe(rename("index"))
    .pipe(pug())
    .pipe(gulp.dest("dist"))
);

gulp.task("htmlPages", () =>
  gulp
    .src(["src/pug/pages/*.pug", "!src/pug/pages/home.pug"])
    .pipe(pug())
    .pipe(gulp.dest("dist/pages"))
);

const html = gulp.parallel("htmlHome", "htmlPages");

// CSS Tasks

gulp.task("css", () =>
  gulp
    .src("src/scss/pages/*.scss")
    .pipe(scss({ outputStyle: "compressed" }))
    .pipe(autoprefixer("last 2 versions"))
    .pipe(gulp.dest("dist/assets/styles"))
);

// JS Tasks

gulp.task("js", () =>
  gulp
    .src("src/js/*.js")
    .pipe(babel({ presets: ["@babel/env"] }))
    .pipe(uglify())
    .pipe(gulp.dest("src/js/dist"))
);

// Watch All Tasks

gulp.task("default", () => {
  gulp.watch("src/pug/**/*.pug", html);
  gulp.watch("src/scss/**/*.scss", gulp.series("css"));
  gulp.watch("src/js/*.js", gulp.series("js", html));
});
