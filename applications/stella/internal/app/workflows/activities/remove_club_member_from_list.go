package activities

import (
	"context"
)

func (h *Activities) RemoveClubMemberFromList(ctx context.Context, clubId, accountId string) error {
	return h.cr.RemoveClubMemberFromlist(ctx, clubId, accountId)
}
