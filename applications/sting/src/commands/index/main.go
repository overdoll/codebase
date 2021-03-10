package index

import (
	"context"
	"fmt"
	"log"
	"os"

	"github.com/spf13/cobra"
	"overdoll/applications/sting/src/server/commands"
	"overdoll/libraries/bootstrap"
	"overdoll/libraries/search"
)

var root = &cobra.Command{
	Use: "index",
}

func Execute() {
	if err := root.Execute(); err != nil {
		fmt.Println(err)
		os.Exit(1)
	}
}

func CreateServer() *commands.Server {
	ctx := context.Background()

	init, err := bootstrap.NewBootstrap(ctx, "applications/sting")

	if err != nil {
		log.Fatalf("bootstrap failed with errors: %s", err)
	}

	session, err := init.InitializeDatabaseSession()

	if err != nil {
		log.Fatalf("database session failed with errors: %s", err)
	}

	es, err := search.NewStore(ctx)

	if err != nil {
		log.Fatalf("es session failed with errors: %s", err)
	}

	return commands.CreateServer(session, es)
}