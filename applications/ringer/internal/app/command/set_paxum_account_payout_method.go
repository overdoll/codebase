package command

import (
	"context"
	"errors"
	"overdoll/applications/ringer/internal/domain/details"
	"overdoll/applications/ringer/internal/domain/payout"
	"overdoll/libraries/principal"
)

type SetPaxumAccountPayoutMethod struct {
	Requester  *principal.Principal
	AccountId  string
	PaxumEmail string
}

type SetPaxumAccountPayoutMethodHandler struct {
	ir details.Repository
	pr payout.Repository
}

func NewSetPaxumAccountPayoutMethodHandler(ir details.Repository, pr payout.Repository) SetPaxumAccountPayoutMethodHandler {
	return SetPaxumAccountPayoutMethodHandler{ir: ir, pr: pr}
}

func (h SetPaxumAccountPayoutMethodHandler) Handle(ctx context.Context, cmd SetPaxumAccountPayoutMethod) (*payout.AccountPayoutMethod, error) {

	_, err := h.ir.GetAccountDetailsById(ctx, cmd.Requester, cmd.AccountId)

	if err != nil {

		if err == details.ErrAccountDetailsNotFound {
			return nil, errors.New("account identification must be filled out before creating a payout method")
		}

		return nil, err
	}

	pay, err := payout.NewPaxumAccountPayoutMethod(cmd.AccountId, cmd.PaxumEmail)

	if err != nil {
		return nil, err
	}

	if err := h.pr.UpdateAccountPayoutMethod(ctx, pay); err != nil {
		return nil, err
	}

	return pay, nil
}
