package activities

import (
	"context"
)

type RemoveClubSupporter struct {
	AccountId string
	ClubId    string
}

func (h *Activities) RemoveClubSupporter(ctx context.Context, payload RemoveClubSupporter) error {
	return nil
}
