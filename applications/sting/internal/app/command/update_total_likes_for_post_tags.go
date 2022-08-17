package command

import (
	"context"
	"overdoll/applications/sting/internal/domain/event"
	"overdoll/applications/sting/internal/domain/post"
)

type UpdateTotalLikesForPostTags struct {
	PostId string
}

type UpdateTotalLikesForPostTagsHandler struct {
	pr    post.Repository
	event event.Repository
}

func NewUpdateTotalLikesForPostTagsHandler(pr post.Repository, event event.Repository) UpdateTotalLikesForPostTagsHandler {
	return UpdateTotalLikesForPostTagsHandler{pr: pr, event: event}
}

func (h UpdateTotalLikesForPostTagsHandler) Handle(ctx context.Context, cmd UpdateTotalLikesForPostTags) error {

	pst, err := h.pr.GetPostByIdOperator(ctx, cmd.PostId)

	if err != nil {
		return err
	}

	if err := h.event.UpdateTotalLikesForPostTags(ctx, pst); err != nil {
		return err
	}

	return nil
}
