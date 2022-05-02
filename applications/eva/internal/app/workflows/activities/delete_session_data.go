package activities

import (
	"context"
)

func (h *Activities) DeleteSessionData(ctx context.Context, accountId string) error {
	return h.sr.DeleteAccountSessionData(ctx, accountId)
}
