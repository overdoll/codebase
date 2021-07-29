package service

import (
	"context"
	"log"

	"go.uber.org/zap"
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

	if err := bootstrap.NewBootstrap(ctx); err != nil {
		zap.S().Fatal("bootstrap failed", zap.Error(err))
	}

	session, err := bootstrap.InitializeAWSSession()

	if err != nil {
		log.Fatalf("failed to create aws session: %s", err)
	}

	repo := adapters.NewFileS3Repository(session)

	return app.Application{
		Commands: app.Commands{
			HandleUpload: command.NewHandleUploadHandler(repo),
		},
		Queries: app.Queries{},
	}
}
