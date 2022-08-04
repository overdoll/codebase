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

	GenerateSitemap command.GenerateSitemapHandler

	RemovePostContent                command.RemovePostContentHandler
	AddPostContent                   command.AddPostContentHandler
	UpdatePostContentOrder           command.UpdatePostContentOrderHandler
	UpdatePostContentIsSupporterOnly command.UpdatePostContentIsSupporterOnlyHandler

	UpdatePostDescription command.UpdatePostDescriptionHandler
	UpdatePostCategories  command.UpdatePostCategoriesHandler
	UpdatePostCharacters  command.UpdatePostCharactersHandler
	UpdatePostAudience    command.UpdatePostAudienceHandler

	LikePost     command.LikePostHandler
	UndoLikePost command.UndoLikePostHandler

	UpdateCurationProfileAudience    command.UpdateCurationProfileAudienceHandler
	UpdateCurationProfileCategory    command.UpdateCurationProfileCategoryHandler
	UpdateCurationProfileDateOfBirth command.UpdateCurationProfileDateOfBirthHandler

	CreateAudience           command.CreateAudienceHandler
	UpdateAudienceTitle      command.UpdateAudienceTitleHandler
	UpdateAudienceThumbnail  command.UpdateAudienceThumbnailHandler
	UpdateAudienceIsStandard command.UpdateAudienceIsStandardHandler
	UpdateAudienceBanner     command.UpdateAudienceBannerHandler

	CreateCategory                 command.CreateCategoryHandler
	UpdateCategoryTitle            command.UpdateCategoryTitleHandler
	UpdateCategoryTopic            command.UpdateCategoryTopicHandler
	UpdateCategoryThumbnail        command.UpdateCategoryThumbnailHandler
	GenerateCategoryBanner         command.GenerateCategoryBannerHandler
	AddCategoryAlternativeTitle    command.AddCategoryAlternativeTitleHandler
	RemoveCategoryAlternativeTitle command.RemoveCategoryAlternativeTitleHandler

	CreateCharacter          command.CreateCharacterHandler
	UpdateCharacterName      command.UpdateCharacterNameHandler
	UpdateCharacterThumbnail command.UpdateCharacterThumbnailHandler
	GenerateCharacterBanner  command.GenerateCharacterBannerHandler

	CreateSeries          command.CreateSeriesHandler
	UpdateSeriesTitle     command.UpdateSeriesTitleHandler
	UpdateSeriesThumbnail command.UpdateSeriesThumbnailHandler
	GenerateSeriesBanner  command.GenerateSeriesBannerHandler

	CreateTopic            command.CreateTopicHandler
	UpdateTopicTitle       command.UpdateTopicTitleHandler
	UpdateTopicDescription command.UpdateTopicDescriptionHandler
	UpdateTopicWeight      command.UpdateTopicWeightHandler
	UpdateTopicBanner      command.UpdateTopicBannerHandler

	DeleteAccountData command.DeleteAccountDataHandler

	UpdateResources command.UpdateResourcesHandler

	DisableClubSupporterOnlyPosts command.DisableClubSupporterOnlyPostsHandler
	EnableClubSupporterOnlyPosts  command.EnableClubSupporterOnlyPostsHandler

	CreateClub                    command.CreateClubHandler
	UpdateClubName                command.UpdateClubNameHandler
	UpdateClubThumbnail           command.UpdateClubThumbnailHandler
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
}

type Queries struct {
	PrincipalById query.PrincipalByIdHandler

	SearchPosts query.SearchPostsHandler
	PostById    query.PostByIdHandler
	PostsByIds  query.PostsByIdsHandler

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
	ClubSlugAliasesLimit        query.ClubSlugAliasesLimitHandler
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

	PostsGame query.PostsGameHandler
}
