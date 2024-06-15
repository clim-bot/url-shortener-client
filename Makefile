# Variables
CLIENT_IMAGE = url-shortener-client

# Build the client Docker image
build:
	docker build -t $(CLIENT_IMAGE) .

# Run the client Docker container
run:
	docker run -d -p 3000:80 --name $(CLIENT_IMAGE) $(CLIENT_IMAGE)

# Stop the client Docker container
stop:
	docker stop $(CLIENT_IMAGE) || true
	docker rm $(CLIENT_IMAGE) || true

# Build and run the client
up: build run

# Stop the client
down: stop

# Rebuild and run the client
restart: down up

.PHONY: build run stop up down restart
