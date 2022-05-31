package activities

import (
	"context"
	"overdoll/libraries/sentry_support"
)

type AccountDeletedInput struct {
	Username string
	Email    string
}

func (h *Activities) AccountDeleted(ctx context.Context, input AccountDeletedInput) error {

	var err error
	defer sentry_support.CaptureActivityError(ctx, err)

	if err = h.carrier.AccountDeleted(ctx, input.Username, input.Email); err != nil {

		return err
	}

	return nil
}
