package service

import (
	"context"

	"overdoll/applications/buffer/internal/adapters"
	"overdoll/applications/buffer/internal/app"
	"overdoll/applications/buffer/internal/app/command"
	"overdoll/libraries/bootstrap"
)

func NewApplication(ctx context.Context) (app.Application, func()) {

	return createApplication(ctx),
		func() {

		}
}

func createApplication(ctx context.Context) app.Application {

	bootstrap.NewBootstrap(ctx)

	session := bootstrap.InitializeAWSSession()

	repo := adapters.NewFileS3Repository(session)

	return app.Application{
		Commands: app.Commands{
			HandleUpload: command.NewHandleUploadHandler(repo),
		},
		Queries: app.Queries{},
	}
}
