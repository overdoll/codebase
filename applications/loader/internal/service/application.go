package service

import (
	"context"
	"github.com/aws/aws-sdk-go/service/cloudfront/sign"
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

func NewApplication(ctx context.Context) (app.Application, func()) {
	bootstrap.NewBootstrap(ctx)
	return createApplication(ctx), func() {

	}
}

func createApplication(ctx context.Context) app.Application {

	s := bootstrap.InitializeDatabaseSession()
	client := clients.NewTemporalClient(ctx)

	awsSession := bootstrap.InitializeAWSSession()

	resourcesRsa, err := support.ParseRsaPrivateKeyFromPemEnvFile(os.Getenv("AWS_PRIVATE_RESOURCES_KEY_GROUP_PRIVATE_KEY"))

	if err != nil {
		panic(err)
	}

	resourcesSigner := sign.NewURLSigner(os.Getenv("AWS_PRIVATE_RESOURCES_KEY_GROUP_ID"), resourcesRsa)

	resourceRepo := adapters.NewResourceCassandraS3Repository(s, awsSession, resourcesSigner)

	eventRepo := adapters.NewEventTemporalRepository(client)

	return app.Application{
		Commands: app.Commands{
			TusComposer:                        command.NewTusComposerHandler(resourceRepo),
			DeleteResources:                    command.NewDeleteResourcesHandler(eventRepo),
			NewCreateOrGetResourcesFromUploads: command.NewCreateOrGetResourcesFromUploadsHandler(resourceRepo, eventRepo),
		},
		Queries: app.Queries{
			ResourceById:   query.NewResourceByIdHandler(resourceRepo),
			ResourcesByIds: query.NewResourcesByIdsHandler(resourceRepo),
		},
		Activities: activities.NewActivitiesHandler(resourceRepo),
	}
}
