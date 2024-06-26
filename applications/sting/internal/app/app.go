package app

import (
	"overdoll/applications/sting/internal/app/command"
	"overdoll/applications/sting/internal/app/query"
	"overdoll/applications/sting/internal/app/workflows/activities"
)

type Application struct {
	Commands   Commands
	Queries    Queries
	Activities *activities.Activities
}

type Commands struct {
	CreatePost    command.CreatePostHandler
	DiscardPost   command.DiscardPostHandler
	PublishPost   command.PublishPostHandler
	RejectPost    command.RejectPostHandler
	SubmitPost    command.SubmitPostHandler
	RemovePost    command.RemovePostHandler
	DeletePost    command.DeletePostHandler
	ArchivePost   command.ArchivePostHandler
	UnArchivePost command.UnArchivePostHandler

	SyncPosts         command.SyncPostsHandler
	BackFillPostViews command.BackFillPostViewsHandler

	NewCreatorLead command.NewCreatorLeadHandler

	IndexPost command.IndexPostHandler
	IndexClub command.IndexClubHandler

	TransferClubOwnership command.TransferClubOwnershipHandler

	GenerateSitemap command.GenerateSitemapHandler

	RemovePostContent                command.RemovePostContentHandler
	AddPostContent                   command.AddPostContentHandler
	UpdatePostContentOrder           command.UpdatePostContentOrderHandler
	UpdatePostContentIsSupporterOnly command.UpdatePostContentIsSupporterOnlyHandler

	UpdatePostDescription command.UpdatePostDescriptionHandler
	UpdatePostCategories  command.UpdatePostCategoriesHandler
	UpdatePostCharacters  command.UpdatePostCharactersHandler
	UpdatePostAudience    command.UpdatePostAudienceHandler

	UpdateTotalPostsForPostTags command.UpdateTotalPostsForPostTagsHandler
	UpdateTotalLikesForPostTags command.UpdateTotalLikesForPostTagsHandler

	LikePost     command.LikePostHandler
	UndoLikePost command.UndoLikePostHandler

	UpdateCurationProfileAudience    command.UpdateCurationProfileAudienceHandler
	UpdateCurationProfileCategory    command.UpdateCurationProfileCategoryHandler
	UpdateCurationProfileDateOfBirth command.UpdateCurationProfileDateOfBirthHandler

	CreateAudience           command.CreateAudienceHandler
	UpdateAudienceSlug       command.UpdateAudienceSlugHandler
	UpdateAudienceTitle      command.UpdateAudienceTitleHandler
	UpdateAudienceIsStandard command.UpdateAudienceIsStandardHandler
	UpdateAudienceBanner     command.UpdateAudienceBannerHandler

	CreateCategory                 command.CreateCategoryHandler
	UpdateCategorySlug             command.UpdateCategorySlugHandler
	UpdateCategoryTitle            command.UpdateCategoryTitleHandler
	UpdateCategoryTopic            command.UpdateCategoryTopicHandler
	GenerateCategoryBanner         command.GenerateCategoryBannerHandler
	AddCategoryAlternativeTitle    command.AddCategoryAlternativeTitleHandler
	RemoveCategoryAlternativeTitle command.RemoveCategoryAlternativeTitleHandler

	CreateCharacter         command.CreateCharacterHandler
	UpdateCharacterSlug     command.UpdateCharacterSlugHandler
	UpdateCharacterName     command.UpdateCharacterNameHandler
	GenerateCharacterBanner command.GenerateCharacterBannerHandler

	CreateSeries         command.CreateSeriesHandler
	UpdateSeriesSlug     command.UpdateSeriesSlugHandler
	UpdateSeriesTitle    command.UpdateSeriesTitleHandler
	GenerateSeriesBanner command.GenerateSeriesBannerHandler

	CreateTopic            command.CreateTopicHandler
	UpdateTopicSlug        command.UpdateTopicSlugHandler
	UpdateTopicTitle       command.UpdateTopicTitleHandler
	UpdateTopicDescription command.UpdateTopicDescriptionHandler
	UpdateTopicWeight      command.UpdateTopicWeightHandler
	UpdateTopicBanner      command.UpdateTopicBannerHandler

	DeleteAccountData command.DeleteAccountDataHandler

	UpdateMedia command.UpdateMediaHandler

	DisableClubSupporterOnlyPosts command.DisableClubSupporterOnlyPostsHandler
	EnableClubSupporterOnlyPosts  command.EnableClubSupporterOnlyPostsHandler

	CreateClub                    command.CreateClubHandler
	UpdateClubName                command.UpdateClubNameHandler
	UpdateClubBlurb               command.UpdateClubBlurbHandler
	UpdateClubThumbnail           command.UpdateClubThumbnailHandler
	UpdateClubHeader              command.UpdateClubHeaderHandler
	RemoveClubSlugAlias           command.RemoveClubSlugAliasHandler
	AddClubSlugAlias              command.AddClubSlugAliasHandler
	PromoteClubSlugAliasToDefault command.PromoteClubSlugAliasToDefaultHandler
	JoinClub                      command.JoinClubHandler
	LeaveClub                     command.LeaveClubHandler
	GenerateClubBanner            command.GenerateClubBannerHandler
	UpdateClubCharactersLimit     command.UpdateClubCharactersLimitHandler
	EnableClubCharacters          command.EnableClubCharactersHandler
	DisableClubCharacters         command.DisableClubCharactersHandler

	AddClubSupporter    command.AddClubSupporterHandler
	RemoveClubSupporter command.RemoveClubSupporterHandler

	SuspendClub   command.SuspendClubHandler
	UnSuspendClub command.UnSuspendClubHandler

	TerminateClub   command.TerminateClubHandler
	UnTerminateClub command.UnTerminateClubHandler

	SuspendClubOperator command.SuspendClubOperatorHandler

	CreateGameSession command.CreateGameSessionHandler
	SpinRoulette      command.SpinRouletteHandler

	MigrateCategoryResources   command.MigrateCategoriesResourcesHandler
	MigrateCharactersResources command.MigrateCharactersResourcesHandler
	MigrateSeriesResources     command.MigrateSeriesResourcesHandler
	MigratePostsResources      command.MigratePostsResourcesHandler

	RemoveCategory      command.RemoveCategoryHandler
	RemoveCharacter     command.RemoveCharacterHandler
	ReprocessPostsMedia command.ReprocessPostsMediaHandler

	ObservePosts command.ObservePostsHandler

	UpdatePostCharacterRequests command.UpdatePostCharacterRequestsHandler
}

