package command

import (
	"context"

	"overdoll/applications/sting/internal/domain/post"
)

type DeleteAndRecreateAudienceIndexHandler struct {
	pr post.Repository
}

func NewDeleteAndRecreateAudienceIndexHandler(pr post.Repository) DeleteAndRecreateAudienceIndexHandler {
	return DeleteAndRecreateAudienceIndexHandler{pr: pr}
}

func (h DeleteAndRecreateAudienceIndexHandler) Handle(ctx context.Context) error {
	return h.pr.DeleteAndRecreateAudienceIndex(ctx)
}
