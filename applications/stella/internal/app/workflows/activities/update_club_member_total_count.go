package activities

import (
	"context"
)

func (h *Activities) UpdateClubMemberTotalCount(ctx context.Context, clubId string) error {

	// update count
	if err := h.cr.UpdateClubMembersTotalCount(ctx, clubId); err != nil {
		return err
	}

	clb, err := h.cr.GetClubById(ctx, clubId)

	if err != nil {
		return err
	}

	// index club
	return h.ci.IndexClub(ctx, clb)
}
