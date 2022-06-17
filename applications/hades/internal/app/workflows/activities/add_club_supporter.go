package activities

import (
	"context"
	"time"
)

type AddClubSupporterInput struct {
	AccountId   string
	ClubId      string
	SupportedAt time.Time
}

func (h *Activities) AddClubSupporter(ctx context.Context, input AddClubSupporterInput) error {
	return h.sting.AddClubSupporter(ctx, input.ClubId, input.AccountId, input.SupportedAt)
}
