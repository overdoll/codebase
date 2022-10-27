package command

import (
	"context"
	"overdoll/applications/sting/internal/domain/post"
)

type BackFillPostViewsHandler struct {
	pr post.Repository
}

func NewBackFillPostViewsHandler(pr post.Repository) BackFillPostViewsHandler {
	return BackFillPostViewsHandler{pr: pr}
}

func (h BackFillPostViewsHandler) Handle(ctx context.Context) error {
	return h.pr.BackFillPostViews(ctx)
}
