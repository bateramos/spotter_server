// rename this file to makefile
all: lint
	PROJECT=YourProjectName-Dev npm run deploy

production:
	PROJECT=YourProjectName-Prod npm run deploy

lint:
	./node_modules/jshint/bin/jshint *.js functions/ --exclude node_modules/ --exclude functions/node_modules/