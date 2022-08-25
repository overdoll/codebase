package activities

import (
	"context"
	"overdoll/applications/sting/internal/domain/post"
)

type SendPostFailedProcessingNotificationInput struct {
	PostId string
}

func (h *Activities) SendPostFailedProcessingNotification(ctx context.Context, input SendPostFailedProcessingNotificationInput) error {

	pst, err := h.pr.UpdatePost(ctx, input.PostId, func(pending *post.Post) error {
		return pending.MakePostBackToDraft()
	})

	if err != nil {
		return err
	}

	return h.carrier.PostFailedProcessing(ctx, pst.ID())
}
