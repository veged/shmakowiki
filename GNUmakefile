
all: lib

src: $(patsubst %.ometajs,%.ometajs.js,$(wildcard src/*.ometajs))

%.ometajs.js: %.ometajs
	./node_modules/.bin/ometajs2js -i $< -o $@

lib: lib/_shmakowiki.js

lib/_shmakowiki.js: src
	-rm $@
	for i in \
			shmakowiki.js \
			shmakowiki.ometajs.js \
			transform.ometajs.js \
			shmakowiki2html.ometajs.js \
			shmakowiki2bemjson.ometajs.js \
			shmakowiki2plain.ometajs.js \
		; do \
			cat $</$$i >> $@ \
		; done

tests:
	node $@/tests.js


.PHONY: all tests
