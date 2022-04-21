package activities

import (
	"context"
	"overdoll/applications/ringer/internal/domain/payout"
)

type GetClubPayoutMethodsInput struct {
	ClubId string
}

type GetClubPayoutMethodsPayload struct {
	AccountPayoutMethodId string
}

func (h *Activities) GetClubPayoutMethods(ctx context.Context, input GetClubPayoutMethodsInput) (*GetClubPayoutMethodsPayload, error) {

	accId, err := h.stella.GetClubById(ctx, input.ClubId)

	if err != nil {
		return nil, err
	}

	method, err := h.par.GetAccountPayoutMethodByIdOperator(ctx, *accId)

	if err != nil {

		if err == payout.ErrAccountPayoutMethodNotFound {
			return nil, nil
		}

		return nil, err
	}

	return &GetClubPayoutMethodsPayload{
		AccountPayoutMethodId: method.AccountId(),
	}, nil
}
