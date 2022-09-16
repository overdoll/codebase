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

	bootstrap.NewBootstrap()

	evaClient, cleanup := clients.NewEvaClient(ctx, os.Getenv("EVA_SERVICE"))
	stingClient, cleanup2 := clients.NewStingClient(ctx, os.Getenv("STING_SERVICE"))

	return createApplication(ctx, adapters.NewEvaGrpc(evaClient), adapters.NewStingGrpc(stingClient)),
		func() {
			cleanup()
			cleanup2()
		}
}

type ComponentTestApplication struct {
	App         *app.Application
	EvaClient   *mocks.MockEvaClient
	StingClient *mocks.MockStingClient
}

func NewComponentTestApplication(ctx context.Context) *ComponentTestApplication {
	bootstrap.NewBootstrap()

	evaClient := &mocks.MockEvaClient{}
	stingClient := &mocks.MockStingClient{}

	return &ComponentTestApplication{
		App: createApplication(
			ctx,
			adapters.NewEvaGrpc(evaClient),
			adapters.NewStingGrpc(stingClient),
		),
		StingClient: stingClient,
		EvaClient:   evaClient,
	}
}

func createApplication(ctx context.Context, eva command.EvaService, sting command.StingService) *app.Application {

	awsSession := bootstrap.InitializeAWSSession()
	client := ses.New(awsSession)

	mailingRepo := adapters.NewMailingSESRepository(client)

	return &app.Application{
		Commands: app.Commands{
			ConfirmAccountEmail:                       command.NewConfirmAccountEmailHandler(mailingRepo, eva),
			NewLoginToken:                             command.NewNewLoginTokenHandler(mailingRepo),
			NewClubSupporterSubscription:              command.NewNewClubSupporterSubscriptionHandler(mailingRepo, eva, sting),
			ClubSupporterSubscriptionCancelled:        command.NewClubSupporterSubscriptionCancelledHandler(mailingRepo, eva, sting),
			ClubSupporterSubscriptionPaymentFailure:   command.NewClubSupporterSubscriptionPaymentFailureHandler(mailingRepo, eva, sting),
			ClubSupporterSubscriptionRefunded:         command.NewClubSupporterSubscriptionRefundedHandler(mailingRepo, eva, sting),
			UpcomingClubSupporterSubscriptionRenewals: command.NewUpcomingClubSupporterSubscriptionRenewalsHandler(mailingRepo, eva, sting),
			ClubSupporterNoPosts:                      command.NewClubSupporterNoPostsHandler(mailingRepo, eva, sting),
			ClubSupporterRequiredPostReminder:         command.NewClubSupporterRequiredPostReminderHandler(mailingRepo, eva, sting),
			AccountDeletionReminder:                   command.NewAccountDeletionReminderHandler(mailingRepo, eva),
			AccountDeletionBegin:                      command.NewAccountDeletionBeginHandler(mailingRepo, eva),
			AccountDeleted:                            command.NewAccountDeletedHandler(mailingRepo),
			ClubSuspended:                             command.NewClubSuspendedHandler(mailingRepo, eva, sting),
			ClubOverChargebackThreshold:               command.NewClubOverChargebackThresholdHandler(mailingRepo, eva, sting),
			ClubSupporterSubscriptionDuplicate:        command.NewClubSupporterSubscriptionDuplicateHandler(mailingRepo, eva, sting),
			ModeratorPostInQueue:                      command.NewModeratorPostInQueueHandler(mailingRepo, eva),
			PostFailedProcessing:                      command.NewPostFailedProcessingHandler(mailingRepo, eva, sting),
			AccountNewRegistration:                    command.NewAccountNewRegistrationHandler(mailingRepo, eva),
		},
		Queries: app.Queries{},
	}
}
