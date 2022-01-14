package service

import (
	"context"
	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/credentials"
	"github.com/aws/aws-sdk-go/aws/session"
	"os"
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

	s := bootstrap.InitializeDatabaseSession()

	awsSession, err := session.NewSession(&aws.Config{
		Credentials:      credentials.NewStaticCredentials(os.Getenv("AWS_ACCESS_KEY_LOADER"), os.Getenv("AWS_ACCESS_SECRET_LOADER"), ""),
		Endpoint:         aws.String(os.Getenv("AWS_ENDPOINT_LOADER")),
		Region:           aws.String(os.Getenv("AWS_REGION_LOADER")),
		DisableSSL:       aws.Bool(false),
		S3ForcePathStyle: aws.Bool(true),
	})

	if err != nil {
		panic(err)
	}

	resourceRepo := adapters.NewResourceCassandraRepository(s)
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
