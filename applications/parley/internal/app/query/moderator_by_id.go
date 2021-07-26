package query

import (
	"context"
	"errors"

	"go.uber.org/zap"
	"overdoll/applications/parley/internal/domain/moderator"
)

var (
	errFailedModeratorById = errors.New("moderator by id failed")
)

type ModeratorByIdHandler struct {
	mr moderator.Repository
}

func NewModeratorByIdHandler(mr moderator.Repository) ModeratorByIdHandler {
	return ModeratorByIdHandler{mr: mr}
}

func (h ModeratorByIdHandler) Handle(ctx context.Context, accountId string) (*moderator.Moderator, error) {

	mod, err := h.mr.GetModerator(ctx, accountId)

	if err != nil {
		// false - not in queue
		if err == moderator.ErrModeratorNotFound {
			return nil, nil
		}

		zap.S().Errorf("failed to get moderator: %s", err)
		return nil, errFailedModeratorById
	}

	return mod, nil
}
