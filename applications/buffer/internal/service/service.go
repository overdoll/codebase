package service

import (
	"context"
	"log"

	"overdoll/applications/buffer/internal/adapters"
	"overdoll/applications/buffer/internal/app"
	"overdoll/applications/buffer/internal/app/command"
	"overdoll/applications/buffer/internal/app/query"
	storage "overdoll/libraries/aws"
	"overdoll/libraries/bootstrap"
)

func NewApplication(ctx context.Context) (app.Application, func()) {

	return createApplication(ctx),
		func() {

		}
}

func NewComponentTestApplication(ctx context.Context) app.Application {
	return createApplication(ctx)
}

func createApplication(ctx context.Context) app.Application {

	_, err := bootstrap.NewBootstrap(context.Background())

	if err != nil {
		log.Fatalf("failed to bootstrap server: %s", err)
	}

	session, err := storage.CreateAWSSession()

	if err != nil {
		log.Fatalf("failed to create aws session: %s", err)
	}

	repo := adapters.NewFileS3Repository(session)

	return app.Application{
		Commands: app.Commands{
			HandleUpload: command.NewHandleUploadHandler(repo),
		},
		Queries: app.Queries{
			GetFile: query.NewGetFileHandler(repo),
		},
	}
}
