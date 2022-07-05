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

	RemovePostContent                command.RemovePostContentHandler
	AddPostContent                   command.AddPostContentHandler
	UpdatePostContentOrder           command.UpdatePostContentOrderHandler
	UpdatePostContentIsSupporterOnly command.UpdatePostContentIsSupporterOnlyHandler

	UpdatePostCategories command.UpdatePostCategoriesHandler
	UpdatePostCharacters command.UpdatePostCharactersHandler
	UpdatePostAudience   command.UpdatePostAudienceHandler

	LikePost     command.LikePostHandler
	UndoLikePost command.UndoLikePostHandler

	UpdateCurationProfileAudience    command.UpdateCurationProfileAudienceHandler
	UpdateCurationProfileCategory    command.UpdateCurationProfileCategoryHandler
	UpdateCurationProfileDateOfBirth command.UpdateCurationProfileDateOfBirthHandler

	CreateAudience           command.CreateAudienceHandler
	UpdateAudienceTitle      command.UpdateAudienceTitleHandler
	UpdateAudienceThumbnail  command.UpdateAudienceThumbnailHandler
	UpdateAudienceIsStandard command.UpdateAudienceIsStandardHandler
	GenerateAudienceBanner   command.GenerateAudienceBannerHandler

	CreateCategory          command.CreateCategoryHandler
	UpdateCategoryTitle     command.UpdateCategoryTitleHandler
	UpdateCategoryThumbnail command.UpdateCategoryThumbnailHandler
	GenerateCategoryBanner  command.GenerateCategoryBannerHandler

	CreateCharacter          command.CreateCharacterHandler
	UpdateCharacterName      command.UpdateCharacterNameHandler
	UpdateCharacterThumbnail command.UpdateCharacterThumbnailHandler
	GenerateCharacterBanner  command.GenerateCharacterBannerHandler

	CreateSeries          command.CreateSeriesHandler
	UpdateSeriesTitle     command.UpdateSeriesTitleHandler
	UpdateSeriesThumbnail command.UpdateSeriesThumbnailHandler
	GenerateSeriesBanner  command.GenerateSeriesBannerHandler

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
}
