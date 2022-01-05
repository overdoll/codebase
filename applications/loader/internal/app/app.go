package app

import (
	"overdoll/applications/loader/internal/app/command"
	"overdoll/applications/loader/internal/app/query"
)

type Application struct {
	Commands   Commands
	Queries    Queries
	Activities *activities.Activities
}

type Commands struct {
	TusComposer command.TusComposerHandler
}

type Queries struct {
	ResourceById   query.ResourceByIdHandler
	ResourcesByIds query.ResourcesByIdsHandler
}
