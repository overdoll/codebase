package app

import (
	"overdoll/applications/hades/src/app/command"
)

type Application struct {
	Commands Commands
	Queries  Queries
}

type Commands struct {
	GetUserSession command.GetUserSessionHandler
}

type Queries struct{}
