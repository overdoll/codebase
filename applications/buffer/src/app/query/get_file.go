package query

import (
	"context"
	"errors"
	"io"

	"overdoll/applications/buffer/src/domain/file"
	"overdoll/libraries/common"
)

type GetFileHandler struct {
	fr  file.Repository
	eva common.EvaService
}

func NewGetFileHandler(fr file.Repository, eva common.EvaService) GetFileHandler {
	return GetFileHandler{fr: fr, eva: eva}
}

func (h GetFileHandler) Handle(ctx context.Context, userId string, filePrefix string, key string) (io.ReadCloser, error) {

	usr, err := h.eva.GetUser(ctx, userId)

	if err != nil {
		return nil, err
	}

	fil := file.NewFile(usr, filePrefix, key)

	if !fil.CanViewFile() {
		return nil, errors.New("user not authorized to view file")
	}

	return h.fr.GetFile(ctx, fil)
}
