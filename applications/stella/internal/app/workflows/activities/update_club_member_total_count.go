package activities

import (
	"context"
)

type UpdateClubMemberTotalCountInput struct {
	ClubId string
}

func (h *Activities) UpdateClubMemberTotalCount(ctx context.Context, input UpdateClubMemberTotalCountInput) error {

	// update count
	if err := h.cr.UpdateClubMembersTotalCount(ctx, input.ClubId); err != nil {
		return err
	}

	clb, err := h.cr.GetClubById(ctx, input.ClubId)

	if err != nil {
		return err
	}

	// index club
	return h.ci.IndexClub(ctx, clb)
}
