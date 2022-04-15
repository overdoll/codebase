package activities

import (
	"context"
	"overdoll/applications/ringer/internal/domain/payout"
	"time"
)

type AppendOrCreateDepositRequestInput struct {
	DepositId string
	PayoutId  string
	Timestamp time.Time
}

func (h *Activities) AppendOrCreateDepositRequest(ctx context.Context, input AppendOrCreateDepositRequestInput) error {

	depositRequests, err := h.par.GetDepositRequestsForMonth(ctx, input.Timestamp)

	if err != nil {
		return err
	}

	payoutItem, err := h.par.GetClubPayoutByIdOperator(ctx, input.PayoutId)

	if err != nil {
		return err
	}

	accountPayout, err := h.par.GetAccountPayoutMethodById(ctx, payoutItem.AccountPayoutMethodId())

	if err != nil {
		return err
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
		deposit, err := payout.NewDepositRequest(input.DepositId, accountPayout.Method(), input.Timestamp, payoutItem.Currency())

		if err != nil {
			return err
		}

		if err := h.par.CreateDepositRequest(ctx, deposit); err != nil {
			return err
		}

	}

	if err := h.par.AddPayoutToDepositRequest(ctx, depositId, payoutItem); err != nil {
		return err
	}

	return nil
}
