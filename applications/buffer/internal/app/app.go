package app

import (
	"overdoll/applications/buffer/internal/app/command"
)

type Application struct {
	Commands Commands
	Queries  Queries
}

type Commands struct {
	HandleUpload command.HandleUploadHandler
}

type Queries struct{}
