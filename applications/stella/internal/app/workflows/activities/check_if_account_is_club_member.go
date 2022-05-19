package activities

import (
	"context"
	"overdoll/applications/stella/internal/domain/club"
)

type CheckIfAccountIsClubMemberInput struct {
	ClubId    string
	AccountId string
}

func (h *Activities) CheckIfAccountIsClubMember(ctx context.Context, input CheckIfAccountIsClubMemberInput) (bool, error) {

	_, err := h.cr.GetClubMemberByIdOperator(ctx, input.ClubId, input.AccountId)

	if err != nil {

		if err == club.ErrClubMemberNotFound {
			return false, nil
		}

		return false, err
	}

	return true, nil
}
