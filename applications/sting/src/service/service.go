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
	"overdoll/applications/sting/src/app/activities"
	"overdoll/applications/sting/src/app/command"
	"overdoll/applications/sting/src/app/query"
	storage "overdoll/libraries/aws"
	"overdoll/libraries/bootstrap"
	clients "overdoll/libraries/client"
	"overdoll/libraries/elasticsearch"
)

func NewApplication(ctx context.Context) (app.Application, func()) {

	evaClient, cleanup := clients.NewEvaClient(ctx)

	return createApplication(ctx, adapters.NewEvaGrpc(evaClient)),
		func() {
			cleanup()
		}
}

func NewComponentTestApplication(ctx context.Context) app.Application {
	return createApplication(ctx, EvaServiceMock{})
}

func createApplication(ctx context.Context, eva command.EvaService) app.Application {

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

	defer c.Close()

	postRepo := adapters.NewPostsCassandraRepository(session)
	indexRepo := adapters.NewPostIndexElasticSearchRepository(es)
	eventRepo := adapters.NewPostTemporalRepository(c)

	contentRepo := adapters.NewContentS3Repository(awsSession)

	return app.Application{
		Commands: app.Commands{
			CreatePendingPost:  command.NewCreatePendingPostHandler(postRepo, eventRepo, eva),
			ReviewPendingPost:  command.NewReviewPostHandler(postRepo, eventRepo),
			IndexAllMedia:      command.NewIndexAllMediaHandler(postRepo, indexRepo),
			IndexAllCharacters: command.NewIndexAllCharactersHandler(postRepo, indexRepo),
			IndexAllCategories: command.NewIndexAllCategoriesHandler(postRepo, indexRepo),
			IndexAllArtists:    command.NewIndexAllArtistsHandler(postRepo, indexRepo),
		},
		Queries: app.Queries{
			SearchMedias:     query.NewSearchMediasHandler(indexRepo),
			SearchCharacters: query.NewSearchCharactersHandler(indexRepo),
			SearchCategories: query.NewSearchCategoriesHandler(indexRepo),
			SearchArtist:     query.NewSearchArtistsHandler(indexRepo),
		},
		Activities: app.Activities{
			ReviewPost:          activities.NewReviewPostActivityHandler(postRepo, indexRepo, eva),
			CreatePost:          activities.NewCreatePostActivityHandler(postRepo, indexRepo),
			NewPendingPost:      activities.NewNewPostActivityHandler(postRepo, indexRepo, contentRepo, eva),
			PostCompleted:       activities.NewPublishPostActivityHandler(postRepo, indexRepo, contentRepo, eva),
			PostCustomResources: activities.NewPostCustomResourcesActivityHandler(postRepo, indexRepo),
		},
	}
}
