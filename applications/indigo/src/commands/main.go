package commands

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
}

var serve = &cobra.Command{
	Use: "serve",
	Run: Run,
}

func init() {
	rootCmd.AddCommand(serve)
}

func Execute() {
	if err := rootCmd.Execute(); err != nil {
		fmt.Println(err)
		os.Exit(1)
	}
}

// CreateServer - a function that is re-used for commands
func CreateServer(ctx context.Context) (*server.Server, error) {

	_, err := bootstrap.NewBootstrap(ctx, "applications/indigo")

	if err != nil {
		return nil, fmt.Errorf("bootstrap failed with errors: %s", err)
	}

	es, err := search.NewStore(ctx)

	if err != nil {
		return nil, fmt.Errorf("failed to create elasticsearch session: %s", err)
	}

	return server.CreateServer(es), nil
}

func Run(cmd *cobra.Command, args []string) {

	ctx := context.Background()

	srv, err := CreateServer(ctx)

	if err != nil {
		log.Fatal(err)
	}

	evt := events.GetConnection(ctx, "indigo")

	evt.RegisterSubscriber("indigo.topic.create_document", srv.CreateDocument)

	evt.Run()

	sigChan := make(chan os.Signal, 1)
	signal.Notify(sigChan, os.Interrupt, syscall.SIGTERM)
	log.Printf("shutting down server with signal: %s", <-sigChan)
}
