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
	CreatePost  command.CreatePostHandler
	DiscardPost command.DiscardPostHandler
	PublishPost command.PublishPostHandler
	RejectPost  command.RejectPostHandler
	SubmitPost  command.SubmitPostHandler
	RemovePost  command.RemovePostHandler

	UpdatePostContent    command.UpdatePostContentHandler
	UpdatePostCategories command.UpdatePostCategoriesHandler
	UpdatePostCharacters command.UpdatePostCharactersHandler
	UpdatePostAudience   command.UpdatePostAudienceHandler

	IndexAllCategories command.IndexAllCategoriesHandler
	IndexAllCharacters command.IndexAllCharactersHandler
	IndexAllSeries     command.IndexAllSeriesHandler
	IndexAllAudience   command.IndexAllAudienceHandler
	IndexAllPosts      command.IndexAllPostsHandler

	LikePost     command.LikePostHandler
	UndoLikePost command.UndoLikePostHandler
}

type Queries struct {
	PrincipalById query.PrincipalByIdHandler

	SearchPosts      query.SearchPostsHandler
	PostById         query.PostByIdHandler
	PostByIdOperator query.PostByIdOperatorHandler

	SearchCharacters query.SearchCharactersHandler
	CharacterBySlug  query.CharacterBySlugHandler
	CharacterById    query.CharacterByIdHandler

	SearchCategories query.SearchCategoriesHandler
	CategoryBySlug   query.CategoryBySlugHandler
	CategoryById     query.CategoryByIdHandler

	SearchSeries query.SearchSeriesHandler
	SeriesBySlug query.SeriesBySlugHandler
	SeriesById   query.SeriesByIdHandler

	SearchAudience query.SearchAudienceHandler
	AudienceBySlug query.AudienceBySlugHandler
	AudienceById   query.AudienceByIdHandler

	PostLikeById query.PostLikeByIdHandler
}
