package query

import (
	"context"
	"errors"

	"go.uber.org/zap"
	"overdoll/applications/parley/src/domain/moderator"
)

type IsModeratorInQueueHandler struct {
	mr moderator.Repository
}

var (
	ErrFailedIsModeratorInQueue = errors.New("is moderator in queue failed")
)

func NewIsModeratorInQueueHandler(mr moderator.Repository) IsModeratorInQueueHandler {
	return IsModeratorInQueueHandler{mr: mr}
}

func (h IsModeratorInQueueHandler) Handle(ctx context.Context, accountId string) (bool, error) {

	_, err := h.mr.GetModerator(ctx, accountId)

	if err != nil {
		// false - not in queue
		if err == moderator.ErrModeratorNotFound {
			return false, nil
		}

		zap.S().Errorf("failed to moderator: %s", err)
		return false, ErrFailedIsModeratorInQueue
	}

	// true - in queue
	return true, nil
}
