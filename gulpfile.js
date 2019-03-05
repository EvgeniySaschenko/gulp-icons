const gulp = require('gulp');
const clean = require('gulp-clean'); // Удаление папок / файлов - тут нигде не используется
const imagemin = require('gulp-imagemin'); // Сжатие картинок
const svgSymbols = require('gulp-svg-symbols'); // Создание SVG спрайтов - иконки на страницы можно добавлять с помощью миксина "icon"
const spritesmith = require('gulp.spritesmith'); // PNG спрайт


// SVG sprite
function spriteSvg(){
	return gulp.src('src/svg/*.svg')
		.pipe(imagemin())
		.pipe(svgSymbols({
			default: ['default-svg', 'default-css']
		}))
		.pipe(gulp.dest('build/svg'));
}

// SPRITE png
function spritePng(){
	let spriteData = gulp.src('src/png/*.png')
	.pipe(imagemin())
	.pipe(spritesmith({
		imgName: 'sprite.png',
		cssName: 'sprite.css',
		cssVarMap: (sprite) => {
			sprite.name = sprite.name;
		}
	}));
	return spriteData.pipe( 
		gulp.dest('build/png')
	);
}

function cleanBuild(){
	return gulp.src('./build', {force: true}).pipe(clean());
}

let build = gulp.series(cleanBuild, gulp.parallel(spriteSvg, spritePng));

gulp.task('default', build);