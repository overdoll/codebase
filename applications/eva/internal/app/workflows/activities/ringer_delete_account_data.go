package activities

import (
	"context"
	"overdoll/libraries/sentry_support"
)

func (h *Activities) RingerDeleteAccountData(ctx context.Context, accountId string) error {

	var err error
	defer sentry_support.CaptureActivityError(ctx, err)

	if err = h.ringer.DeleteAccountData(ctx, accountId); err != nil {
		return err
	}

	return nil
}
