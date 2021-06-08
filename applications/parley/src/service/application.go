package service

import (
	"context"
	"log"

	"github.com/spf13/viper"
	"overdoll/applications/parley/src/adapters"
	"overdoll/applications/parley/src/app"
	"overdoll/applications/parley/src/app/command"
	"overdoll/libraries/bootstrap"
)

func NewApplication(ctx context.Context) (app.Application, func()) {
	return createApplication(ctx),
		func() {

		}
}

func createApplication(ctx context.Context) app.Application {

	_, err := bootstrap.NewBootstrap(ctx)

	if err != nil {
		log.Fatalf("bootstrap failed with errors: %s", err)
	}

	session, err := bootstrap.InitializeDatabaseSession(viper.GetString("db.keyspace"))

	if err != nil {
		log.Fatalf("database session failed with errors: %s", err)
	}

	moderatorRepo := adapters.NewModeratorCassandraRepository(session)

	return app.Application{
		Commands: app.Commands{
			GetNextModerator: command.NewGetNextModeratorHandler(moderatorRepo),
		},
		Queries: app.Queries{
		},
	}
}
