package main

import (
	"context"
	"fmt"
	"log"
	"os"
	"os/signal"
	"syscall"

	"github.com/spf13/cobra"
	"overdoll/applications/pox/src/server"
	"overdoll/applications/pox/src/services"
	"overdoll/libraries/aws"
	"overdoll/libraries/bootstrap"
	"overdoll/libraries/events"
)

var rootCmd = &cobra.Command{
	Use: "pox",
	Run: Run,
}

func main() {
	if err := rootCmd.Execute(); err != nil {
		fmt.Println(err)
		os.Exit(1)
	}
}

func Run(cmd *cobra.Command, args []string) {
	ctx := context.Background()

	_, err := bootstrap.NewBootstrap(ctx)

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
	evt := events.GetConnection(ctx, "pox")

	// Register our subscribers to topics
	evt.RegisterSubscriber("pox.topic.posts_image_processing", srv.ProcessPost)
	evt.RegisterSubscriber("pox.topic.posts_image_publishing", srv.PublishPost)

	// Run subscribers
	evt.Run()

	sigChan := make(chan os.Signal, 1)
	signal.Notify(sigChan, os.Interrupt, syscall.SIGTERM)
	log.Printf("shutting down server with signal: %s", <-sigChan)
}
