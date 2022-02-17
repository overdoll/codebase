package activities

import (
	"context"
	"time"
)

type AddClubSupporter struct {
	AccountId   string
	ClubId      string
	SupportedAt string
}

func (h *Activities) AddClubSupporter(ctx context.Context, payload AddClubSupporter) error {

	res, err := time.Parse("2006-01-02 15:04:05", payload.SupportedAt)

	if err != nil {
		return err
	}

	return h.stella.AddClubSupporter(ctx, payload.ClubId, payload.AccountId, res)
}
