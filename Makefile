
all: shmakowiki.js shmakowiki2html.js

shmakowiki.js: shmakowiki.txt
	./translate.js -o shmakowiki.js shmakowiki.txt

shmakowiki2html.js: shmakowiki2html.txt
	./translate.js -o shmakowiki2html.js shmakowiki2html.txt
