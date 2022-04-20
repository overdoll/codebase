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

	// TODO: get account ID of owner of club
	accountId := ""

	method, err := h.par.GetAccountPayoutMethodByIdOperator(ctx, accountId)

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
