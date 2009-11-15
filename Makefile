
all: $(patsubst %.ometajs,%.ometajs.js,$(wildcard *.ometajs))

%.ometajs.js: %.ometajs
	./translate.js -o $@ $?

test:
	v8cgi tests.js
