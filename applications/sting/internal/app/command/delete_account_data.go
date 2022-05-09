package command

import (
	"context"
	"overdoll/applications/sting/internal/domain/event"
)

type DeleteAccountData struct {
	AccountId string
}

type DeleteAccountDataHandler struct {
	event event.Repository
}

func NewDeleteAccountDataHandler(event event.Repository) DeleteAccountDataHandler {
	return DeleteAccountDataHandler{event: event}
}

func (h DeleteAccountDataHandler) Handle(ctx context.Context, cmd DeleteAccountData) error {
	return h.event.DeleteAccountData(ctx, cmd.AccountId)
}
