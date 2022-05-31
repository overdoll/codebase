package activities

import (
	"context"
	"github.com/getsentry/sentry-go"
)

func (h *Activities) StellaDeleteAccountData(ctx context.Context, accountId string) error {

	if err := h.stella.DeleteAccountData(ctx, accountId); err != nil {
		sentry.CurrentHub().CaptureException(err)
		return err
	}

	return nil
}
