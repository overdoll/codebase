package command

import (
	"context"
	"overdoll/applications/sting/internal/domain/post"
	"overdoll/libraries/principal"
)

type UpdatePostContentIsSupporterOnly struct {
	Principal *principal.Principal

	PostId          string
	ContentIds      []string
	IsSupporterOnly bool
}

type UpdatePostContentIsSupporterOnlyHandler struct {
	pr post.Repository
}

func NewUpdatePostContentIsSupporterOnlyHandler(pr post.Repository) UpdatePostContentIsSupporterOnlyHandler {
	return UpdatePostContentIsSupporterOnlyHandler{pr: pr}
}

func (h UpdatePostContentIsSupporterOnlyHandler) Handle(ctx context.Context, cmd UpdatePostContentIsSupporterOnly) (*post.Post, error) {

	pendingPost, err := h.pr.UpdatePostContent(ctx, cmd.Principal, cmd.PostId, func(post *post.Post) error {
		return post.UpdateContentSupporterOnly(cmd.Principal, cmd.ContentIds, cmd.IsSupporterOnly)
	})

	if err != nil {
		return nil, err
	}

	return pendingPost, nil
}
