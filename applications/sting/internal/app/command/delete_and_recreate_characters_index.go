package command

import (
	"context"

	"overdoll/applications/sting/internal/domain/post"
)

type DeleteAndRecreateCharactersIndexHandler struct {
	pr post.Repository
}

func NewDeleteAndRecreateCharactersIndexHandler(pr post.Repository) DeleteAndRecreateCharactersIndexHandler {
	return DeleteAndRecreateCharactersIndexHandler{pr: pr}
}

func (h DeleteAndRecreateCharactersIndexHandler) Handle(ctx context.Context) error {
	return h.pr.DeleteAndRecreateCharactersIndex(ctx)
}
