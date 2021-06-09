package app

import (
	"overdoll/applications/sting/src/app/command"
	"overdoll/applications/sting/src/app/query"
)

type Application struct {
	Commands Commands
	Queries  Queries
}

type Commands struct {
	CreatePendingPost command.CreatePendingPostHandler
	UpdatePendingPost command.UpdatePendingPostHandler

	StartDiscardPost command.StartDiscardPostHandler
	StartPublishPost command.StartPublishPostHandler
	StartUndoPost    command.StartUndoPostHandler
	RejectPost       command.RejectPostHandler

	IndexAllArtists    command.IndexAllArtistsHandler
	IndexAllCategories command.IndexAllCategoriesHandler
	IndexAllCharacters command.IndexAllCharactersHandler
	IndexAllMedia      command.IndexAllMediaHandler

	// Activities - used by temporal
	CreatePost          command.CreatePostActivityHandler
	NewPendingPost      command.NewPostActivityHandler
	PostCustomResources command.PostCustomResourcesActivityHandler
	PublishPost         command.PublishPostActivityHandler
	DiscardPost         command.DiscardPostActivityHandler
	UndoPost            command.UndoPostActivityHandler
	ReassignModerator   command.ReassignModeratorActivityHandler
}

type Queries struct {
	SearchArtist     query.SearchArtistsHandler
	SearchCategories query.SearchCategoriesHandler
	SearchCharacters query.SearchCharactersHandler
	SearchMedias     query.SearchMediasHandler
	GetPendingPosts  query.GetPendingPostsHandler
}
