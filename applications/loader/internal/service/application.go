package service

import (
	"context"
	"overdoll/applications/loader/internal/adapters"
	"overdoll/applications/loader/internal/app"
	"overdoll/applications/loader/internal/app/command"
	"overdoll/applications/loader/internal/app/query"
	"overdoll/applications/loader/internal/app/workflows/activities"

	"overdoll/libraries/bootstrap"
)

func NewApplication(ctx context.Context) (app.Application, func()) {
	bootstrap.NewBootstrap(ctx)
	return createApplication(ctx), func() {}
}

func createApplication(ctx context.Context) app.Application {

	session := bootstrap.InitializeDatabaseSession()
	awsSession := bootstrap.InitializeAWSSession()

	resourceRepo := adapters.NewResourceCassandraRepository(session)
	resourceFileRepo := adapters.NewResourceS3FileRepository(awsSession)

	return app.Application{
		Commands: app.Commands{
			TusComposer:                        command.NewTusComposerHandler(resourceFileRepo),
			NewCreateOrGetResourcesFromUploads: command.NewCreateOrGetResourcesFromUploadsHandler(resourceRepo, resourceFileRepo),
		},
		Queries: app.Queries{
			ResourceById:   query.NewResourceByIdHandler(resourceRepo),
			ResourcesByIds: query.NewResourcesByIdsHandler(resourceRepo),
		},
		Activities: activities.NewActivitiesHandler(resourceRepo, resourceFileRepo),
	}
}
