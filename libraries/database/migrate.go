package database

import (
	"context"
	"time"

	"github.com/scylladb/gocqlx/v2/migrate"
	"github.com/spf13/cobra"
	"go.uber.org/zap"
	"overdoll/libraries/bootstrap"
)

func createMigrate(config MigrateConfig) *cobra.Command {
	return &cobra.Command{
		Use: "migrate",
		ValidArgs: []string{
			"keyspace",
		},
		Run: func(cmd *cobra.Command, args []string) {

			ctx, cancelFn := context.WithTimeout(context.Background(), time.Second*5)
			defer cancelFn()

			bootstrap.NewBootstrap(ctx)

			// if "keyspace" arg is passed, it will create the keyspace before running migrations
			for _, arg := range args {
				if arg == "keyspace" {
					session := bootstrap.InitializeDatabaseSessionNoKeyspace()

					q := session.ContextQuery(ctx, config.Keyspace, nil).RetryPolicy(nil)

					if err := q.ExecRelease(); err != nil {
						zap.S().Fatalw("could not create keyspace", zap.Error(err))
					}
				}
			}

			session := bootstrap.InitializeDatabaseSession()

			migrate.Callback = config.MigrationCallbacks.Callback

			if err := migrate.FromFS(context.Background(), session, config.MigrationFiles); err != nil {
				zap.S().Fatalw("migrations failed", zap.Error(err))
			}

			zap.S().Info("migrations successfully completed!")
		},
	}
}
