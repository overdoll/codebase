package app

import (
	"overdoll/applications/parley/src/app/command"
	"overdoll/applications/parley/src/app/query"
)

type Application struct {
	Commands Commands
	Queries  Queries
}

type Commands struct {
	GetNextModerator command.GetNextModeratorHandler
}

type Queries struct {
	PendingPostRejectionReasons query.PendingPostsRejectionReasonsHandler
}
