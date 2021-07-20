package command

import (
	"context"
	"errors"

	"go.uber.org/zap"
	"overdoll/applications/parley/src/domain/moderator"
)

var (
	ErrFailedModeratorToggle = errors.New("get moderator failed")
)

type ToggleModeratorHandler struct {
	mr  moderator.Repository
	eva EvaService
}

func NewToggleModeratorHandler(mr moderator.Repository, eva EvaService) ToggleModeratorHandler {
	return ToggleModeratorHandler{mr: mr, eva: eva}
}

func (h ToggleModeratorHandler) Handle(ctx context.Context, accId string) (bool, error) {

	acc, err := h.eva.GetAccount(ctx, accId)

	if err != nil {
		zap.S().Errorf("failed to get user: %s", err)
		return false, ErrFailedModeratorToggle
	}

	if !acc.IsModerator() {
		return false, ErrFailedModeratorToggle
	}

	_, err = h.mr.GetModerator(ctx, accId)

	if err != nil {

		// not found - add to moderator queue
		if err == moderator.ErrModeratorNotFound {
			if err := h.mr.CreateModerator(ctx, moderator.NewModerator(accId)); err != nil {
				zap.S().Errorf("failed to add moderator: %s", err)
				return true, ErrFailedModeratorToggle
			}

			return false, nil
		}

		zap.S().Errorf("failed to get moderator: %s", err)
		return false, ErrFailedModeratorToggle
	}

	if err = h.mr.RemoveModerator(ctx, accId); err != nil {
		zap.S().Errorf("failed to remove moderator: %s", err)
		return false, ErrFailedModeratorToggle
	}

	return false, nil
}
