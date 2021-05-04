package app

import (
	"github.com/ThreeDotsLabs/watermill/components/cqrs"
	"overdoll/applications/sting/src/app/query"
)

type Application struct {
	Commands Commands
	Queries  Queries
}

type Commands struct {
	Bus *cqrs.Facade
}

type Queries struct {
	SearchArtist     query.SearchArtistsHandler
	SearchCategories query.SearchCategoriesHandler
	SearchCharacters query.SearchCharactersHandler
	SearchMedias     query.SearchMediasHandler
}
