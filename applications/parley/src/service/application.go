package service

import (
	"context"
	"log"
	"os"

	"github.com/spf13/viper"
	"overdoll/applications/parley/src/adapters"
	"overdoll/applications/parley/src/app"
	"overdoll/applications/parley/src/app/command"
	"overdoll/applications/parley/src/app/query"
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

func createApplication(ctx context.Context, eva command.EvaService, sting command.StingService) app.Application {

	session, err := bootstrap.InitializeDatabaseSession(viper.GetString("db.keyspace"))

	if err != nil {
		log.Fatalf("database session failed with errors: %s", err)
	}

	moderatorRepo := adapters.NewModeratorCassandraRepository(session)
	infractionRepo := adapters.NewInfractionCassandraRepository(session)

	return app.Application{
		Commands: app.Commands{
			GetNextModerator: command.NewGetNextModeratorHandler(moderatorRepo),
			ModeratePost:     command.NewModeratePendingPostHandler(moderatorRepo, eva, sting),
		},
		Queries: app.Queries{
			PendingPostRejectionReasons: query.NewPendingPostsRejectionReasonsHandler(infractionRepo),
		},
	}
}
