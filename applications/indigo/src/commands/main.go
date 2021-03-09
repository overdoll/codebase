package commands

import (
	"context"
	"fmt"
	"log"
	"os"
	"os/signal"
	"syscall"

	"github.com/gocql/gocql"
	"github.com/scylladb/gocqlx/v2"
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

	cluster := gocql.NewCluster(os.Getenv("DB_HOST"))
	session, err := gocqlx.WrapSession(cluster.CreateSession())

	if err != nil {
		return nil, fmt.Errorf("failed to create database session: %s", err)
	}

	return server.CreateServer(es, session), nil
}

func Run(cmd *cobra.Command, args []string) {

	ctx := context.Background()

	srv, err := CreateServer(ctx)

	if err != nil {
		log.Fatal(err)
	}

	evt := events.GetConnection(ctx, "indigo")

	evt.RegisterSubscriber("indigo.topic.post_index", srv.IndexPost)

	evt.RegisterSubscriber("indigo.topic.character_index", srv.IndexCharacter)

	evt.RegisterSubscriber("indigo.topic.category_index", srv.IndexCategory)

	evt.RegisterSubscriber("indigo.topic.media_index", srv.IndexMedia)

	evt.Run()

	sigChan := make(chan os.Signal, 1)
	signal.Notify(sigChan, os.Interrupt, syscall.SIGTERM)
	log.Printf("shutting down server with signal: %s", <-sigChan)
}
