package activities

import (
	"context"
)

type AddClubSupporter struct {
	AccountId   string
	ClubId      string
	SupportedAt string
}

func (h *Activities) AddClubSupporter(ctx context.Context, payload AddClubSupporter) error {
	return nil
}
