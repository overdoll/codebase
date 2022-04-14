package activities

import (
	"context"
)

type AddFailureToPayoutInput struct {
	PayoutId string
	Error    string
}

func (h *Activities) AddFailureToPayout(ctx context.Context, input AddFailureToPayoutInput) error {
	return nil
}
