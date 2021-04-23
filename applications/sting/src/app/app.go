package app

import (
	"overdoll/applications/sting/src/app/command"
)

type Application struct {
	Commands Commands
	Queries  Queries
}

type Commands struct {
	NewPost         command.NewPostHandler
	ReviewPost      command.ReviewPostHandler
	PublishPost     command.PublishPostHandler
	IndexArtists    command.IndexArtistsHandler
	IndexCategories command.IndexCategoriesHandler
	IndexCharacters command.IndexCharactersHandler
	IndexMedia      command.IndexMediaHandler
}

type Queries struct{}
