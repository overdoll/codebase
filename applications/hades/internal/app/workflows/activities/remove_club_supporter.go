package activities

import (
	"context"
)

type RemoveClubSupporter struct {
	AccountId string
	ClubId    string
}

func (h *Activities) RemoveClubSupporter(ctx context.Context, payload RemoveClubSupporter) error {
	return h.stella.RemoveClubSupporter(ctx, payload.ClubId, payload.AccountId)
}
