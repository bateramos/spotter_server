## rename this file to makefile
all: lint
	PROJECT=YourProjectName-Dev npm run deploy

production:
	PROJECT=YourProjectName-Prod npm run deploy

lint:
	./node_modules/jshint/bin/jshint *.js functions/ --exclude node_modules/ --exclude functions/node_modules/

create-server:
	docker build -t spotter .

start-swarm:
	docker service create --replicas 1 --network my-network --name fibonacci --publish 3001:3000  spotter
	docker service create --replicas 1 --network my-network --name getPin --publish 3002:3000  spotter
	docker service create --replicas 1 --network my-network --name postPin --publish 3003:3000  spotter
	docker service create --replicas 1 --network my-network --name auth --publish 3004:3000  spotter
	docker service create --replicas 1 --network my-network --name testInnerAuth --publish 3005:3000  spotter

stop-swarm:
	docker service rm fibonacci
	docker service rm getPin
	docker service rm postPin
	docker service rm auth
	docker service rm testInnerAuth

create-router:
	docker build -f ./docker/dockerfile.nginx -t spotter/nginx .

start-router:
	docker service create --replicas 1 --name router --network my-network --publish 3100:80 spotter/nginx
