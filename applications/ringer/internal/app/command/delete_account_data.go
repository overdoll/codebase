package command

import (
	"context"
	"overdoll/applications/ringer/internal/domain/details"
	"overdoll/applications/ringer/internal/domain/payout"
)

type DeleteAccountData struct {
	AccountId string
}

type DeleteAccountDataHandler struct {
	details details.Repository
	payout  payout.Repository
}

func NewDeleteAccountDataHandler(details details.Repository, payout payout.Repository) DeleteAccountDataHandler {
	return DeleteAccountDataHandler{payout: payout, details: details}
}

func (h DeleteAccountDataHandler) Handle(ctx context.Context, cmd DeleteAccountData) error {

	if err := h.details.DeleteAccountDetailsOperator(ctx, cmd.AccountId); err != nil {
		return err
	}

	return h.payout.DeleteAccountPayoutMethodOperator(ctx, cmd.AccountId)
}
