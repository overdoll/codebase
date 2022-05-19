package service

import (
	"context"
	"github.com/aws/aws-sdk-go/service/cloudfront/sign"
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
	"overdoll/libraries/support"
)

func NewApplication(ctx context.Context) (*app.Application, func()) {
	bootstrap.NewBootstrap(ctx)
	return createApplication(ctx, clients.NewTemporalClient(ctx)), func() {}
}

type ComponentTestApplication struct {
	App            *app.Application
	TemporalClient *temporalmocks.Client
}

func NewComponentTestApplication(ctx context.Context) *ComponentTestApplication {
	bootstrap.NewBootstrap(ctx)
	temporalClient := &temporalmocks.Client{}
	return &ComponentTestApplication{
		App:            createApplication(ctx, temporalClient),
		TemporalClient: temporalClient,
	}
}

func createApplication(ctx context.Context, client client.Client) *app.Application {

	s := bootstrap.InitializeDatabaseSession()

	awsSession := bootstrap.InitializeAWSSession()

	resourcesRsa, err := support.ParseRsaPrivateKeyFromPemEnvFile(os.Getenv("AWS_PRIVATE_RESOURCES_KEY_PAIR_PRIVATE_KEY"))

	if err != nil {
		panic(err)
	}

	resourcesSigner := sign.NewURLSigner(os.Getenv("AWS_PRIVATE_RESOURCES_KEY_PAIR_ID"), resourcesRsa)

	resourceRepo := adapters.NewResourceCassandraS3Repository(s, awsSession, resourcesSigner)

	eventRepo := adapters.NewEventTemporalRepository(client)

	return &app.Application{
		Commands: app.Commands{
			TusComposer:                        command.NewTusComposerHandler(resourceRepo),
			DeleteResources:                    command.NewDeleteResourcesHandler(eventRepo),
			NewCreateOrGetResourcesFromUploads: command.NewCreateOrGetResourcesFromUploadsHandler(resourceRepo, eventRepo),
			CopyResourcesAndApplyFilters:       command.NewCopyResourcesAndApplyFiltersHandler(resourceRepo, eventRepo),
		},
		Queries: app.Queries{
			ResourcesByIdsWithUrls: query.NewResourcesByIdsWithUrlsHandler(resourceRepo),
		},
		Activities: activities.NewActivitiesHandler(resourceRepo),
	}
}
