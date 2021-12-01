package service

import (
	"context"
	"github.com/gorilla/securecookie"
	"os"
	eva "overdoll/applications/eva/proto"
	"overdoll/applications/puppy/internal/adapters"
	"overdoll/applications/puppy/internal/app"
	"overdoll/libraries/bootstrap"
	"overdoll/libraries/clients"
)

func NewApplication(ctx context.Context) (app.Application, func()) {

	evaClient, cleanup := clients.NewEvaClient(ctx, os.Getenv("EVA_SERVICE"))

	// bootstrap application
	bootstrap.NewBootstrap(ctx)

	return createApplication(ctx, evaClient),
		func() {
			cleanup()
		}
}

func createApplication(ctx context.Context, service eva.EvaClient) app.Application {

	return app.Application{
		Codecs:  securecookie.CodecsFromPairs([]byte(os.Getenv("COOKIE_KEY")), []byte(os.Getenv("COOKIE_BLOCK_KEY"))),
		Session: adapters.NewEvaGrpcSessionRepository(service),
	}
}
