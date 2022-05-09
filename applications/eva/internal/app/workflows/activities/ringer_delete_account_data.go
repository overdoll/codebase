package activities

import (
	"context"
)

func (h *Activities) RingerDeleteAccountData(ctx context.Context, accountId string) error {
	return h.ringer.DeleteAccountData(ctx, accountId)
}
