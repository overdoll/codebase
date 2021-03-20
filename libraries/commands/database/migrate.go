package database

import (
	"context"
	"log"
	"time"

	"github.com/scylladb/gocqlx/v2/migrate"
	"github.com/spf13/cobra"
	"overdoll/libraries/bootstrap"
)

var Migrate = &cobra.Command{
	Use: "migrate",
	Run: func(cmd *cobra.Command, args []string) {

		ctx, cancelFn := context.WithTimeout(context.Background(), time.Second*5)
		defer cancelFn()

		init, err := bootstrap.NewBootstrap(ctx)

		if err != nil {
			log.Fatalf("bootstrap failed with errors: %s", err)
		}

		session, err := init.InitializeDatabaseSession()

		if err != nil {
			log.Fatalf("database session failed with errors: %s", err)
		}

		if err := migrate.Migrate(context.Background(), session, init.GetCurrentDirectory()+"/database/migrations"); err != nil {
			log.Fatalf("migrations failed with error: %s", err)
		}

		log.Print("migrations successfully completed!")
	},
}
