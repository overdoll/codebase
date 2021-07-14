package query

import (
	"context"
	"errors"

	"go.uber.org/zap"
	"overdoll/applications/parley/src/domain/moderator"
)

type ModeratorInQueueHandler struct {
	mr moderator.Repository
}

var (
	ErrFailedGetModeratorInQueue = errors.New("get moderator in queue failed")
)

func NewModeratorInQueueHandler(mr moderator.Repository) ModeratorInQueueHandler {
	return ModeratorInQueueHandler{mr: mr}
}

func (h ModeratorInQueueHandler) Handle(ctx context.Context, accountId string) (bool, error) {

	_, err := h.mr.GetModerator(ctx, accountId)

	if err != nil {
		// false - not in queue
		if err == moderator.ErrModeratorNotFound {
			return false, nil
		}

		zap.S().Errorf("failed to moderator: %s", err)
		return false, ErrFailedGetModeratorInQueue
	}

	// true - in queue
	return true, nil
}
