package command

import (
	"context"

	"overdoll/applications/parley/internal/domain/moderator"
	"overdoll/libraries/principal"
)

type AddModeratorToPostQueue struct {
	Principal *principal.Principal
	AccountId string
}

type AddModeratorToPostQueueHandler struct {
	mr  moderator.Repository
	eva EvaService
}

func NewAddModeratorToPostQueueHandler(mr moderator.Repository, eva EvaService) AddModeratorToPostQueueHandler {
	return AddModeratorToPostQueueHandler{mr: mr, eva: eva}
}

func (h AddModeratorToPostQueueHandler) Handle(ctx context.Context, cmd AddModeratorToPostQueue) error {

	_, err := h.mr.GetModerator(ctx, cmd.Principal, cmd.AccountId)

	if err != nil && err != moderator.ErrModeratorNotFound {
		return err
	}

	if err == nil {
		return nil
	}

	newMod, err := moderator.NewModerator(cmd.Principal, cmd.AccountId)

	if err != nil {
		return err
	}

	if err := h.mr.CreateModerator(ctx, newMod); err != nil {
		return err
	}

	return nil
}
