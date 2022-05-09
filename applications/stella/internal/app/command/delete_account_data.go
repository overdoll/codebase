package command

import (
	"context"
	"overdoll/applications/stella/internal/domain/club"
)

type DeleteAccountData struct {
	AccountId string
}

type DeleteAccountDataHandler struct {
	cr club.Repository
}

func NewDeleteAccountDataHandler(cr club.Repository) DeleteAccountDataHandler {
	return DeleteAccountDataHandler{cr: cr}
}

func (h DeleteAccountDataHandler) Handle(ctx context.Context, cmd DeleteAccountData) error {
	return h.cr.DeleteAccountData(ctx, cmd.AccountId)
}
