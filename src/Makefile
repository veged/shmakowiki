
all: $(patsubst %.ometajs,%.ometajs.js,$(wildcard *.ometajs))

%.ometajs.js: %.ometajs
	ometajs2js -i $? -o $@
