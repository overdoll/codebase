package index

import (
	"context"
	"log"

	"github.com/spf13/cobra"
	"overdoll/applications/sting/src/server"
	"overdoll/libraries/bootstrap"
	"overdoll/libraries/events"
	"overdoll/libraries/search"
)

var characters = &cobra.Command{
	Use:   "characters",
	Short: "Index the whole characters table into elasticsearch",
	Run: Run,
}

func init() {
	root.AddCommand(characters)
}

func Run(cmd *cobra.Command, args []string) {
	ctx := context.Background()

	init, err := bootstrap.NewBootstrap(ctx, "applications/sting")

	if err != nil {
		log.Fatalf("bootstrap failed with errors: %s", err)
	}

	session, err := init.InitializeDatabaseSession()

	if err != nil {
		log.Fatalf("database session failed with errors: %s", err)
	}

	eventsConn := events.GetConnection(ctx, "sting")

	es, err := search.NewStore(ctx)

	if err != nil {
		log.Fatalf("es session failed with errors: %s", err)
	}

	s := server.CreateServer(session, eventsConn, es)

	s.IndexCharacters()
}