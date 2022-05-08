package command

import (
	"context"

	"overdoll/applications/sting/internal/domain/post"
)

type DeleteAndRecreateCategoriesIndexHandler struct {
	pr post.Repository
}

func NewDeleteAndRecreateCategoriesIndexHandler(pr post.Repository) DeleteAndRecreateCategoriesIndexHandler {
	return DeleteAndRecreateCategoriesIndexHandler{pr: pr}
}

func (h DeleteAndRecreateCategoriesIndexHandler) Handle(ctx context.Context) error {
	return h.pr.DeleteAndRecreateCategoriesIndex(ctx)
}
