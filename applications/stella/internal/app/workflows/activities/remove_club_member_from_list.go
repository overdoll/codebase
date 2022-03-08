package activities

import (
	"context"
)

type RemoveClubMemberFromListInput struct {
	ClubId    string
	AccountId string
}

func (h *Activities) RemoveClubMemberFromList(ctx context.Context, input RemoveClubMemberFromListInput) error {
	return h.cr.RemoveClubMemberFromlist(ctx, input.ClubId, input.AccountId)
}
