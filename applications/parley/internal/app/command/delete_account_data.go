package command

import (
	"context"
	"overdoll/applications/parley/internal/domain/report"
)

type DeleteAccountData struct {
	AccountId string
}

type DeleteAccountDataHandler struct {
	rr report.Repository
}

func NewDeleteAccountDataHandler(rr report.Repository) DeleteAccountDataHandler {
	return DeleteAccountDataHandler{rr: rr}
}

func (h DeleteAccountDataHandler) Handle(ctx context.Context, cmd DeleteAccountData) error {
	return h.rr.DeleteAccountData(ctx, cmd.AccountId)
}
