package activities

import (
	"context"
	"github.com/getsentry/sentry-go"
)

func (h *Activities) HadesDeleteAccountData(ctx context.Context, accountId string) error {

	if err := h.hades.DeleteAccountData(ctx, accountId); err != nil {
		sentry.CurrentHub().CaptureException(err)
		return err
	}

	return nil
}
