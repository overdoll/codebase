package service

import (
	"context"
	"overdoll/applications/loader/internal/adapters"
	"overdoll/applications/loader/internal/app"
	"overdoll/applications/loader/internal/app/command"
	"overdoll/applications/loader/internal/app/query"
	"overdoll/applications/loader/internal/app/workflows/activities"
	"overdoll/libraries/clients"

	"overdoll/libraries/bootstrap"
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

	resourceRepo := adapters.NewResourceCassandraRepository(s)
	resourceFileRepo := adapters.NewResourceS3FileRepository(awsSession)

	eventRepo := adapters.NewEventTemporalRepository(client)

	return app.Application{
		Commands: app.Commands{
			TusComposer:                        command.NewTusComposerHandler(resourceFileRepo),
			DeleteResources:                    command.NewDeleteResourcesHandler(eventRepo),
			NewCreateOrGetResourcesFromUploads: command.NewCreateOrGetResourcesFromUploadsHandler(resourceRepo, resourceFileRepo, eventRepo),
		},
		Queries: app.Queries{
			ResourceById:   query.NewResourceByIdHandler(resourceRepo),
			ResourcesByIds: query.NewResourcesByIdsHandler(resourceRepo),
		},
		Activities: activities.NewActivitiesHandler(resourceRepo, resourceFileRepo),
	}
}
