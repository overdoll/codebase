package service

import (
	"context"
	"github.com/aws/aws-sdk-go/service/ses"
	"os"

	"overdoll/applications/carrier/internal/adapters"
	"overdoll/applications/carrier/internal/app"
	"overdoll/applications/carrier/internal/app/command"
	"overdoll/libraries/bootstrap"
	"overdoll/libraries/clients"
)

func NewApplication(ctx context.Context) (app.Application, func()) {

	bootstrap.NewBootstrap(ctx)

	evaClient, cleanup := clients.NewEvaClient(ctx, os.Getenv("EVA_SERVICE"))

	return createApplication(ctx, adapters.NewEvaGrpc(evaClient)),
		func() {
			cleanup()
		}
}

func createApplication(ctx context.Context, eva command.EvaService) app.Application {

	awsSession := bootstrap.InitializeAWSSession()
	client := ses.New(awsSession)

	mailingRepo := adapters.NewMailingSESRepository(client)

	return app.Application{
		Commands: app.Commands{
			ConfirmAccountEmail: command.NewConfirmAccountEmailHandler(mailingRepo, eva),
			NewLoginToken:       command.NewNewLoginTokenHandler(mailingRepo),
		},
		Queries: app.Queries{},
	}
}
