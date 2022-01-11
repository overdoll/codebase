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
	stellaClient, cleanup3 := clients.NewStellaClient(ctx, os.Getenv("STELLA_SERVICE"))
	loaderClient, cleanup4 := clients.NewLoaderClient(ctx, os.Getenv("LOADER_SERVICE"))

	return createApplication(ctx,
			adapters.NewEvaGrpc(evaClient),
			adapters.NewParleyGrpc(parleyClient),
			adapters.NewStellaGrpc(stellaClient),
			adapters.NewLoaderGrpc(loaderClient)),
		func() {
			cleanup()
			cleanup2()
			cleanup3()
			cleanup4()
		}
}

func NewComponentTestApplication(ctx context.Context) (app.Application, func()) {

	bootstrap.NewBootstrap(ctx)

	evaClient, cleanup := clients.NewEvaClient(ctx, os.Getenv("EVA_SERVICE"))
	parleyClient, cleanup2 := clients.NewParleyClient(ctx, os.Getenv("PARLEY_SERVICE"))

	return createApplication(ctx,
			// kind of "mock" eva, it will read off a stored database of accounts for testing first before reaching out to eva.
			// this makes testing easier because we can get reproducible tests with each run
			EvaServiceMock{adapter: adapters.NewEvaGrpc(evaClient)},
			adapters.NewParleyGrpc(parleyClient),
			StellaServiceMock{},
			LoaderServiceMock{}),
		func() {
			cleanup()
			cleanup2()
		}
}

func createApplication(ctx context.Context, eva command.EvaService, parley command.ParleyService, stella command.StellaService, loader command.LoaderService) app.Application {

	session := bootstrap.InitializeDatabaseSession()

	client := bootstrap.InitializeElasticSearchSession()

	postRepo := adapters.NewPostsCassandraRepository(session)
	postIndexRepo := adapters.NewPostsIndexElasticSearchRepository(client, session)
	personalizationRepo := adapters.NewPersonalizationProfileCassandraRepository(session)

	return app.Application{
		Commands: app.Commands{
			CreatePost:  command.NewCreatePostHandler(postRepo, postIndexRepo, eva, parley, stella),
			PublishPost: command.NewPublishPostHandler(postRepo, postIndexRepo, eva),
			DiscardPost: command.NewDiscardPostHandler(postRepo, postIndexRepo),
			RejectPost:  command.NewRejectPostHandler(postRepo, postIndexRepo),
			SubmitPost:  command.NewSubmitPostHandler(postRepo, postIndexRepo, parley, loader),
			RemovePost:  command.NewRemovePostHandler(postRepo, postIndexRepo),

			IndexAllPosts:      command.NewIndexAllPostsHandler(postRepo, postIndexRepo),
			IndexAllSeries:     command.NewIndexAllSeriesHandler(postRepo, postIndexRepo),
			IndexAllCharacters: command.NewIndexAllCharactersHandler(postRepo, postIndexRepo),
			IndexAllCategories: command.NewIndexAllCategoriesHandler(postRepo, postIndexRepo),
			IndexAllAudience:   command.NewIndexAllAudienceHandler(postRepo, postIndexRepo),

			UpdatePostCategories: command.NewUpdatePostCategoriesHandler(postRepo, postIndexRepo),
			UpdatePostCharacters: command.NewUpdatePostCharactersHandler(postRepo, postIndexRepo),
			UpdatePostContent:    command.NewUpdatePostContentHandler(postRepo, postIndexRepo, loader),
			UpdatePostAudience:   command.NewUpdatePostAudienceHandler(postRepo, postIndexRepo),

			LikePost:     command.NewLikePostHandler(postRepo),
			UndoLikePost: command.NewUndoLikePostHandler(postRepo),

			UpdatePersonalizationProfileAudience:    command.NewUpdatePersonalizationProfileAudience(personalizationRepo),
			UpdatePersonalizationProfileCategory:    command.NewUpdatePersonalizationProfileCategoryHandler(personalizationRepo),
			UpdatePersonalizationProfileDateOfBirth: command.NewUpdatePersonalizationDateOfBirthHandler(personalizationRepo),
		},
		Queries: app.Queries{
			PrincipalById: query.NewPrincipalByIdHandler(eva),

			SearchCharacters: query.NewSearchCharactersHandler(postIndexRepo),
			CharacterBySlug:  query.NewCharacterBySlugHandler(postRepo),
			CharacterById:    query.NewCharacterByIdHandler(postRepo),

			SearchCategories: query.NewSearchCategoriesHandler(postIndexRepo),
			CategoryBySlug:   query.NewCategoryBySlugHandler(postRepo),
			CategoryById:     query.NewCategoryByIdHandler(postRepo),

			SearchPosts:      query.NewSearchPostsHandler(postIndexRepo),
			PostById:         query.NewPostByIdHandler(postRepo),
			PostByIdOperator: query.NewPostByIdOperatorHandler(postRepo),

			SearchAudience: query.NewSearchAudienceHandler(postIndexRepo),
			AudienceBySlug: query.NewAudienceBySlugHandler(postRepo),
			AudienceById:   query.NewAudienceByIdHandler(postRepo),

			SearchSeries: query.NewSearchSeriesHandler(postIndexRepo),
			SeriesBySlug: query.NewSeriesBySlugHandler(postRepo),
			SeriesById:   query.NewSeriesByIdHandler(postRepo),

			PersonalizationProfileByAccountId: query.NewPersonalizationProfileByAccountIdHandler(personalizationRepo),
		},
		Activities: activities.NewActivitiesHandler(postRepo, postIndexRepo, parley, stella, loader),
	}
}
