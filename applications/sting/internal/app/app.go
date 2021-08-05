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
	UndoPost    command.UndoPostHandler
	RejectPost  command.RejectPostHandler
	SubmitPost  command.SubmitPostHandler

	HandleUpload command.HandleUploadHandler

	UpdatePostContent    command.UpdatePostContentHandler
	UpdatePostCategories command.UpdatePostCategoriesHandler
	UpdatePostCharacters command.UpdatePostCharactersHandler
	UpdatePostBrand      command.UpdatePostBrandHandler
	UpdatePostAudience   command.UpdatePostAudienceHandler

	IndexAllCategories command.IndexAllCategoriesHandler
	IndexAllCharacters command.IndexAllCharactersHandler
	IndexAllSeries     command.IndexAllSeriesHandler
	IndexAllAudience   command.IndexAllAudienceHandler
	IndexAllBrands     command.IndexAllBrandsHandler
	IndexAllPosts      command.IndexAllPostsHandler
}

type Queries struct {
	PrincipalById query.PrincipalByIdHandler
	PostById      query.PostByIdHandler
	CharacterById query.CharacterByIdHandler
	CategoryById  query.CategoryByIdHandler
	SeriesById    query.SeriesByIdHandler
	AudienceById  query.AudienceByIdHandler
	BrandById     query.BrandByIdHandler

	SearchCategories query.SearchCategoriesHandler
	SearchCharacters query.SearchCharactersHandler
	SearchSeries     query.SearchSeriesHandler
	SearchPosts      query.SearchPostsHandler
	SearchBrands     query.SearchBrandsHandler
	SearchAudience   query.SearchAudienceHandler
}
