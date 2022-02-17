package activities

import "context"

type CheckForExistingClubSupport struct {
	AccountId            string
	ClubId               string
	CCBillSubscriptionId string
}

type CheckForExistingClubSupportPayload struct {
	DuplicateSupportDifferentSubscription bool
	DuplicateSupportSameSubscription      bool
}

func (h *Activities) CheckForExistingClubSupport(ctx context.Context, request CheckForExistingClubSupport) (*CheckForExistingClubSupportPayload, error) {
	return nil, nil
}
