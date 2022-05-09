package command

import (
	"context"
	"overdoll/applications/eva/internal/domain/account"
	"overdoll/applications/eva/internal/domain/event"
	"overdoll/libraries/principal"
)

type CancelAccountDeletion struct {
	Principal *principal.Principal
	AccountId string
}

type CancelAccountDeletionHandler struct {
	ar    account.Repository
	event event.Repository
}

func NewCancelAccountDeletionHandler(ar account.Repository, event event.Repository) CancelAccountDeletionHandler {
	return CancelAccountDeletionHandler{ar: ar, event: event}
}

func (h CancelAccountDeletionHandler) Handle(ctx context.Context, cmd CancelAccountDeletion) (*account.Account, error) {

	acc, err := h.ar.GetAccountById(ctx, cmd.AccountId)

	if err != nil {
		return nil, err
	}

	if err := acc.CanCancelDeletion(cmd.Principal); err != nil {
		return nil, err
	}

	if err := h.event.CancelAccountDeletion(ctx, *acc.ScheduledDeletionWorkflowId()); err != nil {
		return nil, err
	}

	return acc, nil
}
