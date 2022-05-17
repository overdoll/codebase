package service

import (
	"context"
	"go.temporal.io/sdk/client"
	temporalmocks "go.temporal.io/sdk/mocks"
	"os"
	"overdoll/applications/sting/internal/adapters"
	"overdoll/applications/sting/internal/app"
	"overdoll/applications/sting/internal/app/command"
	"overdoll/applications/sting/internal/app/query"
	"overdoll/applications/sting/internal/app/workflows/activities"
	"overdoll/libraries/bootstrap"
	"overdoll/libraries/clients"
	"overdoll/libraries/testing_tools/mocks"
)

func NewApplication(ctx context.Context) (*app.Application, func()) {
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

type ComponentTestApplication struct {
	App            *app.Application
	TemporalClient *temporalmocks.Client
	EvaClient      *mocks.MockEvaClient
	ParleyClient   *mocks.MockParleyClient
	StellaClient   *mocks.MockStellaClient
	LoaderClient   *mocks.MockLoaderClient
}

func NewComponentTestApplication(ctx context.Context) *ComponentTestApplication {
	bootstrap.NewBootstrap(ctx)

	evaClient := &mocks.MockEvaClient{}
	parleyClient := &mocks.MockParleyClient{}
	stellaClient := &mocks.MockStellaClient{}
	loaderClient := &mocks.MockLoaderClient{}
	temporalClient := &temporalmocks.Client{}

	return &ComponentTestApplication{
		App: createApplication(
			ctx,
			adapters.NewEvaGrpc(evaClient),
			adapters.NewParleyGrpc(parleyClient),
			adapters.NewStellaGrpc(stellaClient),
			adapters.NewLoaderGrpc(loaderClient),
			temporalClient,
		),
		TemporalClient: temporalClient,
		EvaClient:      evaClient,
		ParleyClient:   parleyClient,
		StellaClient:   stellaClient,
		LoaderClient:   loaderClient,
	}
}

func createApplication(ctx context.Context, eva command.EvaService, parley activities.ParleyService, stella query.StellaService, loader command.LoaderService, client client.Client) *app.Application {

	session := bootstrap.InitializeDatabaseSession()
	esClient := bootstrap.InitializeElasticSearchSession()
	eventRepo := adapters.NewEventTemporalRepository(client)

	postRepo := adapters.NewPostsCassandraRepository(session, esClient)
	personalizationRepo := adapters.NewCurationProfileCassandraRepository(session)

	return &app.Application{
		Commands: app.Commands{
			CreatePost:    command.NewCreatePostHandler(postRepo, stella),
			PublishPost:   command.NewPublishPostHandler(postRepo, eventRepo),
			DiscardPost:   command.NewDiscardPostHandler(postRepo, eventRepo),
			RejectPost:    command.NewRejectPostHandler(postRepo),
			SubmitPost:    command.NewSubmitPostHandler(postRepo, eventRepo, loader),
			RemovePost:    command.NewRemovePostHandler(postRepo, eventRepo),
			DeletePost:    command.NewDeletePostHandler(postRepo, eventRepo),
			ArchivePost:   command.NewArchivePostHandler(postRepo, eventRepo),
			UnArchivePost: command.NewUnArchivePostHandler(postRepo, eventRepo),

			AddTerminatedClub:    command.NewAddTerminatedClubHandler(postRepo),
			RemoveTerminatedClub: command.NewRemoveTerminatedClubHandler(postRepo),

			AddPostContent:                   command.NewAddPostContentHandler(postRepo, loader),
			RemovePostContent:                command.NewRemovePostContentHandler(postRepo),
			UpdatePostContentOrder:           command.NewUpdatePostContentOrderHandler(postRepo),
			UpdatePostContentIsSupporterOnly: command.NewUpdatePostContentIsSupporterOnlyHandler(postRepo),

			UpdatePostCategories: command.NewUpdatePostCategoriesHandler(postRepo),
			UpdatePostCharacters: command.NewUpdatePostCharactersHandler(postRepo),
			UpdatePostAudience:   command.NewUpdatePostAudienceHandler(postRepo),

			LikePost:     command.NewLikePostHandler(postRepo, eventRepo),
			UndoLikePost: command.NewUndoLikePostHandler(postRepo, eventRepo),

			UpdateCurationProfileAudience:    command.NewUpdateCurationProfileAudience(personalizationRepo),
			UpdateCurationProfileCategory:    command.NewUpdateCurationProfileCategoryHandler(personalizationRepo),
			UpdateCurationProfileDateOfBirth: command.NewUpdateCurationProfileDateOfBirthHandler(personalizationRepo),

			CreateAudience:           command.NewCreateAudienceHandler(postRepo),
			UpdateAudienceTitle:      command.NewUpdateAudienceTitleHandler(postRepo),
			UpdateAudienceThumbnail:  command.NewUpdateAudienceThumbnailHandler(postRepo, loader),
			UpdateAudienceIsStandard: command.NewUpdateAudienceIsStandardHandler(postRepo),

			CreateCategory:          command.NewCreateCategoryHandler(postRepo),
			UpdateCategoryThumbnail: command.NewUpdateCategoryThumbnailHandler(postRepo, loader),
			UpdateCategoryTitle:     command.NewUpdateCategoryTitleHandler(postRepo),

			CreateCharacter:          command.NewCreateCharacterHandler(postRepo),
			UpdateCharacterName:      command.NewUpdateCharacterNameHandler(postRepo),
			UpdateCharacterThumbnail: command.NewUpdateCharacterThumbnailHandler(postRepo, loader),

			CreateSeries:          command.NewCreateSeriesHandler(postRepo),
			UpdateSeriesTitle:     command.NewUpdateSeriesTitleHandler(postRepo),
			UpdateSeriesThumbnail: command.NewUpdateSeriesThumbnailHandler(postRepo, loader),

			DeleteAccountData: command.NewDeleteAccountDataHandler(eventRepo),
		},
		Queries: app.Queries{
			PrincipalById:    query.NewPrincipalByIdHandler(eva, stella),
			SearchCharacters: query.NewSearchCharactersHandler(postRepo),
			CharacterBySlug:  query.NewCharacterBySlugHandler(postRepo),
			CharactersByIds:  query.NewCharactersByIdsHandler(postRepo),

			SearchCategories: query.NewSearchCategoriesHandler(postRepo),
			CategoryBySlug:   query.NewCategoryBySlugHandler(postRepo),
			CategoriesByIds:  query.NewCategoriesByIdsHandler(postRepo),

			SearchPosts:      query.NewSearchPostsHandler(postRepo),
			PostById:         query.NewPostByIdHandler(postRepo),
			PostByIdOperator: query.NewPostByIdOperatorHandler(postRepo),
			PostsByIds:       query.NewPostsByIdsHandler(postRepo),

			SearchAudience: query.NewSearchAudienceHandler(postRepo),
			AudienceBySlug: query.NewAudienceBySlugHandler(postRepo),
			AudiencesByIds: query.NewAudiencesByIdsHandler(postRepo),

			SearchSeries: query.NewSearchSeriesHandler(postRepo),
			SeriesBySlug: query.NewSeriesBySlugHandler(postRepo),
			SeriesByIds:  query.NewSeriesByIdsHandler(postRepo),

			CurationProfileByAccountId: query.NewPersonalizationProfileByAccountIdHandler(personalizationRepo),

			PostsFeed:             query.NewPostsFeedHandler(personalizationRepo, postRepo),
			SuggestedPostsForPost: query.NewSuggestedPostsForPostHandler(postRepo),
			ClubMembersPostsFeed:  query.NewClubMembersPostsFeedHandler(postRepo),

			PostLikeById: query.NewPostLikeByIdHandler(postRepo),
		},
		Activities: activities.NewActivitiesHandler(postRepo, personalizationRepo, stella, parley, loader),
	}
}
