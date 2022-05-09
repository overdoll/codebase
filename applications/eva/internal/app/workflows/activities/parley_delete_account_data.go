package activities

import (
	"context"
)

func (h *Activities) ParleyDeleteAccountData(ctx context.Context, accountId string) error {
	return h.parley.DeleteAccountData(ctx, accountId)
}
