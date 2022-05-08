package activities

import (
	"context"
)

type UpdateClubMemberTotalCountInput struct {
	ClubId string
}

func (h *Activities) UpdateClubMemberTotalCount(ctx context.Context, input UpdateClubMemberTotalCountInput) error {
	return h.cr.UpdateClubMembersTotalCount(ctx, input.ClubId)
}
