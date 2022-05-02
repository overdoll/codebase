package activities

import (
	"context"
)

func (h *Activities) StingDeleteAccountData(ctx context.Context, accountId string) error {
	return h.sting.DeleteAccountData(ctx, accountId)
}
