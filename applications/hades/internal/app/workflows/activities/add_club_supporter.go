package activities

import (
	"context"
	"overdoll/applications/hades/internal/domain/ccbill"
)

type AddClubSupporter struct {
	AccountId   string
	ClubId      string
	SupportedAt string
}

func (h *Activities) AddClubSupporter(ctx context.Context, payload AddClubSupporter) error {

	res, err := ccbill.ParseCCBillDateWithTime(payload.SupportedAt)

	if err != nil {
		return err
	}

	return h.stella.AddClubSupporter(ctx, payload.ClubId, payload.AccountId, res)
}
