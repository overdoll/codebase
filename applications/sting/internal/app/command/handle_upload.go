package command

import (
	"context"

	tusd "github.com/tus/tusd/pkg/handler"
	"overdoll/applications/sting/internal/domain/file"
)

type HandleUploadHandler struct {
	fr file.Repository
}

func NewHandleUploadHandler(fr file.Repository) HandleUploadHandler {
	return HandleUploadHandler{fr: fr}
}

func (h HandleUploadHandler) Handle(ctx context.Context) (*tusd.Handler, error) {

	composer, err := h.fr.GetComposer(ctx)

	if err != nil {
		return nil, err
	}

	handler, err := tusd.NewHandler(tusd.Config{
		BasePath:                "/api/upload/",
		StoreComposer:           composer,
		RespectForwardedHeaders: true,
	})

	if err != nil {
		return nil, err
	}

	return handler, nil
}
