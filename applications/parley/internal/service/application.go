package service

import (
	"context"
	"log"
	"os"

	"overdoll/applications/parley/internal/adapters"
	"overdoll/applications/parley/internal/app"
	"overdoll/applications/parley/internal/app/command"
	"overdoll/applications/parley/internal/app/query"
	"overdoll/libraries/bootstrap"
	"overdoll/libraries/clients"
)

func NewApplication(ctx context.Context) (app.Application, func()) {

	if _, err := bootstrap.NewBootstrap(ctx); err != nil {
		log.Fatalf("bootstrap failed with errors: %s", err)
	}

	evaClient, cleanup := clients.NewEvaClient(ctx, os.Getenv("EVA_SERVICE"))
	stingClient, cleanup2 := clients.NewStingClient(ctx, os.Getenv("STING_SERVICE"))

	return createApplication(ctx, adapters.NewEvaGrpc(evaClient), adapters.NewStingGrpc(stingClient)),
		func() {
			cleanup()
			cleanup2()
		}
}

func NewComponentTestApplication(ctx context.Context) (app.Application, func()) {

	if _, err := bootstrap.NewBootstrap(ctx); err != nil {
		log.Fatalf("bootstrap failed with errors: %s", err)
	}

	evaClient, cleanup := clients.NewEvaClient(ctx, os.Getenv("EVA_SERVICE"))

	// mock sting, because it performs destructive operations and we dont want to
	// re-seed data every single time we run this test
	// also, the endpoints are already tested on sting, so we don't worry about potential failures
	return createApplication(ctx, adapters.NewEvaGrpc(evaClient), StingServiceMock{}),
		func() {
			cleanup()
		}
}

func createApplication(ctx context.Context, eva command.EvaService, sting command.StingService) app.Application {

	session, err := bootstrap.InitializeDatabaseSession()

	if err != nil {
		log.Fatalf("database session failed with errors: %s", err)
	}

	moderatorRepo := adapters.NewModeratorCassandraRepository(session)
	infractionRepo := adapters.NewInfractionCassandraRepository(session)

	return app.Application{
		Commands: app.Commands{
			GetNextModerator:   command.NewGetNextModeratorHandler(moderatorRepo),
			ModeratePost:       command.NewModeratePostHandler(infractionRepo, eva, sting),
			RevertModeratePost: command.NewRevertModeratePostHandler(infractionRepo, eva, sting),
			ToggleModerator:    command.NewToggleModeratorHandler(moderatorRepo, eva),
		},
		Queries: app.Queries{
			PrincipalById:                query.NewPrincipalByIdHandler(eva),
			PostRejectionReasons:         query.NewPendingPostsRejectionReasonsHandler(infractionRepo, eva),
			SearchPostAuditLogs:          query.NewSearchPostAuditLogsHandler(infractionRepo, eva),
			PostRejectionReasonById:      query.NewPendingPostsRejectionReasonByIdHandler(infractionRepo),
			AccountInfractionHistory:     query.NewAccountInfractionHistoryByAccountHandler(infractionRepo),
			AccountInfractionHistoryById: query.NewAccountInfractionHistoryByIdHandler(infractionRepo),
			PostAuditLogById:             query.NewPostAuditLogByIdHandler(infractionRepo),
			ModeratorById:                query.NewModeratorByIdHandler(moderatorRepo),
		},
	}
}
