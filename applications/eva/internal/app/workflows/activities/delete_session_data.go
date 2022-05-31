package activities

import (
	"context"
	"github.com/getsentry/sentry-go"
)

func (h *Activities) DeleteSessionData(ctx context.Context, accountId string) error {

	if err := h.sr.DeleteAccountSessionData(ctx, accountId); err != nil {
		sentry.CurrentHub().CaptureException(err)
		return err
	}

	return nil
}
