package service

import (
	"context"
	"log"
	"os"

	"github.com/spf13/viper"
	"overdoll/applications/sting/src/adapters"
	"overdoll/applications/sting/src/app"
	"overdoll/applications/sting/src/app/command"
	"overdoll/applications/sting/src/app/query"
	storage "overdoll/libraries/aws"
	"overdoll/libraries/bootstrap"
	"overdoll/libraries/clients"
	"overdoll/libraries/elasticsearch"
)

func NewApplication(ctx context.Context) (app.Application, func()) {

	_, err := bootstrap.NewBootstrap(ctx)

	if err != nil {
		log.Fatalf("bootstrap failed with errors: %s", err)
	}

	evaClient, cleanup := clients.NewEvaClient(ctx, os.Getenv("EVA_SERVICE"))
	parleyClient, cleanup2 := clients.NewParleyClient(ctx, os.Getenv("PARLEY_SERVICE"))

	a := createApplication(ctx, adapters.NewEvaGrpc(evaClient), adapters.NewParleyGrpc(parleyClient))

	return a,
		func() {
			cleanup()
			cleanup2()
		}
}

func createApplication(ctx context.Context, eva command.EvaService, parley command.ParleyService) app.Application {

	session, err := bootstrap.InitializeDatabaseSession(viper.GetString("db.keyspace"))

	if err != nil {
		log.Fatalf("database session failed with errors: %s", err)
	}

	es, err := search.NewStore(ctx)

	if err != nil {
		log.Fatalf("es session failed with errors: %s", err)
	}

	awsSession, err := storage.CreateAWSSession()

	if err != nil {
		log.Fatalf("failed to create aws session: %s", err)
	}

	postRepo := adapters.NewPostsCassandraRepository(session)
	indexRepo := adapters.NewPostsIndexElasticSearchRepository(es)

	contentRepo := adapters.NewContentS3Repository(awsSession)

	return app.Application{
		Commands: app.Commands{
			CreatePendingPost: command.NewCreatePendingPostHandler(postRepo, eva, parley),
			UpdatePendingPost: command.NewUpdatePendingPostHandler(postRepo),

			IndexAllMedia:      command.NewIndexAllMediaHandler(postRepo, indexRepo),
			IndexAllCharacters: command.NewIndexAllCharactersHandler(postRepo, indexRepo),
			IndexAllCategories: command.NewIndexAllCategoriesHandler(postRepo, indexRepo),
			IndexAllArtists:    command.NewIndexAllArtistsHandler(postRepo, indexRepo),

			StartUndoPost:    command.NewStartUndoPostHandler(postRepo, indexRepo),
			StartPublishPost: command.NewStartPublishPostHandler(postRepo, indexRepo, eva),
			StartDiscardPost: command.NewStartDiscardPostHandler(postRepo, indexRepo),
			RejectPost:       command.NewRejectPostHandler(postRepo, indexRepo),

			CreatePost:          command.NewCreatePostHandler(postRepo, indexRepo),
			NewPendingPost:      command.NewNewPostHandler(postRepo, indexRepo, contentRepo, eva),
			PostCustomResources: command.NewPostCustomResourcesHandler(postRepo, indexRepo),

			PublishPost:       command.NewPublishPostHandler(postRepo, indexRepo, contentRepo, eva),
			DiscardPost:       command.NewDiscardPostHandler(postRepo, indexRepo, contentRepo, eva),
			UndoPost:          command.NewUndoPostHandler(postRepo, indexRepo, contentRepo, eva),
			ReassignModerator: command.NewReassignModeratorHandler(postRepo, indexRepo),
		},
		Queries: app.Queries{
			SearchMedias:     query.NewSearchMediasHandler(indexRepo),
			SearchCharacters: query.NewSearchCharactersHandler(indexRepo),
			SearchCategories: query.NewSearchCategoriesHandler(indexRepo),
			SearchArtist:     query.NewSearchArtistsHandler(indexRepo),
			GetPendingPosts:  query.NewGetPendingPostsHandler(indexRepo, eva),
			GetPendingPost:   query.NewGetPendingPostHandler(postRepo),
		},
	}
}
