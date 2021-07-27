package command

import (
	"context"

	"github.com/pkg/errors"
	"overdoll/applications/parley/internal/domain/moderator"
)

type ToggleModerator struct {
	AccountId string
}

type ToggleModeratorHandler struct {
	mr  moderator.Repository
	eva EvaService
}

func NewToggleModeratorHandler(mr moderator.Repository, eva EvaService) ToggleModeratorHandler {
	return ToggleModeratorHandler{mr: mr, eva: eva}
}

func (h ToggleModeratorHandler) Handle(ctx context.Context, cmd ToggleModerator) (bool, error) {

	acc, err := h.eva.GetAccount(ctx, cmd.AccountId)

	if err != nil {
		return false, errors.Wrap(err, "failed to get account")
	}

	if !acc.IsModerator() {
		return false, errors.New("not moderator")
	}

	_, err = h.mr.GetModerator(ctx, acc.ID())

	if err != nil {

		// not found - add to moderator queue
		if err == moderator.ErrModeratorNotFound {
			if err := h.mr.CreateModerator(ctx, moderator.NewModerator(acc.ID())); err != nil {
				return false, err
			}

			return true, nil
		}

		return false, err
	}

	if err = h.mr.RemoveModerator(ctx, acc.ID()); err != nil {
		return false, err
	}

	return false, nil
}
