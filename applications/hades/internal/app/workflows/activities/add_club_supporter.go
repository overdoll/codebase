package activities

import (
	"context"
	"overdoll/applications/hades/internal/domain/ccbill"
)

type AddClubSupporterInput struct {
	AccountId   string
	ClubId      string
	SupportedAt string
}

func (h *Activities) AddClubSupporter(ctx context.Context, input AddClubSupporterInput) error {

	res, err := ccbill.ParseCCBillDateWithTime(input.SupportedAt)

	if err != nil {
		return err
	}

	return h.stella.AddClubSupporter(ctx, input.ClubId, input.AccountId, res)
}
