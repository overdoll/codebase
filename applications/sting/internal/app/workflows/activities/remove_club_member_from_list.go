package activities

import (
	"context"
)

type RemoveClubMemberFromListInput struct {
	ClubId    string
	AccountId string
}

func (h *Activities) RemoveClubMemberFromList(ctx context.Context, input RemoveClubMemberFromListInput) error {

	member, err := h.cr.GetClubMemberByIdOperator(ctx, input.ClubId, input.AccountId)

	if err != nil {
		return err
	}

	return h.cr.DeleteClubMember(ctx, member)
}
