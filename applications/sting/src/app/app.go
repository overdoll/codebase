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

	IndexAllArtists      command.IndexAllArtistsHandler
	IndexAllCategories   command.IndexAllCategoriesHandler
	IndexAllCharacters   command.IndexAllCharactersHandler
	IndexAllMedia        command.IndexAllMediaHandler
	IndexAllPendingPosts command.IndexAllPendingPostsHandler

	CreatePost          command.CreatePostHandler
	NewPendingPost      command.NewPostHandler
	PostCustomResources command.PostCustomResourcesHandler
	PublishPost         command.PublishPostHandler
	DiscardPost         command.DiscardPostHandler
	UndoPost            command.UndoPostHandler
	ReassignModerator   command.ReassignModeratorHandler
}

type Queries struct {
	SearchArtist                query.SearchArtistsHandler
	SearchCategories            query.SearchCategoriesHandler
	SearchCharacters            query.SearchCharactersHandler
	SearchMedias                query.SearchMediasHandler
	GetPendingPosts             query.GetPendingPostsHandler
	GetPendingPost              query.GetPendingPostHandler
	GetPendingPostAuthenticated query.GetPendingPostAuthenticatedHandler
}
