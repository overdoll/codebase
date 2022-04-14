package activities

import (
	"context"
	"overdoll/applications/ringer/internal/domain/opennode"
	"overdoll/applications/ringer/internal/domain/payout"
)

type ProcessClubPayoutInput struct {
	PayoutId string
}

type ProcessClubPayoutPayload struct {
	Success bool
	Error   *string
}

func (h *Activities) ProcessClubPayout(ctx context.Context, input ProcessClubPayoutInput) (*ProcessClubPayoutPayload, error) {

	// get payout
	clubPayout, err := h.par.GetPayoutById(ctx, input.PayoutId)

	if err != nil {
		return nil, err
	}

	// get the specific account payout method that's linked
	accountMethod, err := h.par.GetAccountPayoutMethodById(ctx, clubPayout.AccountPayoutMethodId())

	if err != nil {
		return nil, err
	}

	switch accountMethod.Kind() {
	case payout.OpenNode:
		transfer, err := opennode.NewTransfer(*accountMethod.OpennodeEmail(), clubPayout.Amount(), clubPayout.Currency())

		if err != nil {
			return nil, err
		}

		if err := h.or.InitiatePayout(ctx, []*opennode.Transfer{transfer}); err != nil {
			return nil, err
		}
	}

	return &ProcessClubPayoutPayload{Success: true}, nil
}
