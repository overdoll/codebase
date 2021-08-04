package app

import (
	"overdoll/applications/sting/internal/app/activities"
	"overdoll/applications/sting/internal/app/command"
	"overdoll/applications/sting/internal/app/query"
)

type Application struct {
	Commands   Commands
	Queries    Queries
	Activities *activities.Activities
}

type Commands struct {
	NewPost     command.NewPostHandler
	DiscardPost command.DiscardPostHandler
	PublishPost command.PublishPostHandler
	UndoPost    command.UndoPostHandler
	RejectPost  command.RejectPostHandler
	SubmitPost  command.SubmitPostHandler

	IndexAllCategories command.IndexAllCategoriesHandler
	IndexAllCharacters command.IndexAllCharactersHandler
	IndexAllMedia      command.IndexAllSeriesHandler
	IndexAllPosts      command.IndexAllPostsHandler
}

type Queries struct {
	PrincipalById    query.PrincipalByIdHandler
	SearchCategories query.SearchCategoriesHandler
	SearchCharacters query.SearchCharactersHandler
	SearchMedias     query.SearchMediasHandler
	SearchPosts      query.SearchPostsHandler
	PostById         query.PostByIdHandler
	CharacterById    query.CharacterByIdHandler
	CategoryById     query.CategoryByIdHandler
	MediaById        query.MediaByIdHandler
	ArtistById       query.ArtistByIdHandler
}
