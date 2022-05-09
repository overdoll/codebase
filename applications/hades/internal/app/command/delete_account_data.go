package command

import (
	"context"
	"overdoll/applications/hades/internal/domain/billing"
)

type DeleteAccountData struct {
	AccountId string
}

type DeleteAccountDataHandler struct {
	br billing.Repository
}

func NewDeleteAccountDataHandler(br billing.Repository) DeleteAccountDataHandler {
	return DeleteAccountDataHandler{br: br}
}

func (h DeleteAccountDataHandler) Handle(ctx context.Context, cmd DeleteAccountData) error {
	return h.br.DeleteAccountData(ctx, cmd.AccountId)
}
