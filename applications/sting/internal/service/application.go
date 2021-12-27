package service

import (
	"context"
	"os"

	"overdoll/applications/sting/internal/adapters"
	"overdoll/applications/sting/internal/app"
	"overdoll/applications/sting/internal/app/command"
	"overdoll/applications/sting/internal/app/query"
	"overdoll/applications/sting/internal/app/workflows/activities"
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

	resourceRepo := adapters.NewResourceS3Repository(awsSession)

	return app.Application{
		Commands: app.Commands{
			TusComposer: command.NewTusComposerHandler(resourceRepo),

			CreatePost:  command.NewCreatePostHandler(postRepo, indexRepo, eva, parley),
			PublishPost: command.NewPublishPostHandler(postRepo, indexRepo, eva),
			DiscardPost: command.NewDiscardPostHandler(postRepo, indexRepo),
			RejectPost:  command.NewRejectPostHandler(postRepo, indexRepo),
			SubmitPost:  command.NewSubmitPostHandler(postRepo, indexRepo, parley),
			RemovePost:  command.NewRemovePostHandler(postRepo, indexRepo),

			IndexAllPosts:      command.NewIndexAllPostsHandler(postRepo, indexRepo),
			IndexAllSeries:     command.NewIndexAllSeriesHandler(postRepo, indexRepo),
			IndexAllCharacters: command.NewIndexAllCharactersHandler(postRepo, indexRepo),
			IndexAllCategories: command.NewIndexAllCategoriesHandler(postRepo, indexRepo),
			IndexAllClubs:      command.NewIndexAllClubsHandler(postRepo, indexRepo),
			IndexAllAudience:   command.NewIndexAllAudienceHandler(postRepo, indexRepo),

			UpdatePostClub:       command.NewUpdatePostClubHandler(postRepo, indexRepo),
			UpdatePostCategories: command.NewUpdatePostCategoriesHandler(postRepo, indexRepo),
			UpdatePostCharacters: command.NewUpdatePostCharactersHandler(postRepo, indexRepo),
			UpdatePostContent:    command.NewUpdatePostContentHandler(postRepo, indexRepo, resourceRepo),
			UpdatePostAudience:   command.NewUpdatePostAudienceHandler(postRepo, indexRepo),
		},
		Queries: app.Queries{
			PrincipalById: query.NewPrincipalByIdHandler(eva),

			SearchCharacters: query.NewSearchCharactersHandler(indexRepo),
			CharacterBySlug:  query.NewCharacterBySlugHandler(postRepo),
			CharacterById:    query.NewCharacterByIdHandler(postRepo),

			SearchCategories: query.NewSearchCategoriesHandler(indexRepo),
			CategoryBySlug:   query.NewCategoryBySlugHandler(postRepo),
			CategoryById:     query.NewCategoryByIdHandler(postRepo),

			SearchPosts:      query.NewSearchPostsHandler(indexRepo),
			PostById:         query.NewPostByIdHandler(postRepo),
			PostByIdOperator: query.NewPostByIdOperatorHandler(postRepo),

			SearchClubs: query.NewSearchClubsHandler(indexRepo),
			ClubBySlug:  query.NewClubBySlugHandler(postRepo),
			ClubById:    query.NewClubByIdHandler(postRepo),

			SearchAudience: query.NewSearchAudienceHandler(indexRepo),
			AudienceBySlug: query.NewAudienceBySlugHandler(postRepo),
			AudienceById:   query.NewAudienceByIdHandler(postRepo),

			SearchSeries: query.NewSearchSeriesHandler(indexRepo),
			SeriesBySlug: query.NewSeriesBySlugHandler(postRepo),
			SeriesById:   query.NewSeriesByIdHandler(postRepo),
		},
		Activities: activities.NewActivitiesHandler(postRepo, indexRepo, resourceRepo, parley),
	}
}
