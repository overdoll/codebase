package command

import (
	"context"
	"overdoll/applications/loader/internal/domain/resource"

	tusd "github.com/tus/tusd/pkg/handler"
)

type TusComposerHandler struct {
	rr resource.Repository
}

func NewTusComposerHandler(rr resource.Repository) TusComposerHandler {
	return TusComposerHandler{rr: rr}
}

func (h TusComposerHandler) Handle(ctx context.Context) (*tusd.StoreComposer, error) {

	composer, err := h.rr.GetComposer(ctx)

	if err != nil {
		return nil, err
	}

	return composer, nil
}
