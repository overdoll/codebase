package service

import (
	"context"
	"go.temporal.io/sdk/client"
	temporalmocks "go.temporal.io/sdk/mocks"
	"os"
	"overdoll/applications/loader/internal/adapters"
	"overdoll/applications/loader/internal/app"
	"overdoll/applications/loader/internal/app/command"
	"overdoll/applications/loader/internal/app/query"
	"overdoll/applications/loader/internal/app/workflows/activities"
	"overdoll/libraries/bootstrap"
	"overdoll/libraries/clients"
	"overdoll/libraries/testing_tools/mocks"
)

func NewApplication(ctx context.Context) (*app.Application, func()) {
	bootstrap.NewBootstrap()
	stingClient, cleanup := clients.NewResourceCallbackClient(ctx, os.Getenv("STING_SERVICE"))

	return createApplication(ctx, adapters.NewCallbackGrpc(stingClient), clients.NewTemporalClient(ctx)), func() {
		cleanup()
	}
}

type ComponentTestApplication struct {
	App                 *app.Application
	TemporalClient      *temporalmocks.Client
	StingCallbackClient *mocks.MockResourceCallbackClient
}

func NewComponentTestApplication(ctx context.Context) *ComponentTestApplication {
	bootstrap.NewBootstrap()
	temporalClient := &temporalmocks.Client{}
	callbackMock := &mocks.MockResourceCallbackClient{}

	return &ComponentTestApplication{
		App:                 createApplication(ctx, adapters.NewCallbackGrpc(callbackMock), temporalClient),
		TemporalClient:      temporalClient,
		StingCallbackClient: callbackMock,
	}
}

func createApplication(ctx context.Context, callbackService activities.CallbackService, client client.Client) *app.Application {

	s := bootstrap.InitializeDatabaseSession()

	awsSession := bootstrap.InitializeAWSSession()

	resourceRepo := adapters.NewResourceCassandraS3Repository(s, awsSession)

	eventRepo := adapters.NewEventTemporalRepository(client)

	return &app.Application{
		Commands: app.Commands{
			TusComposer:                        command.NewTusComposerHandler(resourceRepo),
			DeleteResources:                    command.NewDeleteResourcesHandler(eventRepo),
			NewCreateOrGetResourcesFromUploads: command.NewCreateOrGetResourcesFromUploadsHandler(resourceRepo, eventRepo),
			CopyResourcesAndApplyFilters:       command.NewCopyResourcesAndApplyFiltersHandler(resourceRepo, eventRepo),
			UpdateResourcePrivacy:              command.NewUpdateResourcePrivacyHandler(resourceRepo),
			ReprocessResource:                  command.NewReprocessResourceHandler(resourceRepo, eventRepo),
		},
		Queries: app.Queries{
			ResourcesByIds: query.NewResourcesByIdsHandler(resourceRepo),
		},
		Activities: activities.NewActivitiesHandler(resourceRepo, callbackService),
	}
}
