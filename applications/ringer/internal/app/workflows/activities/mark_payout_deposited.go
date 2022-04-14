package activities

import (
	"context"
)

type MarkPayoutDepositedInput struct {
	PayoutId string
}

func (h *Activities) MarkPayoutDeposited(ctx context.Context, input MarkPayoutDepositedInput) error {
	return nil
}
