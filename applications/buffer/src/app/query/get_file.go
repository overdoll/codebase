package query

import (
	"context"
	"io"

	"overdoll/applications/buffer/src/domain/file"
)

type GetFileHandler struct {
	fr file.Repository
}

func NewGetFileHandler(fr file.Repository) GetFileHandler {
	return GetFileHandler{fr: fr}
}

func (h GetFileHandler) Handle(ctx context.Context, key string) (io.ReadCloser, error) {
	return h.fr.GetFile(ctx, key)
}
