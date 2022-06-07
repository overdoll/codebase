package database

import (
	"context"
	"overdoll/libraries/errors"
	"overdoll/libraries/sentry_support"
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

			bootstrap.NewBootstrap()

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

			start := time.Now().UTC()

			if err := migrate.FromFS(context.Background(), session, config.MigrationFiles); err != nil {
				sentry_support.MustCaptureException(errors.Wrap(err, "migrations failed"))
				zap.S().Fatalw("migrations failed", zap.Error(err))
			}

			zap.S().Infof(
				"successfully ran migrations in %s!",
				time.Since(start).Truncate(time.Millisecond),
			)
		},
	}
}
