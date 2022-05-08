package activities

import (
	"context"
)

type GetActiveClubSupporterSubscriptionsForClubInput struct {
	ClubId string
}

type GetActiveClubSupporterSubscriptionsForClubPayload struct {
	SubscriptionIds []string
}

func (h *Activities) GetActiveClubSupporterSubscriptionsForClub(ctx context.Context, input GetActiveClubSupporterSubscriptionsForClubInput) (*GetActiveClubSupporterSubscriptionsForClubPayload, error) {

	active, err := h.billing.GetActiveClubSupporterSubscriptionsForClub(ctx, input.ClubId)

	if err != nil {
		return nil, err
	}

	return &GetActiveClubSupporterSubscriptionsForClubPayload{SubscriptionIds: active}, nil
}
