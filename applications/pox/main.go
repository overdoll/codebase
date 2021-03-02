package pox

import (
	"context"
	"log"
	"os"
	"os/signal"
	"syscall"

	server "overdoll/applications/pox/src/server"
	events "overdoll/libraries/events"
)

func main() {
	eventsConn := events.GetConnection(context.Background(), "pox")

	srv := server.CreateServer()

	eventsConn.Consume("pox.topic.posts_image_processing", srv.ProcessMessage)

	sigChan := make(chan os.Signal, 1)
	signal.Notify(sigChan, os.Interrupt, syscall.SIGTERM)
	log.Printf("shutting down server with signal: %s", <-sigChan)
}
