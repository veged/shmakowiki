ometajs:
	$(MAKE) -C src
	-rm lib/shmakowiki.js
	cat src/shmakowiki.js >> lib/shmakowiki.js
	cat src/shmakowiki.ometajs.js >> lib/shmakowiki.js
	cat src/shmakowiki2html.ometajs.js >> lib/shmakowiki.js

test:
	narwhal tests/tests.js
