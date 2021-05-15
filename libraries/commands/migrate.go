package commands

import (
	"bytes"
	"context"
	"io/ioutil"
	"log"
	"os"
	"time"

	"github.com/scylladb/gocqlx/v2/migrate"
	"github.com/spf13/cobra"
	"overdoll/libraries/bootstrap"
)

var Migrate = &cobra.Command{
	Use: "migrate",
	ValidArgs: []string{
		"keyspace",
	},
	Run: func(cmd *cobra.Command, args []string) {

		ctx, cancelFn := context.WithTimeout(context.Background(), time.Second*5)
		defer cancelFn()

		init, err := bootstrap.NewBootstrap(ctx)

		if err != nil {
			log.Fatalf("bootstrap failed with errors: %s", err)
		}

		for _, arg := range args {
			if arg == "keyspace" {
				session, err := bootstrap.InitializeDatabaseSession("")

				if err != nil {
					log.Fatalf("database session failed with errors: %s", err)
				}

				f, err := os.Open(init.GetCurrentDirectory() + "/database/__init__.cql")
				if err != nil {
					log.Fatalf("could not open init file: %s", err)
				}

				b, err := ioutil.ReadAll(f)

				if err != nil {
					log.Fatalf("could not read init file: %s", err)
				}

				r := bytes.NewBuffer(b)

				stmt, err := r.ReadString(';')

				if err != nil {
					log.Fatalf("could not read init file: %s", err)
				}

				q := session.ContextQuery(ctx, stmt, nil).RetryPolicy(nil)

				if err := q.ExecRelease(); err != nil {
					log.Fatalf("could not create keyspace: %s", err)
				}

				_ = f.Close()
			}
		}

		session, err := bootstrap.InitializeDatabaseSession(os.Getenv("DB_HOST"))

		if err != nil {
			log.Fatalf("database session failed with errors: %s", err)
		}

		if err := migrate.Migrate(context.Background(), session, init.GetCurrentDirectory()+"/database/migrations"); err != nil {
			log.Fatalf("migrations failed with error: %s", err)
		}

		log.Print("migrations successfully completed!")
	},
}
