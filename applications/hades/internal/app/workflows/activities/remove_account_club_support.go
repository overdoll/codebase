package activities

import (
	"context"
)

type RemoveAccountClubSupport struct {
	AccountId            string
	ClubId               string
	CCBillSubscriptionId string
}

func (h *Activities) RemoveAccountClubSupport(ctx context.Context, payload RemoveAccountClubSupport) error {
	return nil
}
