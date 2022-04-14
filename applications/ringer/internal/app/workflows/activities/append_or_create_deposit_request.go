package activities

import (
	"context"
	"time"
)

type AppendOrCreateDepositRequestInput struct {
	PayoutId  string
	Timestamp time.Time
}

func (h *Activities) AppendOrCreateDepositRequest(ctx context.Context, input AppendOrCreateDepositRequestInput) error {
	return nil
}
