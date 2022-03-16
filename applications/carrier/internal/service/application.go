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
	stellaClient, cleanup2 := clients.NewStellaClient(ctx, os.Getenv("STELLA_SERVICE"))

	return createApplication(ctx, adapters.NewEvaGrpc(evaClient), adapters.NewStellaGrpc(stellaClient)),
		func() {
			cleanup()
			cleanup2()
		}
}

func createApplication(ctx context.Context, eva command.EvaService, stella command.StellaService) app.Application {

	awsSession := bootstrap.InitializeAWSSession()
	client := ses.New(awsSession)

	mailingRepo := adapters.NewMailingSESRepository(client)

	return app.Application{
		Commands: app.Commands{
			ConfirmAccountEmail:                       command.NewConfirmAccountEmailHandler(mailingRepo, eva),
			NewLoginToken:                             command.NewNewLoginTokenHandler(mailingRepo),
			NewClubSupporterSubscription:              command.NewNewClubSupporterSubscriptionHandler(mailingRepo, eva, stella),
			ClubSupporterSubscriptionCancelled:        command.NewClubSupporterSubscriptionCancelledHandler(mailingRepo, eva, stella),
			ClubSupporterSubscriptionPaymentFailure:   command.NewClubSupporterSubscriptionPaymentFailureHandler(mailingRepo, eva, stella),
			ClubSupporterSubscriptionRefunded:         command.NewClubSupporterSubscriptionRefundedHandler(mailingRepo, eva, stella),
			UpcomingClubSupporterSubscriptionRenewals: command.NewUpcomingClubSupporterSubscriptionRenewalsHandler(mailingRepo, eva, stella),
		},
		Queries: app.Queries{},
	}
}
