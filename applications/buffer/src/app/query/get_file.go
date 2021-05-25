package query

import (
	"context"
	"errors"
	"io"

	"overdoll/applications/buffer/src/domain/file"
)

type GetFileHandler struct {
	fr file.Repository
}

func NewGetFileHandler(fr file.Repository) GetFileHandler {
	return GetFileHandler{fr: fr}
}

func (h GetFileHandler) Handle(ctx context.Context, token, filePrefix, key string) (io.ReadCloser, error) {

	fil := file.NewFile(filePrefix, key)

	if !fil.CanViewFile() {
		return nil, errors.New("user not authorized to view file")
	}

	return h.fr.GetFile(ctx, fil)
}
