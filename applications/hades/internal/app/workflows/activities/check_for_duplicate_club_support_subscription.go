package activities

import (
	"context"
	"overdoll/applications/hades/internal/domain/billing"
)

type CheckForDuplicateClubSupportSubscription struct {
	AccountId            string
	ClubId               string
	CCBillSubscriptionId string
}

type CheckForExistingClubSupportPayload struct {
	DuplicateSupportDifferentSubscription bool
	DuplicateSupportSameSubscription      bool
}

func (h *Activities) CheckForDuplicateClubSupportSubscription(ctx context.Context, request CheckForDuplicateClubSupportSubscription) (*CheckForExistingClubSupportPayload, error) {

	subscription, err := h.billing.GetAccountClubSupportSubscriptionByAccountAndClubId(ctx, request.AccountId, request.ClubId)

	if err != nil {

		if err == billing.ErrAccountClubSupportSubscriptionNotFound {
			return &CheckForExistingClubSupportPayload{
				DuplicateSupportSameSubscription:      false,
				DuplicateSupportDifferentSubscription: false,
			}, nil
		}

		return nil, err
	}

	// same ccbill subscription, send that out
	if subscription.CCBillSubscriptionId() == request.CCBillSubscriptionId {
		return &CheckForExistingClubSupportPayload{
			DuplicateSupportSameSubscription:      true,
			DuplicateSupportDifferentSubscription: false,
		}, nil
	}

	return &CheckForExistingClubSupportPayload{
		DuplicateSupportSameSubscription:      false,
		DuplicateSupportDifferentSubscription: true,
	}, nil
}
