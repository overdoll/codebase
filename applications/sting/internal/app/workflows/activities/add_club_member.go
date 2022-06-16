package activities

import (
	"context"
	"overdoll/applications/sting/internal/domain/club"
)

type AddClubMemberInput struct {
	ClubId    string
	AccountId string
}

func (h *Activities) AddClubMember(ctx context.Context, input AddClubMemberInput) error {
	return h.cr.UpdateClubMembersCount(ctx, input.ClubId, func(cl *club.Club) error {
		return cl.AddMember()
	})
}
