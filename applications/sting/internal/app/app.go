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

	AddTerminatedClub    command.AddTerminatedClubHandler
	RemoveTerminatedClub command.RemoveTerminatedClubHandler

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

	CreateCategory          command.CreateCategoryHandler
	UpdateCategoryTitle     command.UpdateCategoryTitleHandler
	UpdateCategoryThumbnail command.UpdateCategoryThumbnailHandler

	CreateCharacter          command.CreateCharacterHandler
	UpdateCharacterName      command.UpdateCharacterNameHandler
	UpdateCharacterThumbnail command.UpdateCharacterThumbnailHandler

	CreateSeries          command.CreateSeriesHandler
	UpdateSeriesTitle     command.UpdateSeriesTitleHandler
	UpdateSeriesThumbnail command.UpdateSeriesThumbnailHandler

	DeleteAccountData command.DeleteAccountDataHandler
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
}
