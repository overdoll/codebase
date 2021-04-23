package service

import (
	"context"
	"log"

	"overdoll/applications/sting/src/app"
	"overdoll/libraries/bootstrap"
)

func NewApplication(ctx context.Context) (app.Application, func()) {
	return createApplication(ctx),
		func() {

		}
}

func NewComponentTestApplication(ctx context.Context) app.Application {
	return createApplication(ctx)
}

func createApplication(ctx context.Context) app.Application {

	init, err := bootstrap.NewBootstrap(ctx)

	if err != nil {
		log.Fatalf("bootstrap failed with errors: %s", err)
	}

	session, err := init.InitializeDatabaseSession()

	if err != nil {
		log.Fatalf("database session failed with errors: %s", err)
	}

	return app.Application{
		Commands: app.Commands{

		},
	}
}
