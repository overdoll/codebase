package activities

import (
	"context"
	"overdoll/applications/sting/internal/domain/club"
)

type SubtractClubMemberInput struct {
	ClubId    string
	AccountId string
}

func (h *Activities) SubtractClubMember(ctx context.Context, input AddClubMemberInput) error {
	return h.cr.UpdateClubMembersCount(ctx, input.ClubId, func(cl *club.Club) error {
		return cl.SubtractMember()
	})
}
