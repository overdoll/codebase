package app

import (
	"overdoll/applications/sting/src/app/command"
)

type Application struct {
	Commands Commands
	Queries  Queries
}

type Commands struct {
	IndexArtists    command.IndexAllArtistsHandler
	IndexCategories command.IndexAllCategoriesHandler
	IndexCharacters command.IndexAllCharactersHandler
	IndexMedia      command.IndexAllMediaHandler
}

type Queries struct{}
