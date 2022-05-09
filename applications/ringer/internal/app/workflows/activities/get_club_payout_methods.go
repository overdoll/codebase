package activities

import (
	"context"
	"overdoll/applications/ringer/internal/domain/payout"
	"overdoll/libraries/money"
)

type GetClubPayoutMethodsInput struct {
	ClubId   string
	Amount   uint64
	Currency money.Currency
}

type GetClubPayoutMethodsPayload struct {
	AccountPayoutMethodId string
}

func (h *Activities) GetClubPayoutMethods(ctx context.Context, input GetClubPayoutMethodsInput) (*GetClubPayoutMethodsPayload, error) {

	clb, err := h.stella.GetClubById(ctx, input.ClubId)

	if err != nil {
		return nil, err
	}

	acc, err := h.eva.GetAccount(ctx, clb.OwnerAccountId())

	if err != nil {
		return nil, err
	}

	method, err := h.par.GetAccountPayoutMethodByIdOperator(ctx, clb.OwnerAccountId())

	if err != nil {

		if err == payout.ErrAccountPayoutMethodNotFound {
			return nil, nil
		}

		return nil, err
	}

	// we need to validate that this payout method will work with this currency + amount
	validated := method.Validate(acc, input.Amount, input.Currency)

	if !validated {
		return nil, nil
	}

	return &GetClubPayoutMethodsPayload{
		AccountPayoutMethodId: method.AccountId(),
	}, nil
}
