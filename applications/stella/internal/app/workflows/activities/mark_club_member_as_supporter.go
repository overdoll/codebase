package activities

import (
	"context"
	"overdoll/applications/stella/internal/domain/club"
	"time"
)

func (h *Activities) MarkClubMemberAsSupporter(ctx context.Context, clubId, accountId string, supportedAt time.Time) error {

	_, err := h.cr.UpdateClubMemberIsSupporter(ctx, clubId, accountId, func(member *club.Member) error {
		return member.MakeSupporter(supportedAt)
	})

	if err != nil {
		return err
	}

	return nil
}
