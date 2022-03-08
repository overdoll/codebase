package activities

import (
	"context"
)

type RemoveClubSupporterInput struct {
	AccountId string
	ClubId    string
}

func (h *Activities) RemoveClubSupporter(ctx context.Context, input RemoveClubSupporterInput) error {
	return h.stella.RemoveClubSupporter(ctx, input.ClubId, input.AccountId)
}
