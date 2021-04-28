package query

import (
	"context"
	"errors"
	"io"

	"overdoll/applications/buffer/src/app"
	"overdoll/applications/buffer/src/domain/file"
)

type GetFileHandler struct {
	fr  file.Repository
	eva app.EvaService
}

func NewGetFileHandler(fr file.Repository, eva app.EvaService) GetFileHandler {
	return GetFileHandler{fr: fr, eva: eva}
}

func (h GetFileHandler) Handle(ctx context.Context, token string, filePrefix string, key string) (io.ReadCloser, error) {

	usr, err := h.eva.ValidateSession(ctx, token)

	if err != nil {
		return nil, err
	}

	fil := file.NewFile(usr, filePrefix, key)

	if !fil.CanViewFile() {
		return nil, errors.New("user not authorized to view file")
	}

	return h.fr.GetFile(ctx, fil)
}
