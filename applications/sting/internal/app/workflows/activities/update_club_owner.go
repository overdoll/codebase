package activities

import (
	"context"
)

type UpdateClubOwnerInput struct {
	ClubId    string
	AccountId string
}

func (h *Activities) UpdateClubOwner(ctx context.Context, input UpdateClubOwnerInput) error {
	return h.cr.UpdateClubOwner(ctx, input.ClubId, input.AccountId)
}
