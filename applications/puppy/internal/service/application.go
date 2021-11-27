package service

import (
	"context"
	"overdoll/applications/puppy/internal/app"
	"overdoll/libraries/bootstrap"
)

func NewApplication(ctx context.Context) (app.Application, func()) {

	// bootstrap application
	bootstrap.NewBootstrap(ctx)

	return createApplication(ctx),
		func() {

		}
}

func createApplication(ctx context.Context) app.Application {

	return app.Application{
		Commands: app.Commands{},
		Queries:  app.Queries{},
	}
}
