package activities

import (
	"context"
)

func (h *Activities) DeleteAccountData(ctx context.Context, accountId string) error {
	return h.ar.DeleteAccountData(ctx, accountId)
}
