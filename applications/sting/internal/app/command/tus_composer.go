package command

import (
	"context"
	"overdoll/applications/sting/internal/domain/post"

	tusd "github.com/tus/tusd/pkg/handler"
)

type TusComposerHandler struct {
	rr post.Repository
}

func NewTusComposerHandler(rr post.Repository) TusComposerHandler {
	return TusComposerHandler{rr: rr}
}

func (h TusComposerHandler) Handle(ctx context.Context) (*tusd.StoreComposer, error) {

	composer, err := h.rr.GetComposer(ctx)

	if err != nil {
		return nil, err
	}

	return composer, nil
}
