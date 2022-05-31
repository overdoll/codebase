package activities

import (
	"context"
	"overdoll/libraries/sentry_support"
)

func (h *Activities) StingDeleteAccountData(ctx context.Context, accountId string) error {

	var err error
	defer sentry_support.CaptureActivityError(ctx, err)

	if err = h.sting.DeleteAccountData(ctx, accountId); err != nil {
		return err
	}

	return nil
}
