package app

import (
	"overdoll/applications/sting/src/app/command"
)

type Application struct {
	Commands Commands
	Queries  Queries
}

type Commands struct {
	NewPost command.NewPostHandler
}

type Queries struct {
}
