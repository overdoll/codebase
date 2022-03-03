package activities

import (
	"context"
	"overdoll/applications/stella/internal/domain/club"
)

func (h *Activities) UnMarkClubMemberSupporter(ctx context.Context, clubId, accountId string) error {

	_, err := h.cr.UpdateClubMemberIsSupporter(ctx, clubId, accountId, func(member *club.Member) error {
		return member.UnMakeSupporter()
	})

	if err != nil {
		return err
	}

	return nil
}
