package command

import (
	"context"
	"overdoll/applications/sting/internal/domain/post"
	"overdoll/libraries/principal"
)

type UpdatePostContentOrder struct {
	Principal *principal.Principal

	PostId     string
	ContentIds []string
}

type UpdatePostContentOrderHandler struct {
	pr     post.Repository
	pi     post.IndexRepository
	loader LoaderService
}

func NewUpdatePostContentOrderHandler(pr post.Repository, pi post.IndexRepository, loader LoaderService) UpdatePostContentOrderHandler {
	return UpdatePostContentOrderHandler{pr: pr, pi: pi, loader: loader}
}

func (h UpdatePostContentOrderHandler) Handle(ctx context.Context, cmd UpdatePostContentOrder) (*post.Post, error) {

	pendingPost, err := h.pr.UpdatePostContent(ctx, cmd.Principal, cmd.PostId, func(post *post.Post) error {
		return post.UpdateContentOrderRequest(cmd.Principal, cmd.ContentIds)
	})

	if err != nil {
		return nil, err
	}

	if err := h.pi.IndexPost(ctx, pendingPost); err != nil {
		return nil, err
	}

	return pendingPost, nil
}
