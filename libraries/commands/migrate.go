package commands

import (
	"bytes"
	"context"
	"io/ioutil"
	"os"
	"time"

	"github.com/scylladb/gocqlx/v2/migrate"
	"github.com/spf13/cobra"
	"github.com/spf13/viper"
	"go.uber.org/zap"
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

		bootstrap.NewBootstrap(ctx)

		// if "keyspace" arg is passed, it will create the keyspace before running migrations
		for _, arg := range args {
			if arg == "keyspace" {
				session := bootstrap.InitializeDatabaseSessionNoKeyspace()

				f, err := os.Open(viper.GetString("root_directory") + "/database/__init__.cql")

				if err != nil {
					zap.S().Fatal("could not open init file", zap.Error(err))
				}

				b, err := ioutil.ReadAll(f)

				if err != nil {
					zap.S().Fatal("could not read init file", zap.Error(err))
				}

				r := bytes.NewBuffer(b)

				stmt, err := r.ReadString(';')

				if err != nil {
					zap.S().Fatal("could not read init file", zap.Error(err))
				}

				q := session.ContextQuery(ctx, stmt, nil).RetryPolicy(nil)

				if err := q.ExecRelease(); err != nil {
					zap.S().Fatal("could not create keyspace", zap.Error(err))
				}

				err = f.Close()

				if err != nil {
					zap.S().Fatal("error closing init file", zap.Error(err))
				}
			}
		}

		session := bootstrap.InitializeDatabaseSession()

		if err := migrate.Migrate(context.Background(), session, viper.GetString("root_directory")+"/database/migrations"); err != nil {
			zap.S().Fatal("migrations failed", zap.Error(err))
		}

		zap.S().Info("migrations successfully completed!")
	},
}
