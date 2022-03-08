package activities

import (
	"context"
	"overdoll/applications/stella/internal/domain/club"
	"time"
)

type MarkClubMemberAsSupporterInput struct {
	ClubId      string
	AccountId   string
	SupportedAt time.Time
}

func (h *Activities) MarkClubMemberAsSupporter(ctx context.Context, input MarkClubMemberAsSupporterInput) error {

	_, err := h.cr.UpdateClubMemberIsSupporter(ctx, input.ClubId, input.AccountId, func(member *club.Member) error {
		return member.MakeSupporter(input.SupportedAt)
	})

	if err != nil {
		return err
	}

	return nil
}
