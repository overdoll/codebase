package activities

import (
	"context"
	"overdoll/applications/ringer/internal/domain/payout"
	"overdoll/libraries/money"
	"time"
)

type GetOrCreateDepositRequestInput struct {
	DepositId             string
	Currency              money.Currency
	AccountPayoutMethodId string
	Timestamp             time.Time
	Amount                int64
}

type GetOrCreateDepositRequestPayload struct {
	DepositRequestId string
}

func (h *Activities) GetOrCreateDepositRequest(ctx context.Context, input GetOrCreateDepositRequestInput) (*GetOrCreateDepositRequestPayload, error) {

	depositRequests, err := h.par.GetDepositRequestsForMonth(ctx, input.Timestamp)

	if err != nil {
		return nil, err
	}

	accountPayout, err := h.par.GetAccountPayoutMethodByIdOperator(ctx, input.AccountPayoutMethodId)

	if err != nil {
		return nil, err
	}

	depositId := ""

	for _, deposit := range depositRequests {
		// same kind of payout - add to this deposit
		if deposit.AccountPayoutMethodKind() == accountPayout.Method() {
			depositId = deposit.Id()
			break
		}
	}

	if depositId == "" {
		// did not find a deposit, create a new one and use it
		deposit, err := payout.NewDepositRequest(input.DepositId, accountPayout.Method(), input.Timestamp, input.Currency)

		if err != nil {
			return nil, err
		}

		if err := h.par.CreateDepositRequest(ctx, deposit); err != nil {
			return nil, err
		}

		depositId = deposit.Id()
	}

	return &GetOrCreateDepositRequestPayload{DepositRequestId: depositId}, nil
}
