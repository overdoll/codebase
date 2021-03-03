package pox

import (
	"context"
	"log"
	"os"
	"os/signal"
	"syscall"
	"time"

	"overdoll/applications/pox/src/server"
	"overdoll/applications/pox/src/services"
	"overdoll/libraries/bootstrap"
	"overdoll/libraries/events"
	"overdoll/libraries/aws"
)

func main() {
	ctx, cancelFn := context.WithTimeout(context.Background(), time.Second*5)
	defer cancelFn()

	_, err := bootstrap.NewBootstrap(ctx, "applications/pox")

	if err != nil {
		log.Fatalf("bootstrap failed with errors: %s", err)
	}

	awsSession, err := storage.CreateAWSSession()

	if err != nil {
		log.Fatalf("failed to create aws session: %s", err)
	}

	svcs, err := services.Dial(ctx)

	if err != nil {
		log.Fatalf("failed to create services session: %s", err)
	}

	srv := server.CreateServer(awsSession, svcs)

	eventsConn := events.GetConnection(ctx, "pox")

	eventsConn.Consume("pox.topic.posts_image_processing", srv.ProcessPost)
	eventsConn.Consume("pox.topic.posts_image_publishing", srv.PublishPost)

	sigChan := make(chan os.Signal, 1)
	signal.Notify(sigChan, os.Interrupt, syscall.SIGTERM)
	log.Printf("shutting down server with signal: %s", <-sigChan)
}
