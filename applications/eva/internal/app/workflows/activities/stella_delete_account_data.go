package activities

import (
	"context"
)

func (h *Activities) StellaDeleteAccountData(ctx context.Context, accountId string) error {
	return h.stella.DeleteAccountData(ctx, accountId)
}
