package app

import (
	"overdoll/applications/buffer/src/app/command"
	"overdoll/applications/buffer/src/app/query"
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
