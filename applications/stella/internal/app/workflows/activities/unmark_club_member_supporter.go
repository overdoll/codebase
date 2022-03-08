package activities

import (
	"context"
	"overdoll/applications/stella/internal/domain/club"
)

type UnMarkClubMemberSupporterInput struct {
	ClubId    string
	AccountId string
}

func (h *Activities) UnMarkClubMemberSupporter(ctx context.Context, input UnMarkClubMemberSupporterInput) error {

	_, err := h.cr.UpdateClubMemberIsSupporter(ctx, input.ClubId, input.AccountId, func(member *club.Member) error {
		return member.UnMakeSupporter()
	})

	if err != nil {
		return err
	}

	return nil
}
