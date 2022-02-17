package activities

import (
	"context"
)

type MarkAccountClubSupportCancelled struct {
	AccountId            string
	ClubId               string
	CCBillSubscriptionId string
	Timestamp            string
}

func (h *Activities) MarkAccountClubSupportCancelled(ctx context.Context, payload MarkAccountClubSupportCancelled) error {
	return nil
}
