package activities

import (
	"context"
)

type SendAccountNewRegistrationNotificationInput struct {
	AccountId string
}

func (h *Activities) SendAccountNewRegistrationNotification(ctx context.Context, input SendAccountNewRegistrationNotificationInput) error {
	return h.carrier.AccountNewRegistration(ctx, input.AccountId)
}
