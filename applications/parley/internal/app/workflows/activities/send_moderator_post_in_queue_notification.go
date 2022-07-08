package activities

import (
	"context"
)

type SendModeratorPostInQueueNotificationInput struct {
	ModeratorId string
}

func (h *Activities) SendModeratorPostInQueueNotification(ctx context.Context, input SendModeratorPostInQueueNotificationInput) error {

	// check if we haven't sent a notification yet within 24 hours, or we have already moderated a post and the cache key was removed
	hasKey, err := h.mr.HasModeratorNotificationCache(ctx, input.ModeratorId)

	if err != nil {
		return err
	}

	if hasKey {
		return nil
	}

	// send notification
	if err := h.carrier.SendModeratorPostInQueueNotification(ctx, input.ModeratorId); err != nil {
		return err
	}

	return h.mr.CreateModeratorNotificationCache(ctx, input.ModeratorId)
}
