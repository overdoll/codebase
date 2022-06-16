package activities

import (
	"context"
)

type RemoveClubSupporterInput struct {
	AccountId string
	ClubId    string
}

func (h *Activities) RemoveClubSupporter(ctx context.Context, input RemoveClubSupporterInput) error {
	return h.sting.RemoveClubSupporter(ctx, input.ClubId, input.AccountId)
}
