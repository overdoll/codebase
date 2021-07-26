package app

import (
	"overdoll/applications/buffer/internal/app/command"
	"overdoll/applications/buffer/internal/app/query"
)

type Application struct {
	Commands Commands
	Queries  Queries
}

type Commands struct {
	HandleUpload command.HandleUploadHandler
}

type Queries struct {
	GetFile query.GetFileHandler
}
