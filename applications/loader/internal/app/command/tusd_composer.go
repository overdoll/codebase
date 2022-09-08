package command

import (
	"context"
	"overdoll/applications/loader/internal/domain/upload"

	tusd "github.com/tus/tusd/pkg/handler"
)

type TusComposerHandler struct {
	ur upload.Repository
}

func NewTusComposerHandler(ur upload.Repository) TusComposerHandler {
	return TusComposerHandler{ur: ur}
}

func (h TusComposerHandler) Handle(ctx context.Context) (*tusd.StoreComposer, error) {

	composer, err := h.ur.GetComposer(ctx)

	if err != nil {
		return nil, err
	}

	return composer, nil
}
