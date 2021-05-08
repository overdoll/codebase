package app

import (
	"overdoll/applications/sting/src/app/activities"
	"overdoll/applications/sting/src/app/command"
	"overdoll/applications/sting/src/app/query"
)

type Application struct {
	Commands   Commands
	Queries    Queries
	Activities Activities
}

type Commands struct {
	CreatePendingPost  command.CreatePendingPostHandler
	ReviewPendingPost  command.ReviewPostHandler
	IndexAllArtists    command.IndexAllArtistsHandler
	IndexAllCategories command.IndexAllCategoriesHandler
	IndexAllCharacters command.IndexAllCharactersHandler
	IndexAllMedia      command.IndexAllMediaHandler
}

type Queries struct {
	SearchArtist     query.SearchArtistsHandler
	SearchCategories query.SearchCategoriesHandler
	SearchCharacters query.SearchCharactersHandler
	SearchMedias     query.SearchMediasHandler
}

type Activities struct {
	CreatePost          activities.CreatePostActivityHandler
	NewPendingPost      activities.NewPostActivityHandler
	PostCompleted       activities.PublishPostActivityHandler
	PostCustomResources activities.PostCustomResourcesActivityHandler
	ReviewPost          activities.ReviewPostActivityHandler
}
