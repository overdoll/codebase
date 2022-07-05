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
	"overdoll/libraries/resource"
	"overdoll/libraries/testing_tools/mocks"
)

func NewApplication(ctx context.Context) (*app.Application, func()) {
	bootstrap.NewBootstrap()
	evaClient, cleanup := clients.NewEvaClient(ctx, os.Getenv("EVA_SERVICE"))
	parleyClient, cleanup2 := clients.NewParleyClient(ctx, os.Getenv("PARLEY_SERVICE"))
	carrierClient, cleanup3 := clients.NewCarrierClient(ctx, os.Getenv("CARRIER_SERVICE"))
	loaderClient, cleanup4 := clients.NewLoaderClient(ctx, os.Getenv("LOADER_SERVICE"))

	serializer := resource.NewSerializer()

	return createApplication(ctx,
			adapters.NewEvaGrpc(evaClient),
			adapters.NewParleyGrpc(parleyClient),
			adapters.NewCarrierGrpc(carrierClient),
			adapters.NewLoaderGrpc(loaderClient, serializer),
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
	LoaderClient   *mocks.MockLoaderClient
	CarrierClient  *mocks.MockCarrierClient
}

func NewComponentTestApplication(ctx context.Context) *ComponentTestApplication {
	bootstrap.NewBootstrap()

	evaClient := &mocks.MockEvaClient{}
	parleyClient := &mocks.MockParleyClient{}
	loaderClient := &mocks.MockLoaderClient{}
	carrierClient := &mocks.MockCarrierClient{}
	temporalClient := &temporalmocks.Client{}

	serializer := resource.NewSerializer()

	return &ComponentTestApplication{
		App: createApplication(
			ctx,
			adapters.NewEvaGrpc(evaClient),
			adapters.NewParleyGrpc(parleyClient),
			adapters.NewCarrierGrpc(carrierClient),
			adapters.NewLoaderGrpc(loaderClient, serializer),
			temporalClient,
		),
		TemporalClient: temporalClient,
		EvaClient:      evaClient,
		ParleyClient:   parleyClient,
		LoaderClient:   loaderClient,
		CarrierClient:  carrierClient,
	}
}

func createApplication(ctx context.Context, eva command.EvaService, parley activities.ParleyService, carrier activities.CarrierService, loader command.LoaderService, client client.Client) *app.Application {

	session := bootstrap.InitializeDatabaseSession()
	esClient := bootstrap.InitializeElasticSearchSession()
	eventRepo := adapters.NewEventTemporalRepository(client)

	cache := bootstrap.InitializeRedisSession()
	resourceSerializer := resource.NewSerializer()

	clubRepo := adapters.NewClubCassandraElasticsearchRepository(session, esClient, cache, resourceSerializer)

	postRepo := adapters.NewPostsCassandraRepository(session, esClient, resourceSerializer)
	personalizationRepo := adapters.NewCurationProfileCassandraRepository(session)

	return &app.Application{
		Commands: app.Commands{
			UpdateResources:    command.NewUpdateResourcesHandler(postRepo, clubRepo, eventRepo),
			CreatePost:         command.NewCreatePostHandler(postRepo, clubRepo),
			PublishPost:        command.NewPublishPostHandler(postRepo, eventRepo),
			DiscardPost:        command.NewDiscardPostHandler(postRepo, eventRepo),
			RejectPost:         command.NewRejectPostHandler(postRepo),
			SubmitPost:         command.NewSubmitPostHandler(postRepo, clubRepo, eventRepo),
			RemovePost:         command.NewRemovePostHandler(postRepo, eventRepo),
			DeletePost:         command.NewDeletePostHandler(postRepo, eventRepo),
			ArchivePost:        command.NewArchivePostHandler(postRepo, eventRepo),
			UnArchivePost:      command.NewUnArchivePostHandler(postRepo, eventRepo),
			GenerateClubBanner: command.NewGenerateClubBannerHandler(postRepo, eventRepo),

			DisableClubSupporterOnlyPosts: command.NewDisableClubSupporterOnlyPostsHandler(clubRepo),
			EnableClubSupporterOnlyPosts:  command.NewEnableClubSupporterOnlyPostsHandler(clubRepo),

			AddPostContent:                   command.NewAddPostContentHandler(postRepo, loader),
			RemovePostContent:                command.NewRemovePostContentHandler(postRepo, loader),
			UpdatePostContentOrder:           command.NewUpdatePostContentOrderHandler(postRepo),
			UpdatePostContentIsSupporterOnly: command.NewUpdatePostContentIsSupporterOnlyHandler(postRepo, clubRepo),

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
			UpdateAudienceBanner:     command.NewUpdateAudienceBannerHandler(postRepo, loader),

			CreateCategory:                 command.NewCreateCategoryHandler(postRepo),
			UpdateCategoryTopic:            command.NewUpdateCategoryTopicHandler(postRepo),
			AddCategoryAlternativeTitle:    command.NewAddCategoryAlternativeTitleHandler(postRepo),
			RemoveCategoryAlternativeTitle: command.NewRemoveCategoryAlternativeTitleHandler(postRepo),
			UpdateCategoryThumbnail:        command.NewUpdateCategoryThumbnailHandler(postRepo, loader),
			UpdateCategoryTitle:            command.NewUpdateCategoryTitleHandler(postRepo),
			GenerateCategoryBanner:         command.NewGenerateCategoryBannerHandler(postRepo, eventRepo),

			CreateCharacter:          command.NewCreateCharacterHandler(postRepo),
			UpdateCharacterName:      command.NewUpdateCharacterNameHandler(postRepo),
			UpdateCharacterThumbnail: command.NewUpdateCharacterThumbnailHandler(postRepo, loader),
			GenerateCharacterBanner:  command.NewGenerateCharacterBannerHandler(postRepo, eventRepo),

			CreateSeries:          command.NewCreateSeriesHandler(postRepo),
			UpdateSeriesTitle:     command.NewUpdateSeriesTitleHandler(postRepo),
			UpdateSeriesThumbnail: command.NewUpdateSeriesThumbnailHandler(postRepo, loader),
			GenerateSeriesBanner:  command.NewGenerateSeriesBannerHandler(postRepo, eventRepo),

			CreateTopic:            command.NewCreateTopicHandler(postRepo),
			UpdateTopicTitle:       command.NewUpdateTopicTitleHandler(postRepo),
			UpdateTopicWeight:      command.NewUpdateTopicWeightHandler(postRepo),
			UpdateTopicDescription: command.NewUpdateTopicDescriptionHandler(postRepo),
			UpdateTopicBanner:      command.NewUpdateTopicBannerHandler(postRepo, loader),

			CreateClub:                    command.NewCreateClubHandler(clubRepo, eventRepo),
			AddClubSlugAlias:              command.NewAddClubSlugAliasHandler(clubRepo),
			RemoveClubSlugAlias:           command.NewRemoveClubSlugAliasHandler(clubRepo),
			UpdateClubName:                command.NewUpdateClubNameHandler(clubRepo),
			PromoteClubSlugAliasToDefault: command.NewPromoteClubSlugAliasToDefaultHandler(clubRepo),
			JoinClub:                      command.NewJoinClubHandler(clubRepo, eventRepo),
			LeaveClub:                     command.NewLeaveClubHandler(clubRepo, eventRepo),
			UpdateClubThumbnail:           command.NewUpdateClubThumbnailHandler(clubRepo, loader),
			SuspendClubOperator:           command.NewSuspendClubOperatorHandler(clubRepo, eventRepo),
			SuspendClub:                   command.NewSuspendClubHandler(clubRepo, eventRepo),
			UnSuspendClub:                 command.NewUnSuspendClubHandler(clubRepo, eventRepo),
			AddClubSupporter:              command.NewAddClubSupporterHandler(eventRepo),
			RemoveClubSupporter:           command.NewRemoveClubSupporterHandler(eventRepo),
			DeleteAccountData:             command.NewDeleteAccountDataHandler(eventRepo),

			TerminateClub:   command.NewTerminateClubHandler(clubRepo, eventRepo),
			UnTerminateClub: command.NewUnTerminateClubHandler(clubRepo, eventRepo),
		},
		Queries: app.Queries{
			DiscoverClubs: query.NewDiscoverClubsHandler(clubRepo),
			Search:        query.NewSearchHandler(postRepo),

			PrincipalById:    query.NewPrincipalByIdHandler(eva, clubRepo),
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

			TopicBySlug:  query.NewTopicBySlugHandler(postRepo),
			SearchTopics: query.NewSearchTopicsHandler(postRepo),
			TopicsByIds:  query.NewTopicsByIdsHandler(postRepo),

			PostLikeById: query.NewPostLikeByIdHandler(postRepo),

			ClubsByIds:                  query.NewClubsByIdsHandler(clubRepo),
			SearchClubs:                 query.NewSearchClubsHandler(clubRepo),
			AccountClubDigest:           query.NewAccountClubDigestHandler(clubRepo),
			ClubBySlug:                  query.NewClubBySlugHandler(clubRepo),
			ClubById:                    query.NewClubByIdHandler(clubRepo),
			AccountClubsCount:           query.NewAccountClubsCountHandler(clubRepo),
			AccountClubsLimit:           query.NewAccountClubsLimitHandler(clubRepo),
			ClubSlugAliasesLimit:        query.NewClubSlugAliasesLimitHandler(clubRepo),
			AccountClubMembershipsLimit: query.NewAccountClubMembershipsLimitHandler(clubRepo),
			AccountClubMembershipsCount: query.NewAccountClubMembershipsCountHandler(clubRepo),
			ClubMemberById:              query.NewClubMemberByIdHandler(clubRepo),
			SearchClubMemberships:       query.NewSearchClubMembershipsHandler(clubRepo),
			ClubSuspensionLogs:          query.NewClubSuspensionLogsHandler(clubRepo),
			CanDeleteAccountData:        query.NewCanDeleteAccountDataHandler(clubRepo),
			HasNonTerminatedClubs:       query.NewHasNonTerminatedClubsHandler(clubRepo),
			ClubSupporterMembersCount:   query.NewClubSupporterMembersCountHandler(clubRepo),
		},
		Activities: activities.NewActivitiesHandler(postRepo, clubRepo, personalizationRepo, parley, loader, carrier),
	}
}
