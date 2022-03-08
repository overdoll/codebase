package activities

import (
	"context"
)

type AddClubMemberToListInput struct {
	ClubId    string
	AccountId string
}

func (h *Activities) AddClubMemberToList(ctx context.Context, input AddClubMemberToListInput) error {
	return h.cr.AddClubMemberToList(ctx, input.ClubId, input.AccountId)
}
