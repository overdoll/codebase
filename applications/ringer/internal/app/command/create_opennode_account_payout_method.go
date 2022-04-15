package command

import (
	"context"
	"errors"
	"overdoll/applications/ringer/internal/domain/details"
	"overdoll/applications/ringer/internal/domain/payout"
	"overdoll/libraries/principal"
)

type CreateOpenNodeAccountPayoutMethod struct {
	Requester     *principal.Principal
	AccountId     string
	OpenNodeEmail string
}

type CreateOpenNodeAccountPayoutMethodHandler struct {
	ir details.Repository
	pr payout.Repository
}

func NewCreateOpenNodeAccountPayoutMethodHandler(ir details.Repository, pr payout.Repository) CreateOpenNodeAccountPayoutMethodHandler {
	return CreateOpenNodeAccountPayoutMethodHandler{ir: ir, pr: pr}
}

func (h CreateOpenNodeAccountPayoutMethodHandler) Handle(ctx context.Context, cmd CreateOpenNodeAccountPayoutMethod) (*payout.AccountPayoutMethod, error) {

	_, err := h.ir.GetAccountDetailsById(ctx, cmd.Requester, cmd.AccountId)

	if err != nil {

		if err == details.ErrAccountDetailsNotFound {
			return nil, errors.New("account identification must be filled out before creating a payout method")
		}

		return nil, err
	}

	pay, err := payout.NewOpenNodeAccountPayoutMethod(cmd.AccountId, cmd.OpenNodeEmail)

	if err != nil {
		return nil, err
	}

	if err := h.pr.CreateAccountPayoutMethod(ctx, pay); err != nil {
		return nil, err
	}

	return pay, nil
}
