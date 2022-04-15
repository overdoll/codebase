package activities

import (
	"context"
	"overdoll/libraries/money"
)

type GetClubPayoutMethodsInput struct {
	ClubId   string
	Currency money.Currency
	Amount   int64
}

type GetClubPayoutMethodsPayload struct {
	AccountPayoutMethodId string
}

func (h *Activities) GetClubPayoutMethods(ctx context.Context, input GetClubPayoutMethodsInput) (*GetClubPayoutMethodsPayload, error) {

	// TODO: get account ID of owner of club
	accountId := ""

	var payload *GetClubPayoutMethodsPayload

	methods, err := h.par.GetAccountPayoutMethodsOperator(ctx, accountId)

	if err != nil {
		return nil, err
	}

	for _, method := range methods {
		if method.IsDefault() && method.Validate(input.Amount, input.Currency) {
			payload = &GetClubPayoutMethodsPayload{
				AccountPayoutMethodId: method.Id(),
			}
			break
		}
	}

	return payload, nil
}
