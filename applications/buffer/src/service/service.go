package service

import (
	"context"
	"log"

	"overdoll/applications/buffer/src/adapters"
	"overdoll/applications/buffer/src/app"
	"overdoll/applications/buffer/src/app/command"
	"overdoll/applications/buffer/src/app/query"
	storage "overdoll/libraries/aws"
	"overdoll/libraries/bootstrap"
	"overdoll/libraries/common"
)

func NewApplication(ctx context.Context) (app.Application, func()) {

	client, cleanup := common.NewEvaClient(ctx)

	return createApplication(ctx, adapters.NewEvaGrpc(client)),
		func() {
			cleanup()
		}
}

func NewComponentTestApplication(ctx context.Context) app.Application {
	return createApplication(ctx, EvaServiceMock{})
}

func createApplication(ctx context.Context, eva query.EvaService) app.Application {

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
			GetFile: query.NewGetFileHandler(repo, eva),
		},
	}
}
