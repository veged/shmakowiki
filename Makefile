
all: $(patsubst %.ometajs,%.ometajs.js,$(wildcard *.ometajs))

%.ometajs.js: %.ometajs
	./ometa-js/translate.js -o $@ $?

test:
	v8cgi tests.js
