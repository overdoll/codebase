package command

import (
	"context"

	tusd "github.com/tus/tusd/pkg/handler"
	"overdoll/applications/sting/internal/domain/resource"
)

type TusComposerHandler struct {
	cr resource.Repository
}

func NewTusComposerHandler(cr resource.Repository) TusComposerHandler {
	return TusComposerHandler{cr: cr}
}

func (h TusComposerHandler) Handle(ctx context.Context) (*tusd.StoreComposer, error) {

	composer, err := h.cr.GetComposer(ctx)

	if err != nil {
		return nil, err
	}

	return composer, nil
}
