package service

import (
	"context"
	"log"
	"os"

	"github.com/sendgrid/sendgrid-go"
	"overdoll/applications/carrier/internal/adapters"
	"overdoll/applications/carrier/internal/app"
	"overdoll/applications/carrier/internal/app/command"
	"overdoll/libraries/bootstrap"
	"overdoll/libraries/clients"
)

func NewApplication(ctx context.Context) (app.Application, func()) {

	if _, err := bootstrap.NewBootstrap(ctx); err != nil {
		log.Fatalf("bootstrap failed with errors: %s", err)
	}

	evaClient, cleanup := clients.NewEvaClient(ctx, os.Getenv("EVA_SERVICE"))

	return createApplication(ctx, adapters.NewEvaGrpc(evaClient)),
		func() {
			cleanup()
		}
}

func createApplication(ctx context.Context, eva command.EvaService) app.Application {

	client := sendgrid.NewSendClient(os.Getenv("SENDGRID_API_KEY"))

	mailingRepo := adapters.NewMailingSendgridRepository(client)

	return app.Application{
		Commands: app.Commands{
			ConfirmAccountEmail: command.NewConfirmAccountEmailHandler(mailingRepo, eva),
			NewLoginToken:       command.NewNewLoginTokenHandler(mailingRepo),
		},
		Queries: app.Queries{},
	}
}