type Queries struct {
	CuratedPostsFeedData  query.CuratedPostsFeedDataHandler
	CuratedPostsFeedPosts query.CuratedPostsFeedPostsHandler

	PrincipalById query.PrincipalByIdHandler

	SearchPosts query.SearchPostsHandler
	PostById    query.PostByIdHandler
	PostsByIds  query.PostsByIdsHandler

	AccountLikedPosts query.AccountLikedPostsHandler

	ClubCharactersCount query.ClubCharactersCountHandler

	PostByIdOperator query.PostByIdOperatorHandler

	SearchCharacters query.SearchCharactersHandler
	CharacterBySlug  query.CharacterBySlugHandler
	CharactersByIds  query.CharactersByIdsHandler

	SearchCategories query.SearchCategoriesHandler
	CategoryBySlug   query.CategoryBySlugHandler
	CategoriesByIds  query.CategoriesByIdsHandler

	SearchSeries query.SearchSeriesHandler
	SeriesBySlug query.SeriesBySlugHandler
	SeriesByIds  query.SeriesByIdsHandler

	SearchAudience query.SearchAudienceHandler
	AudienceBySlug query.AudienceBySlugHandler
	AudiencesByIds query.AudiencesByIdsHandler

	SearchTopics query.SearchTopicsHandler
	TopicBySlug  query.TopicBySlugHandler
	TopicsByIds  query.TopicsByIdsHandler

	PostLikeById query.PostLikeByIdHandler

	CurationProfileByAccountId query.CurationProfileByAccountIdHandler

	PostsFeed             query.PostsFeedHandler
	SuggestedPostsForPost query.SuggestedPostsForPostHandler
	ClubMembersPostsFeed  query.ClubMembersPostsFeedHandler

	DiscoverClubs query.DiscoverClubsHandler
	Search        query.SearchHandler

	SearchClubs                 query.SearchClubsHandler
	ClubBySlug                  query.ClubBySlugHandler
	ClubById                    query.ClubByIdHandler
	ClubsByIds                  query.ClubsByIdsHandler
	AccountClubMembershipsLimit query.AccountClubMembershipsLimitHandler
	AccountClubMembershipsCount query.AccountClubMembershipsCountHandler

	AccountClubDigest query.AccountClubDigestHandler

	AccountClubsCount query.AccountClubsCountHandler
	AccountClubsLimit query.AccountClubsLimitHandler

	ClubMemberById query.ClubMemberByIdHandler

	SearchClubMemberships query.SearchClubMembershipsHandler

	ClubSuspensionLogs   query.ClubSuspensionLogsHandler
	CanDeleteAccountData query.CanDeleteAccountDataHandler

	HasNonTerminatedClubs query.HasNonTerminatedClubsHandler

	ClubSupporterMembersCount query.ClubSupporterMembersCountHandler

	GameSessionStatus query.GameSessionStatusHandler

	AccountStats query.AccountStatsHandler

	HasClubSupporterSubscription query.HasClubSupporterSubscriptionHandler

	Tags          query.TagsHandler
	ClubPostsView query.ClubPostsViewHandler

	EcchiSearch query.EcchiSearchHandler
}
