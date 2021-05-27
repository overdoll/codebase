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
	CreatePendingPost  command.CreatePendingPostHandler
	ReviewPendingPost  command.ReviewPostHandler
	IndexAllArtists    command.IndexAllArtistsHandler
	IndexAllCategories command.IndexAllCategoriesHandler
	IndexAllCharacters command.IndexAllCharactersHandler
	IndexAllMedia      command.IndexAllMediaHandler

	// Activities - used by temporal
	CreatePost          command.CreatePostActivityHandler
	NewPendingPost      command.NewPostActivityHandler
	PostCompleted       command.PublishPostActivityHandler
	PostCustomResources command.PostCustomResourcesActivityHandler
	ReviewPost          command.ReviewPostActivityHandler
}

type Queries struct {
	SearchArtist     query.SearchArtistsHandler
	SearchCategories query.SearchCategoriesHandler
	SearchCharacters query.SearchCharactersHandler
	SearchMedias     query.SearchMediasHandler
}
