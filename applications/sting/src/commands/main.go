package commands

import (
	"context"
	"log"

	"github.com/scylladb/gocqlx/v2"
	"github.com/spf13/cobra"
	"overdoll/libraries/bootstrap"
	"overdoll/libraries/search"
)

var Root = &cobra.Command{
	Use: "index",
}

type Server struct {
	session gocqlx.Session
	store   *search.Store
}

func CreateServer() *Server {

	ctx := context.Background()

	init, err := bootstrap.NewBootstrap(ctx)

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

	return &Server{
		session: session,
		store:   es,
	}
}