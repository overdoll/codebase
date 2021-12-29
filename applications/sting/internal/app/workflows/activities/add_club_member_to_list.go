package activities

import (
	"context"
)

func (h *Activities) AddClubMemberToList(ctx context.Context, clubId, accountId string) error {
	return h.cr.AddClubMemberToList(ctx, clubId, accountId)
}
