package command

import (
	"context"
	"overdoll/applications/parley/internal/domain/moderator"
	"overdoll/libraries/principal"
)

type RemoveModeratorFromPostQueue struct {
	Principal *principal.Principal
	AccountId string
}

type RemoveModeratorFromPostQueueHandler struct {
	mr  moderator.Repository
	eva EvaService
}

func NewRemoveModeratorFromPostQueue(mr moderator.Repository, eva EvaService) RemoveModeratorFromPostQueueHandler {
	return RemoveModeratorFromPostQueueHandler{mr: mr, eva: eva}
}

func (h RemoveModeratorFromPostQueueHandler) Handle(ctx context.Context, cmd RemoveModeratorFromPostQueue) error {

	_, err := h.mr.GetModerator(ctx, cmd.Principal, cmd.AccountId)

	if err != nil {

		if err == moderator.ErrModeratorNotFound {
			return nil
		}

		return err
	}

	if err = h.mr.RemoveModerator(ctx, cmd.Principal, cmd.AccountId); err != nil {
		return err
	}

	return nil
}
