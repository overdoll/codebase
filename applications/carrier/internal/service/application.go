package service

import (
	"context"
	"github.com/aws/aws-sdk-go/service/ses"
	"os"
	"overdoll/libraries/testing_tools/mocks"

	"overdoll/applications/carrier/internal/adapters"
	"overdoll/applications/carrier/internal/app"
	"overdoll/applications/carrier/internal/app/command"
	"overdoll/libraries/bootstrap"
	"overdoll/libraries/clients"
)

func NewApplication(ctx context.Context) (*app.Application, func()) {

	bootstrap.NewBootstrap(ctx)

	evaClient, cleanup := clients.NewEvaClient(ctx, os.Getenv("EVA_SERVICE"))
	stellaClient, cleanup2 := clients.NewStellaClient(ctx, os.Getenv("STELLA_SERVICE"))

	return createApplication(ctx, adapters.NewEvaGrpc(evaClient), adapters.NewStellaGrpc(stellaClient)),
		func() {
			cleanup()
			cleanup2()
		}
}

type ComponentTestApplication struct {
	App          *app.Application
	EvaClient    *mocks.MockEvaClient
	StellaClient *mocks.MockStellaClient
}

func NewComponentTestApplication(ctx context.Context) *ComponentTestApplication {
	bootstrap.NewBootstrap(ctx)

	evaClient := &mocks.MockEvaClient{}
	stellaClient := &mocks.MockStellaClient{}

	return &ComponentTestApplication{
		App: createApplication(
			ctx,
			adapters.NewEvaGrpc(evaClient),
			adapters.NewStellaGrpc(stellaClient),
		),
		StellaClient: stellaClient,
		EvaClient:    evaClient,
	}
}

func createApplication(ctx context.Context, eva command.EvaService, stella command.StellaService) *app.Application {

	awsSession := bootstrap.InitializeAWSSession()
	client := ses.New(awsSession)

	mailingRepo := adapters.NewMailingSESRepository(client)

	return &app.Application{
		Commands: app.Commands{
			ConfirmAccountEmail:                       command.NewConfirmAccountEmailHandler(mailingRepo, eva),
			NewLoginToken:                             command.NewNewLoginTokenHandler(mailingRepo),
			NewClubSupporterSubscription:              command.NewNewClubSupporterSubscriptionHandler(mailingRepo, eva, stella),
			ClubSupporterSubscriptionCancelled:        command.NewClubSupporterSubscriptionCancelledHandler(mailingRepo, eva, stella),
			ClubSupporterSubscriptionPaymentFailure:   command.NewClubSupporterSubscriptionPaymentFailureHandler(mailingRepo, eva, stella),
			ClubSupporterSubscriptionRefunded:         command.NewClubSupporterSubscriptionRefundedHandler(mailingRepo, eva, stella),
			UpcomingClubSupporterSubscriptionRenewals: command.NewUpcomingClubSupporterSubscriptionRenewalsHandler(mailingRepo, eva, stella),
			ClubSupporterNoPosts:                      command.NewClubSupporterNoPostsHandler(mailingRepo, eva, stella),
			ClubSupporterRequiredPostReminder:         command.NewClubSupporterRequiredPostReminderHandler(mailingRepo, eva, stella),
			AccountDeletionReminder:                   command.NewAccountDeletionReminderHandler(mailingRepo, eva),
			AccountDeletionBegin:                      command.NewAccountDeletionBeginHandler(mailingRepo, eva),
			AccountDeleted:                            command.NewAccountDeletedHandler(mailingRepo),
			ClubSuspended:                             command.NewClubSuspendedHandler(mailingRepo, eva, stella),
			ClubOverChargebackThreshold:               command.NewClubOverChargebackThresholdHandler(mailingRepo, eva, stella),
			ClubSupporterSubscriptionDuplicate:        command.NewClubSupporterSubscriptionDuplicateHandler(mailingRepo, eva, stella),
		},
		Queries: app.Queries{},
	}
}
