package activities

import (
	"context"
)

type SendAccountNewRegistrationNotificationInput struct {
	AccountId string
}

func (h *Activities) SendAccountNewRegistrationNotification(ctx context.Context, input SendAccountNewRegistrationNotificationInput) error {
	// note: removed new account registration notification for now - we will use something better in the future
	return nil
}
