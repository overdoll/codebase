package command

import (
	"context"
	"errors"
	"overdoll/applications/ringer/internal/domain/details"
	"overdoll/applications/ringer/internal/domain/payout"
	"overdoll/libraries/principal"
)

type CreatePaxumAccountPayoutMethod struct {
	Requester  *principal.Principal
	AccountId  string
	PaxumEmail string
}

type CreatePaxumAccountPayoutMethodHandler struct {
	ir details.Repository
	pr payout.Repository
}

func NewCreatePaxumAccountPayoutMethodHandler(ir details.Repository, pr payout.Repository) CreatePaxumAccountPayoutMethodHandler {
	return CreatePaxumAccountPayoutMethodHandler{ir: ir, pr: pr}
}

func (h CreatePaxumAccountPayoutMethodHandler) Handle(ctx context.Context, cmd CreatePaxumAccountPayoutMethod) (*payout.AccountPayoutMethod, error) {

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

	if err := h.pr.CreateAccountPayoutMethod(ctx, pay); err != nil {
		return nil, err
	}

	return pay, nil
}
