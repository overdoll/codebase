package activities

import (
	"context"
	"overdoll/applications/hades/internal/domain/billing"
	"time"
)

type SendUpcomingSubscriptionReminderNotificationInput struct {
	AccountId string
}

type SendUpcomingSubscriptionReminderNotificationResponse struct {
	NoActiveSubscriptions bool
}

func (h *Activities) SendUpcomingSubscriptionReminderNotification(ctx context.Context, input SendUpcomingSubscriptionReminderNotificationInput) (*SendUpcomingSubscriptionReminderNotificationResponse, error) {

	subscriptions, err := h.billing.Get(ctx, input.AccountId)

	if err != nil {
		return nil, err
	}

	currentTime := time.Now()

	var targetedSubscriptions []*billing.AccountClubSupporterSubscription

	for _, subscription := range subscriptions {
		// if subscription is active, and due to be billed on the current month
		if subscription.IsActive() && currentTime.Month() == subscription.NextBillingDate().Month() {
			targetedSubscriptions = append(targetedSubscriptions, subscription)
		}
	}

	if len(targetedSubscriptions) > 0 {

		if err := h.carrier.UpcomingClubSupporterSubscriptionRenewals(ctx, input.AccountId, targetedSubscriptions); err != nil {
			return nil, err
		}

		return &SendUpcomingSubscriptionReminderNotificationResponse{NoActiveSubscriptions: false}, nil
	}

	return &SendUpcomingSubscriptionReminderNotificationResponse{NoActiveSubscriptions: true}, nil
}
