package app

import (
	"overdoll/applications/sting/internal/app/command"
	"overdoll/applications/sting/internal/app/query"
)

type Application struct {
	Commands Commands
	Queries  Queries
}

type Commands struct {
	CreatePost command.CreatePendingPostHandler

	StartDiscardPost command.StartDiscardPostHandler
	StartPublishPost command.StartPublishPostHandler
	StartUndoPost    command.StartUndoPostHandler
	RejectPost       command.RejectPostHandler

	IndexAllCategories command.IndexAllCategoriesHandler
	IndexAllCharacters command.IndexAllCharactersHandler
	IndexAllMedia      command.IndexAllMediaHandler
	IndexAllPosts      command.IndexAllPostsHandler

	NewPost             command.NewPostHandler
	PostCustomResources command.PostCustomResourcesHandler
	PublishPost         command.PublishPostHandler
	DiscardPost         command.DiscardPostHandler
	UndoPost            command.UndoPostHandler
	ReassignModerator   command.ReassignModeratorHandler
}

type Queries struct {
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
