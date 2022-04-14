package activities

import (
	"context"
)

type MarkPayoutFailedInput struct {
	PayoutId string
}

func (h *Activities) MarkPayoutFailed(ctx context.Context, input MarkPayoutFailedInput) error {
	return nil
}
