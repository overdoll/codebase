package command

import (
	"context"
	"overdoll/applications/sting/internal/domain/event"
	"overdoll/applications/sting/internal/domain/post"
)

type UpdateTotalPostsForPostTags struct {
	PostId string
}

type UpdateTotalPostsForPostTagsHandler struct {
	pr    post.Repository
	event event.Repository
}

func NewUpdateTotalPostsForPostTagsHandler(pr post.Repository, event event.Repository) UpdateTotalPostsForPostTagsHandler {
	return UpdateTotalPostsForPostTagsHandler{pr: pr, event: event}
}

func (h UpdateTotalPostsForPostTagsHandler) Handle(ctx context.Context, cmd UpdateTotalPostsForPostTags) error {

	pst, err := h.pr.GetPostByIdOperator(ctx, cmd.PostId)

	if err != nil {
		return err
	}

	if err := h.event.UpdateTotalPostsForPostTags(ctx, pst); err != nil {
		return err
	}

	return nil
}
