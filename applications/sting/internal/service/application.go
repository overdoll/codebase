package service

import (
	"context"
	"os"

	"overdoll/applications/sting/internal/adapters"
	"overdoll/applications/sting/internal/app"
	"overdoll/applications/sting/internal/app/activities"
	"overdoll/applications/sting/internal/app/command"
	"overdoll/applications/sting/internal/app/query"
	"overdoll/libraries/bootstrap"
	"overdoll/libraries/clients"
)

func NewApplication(ctx context.Context) (app.Application, func()) {

	// bootstrap application
	bootstrap.NewBootstrap(ctx)

	evaClient, cleanup := clients.NewEvaClient(ctx, os.Getenv("EVA_SERVICE"))
	parleyClient, cleanup2 := clients.NewParleyClient(ctx, os.Getenv("PARLEY_SERVICE"))

	return createApplication(ctx, adapters.NewEvaGrpc(evaClient), adapters.NewParleyGrpc(parleyClient)),
		func() {
			cleanup()
			cleanup2()
		}
}

func createApplication(ctx context.Context, eva command.EvaService, parley command.ParleyService) app.Application {

	session := bootstrap.InitializeDatabaseSession()

	client := bootstrap.InitializeElasticSearchSession()

	awsSession := bootstrap.InitializeAWSSession()

	postRepo := adapters.NewPostsCassandraRepository(session)
	indexRepo := adapters.NewPostsIndexElasticSearchRepository(client, session)

	contentRepo := adapters.NewContentS3Repository(awsSession)

	return app.Application{
		Commands: app.Commands{
			CreatePost:          command.NewCreatePostHandler(postRepo, eva, parley),
			IndexAllPosts:       command.NewIndexAllPendingPostsHandler(postRepo, indexRepo),
			IndexAllMedia:       command.NewIndexAllMediaHandler(postRepo, indexRepo),
			IndexAllCharacters:  command.NewIndexAllCharactersHandler(postRepo, indexRepo),
			IndexAllCategories:  command.NewIndexAllCategoriesHandler(postRepo, indexRepo),
			UndoPost:            command.NewStartUndoPostHandler(postRepo, indexRepo),
			PublishPost:         command.NewStartPublishPostHandler(postRepo, indexRepo, eva),
			DiscardPost:         command.NewStartDiscardPostHandler(postRepo, indexRepo),
			RejectPost:          command.NewRejectPostHandler(postRepo, indexRepo),
			NewPost:             activities.NewNewPostHandler(postRepo, indexRepo, contentRepo, eva),
			PostCustomResources: command.NewPostCustomResourcesHandler(postRepo, indexRepo),
			PublishPost:         activities.NewPublishPostHandler(postRepo, indexRepo, contentRepo, eva),
			DiscardPost:         activities.NewDiscardPostHandler(postRepo, indexRepo, contentRepo, eva),
			UndoPost:            activities.NewUndoPostHandler(postRepo, indexRepo, contentRepo, eva),
			ReassignModerator:   activities.NewReassignModeratorHandler(postRepo, indexRepo, parley),
		},
		Queries: app.Queries{
			PrincipalById:    query.NewPrincipalByIdHandler(eva),
			SearchMedias:     query.NewSearchMediasHandler(indexRepo),
			SearchCharacters: query.NewSearchCharactersHandler(indexRepo),
			SearchCategories: query.NewSearchCategoriesHandler(indexRepo),
			SearchPosts:      query.NewSearchPostsHandler(indexRepo),
			PostById:         query.NewPostByIdHandler(postRepo),
			CharacterById:    query.NewCharacterByIdHandler(postRepo),
			CategoryById:     query.NewCategoryByIdHandler(postRepo),
			ArtistById:       query.NewArtistByIdHandler(postRepo),
			MediaById:        query.NewMediaByIdHandler(postRepo),
		},
	}
}
