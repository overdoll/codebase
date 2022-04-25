package command

import (
	"context"
	"overdoll/applications/ringer/internal/domain/payout"
	"overdoll/libraries/principal"
)

type DeleteAccountPayoutMethod struct {
	Principal             *principal.Principal
	AccountPayoutMethodId string
}

type DeleteAccountPayoutMethodHandler struct {
	pr payout.Repository
}

func NewDeleteAccountPayoutMethodHandler(pr payout.Repository) DeleteAccountPayoutMethodHandler {
	return DeleteAccountPayoutMethodHandler{pr: pr}
}

func (h DeleteAccountPayoutMethodHandler) Handle(ctx context.Context, cmd DeleteAccountPayoutMethod) error {

	pay, err := h.pr.GetAccountPayoutMethodById(ctx, cmd.Principal, cmd.AccountPayoutMethodId)

	if err != nil {
		return err
	}

	if err := h.pr.DeleteAccountPayoutMethod(ctx, cmd.Principal, pay); err != nil {
		return err
	}

	return nil
}
