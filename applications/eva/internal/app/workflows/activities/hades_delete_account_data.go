package activities

import (
	"context"
)

func (h *Activities) HadesDeleteAccountData(ctx context.Context, accountId string) error {
	return h.hades.DeleteAccountData(ctx, accountId)
}
