package command

import (
	"context"

	"overdoll/applications/sting/internal/domain/post"
)

type DeleteAndRecreateSeriesIndexHandler struct {
	pr post.Repository
}

func NewDeleteAndRecreateSeriesIndexHandler(pr post.Repository) DeleteAndRecreateSeriesIndexHandler {
	return DeleteAndRecreateSeriesIndexHandler{pr: pr}
}

func (h DeleteAndRecreateSeriesIndexHandler) Handle(ctx context.Context) error {
	return h.pr.DeleteAndRecreateSeriesIndex(ctx)
}
