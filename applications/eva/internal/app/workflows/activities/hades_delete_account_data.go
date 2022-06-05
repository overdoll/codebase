package activities

import (
	"context"
)

func (h *Activities) HadesDeleteAccountData(ctx context.Context, accountId string) error {

	if err := h.hades.DeleteAccountData(ctx, accountId); err != nil {
		return err
	}

	return nil
}
