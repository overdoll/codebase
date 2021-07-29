package command

import (
	"context"

	"overdoll/applications/parley/internal/domain/moderator"
	"overdoll/libraries/principal"
)

type ToggleModerator struct {
	Principal *principal.Principal
}

type ToggleModeratorHandler struct {
	mr  moderator.Repository
	eva EvaService
}

func NewToggleModeratorHandler(mr moderator.Repository, eva EvaService) ToggleModeratorHandler {
	return ToggleModeratorHandler{mr: mr, eva: eva}
}

func (h ToggleModeratorHandler) Handle(ctx context.Context, cmd ToggleModerator) (bool, error) {

	_, err := h.mr.GetModerator(ctx, cmd.Principal, cmd.Principal.AccountId())

	if err != nil {

		// not found - add to moderator queue
		if err == moderator.ErrModeratorNotFound {

			newMod, err := moderator.NewModerator(cmd.Principal, cmd.Principal.AccountId())

			if err != nil {
				return false, err
			}

			if err := h.mr.CreateModerator(ctx, newMod); err != nil {
				return false, err
			}

			return true, nil
		}

		return false, err
	}

	if err = h.mr.RemoveModerator(ctx, cmd.Principal, cmd.Principal.AccountId()); err != nil {
		return false, err
	}

	return false, nil
}
