package service

import (
	"context"
	"log"
	"os"

	"google.golang.org/grpc"
	eva "overdoll/applications/eva/proto"
	"overdoll/applications/sting/src/adapters"
	"overdoll/applications/sting/src/app"
	"overdoll/applications/sting/src/app/command"
	storage "overdoll/libraries/aws"
	"overdoll/libraries/bootstrap"
	"overdoll/libraries/search"
)

func NewApplication(ctx context.Context) (app.Application, func()) {

	evaConnection, err := grpc.DialContext(ctx, os.Getenv("EVA_SERVICE"), grpc.WithInsecure())

	if err != nil {
		panic(err)
	}

	evaGrpc := adapters.NewEvaGrpc(eva.NewEvaClient(evaConnection))

	return createApplication(ctx, evaGrpc),
		func() {
			_ = evaConnection.Close()
		}
}

func NewComponentTestApplication(ctx context.Context) app.Application {
	return createApplication(ctx, EvaServiceMock{})
}

func createApplication(ctx context.Context, evaGrpc command.EvaService) app.Application {

	init, err := bootstrap.NewBootstrap(ctx)

	if err != nil {
		log.Fatalf("bootstrap failed with errors: %s", err)
	}

	session, err := init.InitializeDatabaseSession()

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

	categoryRepo := adapters.NewCategoryCassandraRepository(session)
	categoryIndexRepo := adapters.NewCategoryIndexElasticSearchRepository(es)

	characterRepo := adapters.NewCharacterCassandraRepository(session)
	characterIndexRepo := adapters.NewCharacterIndexElasticSearchRepository(es)

	artistRepo := adapters.NewArtistCassandraRepository(session)
	artistIndexRepo := adapters.NewArtistIndexElasticSearchRepository(es)

	postRepo := adapters.NewPostsCassandraRepository(session)
	_ = adapters.NewPostIndexElasticSearchRepository(es)

	contentRepo := adapters.NewContentS3Repository(awsSession)

	return app.Application{
		Commands: app.Commands{
			ReviewPost:      command.NewReviewPostHandler(postRepo, characterRepo, categoryRepo),
			NewPost:         command.NewNewPostHandler(postRepo, characterRepo, categoryRepo, contentRepo, evaGrpc),
			PublishPost:     command.NewPublishPostHandler(postRepo, characterRepo, categoryRepo),
			IndexMedia:      command.NewIndexMediaHandler(characterRepo, characterIndexRepo),
			IndexCharacters: command.NewIndexCharactersHandler(characterRepo, characterIndexRepo),
			IndexCategories: command.NewIndexCategoriesHandler(categoryRepo, categoryIndexRepo),
			IndexArtists:    command.NewIndexArtistsHandler(artistRepo, artistIndexRepo),
		},
	}
}
