package service

import (
	"context"
	"go.temporal.io/sdk/client"
	"go.temporal.io/sdk/mocks"
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
			adapters.NewLoaderGrpc(loaderClient),
			clients.NewTemporalClient(ctx)),
		func() {
			cleanup()
			cleanup2()
			cleanup3()
			cleanup4()
		}
}

func NewComponentTestApplication(ctx context.Context) (app.Application, func(), *mocks.Client) {

	bootstrap.NewBootstrap(ctx)

	evaClient, cleanup := clients.NewEvaClient(ctx, os.Getenv("EVA_SERVICE"))
	parleyClient, cleanup2 := clients.NewParleyClient(ctx, os.Getenv("PARLEY_SERVICE"))

	temporalClient := &mocks.Client{}

	return createApplication(ctx,
			// kind of "mock" eva, it will read off a stored database of accounts for testing first before reaching out to eva.
			// this makes testing easier because we can get reproducible tests with each run
			EvaServiceMock{adapter: adapters.NewEvaGrpc(evaClient)},
			adapters.NewParleyGrpc(parleyClient),
			StellaServiceMock{},
			LoaderServiceMock{},
			temporalClient,
		),
		func() {
			cleanup()
			cleanup2()
		},
		temporalClient
}

func createApplication(ctx context.Context, eva command.EvaService, parley activities.ParleyService, stella query.StellaService, loader command.LoaderService, client client.Client) app.Application {

	session := bootstrap.InitializeDatabaseSession()
	esClient := bootstrap.InitializeElasticSearchSession()
	eventRepo := adapters.NewEventTemporalRepository(client)

	postRepo := adapters.NewPostsCassandraRepository(session, stella)
	postIndexRepo := adapters.NewPostsIndexElasticSearchRepository(esClient, session, stella)
	personalizationRepo := adapters.NewCurationProfileCassandraRepository(session)

	return app.Application{
		Commands: app.Commands{
			CreatePost:    command.NewCreatePostHandler(postRepo, postIndexRepo),
			PublishPost:   command.NewPublishPostHandler(postRepo, postIndexRepo, eventRepo),
			DiscardPost:   command.NewDiscardPostHandler(postRepo, postIndexRepo, eventRepo),
			RejectPost:    command.NewRejectPostHandler(postRepo, postIndexRepo),
			SubmitPost:    command.NewSubmitPostHandler(postRepo, postIndexRepo, eventRepo, loader),
			RemovePost:    command.NewRemovePostHandler(postRepo, postIndexRepo, eventRepo),
			DeletePost:    command.NewDeletePostHandler(postRepo, postIndexRepo, eventRepo),
			ArchivePost:   command.NewArchivePostHandler(postRepo, postIndexRepo, eventRepo),
			UnArchivePost: command.NewUnArchivePostHandler(postRepo, postIndexRepo, eventRepo),

			IndexAllPosts:      command.NewIndexAllPostsHandler(postRepo, postIndexRepo),
			IndexAllSeries:     command.NewIndexAllSeriesHandler(postRepo, postIndexRepo),
			IndexAllCharacters: command.NewIndexAllCharactersHandler(postRepo, postIndexRepo),
			IndexAllCategories: command.NewIndexAllCategoriesHandler(postRepo, postIndexRepo),
			IndexAllAudience:   command.NewIndexAllAudienceHandler(postRepo, postIndexRepo),

			AddPostContent:                   command.NewAddPostContentHandler(postRepo, postIndexRepo, loader),
			RemovePostContent:                command.NewRemovePostContentHandler(postRepo, postIndexRepo),
			UpdatePostContentOrder:           command.NewUpdatePostContentOrderHandler(postRepo, postIndexRepo),
			UpdatePostContentIsSupporterOnly: command.NewUpdatePostContentIsSupporterOnlyHandler(postRepo, postIndexRepo),

			UpdatePostCategories: command.NewUpdatePostCategoriesHandler(postRepo, postIndexRepo),
			UpdatePostCharacters: command.NewUpdatePostCharactersHandler(postRepo, postIndexRepo),
			UpdatePostAudience:   command.NewUpdatePostAudienceHandler(postRepo, postIndexRepo),

			LikePost:     command.NewLikePostHandler(postRepo, eventRepo),
			UndoLikePost: command.NewUndoLikePostHandler(postRepo, eventRepo),

			UpdateCurationProfileAudience:    command.NewUpdateCurationProfileAudience(personalizationRepo),
			UpdateCurationProfileCategory:    command.NewUpdateCurationProfileCategoryHandler(personalizationRepo),
			UpdateCurationProfileDateOfBirth: command.NewUpdateCurationProfileDateOfBirthHandler(personalizationRepo),

			CreateAudience:           command.NewCreateAudienceHandler(postRepo, postIndexRepo),
			UpdateAudienceTitle:      command.NewUpdateAudienceTitleHandler(postRepo, postIndexRepo),
			UpdateAudienceThumbnail:  command.NewUpdateAudienceThumbnailHandler(postRepo, postIndexRepo, loader),
			UpdateAudienceIsStandard: command.NewUpdateAudienceIsStandardHandler(postRepo, postIndexRepo),

			CreateCategory:          command.NewCreateCategoryHandler(postRepo, postIndexRepo),
			UpdateCategoryThumbnail: command.NewUpdateCategoryThumbnailHandler(postRepo, postIndexRepo, loader),
			UpdateCategoryTitle:     command.NewUpdateCategoryTitleHandler(postRepo, postIndexRepo),

			CreateCharacter:          command.NewCreateCharacterHandler(postRepo, postIndexRepo),
			UpdateCharacterName:      command.NewUpdateCharacterNameHandler(postRepo, postIndexRepo),
			UpdateCharacterThumbnail: command.NewUpdateCharacterThumbnailHandler(postRepo, postIndexRepo, loader),

			CreateSeries:          command.NewCreateSeriesHandler(postRepo, postIndexRepo),
			UpdateSeriesTitle:     command.NewUpdateSeriesTitleHandler(postRepo, postIndexRepo),
			UpdateSeriesThumbnail: command.NewUpdateSeriesThumbnailHandler(postRepo, postIndexRepo, loader),
		},
		Queries: app.Queries{
			PrincipalById:    query.NewPrincipalByIdHandler(eva),
			SearchCharacters: query.NewSearchCharactersHandler(postIndexRepo),
			CharacterBySlug:  query.NewCharacterBySlugHandler(postRepo),
			CharactersByIds:  query.NewCharactersByIdsHandler(postRepo),

			SearchCategories: query.NewSearchCategoriesHandler(postIndexRepo),
			CategoryBySlug:   query.NewCategoryBySlugHandler(postRepo),
			CategoriesByIds:  query.NewCategoriesByIdsHandler(postRepo),

			SearchPosts:      query.NewSearchPostsHandler(postRepo, postIndexRepo),
			PostById:         query.NewPostByIdHandler(postRepo),
			PostByIdOperator: query.NewPostByIdOperatorHandler(postRepo),
			PostsByIds:       query.NewPostsByIdsHandler(postRepo),

			SearchAudience: query.NewSearchAudienceHandler(postIndexRepo),
			AudienceBySlug: query.NewAudienceBySlugHandler(postRepo),
			AudiencesByIds: query.NewAudiencesByIdsHandler(postRepo),

			SearchSeries: query.NewSearchSeriesHandler(postIndexRepo),
			SeriesBySlug: query.NewSeriesBySlugHandler(postRepo),
			SeriesByIds:  query.NewSeriesByIdsHandler(postRepo),

			CurationProfileByAccountId: query.NewPersonalizationProfileByAccountIdHandler(personalizationRepo),

			PostsFeed:             query.NewPostsFeedHandler(personalizationRepo, postRepo, postIndexRepo),
			SuggestedPostsForPost: query.NewSuggestedPostsForPostHandler(postRepo, postIndexRepo),
			ClubMembersPostsFeed:  query.NewClubMembersPostsFeedHandler(postIndexRepo),

			PostLikeById: query.NewPostLikeByIdHandler(postRepo),
		},
		Activities: activities.NewActivitiesHandler(postRepo, postIndexRepo, parley, loader),
	}
}
