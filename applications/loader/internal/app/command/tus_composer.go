package command

import (
	"context"
	"overdoll/applications/loader/internal/domain/resource"

	tusd "github.com/tus/tusd/pkg/handler"
)

type TusComposerHandler struct {
	fr resource.FileRepository
}

func NewTusComposerHandler(fr resource.FileRepository) TusComposerHandler {
	return TusComposerHandler{fr: fr}
}

func (h TusComposerHandler) Handle(ctx context.Context) (*tusd.StoreComposer, error) {

	composer, err := h.fr.GetComposer(ctx)

	if err != nil {
		return nil, err
	}

	return composer, nil
}
