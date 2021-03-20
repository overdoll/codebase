package main

import (
	"context"
	"fmt"
	"log"
	"os"
	"os/signal"
	"syscall"

	"github.com/spf13/cobra"
	"overdoll/applications/indigo/src/server"
	"overdoll/libraries/bootstrap"
	"overdoll/libraries/events"
	"overdoll/libraries/search"
)

var rootCmd = &cobra.Command{
	Use: "indigo",
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

	es, err := search.NewStore(ctx)

	if err != nil {
		log.Fatalf("failed to create elasticsearch session: %s", err)
	}

	srv := server.CreateServer(es)

	evt := events.GetConnection(ctx, "indigo")

	evt.RegisterSubscriber("indigo.topic.create_document", srv.CreateDocument)

	evt.Run()

	sigChan := make(chan os.Signal, 1)
	signal.Notify(sigChan, os.Interrupt, syscall.SIGTERM)
	log.Printf("shutting down server with signal: %s", <-sigChan)
}
