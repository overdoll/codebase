package service

import (
	"context"
	"log"
	"os"
	"time"

	"github.com/spf13/viper"
	"go.temporal.io/sdk/client"
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

	evaClient, cleanup := clients.NewEvaClient(ctx, os.Getenv("EVA_SERVICE"))
	parleyClient, cleanup2 := clients.NewParleyClient(ctx, os.Getenv("PARLEY_SERVICE"))

	return createApplication(ctx, adapters.NewEvaGrpc(evaClient), adapters.NewParleyGrpc(parleyClient)),
		func() {
			cleanup()
			cleanup2()
		}
}

func createApplication(ctx context.Context, eva command.EvaService, parley command.ParleyService) app.Application {

	_, err := bootstrap.NewBootstrap(ctx)

	if err != nil {
		log.Fatalf("bootstrap failed with errors: %s", err)
	}

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

	c, err := client.NewClient(client.Options{
		HostPort:  os.Getenv("TEMPORAL_URL"),
		Namespace: os.Getenv("TEMPORAL_NAMESPACE"),
		ConnectionOptions: client.ConnectionOptions{
			HealthCheckTimeout: time.Second * 20,
		},
	})

	if err != nil {
		log.Fatalln("Unable to create client", err)
	}

	postRepo := adapters.NewPostsCassandraRepository(session)
	indexRepo := adapters.NewPostsIndexElasticSearchRepository(es)
	eventRepo := adapters.NewPostTemporalRepository(c)

	contentRepo := adapters.NewContentS3Repository(awsSession)

	return app.Application{
		Commands: app.Commands{
			CreatePendingPost: command.NewCreatePendingPostHandler(postRepo, eventRepo, eva, parley),
			UpdatePendingPost: command.NewUpdatePendingPostHandler(postRepo, eventRepo),

			IndexAllMedia:      command.NewIndexAllMediaHandler(postRepo, indexRepo),
			IndexAllCharacters: command.NewIndexAllCharactersHandler(postRepo, indexRepo),
			IndexAllCategories: command.NewIndexAllCategoriesHandler(postRepo, indexRepo),
			IndexAllArtists:    command.NewIndexAllArtistsHandler(postRepo, indexRepo),

			StartUndoPost:    command.NewStartUndoPostHandler(postRepo, indexRepo, eventRepo),
			StartPublishPost: command.NewStartPublishPostHandler(postRepo, indexRepo, eventRepo, eva),
			StartDiscardPost: command.NewStartDiscardPostHandler(postRepo, indexRepo, eventRepo),
			RejectPost:       command.NewRejectPostHandler(postRepo, indexRepo),

			CreatePost:          command.NewCreatePostActivityHandler(postRepo, indexRepo),
			NewPendingPost:      command.NewNewPostActivityHandler(postRepo, indexRepo, contentRepo, eva),
			PostCustomResources: command.NewPostCustomResourcesActivityHandler(postRepo, indexRepo),

			PublishPost:       command.NewPublishPostActivityHandler(postRepo, indexRepo, contentRepo, eva),
			DiscardPost:       command.NewDiscardPostActivityHandler(postRepo, indexRepo, contentRepo, eva),
			UndoPost:          command.NewUndoPostActivityHandler(postRepo, indexRepo, contentRepo, eva),
			ReassignModerator: command.NewReassignModeratorActivityHandler(postRepo, indexRepo),
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
