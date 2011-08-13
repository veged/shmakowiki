
all: lib

src: $(patsubst %.ometajs,%.ometajs.js,$(wildcard src/*.ometajs))

%.ometajs.js: %.ometajs
	ometajs2js -i $< -o $@

lib: lib/shmakowiki.js

lib/shmakowiki.js: src
	-rm $@
	for i in \
			shmakowiki.js \
			shmakowiki.ometajs.js \
			shmakowiki2html.ometajs.js \
			shmakowiki2bemjson.ometajs.js \
		; do \
			cat $</$$i >> $@ \
		; done

tests:
	node $@/tests.js


.PHONY: all tests
