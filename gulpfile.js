const gulp = require("gulp"),
  pug = require("gulp-pug"),
  scss = require("gulp-sass")(require("sass")),
  autoprefixer = require("gulp-autoprefixer"),
  babel = require("gulp-babel"),
  uglify = require("gulp-uglify");

// HTML Tasks

gulp.task("htmlHome", () =>
  gulp.src("src/pug/index.pug").pipe(pug()).pipe(gulp.dest("dist"))
);

gulp.task("htmlPages", () =>
  gulp.src("src/pug/pages/*.pug").pipe(pug()).pipe(gulp.dest("dist/pages"))
);

// CSS Tasks

gulp.task("css", () =>
  gulp
    .src("src/scss/website.scss")
    .pipe(scss({ outputStyle: "compressed" }))
    .pipe(autoprefixer("last 2 versions"))
    .pipe(gulp.dest("dist/assets/styles"))
);

// JS Tasks

gulp.task("js", () =>
  gulp
    .src("src/js/index.js")
    .pipe(babel({ presets: ["@babel/env"] }))
    .pipe(uglify())
    .pipe(gulp.dest("src/js/dist"))
);

// Watch All Tasks

gulp.task("default", () => {
  gulp.watch("src/pug/**/*.pug", gulp.series("htmlHome"));
  gulp.watch("src/pug/**/*.pug", gulp.series("htmlPages"));
  gulp.watch("src/scss/**/*.scss", gulp.series("css"));
  gulp.watch("src/js/*.js", gulp.series("js"));
});
