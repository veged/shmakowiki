all: lib

src: $(patsubst %.ometajs,%.ometajs.js,$(wildcard src/*.ometajs))

%.ometajs.js: %.ometajs
	ometajs2js -i $< -o $@

lib: src
	cat src/toc2list.js > lib/_shmakowikitoc.js
	cat src/shmakowikitoc.js >> lib/_shmakowikitoc.js
	cat src/shmakowikitoc.ometajs.js >> lib/_shmakowikitoc.js

tests:
	node $@/tests.js

.PHONY: all tests
